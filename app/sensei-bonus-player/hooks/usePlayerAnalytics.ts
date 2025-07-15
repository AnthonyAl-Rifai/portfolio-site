import { useCallback, useEffect, useRef, useState } from "react";
import Player, { PLAYER_EVENTS } from "../player";
import usePlayerEventSubscriber from "./usePlayerEventSubscriber";
import track from "../utils/track";
import { CommonTrackProperties, EventType } from "../types/analytics";
import { usePlayer } from "../context/PlayerContext";
import toFixedNumber from "../utils/toFixedNumber";
import generateUUID from "../utils/generateUUID";

const sessionId = generateUUID();

let firstVisit = true;

export const useTrackPageVisit = () => {
  useEffect(() => {
    if (firstVisit) {
      track(EventType.PageVisitEvent, { session_id: sessionId });
      firstVisit = false;
    }
  }, []);
};

const getCommonTrackProperties = (player: Player): CommonTrackProperties => {
  if (!player.currentTrack) {
    throw new Error(
      "Unable to get common track properties without a currentTrack defined"
    );
  }
  return {
    session_id: sessionId,
    track_id: player.currentTrack.id,
    track_title: player.currentTrack.title,
    track_position: toFixedNumber(player.currentTime, 0),
    track_playback_rate: player.playbackRate,
    is_reversed: player.isReverse,
    is_backgrounded: player.isBackgrounded,
  };
};

const usePlayerAnalytics = () => {
  const player = usePlayer();

  const loadStartTime = useRef(0);
  const lastPlayingTrackTime = useRef<number>(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const onTrackLoading = useCallback(() => {
    setIsPreloaded(false);
    setHasStarted(false);
    loadStartTime.current = Date.now();
  }, []);

  const onTrackLoaded = useCallback((preloaded: boolean) => {
    setIsPreloaded(preloaded);
  }, []);

  const onTrackReady = useCallback(() => {
    if (!player.currentTrack) return;
    const loadTime = Date.now() - loadStartTime.current;
    track(EventType.TrackLoadedEvent, {
      ...getCommonTrackProperties(player),
      load_time: loadTime,
      is_preloaded: isPreloaded,
    });
  }, [player, isPreloaded]);

  const onTrackPlaying = useCallback(() => {
    if (!hasStarted) {
      track(EventType.StartTrackEvent, {
        ...getCommonTrackProperties(player),
        is_preloaded: isPreloaded,
      });
      setHasStarted(true);
    } else {
      track(EventType.PlayingTrackEvent, getCommonTrackProperties(player));
    }
    lastPlayingTrackTime.current = player.currentTime;
  }, [player, isPreloaded, hasStarted]);

  const onTrackTime = useCallback(
    (position: number) => {
      if (position > lastPlayingTrackTime.current + 10) {
        if (!player.isSeeking) {
          track(EventType.PlayingTrackEvent, getCommonTrackProperties(player));
        }
        lastPlayingTrackTime.current = position;
      }
    },
    [player]
  );

  const onTrackPause = useCallback(() => {
    track(EventType.PauseTrackEvent, getCommonTrackProperties(player));
  }, [player]);

  const onTrackStop = useCallback(() => {
    track(EventType.StopTrackEvent, getCommonTrackProperties(player));
  }, [player]);

  const onTrackSeeking = useCallback(
    ({
      rate,
      direction,
    }: {
      rate: number;
      direction: "forward" | "reverse";
    }) => {
      track(EventType.SeekingTrackEvent, {
        ...getCommonTrackProperties(player),
        seek_rate: rate,
        direction,
      });
    },
    [player]
  );

  const onTrackSeeked = useCallback(() => {
    track(EventType.SeekedTrackEvent, getCommonTrackProperties(player));
  }, [player]);

  const onTrackSkipBackward = useCallback(() => {
    track(EventType.SkipBackwardTrackEvent, getCommonTrackProperties(player));
  }, [player]);

  const onTrackSkipForward = useCallback(() => {
    track(EventType.SkipForwardTrackEvent, getCommonTrackProperties(player));
  }, [player]);

  const onTrackScrubbing = useCallback(() => {
    setIsScrubbing(true);
    track(EventType.ScrubbingTrackEvent, getCommonTrackProperties(player));
  }, [player]);

  const onTrackScrubbed = useCallback(() => {
    setIsScrubbing(false);
    track(EventType.ScrubbedTrackEvent, getCommonTrackProperties(player));
  }, [player]);

  const onTrackReversed = useCallback(
    (reversed: boolean) => {
      track(EventType.ReversedTrackEvent, {
        ...getCommonTrackProperties(player),
        is_reversed: reversed,
      });
    },
    [player]
  );

  const onRateChange = useCallback(
    (rate: number) => {
      if (!isScrubbing && !player.isSeeking) {
        track(EventType.RateChangeEvent, {
          ...getCommonTrackProperties(player),
          rate,
        });
      }
    },
    [player, isScrubbing]
  );

  const onVisibilityChange = useCallback(() => {
    track(EventType.VisibilityChangedEvent, getCommonTrackProperties(player));
  }, [player]);

  const onTrackEnded = useCallback(() => {
    track(EventType.FinishTrackEvent, getCommonTrackProperties(player));
  }, [player]);

  const onTrackError = useCallback(
    (message: string) => {
      track(EventType.ErrorEvent, {
        ...getCommonTrackProperties(player),
        message,
      });
    },
    [player]
  );

  usePlayerEventSubscriber(PLAYER_EVENTS.loading, onTrackLoading);
  usePlayerEventSubscriber(PLAYER_EVENTS.loaded, onTrackLoaded);
  usePlayerEventSubscriber(PLAYER_EVENTS.ready, onTrackReady);
  usePlayerEventSubscriber(PLAYER_EVENTS.playing, onTrackPlaying);
  usePlayerEventSubscriber(PLAYER_EVENTS.timeupdate, onTrackTime);
  usePlayerEventSubscriber(PLAYER_EVENTS.pause, onTrackPause);
  usePlayerEventSubscriber(PLAYER_EVENTS.stop, onTrackStop);
  usePlayerEventSubscriber(PLAYER_EVENTS.seeking, onTrackSeeking);
  usePlayerEventSubscriber(PLAYER_EVENTS.seeked, onTrackSeeked);
  usePlayerEventSubscriber(PLAYER_EVENTS.skipForward, onTrackSkipForward);
  usePlayerEventSubscriber(PLAYER_EVENTS.skipBackward, onTrackSkipBackward);
  usePlayerEventSubscriber(PLAYER_EVENTS.scrubbing, onTrackScrubbing);
  usePlayerEventSubscriber(PLAYER_EVENTS.scrubbed, onTrackScrubbed);
  usePlayerEventSubscriber(PLAYER_EVENTS.reversed, onTrackReversed);
  usePlayerEventSubscriber(PLAYER_EVENTS.ratechange, onRateChange);
  usePlayerEventSubscriber(PLAYER_EVENTS.ended, onTrackEnded);
  usePlayerEventSubscriber(PLAYER_EVENTS.error, onTrackError);

  useEffect(() => {
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [onVisibilityChange]);

  useEffect(
    () => () => {
      if (player.currentTime !== player.duration) {
        track(EventType.IncompleteTrackEvent, getCommonTrackProperties(player));
      }
    },
    [player]
  );

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (player.currentTime !== player.duration) {
        track(EventType.IncompleteTrackEvent, getCommonTrackProperties(player));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [player]);
};

export default usePlayerAnalytics;
