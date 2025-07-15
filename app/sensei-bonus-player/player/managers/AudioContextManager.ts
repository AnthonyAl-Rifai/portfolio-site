import { PLAYER_EVENTS, PlayerEventEmitter } from "../types/playerEvents";
import { PlayerState } from "../types/playerStates";
import logger from "../utils/logger";
import { getTimeFromRadians } from "../utils/radians";
import AsyncOperationQueue from "../utils/AsyncOperationQueue";
import audioAssetFetcher, { AudioBuffers } from "../utils/AudioAssetFetcher";
import type { AudioAssets } from "../types/playerTypes";

class AudioContextManager extends PlayerEventEmitter {
  public audioContext?: AudioContext;

  private audioBufferSource: AudioBufferSourceNode | null = null;

  private bufferSourceStarted: boolean = false;

  private audioGainNode: GainNode | null = null;

  private activeBuffer: AudioBuffer | null = null;

  private highPassFilter: BiquadFilterNode | null = null;

  private currentUrl?: string;

  private volumeMeterNode: AudioWorkletNode | null = null;

  private tickNode: AudioWorkletNode | null = null;

  private currentState: PlayerState = PlayerState.STOPPED;

  private previousState?: PlayerState;

  private startOffset: number = 0;

  private startPlayingTimestamp: number | null = null;

  private stopPlayingTimestamp: number | null = null;

  private previousScrubbingTimestamp: number | null = null;

  private previousScrubRotation: number = 0;

  private previousPlaybackRate: number = 1;

  private currentPlaybackRate: number = 1;

  private previousBufferPosition: number = 0;

  private currentBufferPosition: number = 0;

  private previousContextPosition: number = 0;

  private spinOffset: number = 0;

  private shouldPlayAfterSeek: boolean = false;

  private log: ReturnType<typeof logger>;

  public isSeeking: boolean = false;

  private seekDirection: "forward" | "reverse" = "forward";

  private seekRate: number = 2;

  private readonly seekRateMax: number = 32;

  private rateBeforeSeek: number = 1;

  private isAwaitingScrub: boolean = false;

  private rateBeforeScrub: number = 1;

  private scrubStallTimeoutRef: ReturnType<typeof setTimeout> | null = null;

  private operationQueue: AsyncOperationQueue = new AsyncOperationQueue();

  public static readonly RPM = 33 + 1 / 3;

  private static readonly FADE = 0.1;

  constructor() {
    super();

    this.log = logger("AudioContextManager");
    this.setState(PlayerState.INITIALIZING);
  }

  get state(): PlayerState {
    return this.currentState;
  }

  get currentTime(): number {
    return this.currentBufferPosition;
  }

  set currentTime(position: number) {
    this.currentBufferPosition = position;
    this.previousBufferPosition = this.currentBufferPosition;
  }

  get isPlaying(): boolean {
    return [
      PlayerState.PLAYING,
      PlayerState.SPINNING_UP,
      PlayerState.SPINNING_DOWN,
      PlayerState.SEEKING,
    ].includes(this.currentState);
  }

  get isReverse(): boolean {
    return this.activeBuffer === this.reversedAudioBuffer;
  }

  get playbackRate(): number {
    return this.currentPlaybackRate;
  }

  set playbackRate(rate: number) {
    this.setPlaybackRate(rate);
  }

  get duration(): number {
    return this.activeBuffer?.duration || 0;
  }

  get buffers(): AudioBuffers | undefined {
    return audioAssetFetcher.getAudioAssets(this.currentUrl)?.buffers;
  }

  get forwardAudioBuffer(): AudioBuffer | null | undefined {
    return this.buffers?.forward;
  }

  get reversedAudioBuffer(): AudioBuffer | null | undefined {
    return this.buffers?.reversed;
  }

  hasLoaded(url: string): boolean {
    return !!(audioAssetFetcher && audioAssetFetcher.hasLoaded(url));
  }

  private setState(state: PlayerState) {
    this.log.state(state);
    this.previousState = this.currentState;
    this.currentState = state;
    this.emit(PLAYER_EVENTS.stateupdate, {
      state,
      previousState: this.previousState,
    });
  }

