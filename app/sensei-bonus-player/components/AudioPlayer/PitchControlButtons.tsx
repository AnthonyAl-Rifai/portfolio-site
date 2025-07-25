"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface PitchControlButtonsProps {
  onIncrease?: VoidFunction;
  onDecrease?: VoidFunction;
}

interface PitchControlButtonProps {
  children: string;
  onClick?: VoidFunction;
  textSize?: string;
  offsetTop?: string;
  offsetLeft?: string;
  marginLeft?: string;
  marginRight?: string;
}

const PitchControlButton: React.FC<PitchControlButtonProps> = ({
  children,
  onClick,
  textSize = "text-4xl",
  offsetTop = "",
  offsetLeft = "",
  marginLeft = "",
  marginRight = "",
}) => {
  const [isHeldDown, setIsHeldDown] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHolding = useCallback(() => {
    if (!intervalRef.current && onClick) {
      intervalRef.current = setInterval(() => {
        onClick();
      }, 100);
    }
  }, [onClick]);

  const stopHolding = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isHeldDown) {
      startHolding();
    } else {
      stopHolding();
    }
    return stopHolding;
  }, [isHeldDown, startHolding, stopHolding]);

  const handleMouseDown = () => setIsHeldDown(true);
  const handleMouseUp = () => setIsHeldDown(false);
  const handleTouchStart = () => setIsHeldDown(true);
  const handleTouchEnd = () => setIsHeldDown(false);

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-10 h-10 rounded-full border flex items-center justify-center transform rotate-45 cursor-pointer ${offsetTop} ${offsetLeft} ${marginLeft} ${marginRight}`}
    >
      <span className={`transform ${textSize}`}>{children}</span>
    </button>
  );
};

const PitchControlButtons: React.FC<PitchControlButtonsProps> = ({
  onDecrease,
  onIncrease,
}) => {
  return (
    <div className="rotate-[-45deg] flex items-center justify-center rounded-full">
      <PitchControlButton
        onClick={onDecrease}
        textSize="text-3xl"
        offsetTop="-top-2"
        offsetLeft="left-2"
        marginRight="mr-2"
      >
        -
      </PitchControlButton>
      <PitchControlButton
        onClick={onIncrease}
        textSize="text-3xl"
        offsetTop="-top-2"
        offsetLeft="left-2"
        marginLeft="ml-2"
      >
        +
      </PitchControlButton>
    </div>
  );
};

export default PitchControlButtons;
