import { PLAYER_EVENTS, PlayerEventEmitter } from '../types/playerEvents';
import logger from '../utils/logger';
import type AudioContextManager from './AudioContextManager';
import { PlayerState } from '../types/playerStates';
import { isMobile } from '../utils/ua';
import audioAssetFetcher, { AudioBlobUrls } from '../utils/AudioAssetFetcher';

class AudioElementManager extends PlayerEventEmitter {
  private log: ReturnType<typeof logger>;

  private audioElement?: HTMLAudioElement;

  private audioContextManager: AudioContextManager;

  private currentUrl?: string;

  public isBackgrounded: boolean = false;

  private detachBackgroundListener?: VoidFunction;

  private detachAudioElementListener?: VoidFunction;

  private requestedWakeLock: boolean = false;

  private previousPosition: number = 0;

  constructor(audioContextManager: AudioContextManager) {
    super();
  
    this.log = logger('AudioElementManager');
    this.audioContextManager = audioContextManager;
    this.attachAudioContextEvents();
    this.detachBackgroundListener = this.attachBackgroundListener();
    this.requestWakeLock();
  }

  get blobUrls(): AudioBlobUrls | undefined {
    return audioAssetFetcher?.getAudioAssets(this.currentUrl)?.blobUrls;
  }

  get forwardAudioBlobUrl(): string | undefined {
    return this.blobUrls?.forward;
  }

  get reversedAudioBlobUrl(): string | undefined {
    return this.blobUrls?.reversed;
  }

  get silentAudioBlobUrl(): string | undefined {
    return this.blobUrls?.silent;
  }

  get isReverse(): boolean {
    return !!(this.audioElement && this.audioElement.src === this.reversedAudioBlobUrl);
  }

  private attachAudioContextEvents() {
    // These events are expected to fire while in the foreground
    // to control the silent audio playing through the audio element
    this.audioContextManager.on(PLAYER_EVENTS.play, this.onPlay);
    this.audioContextManager.on(PLAYER_EVENTS.pause, this.onPause);
    this.audioContextManager.on(PLAYER_EVENTS.scrubbing, this.onScrubbing);
    this.audioContextManager.on(PLAYER_EVENTS.scrubbed, this.onScrubbed);
    this.audioContextManager.on(PLAYER_EVENTS.seeking, this.onSeeking);
    this.audioContextManager.on(PLAYER_EVENTS.seeked, this.onSeeked);
    this.audioContextManager.on(PLAYER_EVENTS.reversed, this.onReversed);
    this.audioContextManager.on(PLAYER_EVENTS.ratechange, this.onRateChange);
    this.audioContextManager.on(PLAYER_EVENTS.stop, this.onStop);
    this.audioContextManager.on(PLAYER_EVENTS.timeupdate, this.onTimeupdate);
    this.audioContextManager.on(PLAYER_EVENTS.ended, this.onEnded);
  }

  private attachAudioElementEvents() {
    this.detachAudioElementListener?.();
    this.audioElement?.addEventListener('playing', this.onAudioElementPlaying);
    this.audioElement?.addEventListener('pause', this.onAudioElementPaused);
    this.audioElement?.addEventListener('ended', this.onAudioElementEnded);
    this.audioElement?.addEventListener('timeupdate', this.onAudioElementTimeupdate);

    return () => {
      this.audioElement?.removeEventListener('playing', this.onAudioElementPlaying);
      this.audioElement?.removeEventListener('pause', this.onAudioElementPaused);
      this.audioElement?.removeEventListener('ended', this.onAudioElementEnded);
      this.audioElement?.removeEventListener('timeupdate', this.onAudioElementTimeupdate);
    }
  }

  private onPlay = () => {
    this.play();
  }

  private onPause = () => {
    this.pause();
  }

  private onScrubbing = () => {
    if (!this.audioElement) return;
    if (!this.audioElement.paused) {
      this.log.info('pausing due to scrub start', this.audioElement.currentTime);
      this.pause();
    }
  }

  private onScrubbed = () => {
    if (!this.audioElement) return;
    if (this.audioElement.paused) {
      this.log.info('storing current position after scrub', this.audioContextManager.currentTime);
      this.audioElement.currentTime = this.audioContextManager.currentTime;
      this.play();
    }
  }

  private onSeeking = ({ rate }: { rate: number }) => {
    if (!this.audioElement) return;
    this.log.info('seeking with playback rate', rate);
    this.audioElement.playbackRate = rate;
    if (this.audioElement.paused && !this.audioContextManager.isReverse) {
      this.play();
    }
  }

  private onSeeked = () => {
    if (!this.audioElement || this.isBackgrounded) return;
    this.log.info('seeked with playback rate', this.audioContextManager.playbackRate);
    this.audioElement.currentTime = this.audioContextManager.currentTime;
    this.audioElement.playbackRate = Math.abs(this.audioContextManager.playbackRate);
  }

