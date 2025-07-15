import {
  AudioContextManager,
  AudioElementManager,
  MediaSessionManager,
} from "./managers";
import { PLAYER_EVENTS, PlayerEventEmitter } from "./types/playerEvents";
import logger from "./utils/logger";
import { PlayerState } from "./types/playerStates";
import { isMobile } from "./utils/ua";
import { AudioTrack, Playlist } from "./types/playerTypes";

class Player extends PlayerEventEmitter {
  private playlist: Playlist = [];

  private currentIndex: number = 0;

  private audioContextManager: AudioContextManager | null = null;

  private mediaSessionManager: MediaSessionManager | null = null;

  private audioElementManager: AudioElementManager | null = null;

  private playerEvents = Object.values(PLAYER_EVENTS);

  private log: ReturnType<typeof logger>;

  private isReady: boolean = false;

  private static readonly PRELOAD_TIME = 20;

  constructor() {
    super();

    this.log = logger("Player");
    this.setup();
  }

  get playerState() {
    return this.audioContextManager?.state || PlayerState.INITIALIZING;
  }

  get currentTrack(): AudioTrack | undefined {
    return this.playlist[this.currentIndex];
  }

  get currentTime(): number {
    return this.audioContextManager?.currentTime || 0;
  }

  get trackIndex(): number {
    return this.currentIndex + 1;
  }

  get isPlaying(): boolean {
    return this.audioContextManager?.isPlaying || false;
  }

  get playbackRate(): number {
    return this.audioContextManager?.playbackRate || 1;
  }

  get duration(): number {
    return this.audioContextManager?.duration || 0;
  }

  get isReverse(): boolean {
    return this.audioContextManager?.isReverse || false;
  }

  get isBackgrounded(): boolean {
    return this.audioElementManager?.isBackgrounded || false;
  }

  get isSeeking(): boolean {
    return this.audioContextManager?.isSeeking || false;
  }

  setup() {
    if (!this.audioContextManager) {
      this.emit(PLAYER_EVENTS.setup);
      this.audioContextManager = new AudioContextManager();
      this.setupAudioElementManager();
      this.setupMediaSessionManager();
      this.attachEventListeners();
    }
  }

  async load(playlist: Playlist) {
    if (this.playerState === PlayerState.LOADING) return;
    this.isReady = false;
    this.log.info("loading playlist", playlist);
    this.playlist = playlist;
    if (!this.currentTrack) {
      throw new Error(
        `No track specified in playlist for index ${this.currentIndex}`
      );
    }
    if (!this.audioContextManager) {
      this.setup();
    }
    if (!this.audioContextManager) return;

    try {
      this.setMediaSessionMetadata(this.currentTrack);
      await this.audioContextManager.load(this.currentTrack.assets);
    } catch (err) {
      console.log(err);
      throw new Error("Error loading audio context!");
    }
  }

  private attachEventListeners() {
    const exludedEvents = [PLAYER_EVENTS.ready];
    this.playerEvents
      .filter(playerEvent => !exludedEvents.includes(playerEvent))
      .forEach(playerEvent => {
        this.audioContextManager?.on(playerEvent, (obj: any) => {
          this.log.event(playerEvent, obj);
          this.emit(playerEvent, obj);
        });
        this.audioElementManager?.on(playerEvent, (obj: any) => {
          this.log.event(playerEvent, obj);
          this.emit(playerEvent, obj);
        });
      });
    this.audioContextManager?.on(PLAYER_EVENTS.ended, this.onEnded);
    this.audioContextManager?.on(PLAYER_EVENTS.timeupdate, this.onTimeupdate);
    this.audioContextManager?.on(PLAYER_EVENTS.ready, this.onAudioContextReady);

    this.audioElementManager?.on(PLAYER_EVENTS.ended, this.onEnded);
    this.audioElementManager?.on(PLAYER_EVENTS.timeupdate, this.onTimeupdate);
  }

  private onAudioContextReady = async (url: string) => {
    // Set up audio element to enable background playback on mobile devices
    if (isMobile()) {
      if (!this.audioContextManager) {
        throw new Error(
          "No audio context manager instance detected when setting up audio element manager"
        );
      }
      if (!this.audioElementManager) {
        throw new Error(
          "No audio element manager instance detected when initializing"
        );
      }

      await this.audioElementManager.initialize(url);
      this.isReady = true;
      this.log.event(PLAYER_EVENTS.ready, { url });
      this.emit(PLAYER_EVENTS.ready, url);
    } else {
      this.isReady = true;
      this.log.event(PLAYER_EVENTS.ready, { url });
      this.emit(PLAYER_EVENTS.ready, url);
    }
  };

  private onEnded = (direction: "forward" | "reverse") => {
    if (!this.audioElementManager?.isBackgrounded) {
      if (direction === "forward") {
        this.skipForward();
      } else {
        this.skipBackward();
      }
    } else {
      if (direction === "forward") {
        this.onNextTrack();
      } else {
        this.onPreviousTrack();
      }
    }
  };

  private onTimeupdate = (position: number) => {
    if (!this.audioContextManager) return;

    // Preload next track if we reached near the end in forward direction
    if (
      !this.audioContextManager.isReverse &&
      position >
        this.audioContextManager.duration -
          Player.PRELOAD_TIME * this.audioContextManager.playbackRate
    ) {
      const nextIndex = (this.currentIndex + 1) % this.playlist.length;
      const nextAssets = this.playlist[nextIndex].assets;
      const nextUrl = nextAssets.mp3.forward;
      if (!this.audioContextManager?.hasLoaded(nextUrl)) {
        this.audioContextManager.preload(nextAssets);
      }
    } else if (
      this.audioContextManager.isReverse &&
      Player.PRELOAD_TIME * this.audioContextManager.playbackRate > position
    ) {
      // Preload previous track if we reached near the end in reverse direction
      const nextIndex =
        this.currentIndex === 0
          ? this.playlist.length - 1
          : this.currentIndex - 1;
      const nextAssets = this.playlist[nextIndex].assets;
      const nextUrl = nextAssets.mp3.forward;
      if (!this.audioContextManager?.hasLoaded(nextUrl)) {
        this.audioContextManager.preload(nextAssets);
      }
    }
  };

