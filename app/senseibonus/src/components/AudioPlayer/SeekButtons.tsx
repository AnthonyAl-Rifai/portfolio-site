import styled from "@emotion/styled";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import usePixelScaler from "../../hooks/usePixelScaler";
import usePlayerEventSubscriber from "../../hooks/usePlayerEventSubscriber";
import { PLAYER_EVENTS } from "../../player";

interface SeekButtonsContainerProps {
  left?: number;
  top?: number;
  width?: number;
}

const SeekButtonsContainer = styled.div<SeekButtonsContainerProps>(
  ({ left = -134, top = 260, width = 300 }) => ({
    position: "absolute",
    left,
    top,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width,
    transform: "rotate(270deg)",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    useSelect: "none",
  })
);

interface SeekButtonContainerProps {
  fontSize?: number;
  letterSpacing?: number;
  active?: boolean;
}

const SeekButtonContainer = styled.button<SeekButtonContainerProps>(
  ({ fontSize = 18, letterSpacing = -2.5, active = false }) => ({
    color: active ? "rgba(253,83,58,1)" : "#F3F3F2",
    fontSize,
    letterSpacing,
  })
);

interface SeekButtonProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
}

const SeekButton: React.FC<SeekButtonProps> = ({
  children,
  onClick,
  active,
}) => {
  const seekButtonContainerStyles = {
    fontSize: usePixelScaler(18),
    letterSpacing: usePixelScaler(-2.5),
    active,
  };

  return (
    <SeekButtonContainer onClick={onClick} {...seekButtonContainerStyles}>
      {children}
    </SeekButtonContainer>
  );
};

interface SeekButtonsProps {
  onSeekBackward?: VoidFunction;
  onSeekForward?: VoidFunction;
  onSkipBackward?: VoidFunction;
  onSkipForward?: VoidFunction;
}

const SeekButtons: React.FC<SeekButtonsProps> = ({
  onSeekBackward,
  onSeekForward,
  onSkipBackward,
  onSkipForward,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [seekDirection, setSeekDirection] = useState<"forward" | "reverse">(
    "forward"
  );
  const [isIndicatorActive, setIsIndicatorActive] = useState<boolean>(false);
  const blinkingTimeoutRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const seekButtonsContainerStyles = {
    left: usePixelScaler(-134),
    top: usePixelScaler(260),
    width: usePixelScaler(300),
  };

  const onSeeking = useCallback(
    ({ direction }: { direction: "forward" | "reverse" }) => {
      setSeekDirection(direction);
      setIsBlinking(true);
    },
    []
  );

  const onSeeked = useCallback(() => {
    setIsBlinking(false);
  }, []);

  usePlayerEventSubscriber(PLAYER_EVENTS.seeking, onSeeking);
  usePlayerEventSubscriber(PLAYER_EVENTS.seeked, onSeeked);
  usePlayerEventSubscriber(PLAYER_EVENTS.skipForward, onSeeked);
  usePlayerEventSubscriber(PLAYER_EVENTS.skipBackward, onSeeked);

  useEffect(() => {
    if (isBlinking) {
      setIsIndicatorActive(true);
      blinkingTimeoutRef.current = setInterval(() => {
        setIsIndicatorActive(prev => !prev);
      }, 400);
    } else {
      setIsIndicatorActive(false);
    }

    return () => {
      if (blinkingTimeoutRef.current) clearInterval(blinkingTimeoutRef.current);
    };
  }, [isBlinking]);

  const handleButtonClick = (action: "forward" | "backward") => {
    let clickTimeoutId: NodeJS.Timeout | null = null;
    const clickDelay = 250;

    return () => {
      if (!clickTimeoutId) {
        clickTimeoutId = setTimeout(() => {
          if (action === "forward") {
            onSeekForward?.();
          } else {
            onSeekBackward?.();
          }
          clickTimeoutId = null;
        }, clickDelay);
      } else {
        clearTimeout(clickTimeoutId);
        clickTimeoutId = null;
        if (action === "forward") {
          onSkipForward?.();
        } else {
          onSkipBackward?.();
        }
      }
    };
  };

  return (
    <SeekButtonsContainer {...seekButtonsContainerStyles}>
      <SeekButton
        onClick={handleButtonClick("backward")}
        active={seekDirection === "reverse" && isIndicatorActive}
      >
        {`R▕\u25C0\uFE0E\u25C0\uFE0E`}
      </SeekButton>
      <SeekButton
        onClick={handleButtonClick("forward")}
        active={seekDirection === "forward" && isIndicatorActive}
      >
        {`\u25B6\uFE0E\u25B6\uFE0E▏F`}
      </SeekButton>
    </SeekButtonsContainer>
  );
};

export default SeekButtons;
