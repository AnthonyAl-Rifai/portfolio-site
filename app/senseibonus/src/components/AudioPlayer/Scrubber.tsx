import styled from "@emotion/styled";
import React, { useRef, useEffect, useState, useCallback } from "react";
import usePixelScaler from "../../hooks/usePixelScaler";
import { PLAYER_WIDTH } from "../../context/ViewportContext";
import { usePlayer } from "../../context/PlayerContext";
import { PLAYER_EVENTS } from "../../player/types/playerEvents";
import { HARDWARE_FONT_STYLE } from "../../configs/constants";
import usePlayerEventSubscriber from "../../hooks/usePlayerEventSubscriber";
import { getRotationInSeconds } from "../../player/utils/radians";

const ScrubberCanvas = styled.canvas(({ width }) => ({
  display: "block",
  aspectRatio: "1 / 1",
  margin: 0,
  marginTop: typeof width === "number" ? width * 0.1 : 45,
  touchAction: "none",
  WebkitUserSelect: "none",
  msUserSelect: "none",
  cursor: "pointer",
  useSelect: "none",
}));

const Scrubber: React.FC = () => {
  const player = usePlayer();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [totalRadians, setTotalRadians] = useState(0);
  const [previousRadians, setPreviousRadians] = useState(0);
  const [duration, setDuration] = useState(0);

  const scrubberWidth = usePixelScaler(210);
  const size = usePixelScaler(PLAYER_WIDTH);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Clear the canvas
        ctx.imageSmoothingEnabled = false;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw bottom shadow first
        const bottomShadowBlur = 0; // Adjust the blur radius as needed
        const bottomShadowOffsetX = 1.5; // Adjust the x-offset as needed
        const bottomShadowOffsetY = 1.5; // Adjust the y-offset as needed
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          centerX + bottomShadowOffsetX,
          centerY + bottomShadowOffsetY,
          scrubberWidth,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "#E9EBE9"; // Adjust shadow color and alpha as needed
        ctx.filter = "blur(" + bottomShadowBlur + "px)";
        ctx.fill();
        ctx.restore();

        // Draw top shadow first
        const topShadowBlur = 0; // Adjust the blur radius as needed
        const topShadowOffsetX = -1; // Adjust the x-offset as needed
        const topShadowOffsetY = -1; // Adjust the y-offset as needed
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          centerX + topShadowOffsetX,
          centerY + topShadowOffsetY,
          scrubberWidth,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "#949695"; // Adjust shadow color and alpha as needed
        ctx.filter = "blur(" + topShadowBlur + "px)";
        ctx.fill();
        ctx.restore();

        // Create linear gradient
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        gradient.addColorStop(0, "rgba(204,204,204,1)");
        gradient.addColorStop(0.34, "rgba(195,195,194,1)");
        gradient.addColorStop(0.7, "rgba(186,186,187,1)");
        gradient.addColorStop(1, "rgba(177,176,176,1)");

        // Draw the circular audio player with gradient fill
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          scrubberWidth,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw the border around the circle
        ctx.strokeStyle = "#525252";
        ctx.lineWidth = 1.2; // Set border thickness if desired
        ctx.stroke();

        ctx.save();

        // Draw inset shadow gradient
        const innerShadowRadius = scrubberWidth * 0.99; // slightly smaller than scrubberWidth
        const outerShadowRadius = scrubberWidth; // same as scrubberWidth

        const shadowGradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        shadowGradient.addColorStop(0, "rgba(231,235,232,1)");
        shadowGradient.addColorStop(0.34, "rgba(231,235,232,0.6)");
        shadowGradient.addColorStop(0.6, "rgba(231,235,232,0)");
        shadowGradient.addColorStop(1, "rgba(231,235,232,0)");

        // Draw the outer circle with the gradient
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerShadowRadius, 0, Math.PI * 2);
        ctx.fillStyle = shadowGradient;
        ctx.fill();
        ctx.restore();

        // Save the state before clipping
        ctx.save();

        // Clip the inner circle area
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerShadowRadius, 0, Math.PI * 2);
        ctx.closePath();

        // Change the global composite operation to 'destination-out'
        // This will cut out the inner circle from the outer circle gradient
        ctx.globalCompositeOperation = "destination-out";
        ctx.fill(); // This fill will remove the inner part, making it transparent

        // Restore the state to draw normally again
        ctx.restore();

        // Now, if you want to draw something else inside the inner circle, do it here
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerShadowRadius, 0, Math.PI * 2);
        // Use whatever fill style you want for the inner circle
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw the center smaller circle
        const gap = scrubberWidth * 0.05;
        const smallerCircleRadius = scrubberWidth * 0.25; // Adjust this value as needed for the desired scrubberWidth

        const innerCircleGradient = ctx.createLinearGradient(
          centerX - smallerCircleRadius,
          centerY - smallerCircleRadius,
          centerX + smallerCircleRadius,
          centerY + smallerCircleRadius
        );
        innerCircleGradient.addColorStop(0, "#D4D5D4");
        innerCircleGradient.addColorStop(0.12, "#DDDCDC");
        innerCircleGradient.addColorStop(0.25, "#CACACA");
        innerCircleGradient.addColorStop(0.33, "#C4C4C5");
        innerCircleGradient.addColorStop(0.38, "#828283");
        innerCircleGradient.addColorStop(0.8, "#6A6B6B");
        innerCircleGradient.addColorStop(1, "#929292");

        ctx.beginPath();
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          smallerCircleRadius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = innerCircleGradient; // Adjust this value to change the fill color of the smaller circle
        ctx.fill();

        // Draw the border around the circle
        ctx.strokeStyle = "#525252";
        ctx.lineWidth = 0.5; // Set border thickness if desired
        ctx.stroke();

        // Save the current canvas state
        ctx.save();

        // Translate to the center of the canvas
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Rotate the canvas by the `rotation` angle
        ctx.rotate(totalRadians);

        // Save canvas state before rotating the text
        ctx.save();

        // Translate to the starting position of the text
        ctx.translate(0, -scrubberWidth / 2 - 10); // Adjust the y-position as needed

        // Rotate text by 90 degrees less than the current rotation angle to make it perpendicular to the lines
        ctx.rotate(-Math.PI / 2);

        // Draw the rotating text
        ctx.font = HARDWARE_FONT_STYLE;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#696969";
        ctx.fillText("3 OO M", 0, 0);

        // Restore the canvas state after drawing the rotated text
        ctx.restore();

        ctx.save();

        // Translate to the starting position of the second text
        ctx.translate(0, scrubberWidth / 2 + 10);

        // Rotate text by 90 degrees to make it perpendicular to the lines
        ctx.rotate(-Math.PI / 2);

        // Draw the rotating text
        ctx.font = HARDWARE_FONT_STYLE;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#696969";
        ctx.fillText("44 / 16", 0, 0);

        // Restore the canvas state after drawing the rotated text
        ctx.restore();

        // Now, draw the three small rotating dots
        const innerCircleRadius = smallerCircleRadius * 0.85;
        const dotDistanceFromCenter = innerCircleRadius * 0.7;
        const dotRadius = 2.9;
        const angles = [0, (4 / 6) * Math.PI, (8 / 6) * Math.PI];

        angles.forEach(angle => {
          const dotX = dotDistanceFromCenter * Math.cos(angle);
          const dotY = dotDistanceFromCenter * Math.sin(angle);
          const dotGradient = ctx.createLinearGradient(
            dotX - dotRadius,
            dotY - dotRadius,
            dotX + dotRadius,
            dotY + dotRadius
          );
          dotGradient.addColorStop(0, "#474746");
          dotGradient.addColorStop(0.6, "#B8B9B9");
          dotGradient.addColorStop(0.8, "#DBDADB");
          ctx.beginPath();
          ctx.arc(dotX, dotY, dotRadius, 0, 2 * Math.PI, false);
          ctx.fillStyle = dotGradient;
          ctx.fill();
        });

        // Restore the canvas state
        ctx.restore();

        // Draw rotation lines
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        const startX1 = Math.cos(totalRadians) * (scrubberWidth - gap);
        const startY1 = Math.sin(totalRadians) * (scrubberWidth - gap);
        const endX1 = Math.cos(totalRadians) * (smallerCircleRadius + gap);
        const endY1 = Math.sin(totalRadians) * (smallerCircleRadius + gap);

        const startX2 =
          Math.cos(totalRadians + Math.PI) * (scrubberWidth - gap);
        const startY2 =
          Math.sin(totalRadians + Math.PI) * (scrubberWidth - gap);
        const endX2 =
          Math.cos(totalRadians + Math.PI) * (smallerCircleRadius + gap);
        const endY2 =
          Math.sin(totalRadians + Math.PI) * (smallerCircleRadius + gap);

        ctx.beginPath();
        ctx.moveTo(startX1, startY1);
        ctx.lineTo(endX1, endY1);
        ctx.lineWidth = 0.5; // Set line stroke width
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
