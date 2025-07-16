import React, { useRef, useEffect, useState, useCallback } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { PLAYER_EVENTS } from "../../player/types/playerEvents";
import usePlayerEventSubscriber from "../../hooks/usePlayerEventSubscriber";
import { getRotationInSeconds } from "../../player/utils/radians";

const Scrubber: React.FC = () => {
  const player = usePlayer();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [totalRadians, setTotalRadians] = useState(0);
  const [previousRadians, setPreviousRadians] = useState(0);
  const [duration, setDuration] = useState(0);

  const setRotation = useCallback(
    (radians: number) => {
      const maxRadians = getRotationInSeconds(duration);
      const rotation = Math.max(0, Math.min(maxRadians, radians));
      setTotalRadians(rotation);
    },
    [duration]
  );

  const normalizeRadians = useCallback(
    (currentRadians: number) => {
      let deltaRadians = currentRadians - previousRadians;
      if (deltaRadians > Math.PI) deltaRadians -= 2 * Math.PI;
      else if (deltaRadians < -Math.PI) deltaRadians += 2 * Math.PI;

      const newTotalRadians = totalRadians + deltaRadians;
      setRotation(newTotalRadians);
      setPreviousRadians(currentRadians);
    },
    [previousRadians, totalRadians, setRotation]
  );

  const calculateDistance = (
    rect: DOMRect,
    client: { x: number; y: number }
  ) => {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.sqrt((client.x - centerX) ** 2 + (client.y - centerY) ** 2);
  };

  const calculateAngle = (rect: DOMRect, client: { x: number; y: number }) => {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(client.y - centerY, client.x - centerX);
  };

  const onStartScrubbing = useCallback(
    (client: { x: number; y: number }) => {
      if (!hasStarted) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const distance = calculateDistance(rect, client);
      if (distance <= 150) {
        const angle = calculateAngle(rect, client);
        setPreviousRadians(angle);
        setRotation(totalRadians);
        setIsDragging(true);
        player.startScrubbing(totalRadians);
      }
    },
    [totalRadians, player, setRotation, hasStarted]
  );

  const onScrubbing = useCallback(
    (client: { x: number; y: number }) => {
      if (!hasStarted) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect || !isDragging) return;
      const angle = calculateAngle(rect, client);
      normalizeRadians(angle);
    },
    [isDragging, normalizeRadians, hasStarted]
  );

  const onScrubbed = useCallback(() => {
    if (!hasStarted) return;
    setIsDragging(false);
    player.endScrubbing(totalRadians);
  }, [player, totalRadians, hasStarted]);

  const onTimeupdate = useCallback(
    (position: number) => {
      if (isDragging) return;
      if (!hasStarted) setHasStarted(true);
      const rotation = getRotationInSeconds(position);
      setRotation(rotation);
    },
    [isDragging, setRotation, hasStarted]
  );

  usePlayerEventSubscriber(PLAYER_EVENTS.timeupdate, onTimeupdate);
  usePlayerEventSubscriber(PLAYER_EVENTS.ready, () =>
    setDuration(player.duration)
  );
  usePlayerEventSubscriber(PLAYER_EVENTS.loading, () => setHasStarted(false));

  useEffect(() => {
    if (!isDragging) return;
    player.scrubbing(totalRadians);
  }, [isDragging, totalRadians, player]);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      onStartScrubbing({ x: e.clientX, y: e.clientY });
    },
    [onStartScrubbing]
  );

  const handleMouseUp = useCallback(() => {
    onScrubbed();
  }, [onScrubbed]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      onScrubbing({ x: e.clientX, y: e.clientY });
    },
    [onScrubbing]
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      onStartScrubbing({ x: touch.clientX, y: touch.clientY });
    },
    [onStartScrubbing]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      onScrubbing({ x: touch.clientX, y: touch.clientY });
    },
    [onScrubbing]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      onScrubbed();
    },
    [onScrubbed]
  );

  useEffect(() => {
    if (!isDragging) return;
    const canvasEl = canvasRef.current;
    canvasEl?.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseup", handleMouseUp);
    canvasEl?.addEventListener("touchmove", handleTouchMove);
    document.body.addEventListener("touchend", handleTouchEnd);
    canvasEl?.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      canvasEl?.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseup", handleMouseUp);
      canvasEl?.removeEventListener("touchmove", handleTouchMove);
      document.body.removeEventListener("touchend", handleTouchEnd);
      canvasEl?.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    canvasEl?.addEventListener("mousedown", handleMouseDown);
    canvasEl?.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    return () => {
      canvasEl?.removeEventListener("mousedown", handleMouseDown);
      canvasEl?.removeEventListener("touchstart", handleTouchStart);
    };
  }, [handleMouseDown, handleTouchStart]);

  return (
    <canvas
      ref={canvasRef}
      className="block aspect-square m-0 touch-none select-none w-full h-full max-w-[400px] max-h-[400px]"
    />
  );
};

export default Scrubber;
