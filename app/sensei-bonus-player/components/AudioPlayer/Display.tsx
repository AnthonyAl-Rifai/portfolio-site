import styled from "@emotion/styled";
import usePixelScaler from "../../hooks/usePixelScaler";
import { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";
import { DISPLAY_FONT } from "../../configs/constants";
import { measureTextWidth } from "../../utils/measureTextWidth";
import useDisplayManager from "../../hooks/useDisplayManager";
import { convertHighlight } from "../../utils/convertHighlight";

interface DisplayContainerProps {
  width?: number;
  height?: number;
  outerSpacing?: number;
  borderRadius?: number;
  padding?: number;
}

const DisplayContainer = styled.div<DisplayContainerProps>(
  ({
    width = 100,
    height = 65,
    outerSpacing = 15,
    borderRadius = 0,
    padding = 5,
  }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width,
    height,
    backgroundColor: "none",
    borderRadius,
    // position: "absolute",
    top: outerSpacing,
    right: outerSpacing,
    textAlign: "left",
    border: "1px solid black",
    padding,
    boxSizing: "border-box",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    useSelect: "none",
  })
);

interface TextProps {
  fontSize?: number;
  marginTop?: number;
  marginBottom?: number;
  padding?: number;
  maxWidth?: number;
  scrollTextPosition?: number;
  rightSpacing?: number;
  animate?: boolean;
}

const getScrollTextKeyframes = (position: number) => {
  return keyframes`
    0% {
      transform: translateX(0%);
    }
    50% {
      transform: translateX(-${position}px);
    }
    100% {
      transform: translateX(-${position}px);
    }
  `;
};

const MainTextContainer = styled.div({
  position: "relative",
  overflow: "hidden",
  height: 25,
  display: "flex",
  alignItems: "center",
});

const TextPartContainer = styled.span`
  display: inline-block;
`;

const MainText = styled.p<TextProps>(
  ({
    fontSize = 18,
    marginTop = 0,
    scrollTextPosition = 50,
    rightSpacing = 30,
    animate = false,
  }) => {
    return {
      // color: "#E6F1F9",
      color: "#030507",
      fontSize,
      fontFamily: DISPLAY_FONT,
      margin: 0,
      marginTop,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textSpanOverlap: "clip",
      textTransform: "uppercase",
      position: "absolute",
      top: 0,
      left: 0,
      ...(animate && {
        animation: `${getScrollTextKeyframes(scrollTextPosition + rightSpacing)} 10s linear infinite`,
        animationDelay: "3s",
        "& span:first-of-type": {
          marginRight: rightSpacing,
        },
      }),
    };
  }
);

const SubTextContainer = styled.div({
  position: "relative",
  overflow: "hidden",
  textSpanOverlap: "clip",
  textTransform: "uppercase",
  height: 15,
  display: "flex",
  alignItems: "center",
  width: "100%",
});

const SubText = styled.p<TextProps>(
  ({
    fontSize = 12,
    marginBottom = 2,
    scrollTextPosition = 50,
    rightSpacing = 30,
    animate = false,
  }) => ({
    color: "#030507",
    fontSize,
    fontFamily: DISPLAY_FONT,
    margin: 0,
    marginBottom,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textSpanOverlap: "clip",
    position: "absolute",
    top: 0,
    left: 0,
    ...(animate && {
      animation: `${getScrollTextKeyframes(scrollTextPosition + rightSpacing)} 10s linear infinite`,
      animationDelay: "3s",
      "& span:first-of-type": {
        marginRight: rightSpacing,
      },
    }),
  })
);

const HighlightText = styled.p<TextProps>(
  ({ fontSize = 10, maxWidth = 10 }) => ({
    color: "#030507",
    fontSize,
    display: "flex",
    fontFamily: DISPLAY_FONT,
    margin: 0,
    paddingLeft: 2,
    paddingRight: 1,
    paddingBottom: 1,
    backgroundColor: "none",
    borderRadius: 0,
    textAlign: "center",
    maxWidth,
    height: 16,
    // minWidth: 20,
    borderColor: "#030507",
    borderWidth: 1,
    borderStyle: "solid",
  })
);

const Row = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const Display: React.FC = () => {
  const [mainSpanWidth, setMainSpanWidth] = useState(0);
  const [subSpanWidth, setSubSpanWidth] = useState(0);
  const { mainText, subText, highlightText } = useDisplayManager();

  const displayContainerStyles: DisplayContainerProps = {
    width: usePixelScaler(100),
    height: usePixelScaler(65),
    outerSpacing: usePixelScaler(15),
    borderRadius: usePixelScaler(0),
    padding: usePixelScaler(5),
  };

  const doesMainTextOverlap = !(
    displayContainerStyles.width &&
    displayContainerStyles.padding &&
    mainSpanWidth <
      displayContainerStyles.width - displayContainerStyles.padding * 2
  );

  const doesSubTextOverlap = !(
    displayContainerStyles.width &&
    displayContainerStyles.padding &&
    subSpanWidth + 20 <
      displayContainerStyles.width - displayContainerStyles.padding * 2
  );

  const mainRightSpacing = !doesMainTextOverlap
    ? displayContainerStyles.width! - mainSpanWidth
    : 30;
  const subRightSpacing = !doesSubTextOverlap
    ? displayContainerStyles.width! - subSpanWidth
    : 30;

  const mainTextStyles: TextProps = {
    fontSize: usePixelScaler(18),
    marginTop: usePixelScaler(0),
    scrollTextPosition: mainSpanWidth,
    rightSpacing: mainRightSpacing,
    animate: doesMainTextOverlap,
  };

  const subTextStyles: TextProps = {
    fontSize: usePixelScaler(12),
    marginBottom: usePixelScaler(2),
    scrollTextPosition: subSpanWidth,
    rightSpacing: subRightSpacing,
    animate: doesSubTextOverlap,
  };

  const highlightTextStyles: TextProps = {
    fontSize: usePixelScaler(10),
    padding: usePixelScaler(2),
    maxWidth: usePixelScaler(80),
  };

  useEffect(() => {
    if (mainText) {
      setMainSpanWidth(
        measureTextWidth(
          mainText,
          `${mainTextStyles.fontSize || 0}px ${DISPLAY_FONT}`
        )
      );
    }
    if (subText) {
      setSubSpanWidth(
        measureTextWidth(
          subText,
          `${subTextStyles.fontSize || 0}px ${DISPLAY_FONT}`
        )
      );
    }
  }, [mainText, subText, mainTextStyles.fontSize, subTextStyles.fontSize]);

  return (
    <DisplayContainer {...displayContainerStyles}>
      <MainTextContainer>
        <MainText {...mainTextStyles}>
          <TextPartContainer>{mainText}</TextPartContainer>
          {doesMainTextOverlap ? (
            <TextPartContainer>{mainText}</TextPartContainer>
          ) : null}
        </MainText>
      </MainTextContainer>
      <Row>
        <SubTextContainer>
          {subText ? (
            <SubText {...subTextStyles}>
              <TextPartContainer>{subText}</TextPartContainer>
              {doesSubTextOverlap ? (
                <TextPartContainer>{subText}</TextPartContainer>
              ) : null}
            </SubText>
          ) : null}
        </SubTextContainer>
        {highlightText ? (
          <HighlightText {...highlightTextStyles}>
            {convertHighlight(highlightText)}
          </HighlightText>
        ) : null}
      </Row>
    </DisplayContainer>
  );
};

export default Display;