  private onReversed = (reversed: boolean) => {
    if (!this.audioElement || this.isBackgrounded) return;
    if (reversed) {
      this.log.info('pausing while reversing');
      this.pause();
    } else {
      this.log.info('resuming after reversing to', this.audioContextManager.currentTime);
      this.audioElement.currentTime = this.audioContextManager.currentTime;
      this.play();
    }
  }

  private onRateChange = (rate: number) => {
    if (!this.audioElement) return;
    this.log.info('rate changed to', rate);
    try {
      this.audioElement.playbackRate = Math.abs(rate);
    } catch (e) {
      this.log.warn('unable to set playback rate to', rate);
    }
  }

  private onStop = () => {
    this.stop();
  }

  private onTimeupdate = (position: number) => {
    if (!this.audioElement || this.isBackgrounded || this.audioElement.paused) return;
    // Sync any >0.5s lag between audio element and audio context every 10 seconds
    if (position - this.previousPosition > 10 * Math.abs(this.audioContextManager.playbackRate)) {
      this.previousPosition = position;
      const diff = Math.abs(this.audioElement.currentTime - position);
      this.log.info('checking for the lag between audio element and context', diff);
      if (diff > 0.5) {
        this.log.info(`detected a difference of ${diff} between context and the audio element: resetting to`, position);
        this.audioElement.currentTime = position;
      }
    }
  }

  private onEnded = () => {
    this.stop();
  }

  private onAudioElementPlaying = () => {
    if (this.isBackgrounded && this.audioElement) {
      this.emit(PLAYER_EVENTS.playing);
    }
  }

  private onAudioElementPaused = () => {
    if (this.isBackgrounded && this.audioElement) {
      this.emit(PLAYER_EVENTS.pause);
    }
  }

  private onAudioElementEnded = () => {
    if (this.isBackgrounded && this.audioElement) {
      this.emit(PLAYER_EVENTS.ended, this.audioElement.src === this.reversedAudioBlobUrl ? 'reverse' : 'forward');
    }
  }

  private onAudioElementTimeupdate = () => {
    if (this.isBackgrounded && this.audioElement) {
      this.emit(PLAYER_EVENTS.timeupdate, this.audioElement.currentTime);
    }
  }

  play = () => {
    if (!this.audioElement || !this.audioElement.paused) return;
    this.log.info('playing');
    this.audioElement?.play();
  }

  pause = () => {
    if (!this.audioElement || this.audioElement.paused) return;
    this.log.info('pausing');
    this.audioElement?.pause();
  }

  stop = () => {
    this.log.info('stopping');
    this.audioElement?.pause();
    this.audioElement?.setAttribute('src', '');
    this.audioElement?.load();
    this.emit(PLAYER_EVENTS.stop);
  }

  seekTo = ({ seekTime }: { seekTime?: number }) => {
    if (!this.audioElement || typeof seekTime === 'undefined') return;
    this.log.info('seeking to', seekTime);
    this.emit(PLAYER_EVENTS.seeking, { rate: this.audioElement.playbackRate, direction: this.isReverse ? 'reverse' : 'forward'});
    this.audioElement.currentTime = seekTime;
    this.emit(PLAYER_EVENTS.seeked)
  }

  seekForward = ({ seekOffset }: { seekOffset?: number }) => {
    if (!this.audioElement || typeof seekOffset === 'undefined') return;
    this.log.info('seeking forward by', seekOffset);
    this.emit(PLAYER_EVENTS.seeking, { rate: this.audioElement.playbackRate, direction: this.isReverse ? 'reverse' : 'forward'});
    this.audioElement.currentTime += seekOffset;
    this.emit(PLAYER_EVENTS.seeked)
  }

  seekBackward = ({ seekOffset }: { seekOffset?: number }) => {
    if (!this.audioElement || typeof seekOffset === 'undefined') return;
    this.log.info('seeking backward by', seekOffset);
    this.emit(PLAYER_EVENTS.seeking, { rate: this.audioElement.playbackRate, direction: this.audioElement.src === this.reversedAudioBlobUrl ? 'reverse' : 'forward'});
    this.audioElement.currentTime -= seekOffset;
    this.emit(PLAYER_EVENTS.seeked)
  }

