import styled from "@emotion/styled";

import Scrubber from "./Scrubber";
import Display from "./Display";
import { PLAYER_WIDTH, PLAYER_HEIGHT } from "../../context/ViewportContext";
import usePixelScaler from "../../hooks/usePixelScaler";
import TransportButtons from "./TransportButtons";
import PitchControlButtons from "./PitchControlButtons";
import SeekButtons from "./SeekButtons";
import { usePlayer } from "../../context/PlayerContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { PLAYER_EVENTS } from "../../player/types/playerEvents";
import { PlayerState } from "../../player/types/playerStates";
import OnePunchEraser from "../../configs/one-punch-eraser.json";
import usePlayerEventSubscriber from "../../hooks/usePlayerEventSubscriber";
import usePlayerAnalytics from "../../hooks/usePlayerAnalytics";

interface AudioPlayerContainerProps {
  borderRadius?: number;
  maxWidth?: number;
}

const AudioPlayerContainer = styled.div<AudioPlayerContainerProps>(
  ({ borderRadius = 20, maxWidth = PLAYER_WIDTH }) => ({
    position: "relative",
    maxWidth,
    aspectRatio: `${PLAYER_WIDTH} / ${PLAYER_HEIGHT}`,
    backgroundColor: "#D2D3D2",
    background:
      "linear-gradient(132deg, rgba(219,218,219,1) 0%, rgba(190,190,190,1) 47%, rgba(170,170,171,1) 81%, rgba(158,159,159,1) 100%)",
    borderRadius,
    WebkitUserSelect: "none",
    msUserSelect: "none",
    useSelect: "none",
    // border: "1px solid black",
    // boxShadow: '18px 26px 23px -5px rgba(0,0,0,0.1), inset 2px 2px 0px 0px #EDECEC,inset -2px -2px 0px 0px #666767;',
  })
);

interface LogoTextProps {
  fontSize?: number;
  outerSpacing?: number;
}

const LogoText = styled.p<LogoTextProps>(
  ({ fontSize = 26, outerSpacing = 25 }) => ({
    fontFamily: "UniversTE20-Thin",
    fontSize,
    fontWeight: 600,
    letterSpacing: 1.4,
    color: "#646866",
    position: "absolute",
    left: outerSpacing,
    top: outerSpacing,
    margin: 0,
  })
);

interface RecordIndicatorProps {
  size?: number;
  bottom?: number;
  left?: number;
  active?: boolean;
}

const RecordIndicator = styled.div<RecordIndicatorProps>(
  ({ size = 38, bottom = 185, left = 38, active = false }) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: active ? "rgb(253,83,58)" : "#929292",
    background: active
      ? "linear-gradient(135deg, rgba(254,9,46,1) 15%, rgba(252,85,67,1) 39%, rgba(253,83,58,1) 65%)"
      : "linear-gradient(132deg, rgba(127,126,127,1) 0%, rgba(151,151,151,1) 61%)",
    position: "absolute",
    bottom,
    left,
  })
);

interface PinHoleProps {
  size?: number;
  filled?: boolean;
  left?: number;
  top?: number;
}

const PinHole = styled.span<PinHoleProps>(
  ({ size = 5, filled = false, left = 155, top = 42 }) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: filled ? "#929292" : "#040909",
    left,
    top,
    position: "absolute",
    boxShadow: "inset 0px -0.8px 0.5px -0.5px #E3E4E4",
  })
);

interface MemoIconProps {
  fontSize?: number;
  top?: number;
  right?: number;
  padding?: number;
}

const MemoIcon = styled.p<MemoIconProps>(
  ({ fontSize = 14, top = 100, right = 5, padding = 2 }) => ({
    position: "absolute",
    fontSize,
    top,
    right,
    color: "#AFB2AD",
    backgroundColor: "#E76620",
    paddingLeft: padding,
    paddingRight: padding,
    borderRadius: 2,
    fontWeight: 600,
  })
);

