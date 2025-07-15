import logger from "../utils/logger";

interface MediaSessionManagerOptions {
  onPlay: MediaSessionActionHandler;
  onPause: MediaSessionActionHandler;
  onStop: MediaSessionActionHandler;
  onSeekBackward: MediaSessionActionHandler;
  onSeekForward: MediaSessionActionHandler;
  onPreviousTrack: MediaSessionActionHandler;
  onNextTrack: MediaSessionActionHandler;
  onSeekTo: MediaSessionActionHandler;
}

class MediaSessionManager {
  private metadata?: MediaMetadataInit;

  private onPlay: MediaSessionActionHandler;

  private onPause: MediaSessionActionHandler;

  private onStop: MediaSessionActionHandler;

  private onSeekBackward: MediaSessionActionHandler;

  private onSeekForward: MediaSessionActionHandler;

  private onPreviousTrack: MediaSessionActionHandler;

  private onNextTrack: MediaSessionActionHandler;

  private onSeekTo: MediaSessionActionHandler;

  private log: ReturnType<typeof logger>;

  constructor(options: MediaSessionManagerOptions) {
    const {
      onPlay,
      onPause,
      onStop,
      onSeekBackward,
      onSeekForward,
      onPreviousTrack,
      onNextTrack,
      onSeekTo,
    } = options;

    this.log = logger("MediaSessionManager");
    this.onPlay = onPlay;
    this.onPause = onPause;
    this.onStop = onStop;
    this.onSeekBackward = onSeekBackward;
    this.onSeekForward = onSeekForward;
    this.onPreviousTrack = onPreviousTrack;
    this.onNextTrack = onNextTrack;
    this.onSeekTo = onSeekTo;
    this.setup();
  }

  private setup() {
    if ("mediaSession" in navigator) {
      this.log.info("setting up media session action handlers");
      navigator.mediaSession.setActionHandler("play", this.onPlay);
      navigator.mediaSession.setActionHandler("pause", this.onPause);
      navigator.mediaSession.setActionHandler("stop", this.onStop);
      navigator.mediaSession.setActionHandler(
        "seekbackward",
        this.onSeekBackward
      );
      navigator.mediaSession.setActionHandler(
        "seekforward",
        this.onSeekForward
      );
      navigator.mediaSession.setActionHandler(
        "previoustrack",
        this.onPreviousTrack
      );
      navigator.mediaSession.setActionHandler("nexttrack", this.onNextTrack);
      navigator.mediaSession.setActionHandler("seekto", this.onSeekTo);
    }
  }

  setMetadata(metadata: MediaMetadataInit) {
    if ("mediaSession" in navigator) {
      if (
        metadata.title === this.metadata?.title &&
        metadata.artist === this.metadata?.artist &&
        metadata.album === this.metadata?.album
      )
        return;
      this.log.info("setting media session metadata", metadata);
      this.metadata = metadata;
      navigator.mediaSession.metadata = new MediaMetadata(this.metadata);
    }
  }

  destroy() {
    navigator.mediaSession.setActionHandler("play", null);
    navigator.mediaSession.setActionHandler("pause", null);
    navigator.mediaSession.setActionHandler("stop", null);
    navigator.mediaSession.setActionHandler("seekbackward", null);
    navigator.mediaSession.setActionHandler("seekforward", null);
    navigator.mediaSession.setActionHandler("previoustrack", null);
    navigator.mediaSession.setActionHandler("nexttrack", null);
    navigator.mediaSession.setActionHandler("seekto", null);
    this.log.info("media session destroyed");
  }
}

export default MediaSessionManager;
