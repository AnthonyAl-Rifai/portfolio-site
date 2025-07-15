import styled from "@emotion/styled";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import usePixelScaler from "../../hooks/usePixelScaler";

interface AbsoluteContainerProps {
  bottom?: number;
  right?: number;
}

const AbsoluteContainer = styled.div<AbsoluteContainerProps>(
  ({ bottom = 189, right = 3 }) => ({
    position: "absolute",
    bottom,
    right,
  })
);

interface PitchControlButtonsContainerProps {
  borderRadius?: number;
}

const PitchControlButtonsContainer =
  styled.div<PitchControlButtonsContainerProps>(({ borderRadius = 25 }) => ({
    position: "relative",
    transform: "rotate(-45deg)",
    borderRadius,
    boxShadow:
      "inset 0px 43px 2px -44px #464647,inset 0px -1.1px 1.8px -1px #E9E8E8,0px 4px 6px -4px #AAAAAB,inset 0px 3px 1px -1px #838383",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    useSelect: "none",
  }));

interface ButtonTextProps {
  fontSize: number;
  top: number;
  left: number;
}

interface PitchControlButtonsProps {
  onIncrease?: VoidFunction;
  onDecrease?: VoidFunction;
}

interface PitchControlButtonProps {
  children: ReactNode;
  marginLeft?: number;
  marginRight?: number;
  textStyles: ButtonTextProps;
  size?: number;
  onClick?: VoidFunction;
  isPressed?: boolean;
}

const PitchControlButtonContainer = styled.button<PitchControlButtonProps>(
  ({ marginLeft, marginRight, size = 38, isPressed = false }) => ({
    position: "relative",
    width: size,
    height: size,
    color: "#6F6F6E",
    borderRadius: "50%",
    borderColor: "#6F6F6E",
    borderStyle: "solid",
    WebkitTapHighlightColor: "transparent",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    WebkitUserSelect: "none",
    borderWidth: 1,
    transform: "rotate(45deg)",
    background:
      "linear-gradient(132deg, rgba(175,173,172,1) 0%, rgba(169,168,168,1) 98%)",
    boxShadow: isPressed
      ? "none"
      : "1.2px 1.1px 1.1px 0px #242524,inset 1.5px 2.2px 1.1px -1px #EEEEEE,inset -1.1px -2.1px 1.6px -1.2px #959595",
    margin: 3,
    ...(marginLeft ? { marginLeft } : {}),
    ...(marginRight ? { marginRight } : {}),
    "&:after": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      transform: "rotate(45deg)",
      left: 0,
      top: 0,
      transition: "opacity 0.1s ease-in-out",
      opacity: isPressed ? 1 : 0,
      background:
        "linear-gradient(135deg, rgba(182,182,183,0) 0%, rgba(182,182,183,0.5) 5%, rgba(150,150,150,0.5) 20%, rgba(97,97,97,0.5) 100%)",
    },
  })
);

const ButtonText = styled.p<ButtonTextProps>(({ fontSize, top, left }) => ({
  position: "absolute",
  margin: 0,
  fontSize,
  top,
  left,
}));

const PitchControlButton: React.FC<PitchControlButtonProps> = ({
  children,
  onClick,
  ...styles
}) => {
  const size = usePixelScaler(38);
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

    return () => {
      stopHolding();
    };
  }, [isHeldDown, startHolding, stopHolding]);

  const onMouseDown = () => {
    setIsHeldDown(true);
  };

  const onMouseUp = () => {
    setIsHeldDown(false);
  };

  const onTouchStart = () => {
    setIsHeldDown(true);
  };

  const onTouchEnd = () => {
    setIsHeldDown(false);
  };

  return (
    <PitchControlButtonContainer
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      size={size}
      {...styles}
      isPressed={isHeldDown}
    >
      <ButtonText {...styles.textStyles}>{children}</ButtonText>
    </PitchControlButtonContainer>
  );
};

const PitchControlButtons: React.FC<PitchControlButtonsProps> = ({
  onDecrease,
  onIncrease,
}) => {
  const absoluteContainerStyles = {
    bottom: usePixelScaler(189),
    right: usePixelScaler(3),
  };

  const pitchControlButtonsContainerStyles = {
    borderRadius: usePixelScaler(25),
  };

  const minusButtonStyles = {
    textStyles: {
      fontSize: usePixelScaler(62),
      top: usePixelScaler(-24),
      left: usePixelScaler(8),
    },
    marginRight: usePixelScaler(10),
  };

  const plusButtonStyles = {
    textStyles: {
      fontSize: usePixelScaler(40),
      top: usePixelScaler(-10),
      left: usePixelScaler(7),
    },
    marginLeft: usePixelScaler(10),
  };

  return (
    <AbsoluteContainer {...absoluteContainerStyles}>
      <PitchControlButtonsContainer {...pitchControlButtonsContainerStyles}>
        <PitchControlButton onClick={onDecrease} {...minusButtonStyles}>
          -
        </PitchControlButton>
        <PitchControlButton onClick={onIncrease} {...plusButtonStyles}>
          +
        </PitchControlButton>
      </PitchControlButtonsContainer>
    </AbsoluteContainer>
  );
};

export default PitchControlButtons;
