import { useRef, useEffect, useState, useCallback } from "react";
import { PLAYER_EVENTS } from "../../player/types/playerEvents";
import usePlayerEventSubscriber from "../../hooks/usePlayerEventSubscriber";

interface MeterProps {
  level: number;
}

const Meter: React.FC<MeterProps> = ({ level = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const totalBars = 14;
  const barWidth = 4;
  const barHeight = 9;
  const barSpacing = 0.5;
  const meterWidth = 25;
  const meterHeight = 130;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barsToLight = Math.round(totalBars * level);

        for (let i = 0; i <= totalBars; i++) {
          ctx.fillStyle = i < barsToLight ? "#F9F9FC" : "#6F6E6D";
          ctx.fillRect(
            (meterWidth - barWidth) / 2,
            canvas.height - i * (barHeight + barSpacing),
            barWidth,
            barHeight
          );
        }
      }
    }
  }, [level]);

  return (
    <canvas
      ref={canvasRef}
      width={meterWidth}
      height={meterHeight}
      className="m-0"
    />
  );
};

const Meters: React.FC = () => {
  const [amplitude, setAmplitude] = useState<[number, number]>([0, 0]);
  const [isDecaying, setIsDecaying] = useState(false);
  const [isRateZero, setIsRateZero] = useState(false);
  const decayInterval = useRef<NodeJS.Timeout | null>(null);

  const onVolumeUpdate = useCallback(
    (amplitude: [number, number]) => {
      if (amplitude && !isDecaying && !isRateZero) {
        setAmplitude(amplitude);
      }
    },
    [isDecaying, isRateZero]
  );

  const decayAmplitude = useCallback(() => {
    if (decayInterval.current) clearInterval(decayInterval.current);

    decayInterval.current = setInterval(() => {
      setAmplitude(currentAmplitude => {
        const newAmplitude: [number, number] = [
          Math.max(0, currentAmplitude[0] - 0.1),
          Math.max(0, currentAmplitude[1] - 0.1),
        ];
        if (newAmplitude[0] <= 0 && newAmplitude[1] <= 0) {
          if (decayInterval.current) clearInterval(decayInterval.current);
          setIsDecaying(false);
        }
        return newAmplitude;
      });
    }, 20);
  }, []);

  const onDecay = useCallback(() => {
    setIsDecaying(true);
  }, []);

  const onRateChange = useCallback(
    (rate: number) => {
      if (rate === 0 && !isRateZero) {
        setIsRateZero(true);
        onDecay();
      } else if (rate !== 0 && isRateZero) {
        setIsRateZero(false);
      }
    },
    [isRateZero, onDecay]
  );

  usePlayerEventSubscriber(PLAYER_EVENTS.volumeupdate, onVolumeUpdate);
  usePlayerEventSubscriber(PLAYER_EVENTS.pause, onDecay);
  usePlayerEventSubscriber(PLAYER_EVENTS.stop, onDecay);
  usePlayerEventSubscriber(PLAYER_EVENTS.ended, onDecay);
  usePlayerEventSubscriber(PLAYER_EVENTS.ratechange, onRateChange);

  useEffect(() => {
    if (isDecaying) {
      decayAmplitude();
    }
  }, [isDecaying, decayAmplitude]);

  return (
    <div className="relative flex flex-row items-start justify-center w-1/4 mt-1.5">
      <Meter level={amplitude[0]} />
      <Meter level={amplitude[1]} />
      <span className="absolute top-[2.125rem] left-[1.25rem] right-[1.25rem] h-[0.125rem] bg-[#7B7B7B]" />
    </div>
  );
};

export default Meters;
