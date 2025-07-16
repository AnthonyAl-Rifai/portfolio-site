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

const MinimalAudioPlayer: React.FC = () => {
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
    <>
      <div className="col-start-1 col-end-[-1] row-start-1 flex items-center justify-between border-b px-4 backdrop-blur-md select-none h-[var(--layout-size)]">
        <p className="text-4xl font-bold">Sensei Bonus</p>
        <Display />
      </div>

      <div className="col-span-3 row-start-3">
        <SeekButtons
          onSeekBackward={player.seekBackward}
          onSeekForward={player.seekForward}
          onSkipBackward={player.skipBackward}
          onSkipForward={player.skipForward}
        />
      </div>

      <div className="col-span-3 row-start-4 flex items-center justify-center min-h-[300px]">
        <Scrubber />
      </div>

      <div className="col-start-1 row-start-5">
        <p className="text-sm font-semibold text-[#AFB2AD] bg-[#E76620] rounded-sm px-[0.125rem]">
          M
        </p>
      </div>

      <div
        className="col-start-2 row-start-5 self-center justify-self-center w-9.5 h-9.5 rounded-full"
        style={{
          background: isRevIndicatorActive
            ? "linear-gradient(135deg, rgba(254,9,46,1) 15%, rgba(252,85,67,1) 39%, rgba(253,83,58,1) 65%)"
            : "linear-gradient(132deg, rgba(127,126,127,1) 0%, rgba(151,151,151,1) 61%)",
        }}
      />

      <div className="col-start-3 row-start-5">
        <PitchControlButtons
          onDecrease={!isBlinking ? onDecreaseRate : onIncreaseRate}
          onIncrease={!isBlinking ? onIncreaseRate : onDecreaseRate}
        />
      </div>

      <div className="col-span-3 row-start-6">
        <TransportButtons
          onRecord={onReverse}
          onPlay={onTogglePlay}
          onStop={onStop}
        />
      </div>
    </>
  );
};

export default MinimalAudioPlayer;