  async fetchAssets(assets: AudioAssets) {
    if (!this.audioContext) {
      throw new Error(
        "Attempted to fetch buffers without an audio context instantiated"
      );
    }
    if (!audioAssetFetcher) {
      throw new Error(
        "Attempted to fetch buffers without an audio fetcher instantiated"
      );
    }

    const url = assets.mp3.forward;
    this.emit(PLAYER_EVENTS.loading, url);
    this.currentUrl = url;
    const isPreloaded =
      !!audioAssetFetcher.getAudioAssets(url)?.buffers?.forward;
    const buffers = await audioAssetFetcher.fetchAudioAssets(assets);
    this.emit(PLAYER_EVENTS.loaded, isPreloaded);

    return buffers;
  }

  async preload(assets: AudioAssets) {
    const url = assets.mp3.forward;
    await audioAssetFetcher.preloadAssets(assets);
    const buffers = audioAssetFetcher.getAudioAssets(url)?.buffers;
    if (buffers?.forward) {
      this.emit(PLAYER_EVENTS.loaded, true);
    }
  }

  async load(assets: AudioAssets) {
    if (this.currentState === PlayerState.LOADING) return;
    this.setState(PlayerState.LOADING);

    if (!this.audioContext) {
      this.log.info("creating audio context");
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      audioAssetFetcher.initialize(this.audioContext);
    }

    await this.reset();

    const processedAssets = await this.fetchAssets(assets);
    this.activeBuffer = processedAssets.buffers.forward;

    this.setState(PlayerState.READY);
    this.emit(PLAYER_EVENTS.ready, assets.mp3.forward);
  }

  private onTick({ data: now }: { data: number }) {
    switch (this.currentState) {
      case PlayerState.READY:
        break;
      case PlayerState.SPINNING_UP: {
        if (this.startPlayingTimestamp === null) break;
        const timeElapsed = Math.pow(now - this.startPlayingTimestamp, 2) / 2;
        this.currentBufferPosition = this.isReverse
          ? this.startOffset - timeElapsed
          : timeElapsed + this.startOffset;
        this.emit(PLAYER_EVENTS.timeupdate, this.currentBufferPosition);
        break;
      }
      case PlayerState.LOADING:
      case PlayerState.INITIALIZING:
      case PlayerState.SEEKING:
      case PlayerState.SCRUBBING:
      case PlayerState.PLAYING: {
        if (
          this.isSeeking ||
          this.currentState === PlayerState.PLAYING ||
          this.currentState === PlayerState.SCRUBBING
        ) {
          this.previousBufferPosition +=
            (now - this.previousContextPosition) * this.previousPlaybackRate;
          this.previousBufferPosition = Math.max(
            0,
            Math.min(this.duration, this.previousBufferPosition)
          );
          this.currentBufferPosition = this.previousBufferPosition;
          this.previousContextPosition = now;
          this.emit(PLAYER_EVENTS.timeupdate, this.currentBufferPosition);
        }
        break;
      }
      case PlayerState.SPINNING_DOWN: {
        if (this.stopPlayingTimestamp === null) return;
        // Still spinning down
        const timeElapsed =
          Math.pow(1 - (now - this.stopPlayingTimestamp), 2) / 2;
        this.currentBufferPosition = this.isReverse
          ? this.previousBufferPosition - (0.5 - timeElapsed)
          : 0.5 - timeElapsed + this.previousBufferPosition;
        this.emit(PLAYER_EVENTS.timeupdate, this.currentBufferPosition);
        break;
      }
      default: {
        this.previousBufferPosition = this.currentBufferPosition;
        this.previousContextPosition = now;
        this.stopPlayingTimestamp = null;
        return;
      }
    }

    // We reached either the end of the track or beginning in reverse
    if (this.currentState !== PlayerState.SCRUBBING) {
      if (
        (this.isReverse && this.currentBufferPosition <= 0) ||
        (!this.isReverse &&
          this.activeBuffer &&
          this.currentBufferPosition >= this.activeBuffer.duration)
      ) {
        this.onTrackComplete();
      }
    }
  }

  private async onTrackComplete() {
    if (this.currentState === PlayerState.COMPLETED) return;
    const isReverse = this.isReverse;
    this.log.info(
      isReverse ? "beginning of track reached" : "end of track reached"
    );
    if (this.isSeeking) {
      await this.onSeeked();
    }
    this.setState(PlayerState.COMPLETED);
    await this.stopAndDisconnect();
    await this.suspendAudioContext();
    this.emit(PLAYER_EVENTS.ended, isReverse ? "reverse" : "forward");
  }

