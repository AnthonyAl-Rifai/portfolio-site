import { useCallback, useEffect, useRef, useState } from "react";
import { AudioTrack } from "../player";
import { usePlayer } from "../context/PlayerContext";
import { PLAYER_EVENTS } from "../player/types/playerEvents";
import convertPitch from "../utils/convertPitch";
import formatTime from "../utils/formatTime";
import usePlayerEventSubscriber from "./usePlayerEventSubscriber";

const LOADING_TEXT = "LOADING...";

const useDisplayManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [seekRate, setSeekRate] = useState(2);
  const [mainText, setMainText] = useState<string | undefined>();
  const [subText, setSubText] = useState<string | undefined>();
  const [highlightText, setHighlightText] = useState<string | undefined>();
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | undefined>();
  const [trackIndex, setCurrentTrackIndex] = useState<number>(1);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [rate, setRate] = useState<number>(1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const player = usePlayer();

  const onTrackReady = useCallback(() => {
    setCurrentTrack(player.currentTrack);
    setCurrentTrackIndex(player.trackIndex);
    setIsLoading(false);
  }, [player]);

  const onLoading = useCallback(() => {
    setIsLoading(true);
    setCurrentTrackIndex(player.trackIndex);
    setCurrentTrack(undefined);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [player]);

  const onTimeupdate = useCallback(
    (position: number) => {
      const newTime = formatTime(position);
      if (newTime !== time) {
        setTime(newTime);
      }
    },
    [time]
  );

  const onPlaying = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const onPause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const onSeeking = useCallback(({ rate }: { rate: number }) => {
    setIsSeeking(true);
    setSeekRate(rate);
  }, []);

  const onSeeked = useCallback(() => {
    setIsSeeking(false);
  }, []);

  const onScrubbing = useCallback(() => {
    setIsScrubbing(true);
  }, []);

  const onScrubbed = useCallback(() => {
    setIsScrubbing(false);
  }, []);

  const onRateChange = useCallback((rate: number) => {
    setRate(rate);
  }, []);

  usePlayerEventSubscriber(PLAYER_EVENTS.ready, onTrackReady);
  usePlayerEventSubscriber(PLAYER_EVENTS.loading, onLoading);
  usePlayerEventSubscriber(PLAYER_EVENTS.timeupdate, onTimeupdate);
  usePlayerEventSubscriber(PLAYER_EVENTS.playing, onPlaying);
  usePlayerEventSubscriber(PLAYER_EVENTS.seeking, onSeeking);
  usePlayerEventSubscriber(PLAYER_EVENTS.seeked, onSeeked);
  usePlayerEventSubscriber(PLAYER_EVENTS.scrubbing, onScrubbing);
  usePlayerEventSubscriber(PLAYER_EVENTS.scrubbed, onScrubbed);
  usePlayerEventSubscriber(PLAYER_EVENTS.ratechange, onRateChange);
  usePlayerEventSubscriber(PLAYER_EVENTS.pause, onPause);

  // Update display momentarily
  const flashDisplay = useCallback(
    ({
      main,
      sub,
      highlight,
      delay = 1800,
    }: {
      main?: string;
      sub?: string;
      highlight?: string;
      delay?: number;
    }) => {
      if (main) setMainText(main);
      if (sub) setSubText(sub);
      if (highlight) setHighlightText(highlight);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (currentTrack) {
          if (!player.isPlaying) {
            setMainText(currentTrack?.title);
            setSubText(currentTrack?.album);
          }
          if (trackIndex) setHighlightText(trackIndex.toString());
        }
        timeoutRef.current = null;
      }, delay);
    },
    [currentTrack, trackIndex, player]
  );

  // Update rate
  useEffect(() => {
    if (isSeeking || isScrubbing || isLoading) return;
    flashDisplay({
      sub: `${convertPitch(rate)}`,
      highlight: "PITCH",
    });
  }, [rate, isSeeking, isScrubbing, isLoading, flashDisplay, player]);

  // Update track index
  useEffect(() => {
    setHighlightText(trackIndex.toString());
  }, [trackIndex]);

  // Show loading state
  useEffect(() => {
    if (isLoading) {
      setMainText(LOADING_TEXT);
      setSubText(undefined);
      setHighlightText(trackIndex.toString());
    } else if (currentTrack) {
      setMainText(currentTrack.title);
      setSubText(currentTrack.album);
    }
  }, [isLoading, trackIndex, currentTrack]);

  // Update reverse status
  const onReversed = useCallback(
    (reversed: boolean) => {
      if (isSeeking || isLoading) return;
      flashDisplay({
        sub: reversed ? "REVERSE" : "FORWARD",
        highlight: reversed ? "<<" : ">>",
      });
    },
    [flashDisplay, isSeeking, isLoading]
  );

  usePlayerEventSubscriber(PLAYER_EVENTS.reversed, onReversed);

  // Update seek rate
  useEffect(() => {
    if (!isSeeking || isLoading) return;
    setMainText(time);
    setSubText("SEEKING");
    setHighlightText(`x${seekRate}`);
  }, [isSeeking, seekRate, time, isLoading]);

  // Handle playing/pause states and time
  useEffect(() => {
    if (isSeeking || isLoading) return;
    if (timeoutRef.current && (isPlaying || isScrubbing) && time) {
      setMainText(time);
    } else if (!timeoutRef.current && (isPlaying || isScrubbing) && time) {
      setMainText(time);
      setSubText(currentTrack?.title);
      if (trackIndex) setHighlightText(trackIndex.toString());
    } else if (!isPlaying && currentTrack) {
      setMainText(currentTrack?.title);
      setSubText(currentTrack?.album);
      if (trackIndex) setHighlightText(trackIndex.toString());
    }
  }, [
    isPlaying,
    isScrubbing,
    time,
    currentTrack,
    trackIndex,
    isSeeking,
    isLoading,
  ]);

  // Update current track
  useEffect(() => {
    if (!currentTrack) return;
    setMainText(currentTrack?.title);
    setSubText(currentTrack?.album);
    setHighlightText(trackIndex.toString());
  }, [currentTrack, trackIndex]);

  return { mainText, subText, highlightText };
};

export default useDisplayManager;