const AudioPlayer: React.FC = () => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isRevIndicatorActive, setIsRevIndicatorActive] =
    useState<boolean>(false);
  const reverseIndicatorTimeoutRef = useRef<ReturnType<
    typeof setInterval
  > | null>(null);
  const audioPlayerContainerStyles: AudioPlayerContainerProps = {
    borderRadius: usePixelScaler(20),
    maxWidth: usePixelScaler(PLAYER_WIDTH),
  };

  const logoTextStyles: LogoTextProps = {
    fontSize: usePixelScaler(28),
    outerSpacing: usePixelScaler(28),
  };

  const recordIndicatorStyles = {
    size: usePixelScaler(38),
    bottom: usePixelScaler(185),
    left: usePixelScaler(38),
  };

  const leftPinHoleStyles = {
    size: usePixelScaler(5),
    left: usePixelScaler(155),
    top: usePixelScaler(42),
  };

  const rightPinHoleStyles = {
    filled: true,
    size: usePixelScaler(5),
    left: usePixelScaler(225),
    top: usePixelScaler(42),
  };

  const memoIconStyles = {
    fontSize: usePixelScaler(14),
    top: usePixelScaler(100),
    right: usePixelScaler(5),
    padding: usePixelScaler(2),
  };

  const player = usePlayer();

  useEffect(() => {
    player.load(OnePunchEraser.album);
  }, [player]);

  const onReverse = useCallback(() => {
    player.reverse();
  }, [player]);

  const onTogglePlay = useCallback(() => {
    if (
      !player.isPlaying ||
      [PlayerState.SPINNING_DOWN, PlayerState.SEEKING].includes(
        player.playerState
      )
    ) {
      player.play();
    } else {
      player.pause();
    }
  }, [player]);

  const onStop = useCallback(() => {
    player.pause();
  }, [player]);

  const onReversed = useCallback(
    (reversed: boolean) => {
      if (isScrubbing) return;
      setIsBlinking(reversed);
      if (!reversed) {
        setIsRevIndicatorActive(false);
      }
    },
    [isScrubbing]
  );

  const onEnded = useCallback(() => {
    setIsBlinking(false);
  }, []);

  const onScrubbing = useCallback(() => {
    setIsScrubbing(true);
  }, []);

  const onScrubbed = useCallback(() => {
    setIsScrubbing(false);
  }, []);

  usePlayerEventSubscriber(PLAYER_EVENTS.reversed, onReversed);
  usePlayerEventSubscriber(PLAYER_EVENTS.ended, onEnded);
  usePlayerEventSubscriber(PLAYER_EVENTS.scrubbing, onScrubbing);
  usePlayerEventSubscriber(PLAYER_EVENTS.scrubbed, onScrubbed);
  usePlayerAnalytics();

  useEffect(() => {
    if (isBlinking) {
      setIsRevIndicatorActive(true);
      reverseIndicatorTimeoutRef.current = setInterval(() => {
        setIsRevIndicatorActive(prev => !prev);
      }, 400);
    } else {
      setIsRevIndicatorActive(false);
    }

    return () => {
      if (reverseIndicatorTimeoutRef.current)
        clearInterval(reverseIndicatorTimeoutRef.current);
    };
  }, [isBlinking]);

  const onDecreaseRate = useCallback(() => {
    player.decreaseRate();
  }, [player]);

  const onIncreaseRate = useCallback(() => {
    player.increaseRate();
  }, [player]);

  return (
    <AudioPlayerContainer {...audioPlayerContainerStyles}>
      <LogoText {...logoTextStyles}>SB-1</LogoText>
      <PinHole {...leftPinHoleStyles} />
      <PinHole {...rightPinHoleStyles} />
      <Display />
      <SeekButtons
        onSeekBackward={player.seekBackward}
        onSeekForward={player.seekForward}
        onSkipBackward={player.skipBackward}
        onSkipForward={player.skipForward}
      />
      <Scrubber />
      <MemoIcon {...memoIconStyles}>M</MemoIcon>
      <RecordIndicator
        {...recordIndicatorStyles}
        active={isRevIndicatorActive}
      />
      <PitchControlButtons
        onDecrease={!isBlinking ? onDecreaseRate : onIncreaseRate}
        onIncrease={!isBlinking ? onIncreaseRate : onDecreaseRate}
      />
      <TransportButtons
        onRecord={onReverse}
        onPlay={onTogglePlay}
        onStop={onStop}
      />
    </AudioPlayerContainer>
  );
};

export default AudioPlayer;