  private async connectBufferSource() {
    if (this.audioBufferSource) return true;
    if (!this.audioContext) {
      throw new Error(
        "Attempting to connect buffer source without an audio context instance"
      );
    }
    this.log.info("creating buffer source");
    if (!this.tickNode) {
      await this.audioContext.audioWorklet.addModule(
        "worklets/TickProcessor.js",
        {}
      );
      this.tickNode = new AudioWorkletNode(this.audioContext, "tick");
      this.tickNode.port.onmessage = obj => this.onTick(obj);
    }
    this.audioBufferSource = this.audioContext.createBufferSource();
    this.bufferSourceStarted = false;
    this.audioGainNode = this.audioContext.createGain();
    this.audioBufferSource.buffer = this.activeBuffer;
    if (!this.volumeMeterNode) {
      await this.audioContext.audioWorklet.addModule(
        "worklets/VolumeMeterProcessor.js"
      );
      this.volumeMeterNode = new AudioWorkletNode(
        this.audioContext,
        "volume-meter"
      );
      this.volumeMeterNode.port.onmessage = ({
        data,
      }: {
        data: [number, number];
      }) => {
        this.emit(PLAYER_EVENTS.volumeupdate, data);
      };
    }
    if (!this.highPassFilter) {
      this.highPassFilter = this.audioContext.createBiquadFilter();
      this.highPassFilter.type = "highpass";
      this.highPassFilter.frequency.value = this.isSeeking ? 6000 : 0;
    }
    this.audioBufferSource.connect(this.highPassFilter);
    this.highPassFilter.connect(this.audioGainNode);
    this.audioGainNode.connect(this.audioContext.destination);
    this.audioGainNode.connect(this.volumeMeterNode);
  }

  private disconnectBufferSource() {
    if (!this.audioBufferSource || !this.audioContext) return;
    this.log.info("disconnecting buffer source");
    if (this.audioGainNode && this.volumeMeterNode && this.highPassFilter) {
      this.audioGainNode.disconnect(this.volumeMeterNode);
      this.volumeMeterNode.disconnect();
      this.audioGainNode.disconnect(this.audioContext.destination);
      this.highPassFilter.disconnect(this.audioGainNode);
      this.audioBufferSource.disconnect(this.highPassFilter);
    }
    this.audioBufferSource = null;
    this.audioGainNode = null;
    this.volumeMeterNode = null;
    this.highPassFilter = null;
  }