  private setupAudioElementManager() {
    if (!isMobile()) return;
    if (!this.audioContextManager) {
      throw new Error(
        "Attempted to set up audio element manager before creating audio context manager"
      );
    }
    if (!this.audioElementManager && this.audioContextManager) {
      this.log.info("creating audio element manager");
      this.audioElementManager = new AudioElementManager(
        this.audioContextManager
      );
    }
  }

  private setupMediaSessionManager() {
    if (!isMobile()) return;
    if (!this.audioElementManager) {
      throw new Error(
        "Attempted to set up media session manager before creating audio element manager"
      );
    }
    if (this.mediaSessionManager) return;
    this.mediaSessionManager = new MediaSessionManager({
      onPlay: this.audioElementManager.play,
      onPause: this.audioElementManager.pause,
      onStop: this.audioElementManager.stop,
      onSeekBackward: this.audioElementManager.seekBackward,
      onSeekForward: this.audioElementManager.seekForward,
      onSeekTo: this.audioElementManager.seekTo,
      onPreviousTrack: this.onPreviousTrack,
      onNextTrack: this.onNextTrack,
    });
  }

  private setMediaSessionMetadata(track: AudioTrack) {
    if (!this.mediaSessionManager) return;
    const { title, artist, album, artwork } = track;
    this.mediaSessionManager.setMetadata({
      title,
      artist,
      album,
      artwork,
    });
  }

  play = () => {
    if (!this.isReady) return;
    this.audioContextManager?.play();
  };

  pause = () => {
    this.audioContextManager?.pause();
  };

  stop = () => {
    this.audioContextManager?.stop();
  };

  seekForward = async () => {
    if (!this.audioContextManager) return;
    this.log.info("seeking forward");
    await this.audioContextManager.seekForward();
  };

  seekBackward = async () => {
    if (!this.audioContextManager) return;
    this.log.info("seeking backward");
    await this.audioContextManager.seekBackward();
  };

  onNextTrack = async () => {
    if (!this.audioContextManager) return;
    this.log.info("playing next track");
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    if (!this.currentTrack) return;
    this.emit(PLAYER_EVENTS.skipForward);
    this.setMediaSessionMetadata(this.currentTrack);
    this.once(PLAYER_EVENTS.ready, () => {
      this.audioElementManager?.play();
    });
    await this.audioContextManager.load(this.currentTrack.assets);
  };

  onPreviousTrack = async () => {
    if (!this.audioContextManager) return;
    this.log.info("playing previous track");
    this.currentIndex =
      this.currentIndex === 0
        ? this.playlist.length - 1
        : this.currentIndex - 1;
    if (!this.currentTrack) return;
    this.emit(PLAYER_EVENTS.skipBackward);
    this.setMediaSessionMetadata(this.currentTrack);
    this.once(PLAYER_EVENTS.ready, () => {
      this.audioElementManager?.play();
    });
    await this.audioContextManager.load(this.currentTrack.assets);
  };

  skipForward = async () => {
    if (!this.audioContextManager) return;
    this.log.info("playing next track");
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    if (!this.currentTrack) return;
    this.emit(PLAYER_EVENTS.skipForward);
    this.setMediaSessionMetadata(this.currentTrack);
    this.once(PLAYER_EVENTS.ready, () => {
      this.audioContextManager?.play();
    });
    await this.audioContextManager.load(this.currentTrack.assets);
  };

  skipBackward = async () => {
    if (!this.audioContextManager) return;
    this.log.info("playing previous track");
    this.currentIndex =
      this.currentIndex === 0
        ? this.playlist.length - 1
        : this.currentIndex - 1;
    if (!this.currentTrack) return;
    this.emit(PLAYER_EVENTS.skipBackward);
    this.setMediaSessionMetadata(this.currentTrack);
    this.once(PLAYER_EVENTS.ready, () => {
      this.audioContextManager?.play();
    });
    await this.audioContextManager.load(this.currentTrack.assets);
  };

  startScrubbing = (rotation: number) => {
    this.audioContextManager?.startScrubbing(rotation);
  };

  scrubbing = (rotation: number) => {
    this.audioContextManager?.scrubbing(rotation);
  };

  endScrubbing = (rotation: number) => {
    this.audioContextManager?.endScrubbing(rotation);
  };

  reverse = () => {
    this.audioContextManager?.reverse();
  };

  decreaseRate = () => {
    this.audioContextManager?.decreaseRate();
  };

  increaseRate = () => {
    this.audioContextManager?.increaseRate();
  };

  destroy = () => {
    this.removeAllListeners();
    this.audioContextManager?.destroy();
    this.audioContextManager = null;
    this.mediaSessionManager?.destroy();
    this.mediaSessionManager = null;
    this.audioElementManager?.destroy();
    this.audioElementManager = null;
    this.isReady = false;
  };
}

export { PlayerState } from "./types/playerStates";
export { PLAYER_EVENTS, PlayerEventEmitter } from "./types/playerEvents";
export type { PlayerListeners } from "./types/playerEvents";
export type { AudioTrack } from "./types/playerTypes";

export default Player;