  initialize = (url: string) => {
    this.log.info('initialize');
    this.currentUrl = url;
    return new Promise<void>(async (resolve, reject) => {
      if (!this.forwardAudioBlobUrl || !this.silentAudioBlobUrl) {
        throw new Error('Attempted to initialize without defined audio blob urls');
      }
      this.log.info('setting up audio element');
      this.audioElement = document.querySelector('audio') || document.createElement('audio');
      this.audioElement.preservesPitch = false;
      const onCanPlay = () => {
        this.log.info('audio element can play');
        this.audioElement?.removeEventListener('canplay', onCanPlay);
        resolve();
      }
      this.audioElement.addEventListener('canplay', onCanPlay);
      this.log.info('setting src');
      this.audioElement.src = this.isBackgrounded ? this.forwardAudioBlobUrl : this.silentAudioBlobUrl;
      this.audioElement.load();
      if (!document.querySelector('audio')) {
        this.log.info('appending audio element to DOM');
        document.querySelector('#root')?.appendChild(this.audioElement);
        this.detachBackgroundListener = this.attachAudioElementEvents();
      }
    });
  }

  private attachBackgroundListener() {
    if (!isMobile()) return;
    this.detachBackgroundListener?.();

    this.log.info('listening for visibility changes');
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    return () => {
      this.log.info('removing visibility change handler');
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
    };
  }

  private onVisibilityChange = async () => {
    const isHidden = document.visibilityState === 'hidden';
    this.isBackgrounded = isHidden;
    this.log.info(`visibility has changed to the ${this.isBackgrounded ? 'background' : 'foreground'}`);

    const { audioContext } = this.audioContextManager;
    if (!this.audioElement || !audioContext) return;

    if (isHidden && this.forwardAudioBlobUrl && this.reversedAudioBlobUrl) {
      this.log.info('setting audio element to play in the background');
      const shouldPlayAudioElement = this.audioContextManager.isPlaying;
      this.audioElement.src = this.audioContextManager.isReverse ? this.reversedAudioBlobUrl : this.forwardAudioBlobUrl;
      this.audioElement.currentTime = this.audioContextManager.isReverse
        ? this.audioContextManager.duration - this.audioContextManager.currentTime
        : this.audioContextManager.currentTime;
      this.audioElement.playbackRate = this.audioContextManager.isSeeking ? 1 : Math.abs(this.audioContextManager.playbackRate);
      this.log.info(`setting audio element position to ${this.audioElement.currentTime} and playback rate to ${this.audioElement.playbackRate}`);
      if (shouldPlayAudioElement) {
        this.play();
      }
      await this.audioContextManager.onBackground();
    } else if (!isHidden && this.silentAudioBlobUrl) {
      this.log.info('restoring audio context and silent audio to play in the foreground');
      const shouldPlayAudioElement = !this.audioElement.pause && !this.isReverse;
      this.audioContextManager.currentTime = this.audioContextManager.isReverse
        ? this.audioContextManager.duration - this.audioElement.currentTime
        : this.audioElement.currentTime;
      this.audioElement.src = this.silentAudioBlobUrl;
      this.audioElement.currentTime = this.audioContextManager.currentTime;
      this.audioElement.playbackRate = Math.abs(this.audioContextManager.playbackRate);
      this.log.info(`Setting audio element currentTime to ${this.audioElement.currentTime} and playback rate to ${this.audioElement.playbackRate}`);
      try {
        const shouldResume = !this.audioElement.paused && this.audioContextManager.isPlaying;
        await this.audioContextManager.onForeground(shouldResume);
        this.audioContextManager.playbackRate = this.audioContextManager.isReverse ? this.audioElement.playbackRate * -1 : this.audioElement.playbackRate;
        this.log.info(`setting audio context position to ${this.audioContextManager.currentTime} and playback rate to ${this.audioContextManager.playbackRate}`);
        if (shouldPlayAudioElement) {
          this.play();
        }
      } catch {
        this.attachSingleTouchEventListener();
      }
    }
  }

  private onTouchStart = () => {
    if (this.audioContextManager.state !== PlayerState.PLAYING || !this.audioElement) {
      this.audioElement?.removeEventListener('touchstart', this.onTouchStart);
      return;
    }
    this.audioElement.currentTime = this.audioContextManager.currentTime;
    this.audioElement.play();
    this.audioElement?.removeEventListener('touchstart', this.onTouchStart);
  }

  private attachSingleTouchEventListener() {
    this.log.info('listening for next touch event to play silent audio element');
    document.addEventListener('touchstart', this.onTouchStart);
  }

  private async requestWakeLock() {
    if (this.requestedWakeLock) return;
    this.requestedWakeLock = true;
    try {
      if ('wakeLock' in navigator) {
        await navigator.wakeLock.request('screen');
        this.log.info('wake lock is activated');
      }
    } catch (err) {
      // The Wake Lock request has failed - usually system related, such as battery.
      this.log.info('wake lock request has failed');
    }
  }

  destroy() {
    this.detachBackgroundListener?.();
    this.detachAudioElementListener?.();
    this.audioContextManager.removeAllListeners();
  }
}

export default AudioElementManager;