  private async spinUp(offset: number = 1) {
    if (!this.audioContext) return;
    this.log.info("spinning up");
    const isAlreadyConnected = await this.connectBufferSource();
    if (this.audioBufferSource) {
      let playbackStartValue = 0.001;
      if (this.currentState === PlayerState.SPINNING_DOWN) {
        this.previousBufferPosition = this.currentBufferPosition;
        playbackStartValue = 0.5;
      }
      this.setState(PlayerState.SPINNING_UP);
      const { playbackRate } = this.audioBufferSource;
      const now = this.audioContext.currentTime;
      playbackRate.setValueAtTime(playbackStartValue, now);
      playbackRate.linearRampToValueAtTime(
        Math.abs(this.currentPlaybackRate),
        now + offset
      );
      this.previousContextPosition = now + offset / 2;
      this.startOffset = this.previousBufferPosition;
      this.startPlayingTimestamp = now;
      this.stopPlayingTimestamp = null;
      this.previousPlaybackRate = this.currentPlaybackRate;
      this.spinOffset = offset;

      if (isAlreadyConnected) {
        this.resumeAudioContext();
      } else {
        this.startBufferSource(this.previousBufferPosition);
      }

      return new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, offset * 1000);
      });
    }
  }

  private async spinDown(offset: number = 1) {
    if (!this.audioBufferSource || !this.audioContext) return;
    this.log.info("spinning down");
    if (this.currentState === PlayerState.SPINNING_UP) {
      this.previousBufferPosition = this.currentBufferPosition;
    }
    this.setState(PlayerState.SPINNING_DOWN);
    const { playbackRate } = this.audioBufferSource;
    const now = this.audioContext.currentTime;
    playbackRate.cancelScheduledValues(now);
    playbackRate.setValueAtTime(playbackRate.value, now);
    const endTime = now + offset;
    playbackRate.linearRampToValueAtTime(0.001, endTime);
    this.stopPlayingTimestamp = now;
    this.spinOffset = offset;
    const delay = this.spinOffset > 0 ? this.spinOffset * 1000 : 0;

    return new Promise<void>(resolve => {
      setTimeout(async () => {
        if (
          [PlayerState.SPINNING_UP, PlayerState.PLAYING].includes(
            this.currentState
          )
        )
          return resolve();
        if (this.isSeeking) {
          await this.onSeeked();
        }
        this.setState(PlayerState.PAUSED);
        this.emit(PLAYER_EVENTS.pause);
        await this.suspendAudioContext();
        resolve();
      }, delay);
    });
  }

  private startBufferSource(offset: number = 0, duration?: number) {
    if (
      !this.audioBufferSource ||
      !this.audioContext ||
      this.bufferSourceStarted
    )
      return;
    const now = this.audioContext.currentTime;
    this.log.info("starting buffer source");
    this.audioBufferSource.start(now, offset, duration);
    this.bufferSourceStarted = true;
  }

  private resumeAudioContext() {
    if (!this.audioContext || this.audioContext.state === "running") return;
    this.log.info("resuming audio context");
    this.audioContext.resume();
    const now = this.audioContext.currentTime;
    this.audioGainNode?.gain.linearRampToValueAtTime(
      1,
      now + AudioContextManager.FADE
    );
  }

  private suspendAudioContext() {
    if (!this.audioContext || this.audioContext.state === "suspended") return;
    const now = this.audioContext.currentTime;
    this.audioGainNode?.gain.linearRampToValueAtTime(
      0,
      now + AudioContextManager.FADE
    );

    return new Promise<void>(resolve => {
      setTimeout(() => {
        if (!this.audioContext) return;
        this.log.info("suspending audio context");
        this.audioContext.suspend();
        resolve();
      }, AudioContextManager.FADE * 1500);
    });
  }

  private stopAndDisconnect(
    offset: number = 0,
    timeConstant = AudioContextManager.FADE
  ) {
    if (
      !this.audioBufferSource ||
      !this.audioContext ||
      !this.bufferSourceStarted
    )
      return;
    const now = this.audioContext.currentTime;
    const endTime = now + offset;
    this.audioGainNode?.gain.setTargetAtTime(0, now, timeConstant);
    this.audioBufferSource.stop(endTime);
    this.bufferSourceStarted = false;
    this.log.info("buffer source stopped");
    const delay = offset > 0 ? offset * 1000 : 0;

    return new Promise<void>(resolve => {
      setTimeout(() => {
        this.disconnectBufferSource();
        resolve();
      }, delay);
    });
  }

  private async setPlaybackRate(rate: number, offset: number = 0) {
    if (!isFinite(rate) || Number.isNaN(rate)) return;
    if (!this.audioContext || !this.activeBuffer || !this.audioBufferSource) {
      this.previousPlaybackRate = this.currentPlaybackRate;
      this.currentPlaybackRate = rate;
      this.log.info("playback rate set to", rate);
      this.emit(PLAYER_EVENTS.ratechange, this.currentPlaybackRate);
      return;
    }

    this.log.info("setting playback rate", rate);

    const now = this.audioContext.currentTime;

    if (this.previousContextPosition > now) {
      this.log.info(
        "TODO: handle changing playbackrate before the initial spin up"
      );
      // TODO: handle changing playbackrate before the initial spin up
      return;
    }

    this.previousBufferPosition +=
      (now - this.previousContextPosition) * this.previousPlaybackRate;
    this.previousPlaybackRate = rate;
    this.previousContextPosition = now;

    if (this.previousBufferPosition > this.activeBuffer.duration) {
      // We've reached the end of the buffer
      this.log.info("reached the end of the buffer");
      this.disconnectBufferSource();

      if (rate >= 0) return;

      this.previousBufferPosition = this.activeBuffer.duration;
    }

    if (this.previousBufferPosition < 0) {
      // We've run backwards over the beginning
      this.log.info("ran backwards over the beginning of the bufffer");
      this.disconnectBufferSource();
      this.previousPlaybackRate = 0;

      if (rate <= 0) return;

      this.previousBufferPosition = 0;
    }

    // if the rate isn't zero, we know we'll need a source node.
    // if the old value and the new value are on the same side
    // of zero, we can just set the rate, but otherwise we'll
    // need to stop the node and re-create it.  We may already
    // be stopped, with no sourceNode.
    if (this.audioBufferSource) {
      const shouldSwitchToReverse =
        this.currentPlaybackRate >= 0 && rate < 0 && !this.isReverse;
      const shouldSwitchToForward =
        this.currentPlaybackRate <= 0 && rate > 0 && this.isReverse;
      if (shouldSwitchToReverse || shouldSwitchToForward) {
        this.log.info("rate detected to have switched polarity", {
          currentPlaybackRate: this.currentPlaybackRate,
          rate,
          isReverse: this.isReverse,
        });
        const activeBuffer =
          rate > 0 ? this.forwardAudioBuffer : this.reversedAudioBuffer;
        this.currentPlaybackRate = rate;
        await this.switchBuffer(activeBuffer);
        this.emit(PLAYER_EVENTS.reversed, rate < 0);
      }
    }

    if (this.audioBufferSource && this.bufferSourceStarted) {
      if (rate !== this.currentPlaybackRate) {
        this.emit(PLAYER_EVENTS.ratechange, rate);
      }
      this.currentPlaybackRate = rate;
      this.log.info("playback rate set to", rate);
      if (offset !== 0) {
        this.audioBufferSource.playbackRate.linearRampToValueAtTime(
          Math.abs(rate),
          now + offset
        );
        await new Promise(resolve => setTimeout(resolve, offset * 1000));
      } else {
        this.audioBufferSource.playbackRate.setValueAtTime(Math.abs(rate), now);
      }
    }
  }

  private async switchBuffer(
    newBuffer?: AudioBuffer | null,
    startSource: boolean = true
  ) {
    if (!newBuffer || !this.audioContext) return;
    this.log.info("switching buffer");
    await this.stopAndDisconnect(0.1, AudioContextManager.FADE);
    const now = this.audioContext.currentTime;
    this.activeBuffer = newBuffer;
    await this.connectBufferSource();
    if (!this.audioBufferSource) return;
    this.log.info(
      "switching buffer to",
      !this.isReverse ? "forward buffer" : "reverse buffer"
    );
    const startTime = !this.isReverse
      ? this.previousBufferPosition
      : this.activeBuffer.duration - this.previousBufferPosition;
    this.audioBufferSource.playbackRate.setValueAtTime(
      Math.abs(this.currentPlaybackRate),
      now
    );
    if (startSource) this.startBufferSource(startTime);
  }

  private async onSeeked(rateBeforeSeek: number = this.rateBeforeSeek) {
    if (this.highPassFilter) {
      this.highPassFilter.frequency.value = 0;
    }
    this.isSeeking = false;
    this.seekRate = 2;
    await this.setPlaybackRate(rateBeforeSeek);
    this.setState(PlayerState.SEEKED);
    this.emit(PLAYER_EVENTS.seeked);
  }

  async play() {
    if (!this.activeBuffer) {
      if (this.currentState === PlayerState.LOADING) return;
      // Exit if no buffer has been loaded
      throw new Error("Attempted to play() when no buffer has been loaded.");
    }
    this.emit(PLAYER_EVENTS.play);

    if (this.isSeeking) {
      await this.onSeeked();
    } else {
      if (this.audioContext?.state === "suspended") {
        this.resumeAudioContext();
      }
      await this.spinUp(this.currentBufferPosition === 0 ? 0.25 : 1);
      if (
        !this.audioBufferSource ||
        [PlayerState.SPINNING_DOWN, PlayerState.PLAYING].includes(
          this.currentState
        )
      )
        return;
    }

    this.setState(PlayerState.PLAYING);
    this.emit(PLAYER_EVENTS.playing);
  }

  async pause() {
    if (!this.audioContext) return;
    if (this.audioBufferSource && this.isPlaying) {
      await this.spinDown();

      if (this.currentState === PlayerState.SPINNING_UP) return;

      if (this.startPlayingTimestamp !== null) {
        this.startOffset +=
          this.audioContext.currentTime - this.startPlayingTimestamp;
      }
    }
  }

  async stop() {
    this.log.info("stopping");
    await this.stopAndDisconnect();
    this.setState(PlayerState.STOPPED);
    this.emit(PLAYER_EVENTS.stop);
  }

  startScrubbing(rotation: number) {
    this.operationQueue.enqueue(async () => {
      this.log.info("start scrubbing");
      this.rateBeforeScrub = this.currentPlaybackRate;
      this.shouldPlayAfterSeek =
        this.currentState === PlayerState.PLAYING ||
        this.currentState === PlayerState.SPINNING_UP ||
        this.isSeeking;
      this.previousScrubbingTimestamp = Date.now();
      this.previousScrubRotation = rotation;
      await this.spinDown(0.1);
      this.setState(PlayerState.SCRUBBING);
      this.emit(PLAYER_EVENTS.scrubbing);
    });
  }

  scrubbing(rotation: number) {
    if (!this.previousScrubbingTimestamp) return;
    const currentTimestamp = Date.now();

    // Convert milliseconds to seconds
    const timeElapsed =
      (currentTimestamp - this.previousScrubbingTimestamp) / 1000;

    // Calculate angle difference in radians
    let angleDifference = rotation - this.previousScrubRotation;

    // Adjust for full rotations, assuming continuous rotation in one direction
    if (angleDifference > Math.PI) {
      angleDifference -= 2 * Math.PI;
    } else if (angleDifference < -Math.PI) {
      angleDifference += 2 * Math.PI;
    }

    // Calculate rotation speed (radians per second)
    const rotationSpeed = angleDifference / timeElapsed;

    // Convert 33 1/3 RPM to radians per second
    const referenceSpeed = (AudioContextManager.RPM * 2 * Math.PI) / 60;

    // Calculate playback rate
    const playbackRate = rotationSpeed / referenceSpeed;

    if (this.scrubStallTimeoutRef) clearTimeout(this.scrubStallTimeoutRef);
    this.scrubStallTimeoutRef = setTimeout(() => {
      if (
        this.previousScrubRotation === rotation &&
        this.currentPlaybackRate !== 0 &&
        this.currentState === PlayerState.SCRUBBING
      ) {
        this.log.info("scrub stall detected: setting playback rate to 0");
        this.setPlaybackRate(0);
      }
    }, 150);

    // Update previous values for next calculation
    this.previousScrubRotation = rotation;
    this.previousScrubbingTimestamp = currentTimestamp;

    if (this.isAwaitingScrub) return;

    this.isAwaitingScrub = true;
    this.operationQueue.enqueue(async () => {
      this.resumeAudioContext();
      await this.setPlaybackRate(playbackRate, 0.1);
      this.isAwaitingScrub = false;
    });
  }

  async endScrubbing(rotation: number) {
    // Set new buffer position based on latest rotation to ensure smooth resume
    const timeFromRadians = getTimeFromRadians(rotation);
    this.currentBufferPosition = timeFromRadians;
    this.previousBufferPosition = this.currentBufferPosition;

    this.operationQueue.enqueue(async () => {
      this.log.info("ending scrubbing");
      this.previousScrubbingTimestamp = null;
      await this.setPlaybackRate(this.rateBeforeScrub);
      this.previousBufferPosition = this.currentBufferPosition;
      this.setState(PlayerState.SCRUBBED);
      this.emit(PLAYER_EVENTS.scrubbed);
      if (this.shouldPlayAfterSeek) {
        this.shouldPlayAfterSeek = false;
        await this.play();
      } else {
        this.shouldPlayAfterSeek = false;
        await this.suspendAudioContext();
      }
    });
  }

  async reverse() {
    if (!this.audioBufferSource) return;
    if (
      ![PlayerState.PLAYING, PlayerState.PAUSED, PlayerState.SEEKING].includes(
        this.currentState
      )
    )
      return;

    if (this.isSeeking) {
      await this.onSeeked(this.rateBeforeSeek * -1);
    } else {
      await this.setPlaybackRate(this.currentPlaybackRate * -1);
    }

    if (this.currentState !== PlayerState.PAUSED) {
      this.setState(PlayerState.PLAYING);
      this.emit(PLAYER_EVENTS.playing);
    }
  }

  async decreaseRate() {
    if (
      (this.isReverse && -1.99 < this.currentPlaybackRate) ||
      0.01 < this.currentPlaybackRate
    ) {
      const rate = this.currentPlaybackRate - 0.01;
      await this.setPlaybackRate(rate, 1);
    }
  }

  async increaseRate() {
    if (
      (this.isReverse && this.currentPlaybackRate < -0.01) ||
      this.currentPlaybackRate < 1.99
    ) {
      const rate = this.currentPlaybackRate + 0.01;
      await this.setPlaybackRate(rate, 1);
    }
  }

  async seekForward() {
    this.log.info(`seeking forward at x${this.seekRate} rate`);
    if (this.highPassFilter) {
      this.highPassFilter.frequency.value = 6000;
    }
    if (!this.isPlaying && this.currentBufferPosition === this.duration) {
      this.setState(PlayerState.COMPLETED);
      await this.stopAndDisconnect();
      await this.suspendAudioContext();
      this.emit(PLAYER_EVENTS.ended, "forward");
      return;
    }
    if (!this.isSeeking) {
      this.rateBeforeSeek = this.currentPlaybackRate;
    } else if (this.seekDirection === "reverse") {
      this.seekRate = 2;
    }
    this.isSeeking = true;
    await this.setPlaybackRate(this.seekRate);
    if (!this.isPlaying) {
      await this.spinUp(0.5);
    }

    this.seekRate = this.seekRate < this.seekRateMax ? this.seekRate * 2 : 2;
    this.seekDirection = "forward";

    this.setState(PlayerState.SEEKING);
    this.emit(PLAYER_EVENTS.seeking, {
      rate: this.seekRate,
      direction: this.seekDirection,
    });
  }

  async seekBackward() {
    this.log.info(`seeking backward at x${this.seekRate} rate`);
    if (this.highPassFilter) {
      this.highPassFilter.frequency.value = 6000;
    }
    if (!this.isPlaying && this.currentBufferPosition === 0) {
      this.setState(PlayerState.COMPLETED);
      await this.stopAndDisconnect();
      await this.suspendAudioContext();
      this.emit(PLAYER_EVENTS.ended, "reverse");
      return;
    }
    if (!this.isSeeking) {
      this.rateBeforeSeek = this.currentPlaybackRate;
    } else if (this.seekDirection === "forward") {
      this.seekRate = 2;
    }
    this.isSeeking = true;
    await this.setPlaybackRate(this.seekRate * -1);
    if (!this.isPlaying) {
      await this.spinUp(0.5);
    }

    this.seekRate = this.seekRate < this.seekRateMax ? this.seekRate * 2 : 2;
    this.seekDirection = "reverse";

    this.setState(PlayerState.SEEKING);
    this.emit(PLAYER_EVENTS.seeking, {
      rate: this.seekRate,
      direction: this.seekDirection,
    });
  }

  onBackground = async () => {
    this.log.info("on background");
    if (this.isPlaying) {
      await this.stopAndDisconnect();
    }
  };

  onForeground = async (shouldResume: boolean = false) => {
    this.log.info("on foreground");
    if ((this.isPlaying || shouldResume) && this.activeBuffer) {
      this.log.info(
        `resuming on foreground in ${this.isReverse ? "reverse" : "forward"} direction`
      );
      await this.connectBufferSource();
      const startTime = !this.isReverse
        ? this.previousBufferPosition
        : this.activeBuffer.duration - this.previousBufferPosition;
      this.startBufferSource(startTime);
      if (this.isSeeking) {
        await this.onSeeked();
        this.setState(PlayerState.PLAYING);
      } else if (shouldResume) {
        this.setState(PlayerState.PLAYING);
      }
    }
  };

  async destroy() {
    this.log.info("destroying");
    this.removeAllListeners();
    await this.reset();
  }

  private async reset() {
    this.log.info("resetting");
    await this.stopAndDisconnect();
    this.activeBuffer = null;
    this.startOffset = 0;
    this.startPlayingTimestamp = null;
    this.stopPlayingTimestamp = null;
    this.previousScrubbingTimestamp = null;
    this.previousScrubRotation = 0;
    this.previousPlaybackRate = 1;
    this.currentPlaybackRate = 1;
    this.previousBufferPosition = 0;
    this.currentBufferPosition = 0;
    this.previousContextPosition = 0;
    this.spinOffset = 0;
    this.isSeeking = false;
    this.seekDirection = "forward";
    this.seekRate = 2;
    this.shouldPlayAfterSeek = false;
    this.currentUrl = undefined;
  }
}

export default AudioContextManager;
