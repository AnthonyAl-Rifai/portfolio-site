import styled from "@emotion/styled";
import React, { useRef, useEffect, useState, useCallback } from "react";
import usePixelScaler from "../../hooks/usePixelScaler";
import { PLAYER_WIDTH } from "../../context/ViewportContext";
import { usePlayer } from "../../context/PlayerContext";
import { PLAYER_EVENTS } from "../../player/types/playerEvents";
import usePlayerEventSubscriber from "../../hooks/usePlayerEventSubscriber";
import { getRotationInSeconds } from "../../player/utils/radians";

const ScrubberCanvas = styled.canvas`
  display: block;
  aspect-ratio: 1 / 1;
  margin: 0;
  touch-action: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* No z-index - let natural document flow handle layering */
`;

const Scrubber: React.FC = () => {
  const player = usePlayer();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [totalRadians, setTotalRadians] = useState(0);
  const [previousRadians, setPreviousRadians] = useState(0);
  const [duration, setDuration] = useState(0);

  const scrubberWidth = usePixelScaler(170); // Reduced from 210 to 150
  const size = usePixelScaler(PLAYER_WIDTH);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Draw the main outer circle outline
        ctx.beginPath();
        ctx.arc(centerX, centerY, scrubberWidth, 0, Math.PI * 2);
        ctx.strokeStyle = "#000000"; // Black outline
        ctx.lineWidth = 1; // 1 pixel width
        ctx.stroke();

        // Draw the inner circle outline
        const smallerCircleRadius = scrubberWidth * 0.25;
        ctx.beginPath();
        ctx.arc(centerX, centerY, smallerCircleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = "#000000"; // Black outline
        ctx.lineWidth = 1; // 1 pixel width
        ctx.stroke();

        // Draw rotation lines
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(totalRadians);

        const gap = scrubberWidth * 0.05;
        const startX1 = Math.cos(0) * (scrubberWidth - gap);
        const startY1 = Math.sin(0) * (scrubberWidth - gap);
        const endX1 = Math.cos(0) * (smallerCircleRadius + gap);
        const endY1 = Math.sin(0) * (smallerCircleRadius + gap);

        const startX2 = Math.cos(Math.PI) * (scrubberWidth - gap);
        const startY2 = Math.sin(Math.PI) * (scrubberWidth - gap);
        const endX2 = Math.cos(Math.PI) * (smallerCircleRadius + gap);
        const endY2 = Math.sin(Math.PI) * (smallerCircleRadius + gap);

        ctx.beginPath();
        ctx.moveTo(startX1, startY1);
        ctx.lineTo(endX1, endY1);
        ctx.strokeStyle = "#000000"; // Black lines
        ctx.lineWidth = 1; // 1 pixel width
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(startX2, startY2);
        ctx.lineTo(endX2, endY2);
        ctx.stroke();

        ctx.restore();
      }
    }
  }, [totalRadians, scrubberWidth]);

  const calculateDistance = (
    rect: DOMRect,
    client: { x: number; y: number }
  ) => {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.sqrt(
      (client.x - centerX) ** 2 + (client.y - centerY) ** 2
    );
    return distance;
  };

  const calculateAngle = (rect: DOMRect, client: { x: number; y: number }) => {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(client.y - centerY, client.x - centerX);
    return angle;
  };

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

      // Handle the transition from π to -π and -π to π
      if (deltaRadians > Math.PI) {
        deltaRadians -= 2 * Math.PI; // Moved counterclockwise across boundary
      } else if (deltaRadians < -Math.PI) {
        deltaRadians += 2 * Math.PI; // Moved clockwise across boundary
      }

      const newTotalRadians = totalRadians + deltaRadians;
      setRotation(newTotalRadians);
      setPreviousRadians(currentRadians);
    },
    [previousRadians, totalRadians, setRotation]
  );

  const onStartScrubbing = useCallback(
    (client: { x: number; y: number }) => {
      if (!hasStarted) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const distance = calculateDistance(rect, client);
      // Check if click is inside the circle
      if (distance <= scrubberWidth + 20) {
        // Adjusted to match new scrubber size
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
      if (!hasStarted) {
        setHasStarted(true);
      }
      const rotation = getRotationInSeconds(position);
      setRotation(rotation);
    },
    [isDragging, setRotation, hasStarted]
  );

  usePlayerEventSubscriber(PLAYER_EVENTS.timeupdate, onTimeupdate);

  const onReady = useCallback(() => {
    setDuration(player.duration);
  }, [player]);

  usePlayerEventSubscriber(PLAYER_EVENTS.ready, onReady);

  const onLoading = useCallback(() => {
    setHasStarted(false);
  }, []);

  usePlayerEventSubscriber(PLAYER_EVENTS.loading, onLoading);

  useEffect(() => {
    if (!isDragging) return;
    player.scrubbing(totalRadians);
  }, [isDragging, totalRadians, player]);

  const handleMouseDown = useCallback(
    (e: HTMLElementEventMap["mousedown"]) => {
      onStartScrubbing({ x: e.clientX, y: e.clientY });
    },
    [onStartScrubbing]
  );

  const handleMouseUp = useCallback(() => {
    onScrubbed();
  }, [onScrubbed]);

  const handleMouseMove = useCallback(
    (e: HTMLElementEventMap["mousemove"]) => {
      onScrubbing({ x: e.clientX, y: e.clientY });
    },
    [onScrubbing]
  );

  const handleTouchStart = useCallback(
    (e: HTMLElementEventMap["touchstart"]) => {
      e.preventDefault();
      const touch = e.touches[0];
      onStartScrubbing({ x: touch.clientX, y: touch.clientY });
    },
    [onStartScrubbing]
  );

  const handleTouchMove = useCallback(
    (e: HTMLElementEventMap["touchmove"]) => {
      e.preventDefault();
      const touch = e.touches[0];
      onScrubbing({ x: touch.clientX, y: touch.clientY });
    },
    [onScrubbing]
  );

  const handleTouchEnd = useCallback(
    (e: HTMLElementEventMap["touchend"]) => {
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
    <ScrubberCanvas ref={canvasRef} width={size} height={size}></ScrubberCanvas>
  );
};

export default Scrubber;
