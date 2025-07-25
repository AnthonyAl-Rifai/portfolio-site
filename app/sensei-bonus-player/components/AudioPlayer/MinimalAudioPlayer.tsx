import Scrubber from "./Scrubber";
import Display from "./Display";
import TransportButtons from "./TransportButtons";
import PitchControlButtons from "./PitchControlButtons";
import SeekButtons from "./SeekButtons";
import { usePlayer } from "../../context/PlayerContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { PLAYER_EVENTS } from "../../player/types/playerEvents";
import { PlayerState } from "../../player/types/playerStates";
import OnePunchEraser from "../../configs/one-punch-eraser.json";
import usePlayerEventSubscriber from "../../hooks/usePlayerEventSubscriber";
// import MenuIconA from "../../../icons/MenuIconA";
// import MenuIconAUpsideDown from "../../../icons/MenuIconAUpsideDown";
import { motion } from "motion/react";

interface MinimalAudioPlayerProps {
  onClose?: () => void;
  showCloseAnimation?: boolean;
}

const MinimalAudioPlayer: React.FC<MinimalAudioPlayerProps> = (
  {
    // onClose,
    // showCloseAnimation = false,
  }
) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isRevIndicatorActive, setIsRevIndicatorActive] = useState(false);
  const reverseIndicatorTimeoutRef = useRef<ReturnType<
    typeof setInterval
  > | null>(null);
  const player = usePlayer();

  useEffect(() => {
    player.load(OnePunchEraser.album);
  }, [player]);

  const onReverse = useCallback(() => player.reverse(), [player]);

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

  const onStop = useCallback(() => player.pause(), [player]);

  usePlayerEventSubscriber(PLAYER_EVENTS.reversed, (reversed: boolean) => {
    if (isScrubbing) return;
    setIsBlinking(reversed);
    if (!reversed) setIsRevIndicatorActive(false);
  });

  usePlayerEventSubscriber(PLAYER_EVENTS.ended, () => setIsBlinking(false));
  usePlayerEventSubscriber(PLAYER_EVENTS.scrubbing, () => setIsScrubbing(true));
  usePlayerEventSubscriber(PLAYER_EVENTS.scrubbed, () => setIsScrubbing(false));

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

  const onDecreaseRate = useCallback(() => player.decreaseRate(), [player]);
  const onIncreaseRate = useCallback(() => player.increaseRate(), [player]);

  return (
    <div className="flex flex-col h-auto max-w-[429px] border m-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 backdrop-blur-md select-none relative">
        <p className="text-4xl font-bold">SB-1</p>
        <Display />
        {/* <div className="flex items-center gap-4"> */}
        {/* {onClose && (
            <button
              onClick={onClose}
              className="flex items-center justify-center w-[var(--layout-size)] h-[var(--layout-size)] border-l"
              aria-label="Close modal"
            >
              <div className="flex flex-col items-center gap-1">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: showCloseAnimation ? 180 : 0,
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                  }}
                >
                  <MenuIconA size={20} color="#000" />
                </motion.div>
                <motion.div
                  className="-mt-1"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: showCloseAnimation ? -180 : 0,
                    y: [0, 2, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                  }}
                >
                  <MenuIconAUpsideDown size={20} color="#000" />
                </motion.div>
              </div>
            </button>
          )} */}
        {/* </div> */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            delay: 0.5,
          }}
          className="bg-black origin-left"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 1,
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8">
        {/* Seek Buttons */}

        <SeekButtons
          onSeekBackward={player.seekBackward}
          onSeekForward={player.seekForward}
          onSkipBackward={player.skipBackward}
          onSkipForward={player.skipForward}
        />

        {/* Scrubber */}
        <div className=" flex items-center justify-center min-h-[300px] relative">
          <Scrubber />
          {/* Controls Row */}

          <div
            className="absolute w-9.5 h-9.5 rounded-full left-4 bottom-2"
            style={{
              background: isRevIndicatorActive
                ? "linear-gradient(135deg, rgba(254,9,46,1) 15%, rgba(252,85,67,1) 39%, rgba(253,83,58,1) 65%)"
                : "linear-gradient(132deg, rgba(127,126,127,1) 0%, rgba(151,151,151,1) 61%)",
            }}
          />
          <div className="absolute right-2 bottom-2">
            <PitchControlButtons
              onDecrease={!isBlinking ? onDecreaseRate : onIncreaseRate}
              onIncrease={!isBlinking ? onIncreaseRate : onDecreaseRate}
            />
          </div>
        </div>

        {/* Transport Buttons */}
        <div className="flex justify-center">
          <TransportButtons
            onRecord={onReverse}
            onPlay={onTogglePlay}
            onStop={onStop}
          />
        </div>
      </div>
    </div>
  );
};

export default MinimalAudioPlayer;
