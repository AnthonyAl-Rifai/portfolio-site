import styled from "@emotion/styled";
import { useRef, useEffect, useState, useCallback } from "react";
import usePixelScaler from "../../hooks/usePixelScaler";
import { PLAYER_EVENTS } from "../../player/types/playerEvents";
import usePlayerEventSubscriber from "../../hooks/usePlayerEventSubscriber";

interface MeterProps {
  level: number;
}

interface MetersContainerProps {
  marginTop?: number;
}

interface PeakerIndicatorProps {
  top?: number;
  left?: number;
  right?: number;
  height?: number;
}

const MetersContainer = styled.div<MetersContainerProps>(
  ({ marginTop = 5 }) => ({
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "center",
    width: "25%",
    marginTop,
  })
);

const MeterContainer = styled.canvas(() => ({
  margin: 0,
}));

const PeakIndicator = styled.span<PeakerIndicatorProps>(
  ({ top = 24, left = 20, right = 20, height = 0.5 }) => ({
    position: "absolute",
    top,
    left,
    right,
    height,
    backgroundColor: "#7B7B7B",
  })
);

const Meter: React.FC<MeterProps> = ({ level = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const totalBars = 14;
  const barWidth = usePixelScaler(4);
  const barHeight = usePixelScaler(9);
  const barSpacing = usePixelScaler(0.5);
  const meterWidth = usePixelScaler(25);
  const meterHeight = usePixelScaler(130);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings

        // Determine how many bars to light up based on the level
        const barsToLight = Math.round(totalBars * level);

        for (let i = 0; i <= totalBars; i++) {
          if (i < barsToLight) {
            ctx.fillStyle = "#F9F9FC"; // Color when the bar is active/on
          } else {
            ctx.fillStyle = "#6F6E6D"; // Color when the bar is inactive/off
          }

          // Draw the bar. The y position is calculated in a way that bars are drawn from bottom to top
          ctx.fillRect(
            (meterWidth - barWidth) / 2,
            canvas.height - i * (barHeight + barSpacing),
            barWidth,
            barHeight
          );
        }
      }
    }
  }, [level, barHeight, barWidth, barSpacing, meterWidth]);

  return (
    <MeterContainer ref={canvasRef} width={meterWidth} height={meterHeight} />
  );
};

const Meters: React.FC = () => {
  const [amplitude, setAmplitude] = useState<[number, number]>([0, 0]);
  const [isDecaying, setIsDecaying] = useState(false);
  const [isRateZero, setIsRateZero] = useState(false);
  const decayInterval = useRef<NodeJS.Timeout | null>(null);

  const metersContainerStyles: MetersContainerProps = {
    marginTop: usePixelScaler(5),
  };

  const peakIndicatorStyles: PeakerIndicatorProps = {
    top: usePixelScaler(34),
    left: usePixelScaler(20),
    right: usePixelScaler(20),
    height: usePixelScaler(0.5),
  };

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
    <MetersContainer {...metersContainerStyles}>
      <Meter level={amplitude[0]} />
      <Meter level={amplitude[1]} />
      <PeakIndicator {...peakIndicatorStyles} />
    </MetersContainer>
  );
};

export default Meters;
