import styled from "@emotion/styled";
import usePixelScaler from "../../hooks/usePixelScaler";
import { ReactNode, useState } from "react";
import Meters from "./Meters";
import { isMobile } from "../../player/utils/ua";

interface TransportButtonsProps {
  onPlay?: VoidFunction;
  onStop?: VoidFunction;
  onRecord?: VoidFunction;
}

interface TransportButtonsContainerProps {
  width?: number;
  height?: number;
  borderTopWidth?: number;
  borderBottomLeftRadius?: number;
  gradientHeight?: number;
  isPressed?: boolean;
}

interface TransportButtonProps extends TransportButtonsContainerProps {
  children: ReactNode;
  iconColor?: string;
  iconSize?: number;
  iconMarginTop?: number;
  onClick?: VoidFunction;
}

const ButtonsAndMeterContainer = styled.div<TransportButtonsContainerProps>(
  ({ height = 155 }) => ({
    display: "flex",
    flexDirection: "row",
    height,
  })
);

const TransportButtonsContainer = styled.div<TransportButtonsContainerProps>({
  display: "flex",
  flexDirection: "row",
  height: "100%",
  width: "75%",
  boxShadow: "0px -2px 0px 0px #7A7C7E,1px 0px 2px 0px #EDEDED",
  borderRightStyle: "solid",
  borderRightWidth: 1,
  borderColor: "#131516",
});

const TransportButtonContainer = styled.button<TransportButtonsContainerProps>(
  ({ borderTopWidth = 2, borderBottomLeftRadius, isPressed = false }) => ({
    display: "flex",
    justifyContent: "center",
    position: "relative",
    // width: '33.3%',
    flex: 1,
    WebkitTapHighlightColor: "transparent",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    useSelect: "none",
    borderTopStyle: "solid",
    borderTopWidth,
    borderTopColor: "#010202",
    borderRightStyle: "solid",
    borderRightWidth: 1,
    cursor: "pointer",
    borderRightColor: "#010202",
    boxSizing: "border-box",
    background:
      "linear-gradient(90deg, rgba(182,182,183,1) 0%, rgba(177,176,176,1) 95%, rgba(81,81,81,1) 100%)",
    ...(borderBottomLeftRadius
      ? {
          borderBottomLeftRadius,
          boxShadow:
            "inset 2px 0px 0px 0px #EDECEC,inset -2px -2px 0px 0px #666767;",
        }
      : {
          boxShadow: "inset -2px -2px 0px 0px #666767;",
        }),
    "&:after": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      transition: "opacity 0.1s ease-in-out",
      opacity: isPressed ? 1 : 0,
      background:
        "linear-gradient(180deg, rgba(182,182,183,0) 0%, rgba(182,182,183,0.5) 16%, rgba(150,150,150,0.5) 41%, rgba(46,46,46,0.5) 100%)",
      ...(borderBottomLeftRadius ? { borderBottomLeftRadius } : {}),
    },
  })
);

const TransportButtonTopShadow = styled.span<{ gradientHeight?: number }>(
  ({ gradientHeight = 8 }) => ({
    position: "absolute",
    top: 0,
    left: 1,
    right: 0,
    height: gradientHeight,
    backgroundColor: `rgb(186,186,187)`,
    background: `linear-gradient(0deg, rgba(186,186,187,1) 0%, rgba(239,240,238,1) 62%, rgba(244,245,244,1) 79%, rgba(101,104,105,1) 100%)`,
    clipPath: `polygon(0 0, 100% 0, 100% 0%, calc(100% - ${gradientHeight - 5}px) 100%, 0 100%)`,
  })
);

interface ButtonIconProps {
  fontSize?: number;
  color?: string;
  marginTop?: number;
}

const ButtonIcon = styled.p<ButtonIconProps>(
  ({ fontSize = 20, color = "#1E211E", marginTop = 24 }) => ({
    fontSize,
    color,
    marginTop,
    zIndex: 2,
  })
);

const TransportButton: React.FC<TransportButtonProps> = props => {
  const [isPressed, setIsPressed] = useState(false);

  const { children, iconColor, iconSize, iconMarginTop, onClick, ...styles } =
    props;
  const buttonStyles: TransportButtonsContainerProps = {
    borderTopWidth: usePixelScaler(2),
    isPressed,
    ...styles,
  };

  const gradientHeight = usePixelScaler(12);
  const defaultIconSize = usePixelScaler(24);
  const defaultMarginTop = usePixelScaler(24);

  const iconStyles: ButtonIconProps = {
    color: iconColor,
    fontSize: iconSize || defaultIconSize,
    marginTop: iconMarginTop || defaultMarginTop,
  };

  const onPress = () => {
    setIsPressed(true);
  };

  const onRelease = () => {
    setIsPressed(false);
    onClick?.();
  };

  const clickHandlers: React.ButtonHTMLAttributes<HTMLButtonElement> = {};

  if (isMobile()) {
    clickHandlers.onTouchStart = onPress;
    clickHandlers.onTouchEnd = onRelease;
  } else {
    clickHandlers.onMouseDown = onPress;
    clickHandlers.onMouseUp = onRelease;
  }

  return (
    <TransportButtonContainer {...clickHandlers} {...buttonStyles}>
      <TransportButtonTopShadow gradientHeight={gradientHeight} />
      <ButtonIcon {...iconStyles}>{children}</ButtonIcon>
    </TransportButtonContainer>
  );
};

const TransportButtons: React.FC<TransportButtonsProps> = ({
  onPlay,
  onStop,
  onRecord,
}) => {
  const height = usePixelScaler(155);
  const borderBottomLeftRadius = usePixelScaler(20);
  const playIconSize = usePixelScaler(26);
  const playMarginTop = usePixelScaler(22);

  return (
    <ButtonsAndMeterContainer height={height}>
      <TransportButtonsContainer>
        <TransportButton
          onClick={onRecord}
          borderBottomLeftRadius={borderBottomLeftRadius}
          iconColor="#F66106"
        >{`\u25CF\uFE0E`}</TransportButton>
        <TransportButton
          onClick={onPlay}
          iconSize={playIconSize}
          iconMarginTop={playMarginTop}
        >{`\u25B6\uFE0E`}</TransportButton>
        <TransportButton onClick={onStop}>{`\u25A0\uFE0E`}</TransportButton>
      </TransportButtonsContainer>
      <Meters />
    </ButtonsAndMeterContainer>
  );
};

export default TransportButtons;
