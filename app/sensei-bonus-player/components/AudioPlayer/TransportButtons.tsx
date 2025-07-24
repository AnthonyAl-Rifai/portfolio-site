"use client";

import { useState } from "react";
import { isMobile } from "../../player/utils/ua";
import Meters from "./Meters";

interface TransportButtonsProps {
  onPlay?: VoidFunction;
  onStop?: VoidFunction;
  onRecord?: VoidFunction;
}

const TransportButton = ({
  children,
  onClick,
}: {
  children: string;
  onClick?: VoidFunction;
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => setIsPressed(true);
  const handleRelease = () => {
    setIsPressed(false);
    onClick?.();
  };

  const handlers: React.ButtonHTMLAttributes<HTMLButtonElement> = isMobile()
    ? {
        onTouchStart: handlePress,
        onTouchEnd: handleRelease,
      }
    : {
        onMouseDown: handlePress,
        onMouseUp: handleRelease,
      };

  return (
    <button
      {...handlers}
      className={`flex-1 h-full flex items-center justify-center border-t border-r transition-opacity duration-100 ${
        isPressed ? "opacity-50" : "opacity-100"
      }`}
    >
      <span className="text-white text-2xl">{children}</span>
    </button>
  );
};

const TransportButtons: React.FC<TransportButtonsProps> = ({
  onPlay,
  onStop,
  onRecord,
}) => {
  return (
    <div className="flex h-30 w-full">
      <div className="flex flex-row h-full w-3/4 border-r border-white">
        <TransportButton onClick={onRecord}>●</TransportButton>
        <TransportButton onClick={onPlay}>▶</TransportButton>
        <TransportButton onClick={onStop}>■</TransportButton>
      </div>
      <Meters />
    </div>
  );
};

export default TransportButtons;
