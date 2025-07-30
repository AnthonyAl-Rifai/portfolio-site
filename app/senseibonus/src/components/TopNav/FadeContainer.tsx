import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

interface FadeWrapperProps extends React.CSSProperties {
  active: boolean;
  shouldDisplay: boolean;
}

const FadeWrapper = styled.div<FadeWrapperProps>(({ active, shouldDisplay, display, children, theme, ...props }) => {
  return {
    opacity: 0,
    animation: `${active ? fadeIn : fadeOut}  0.5s ease-out forwards`,
    display: shouldDisplay ? display : 'none',
    ...(props as React.CSSProperties)
  };
});

interface FadeContainerProps extends React.CSSProperties {
  active: boolean;
  children: React.ReactNode;
}

const FadeContainer: React.FC<FadeContainerProps> = ({ active, children, translate, ...props }) => {
  const [shouldDisplay, setShouldDisplay] = useState(active);

  useEffect(() => {
    if (active) {
      setShouldDisplay(true);
    } else {
      const timer = setTimeout(() => {
        setShouldDisplay(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return <FadeWrapper active={active} shouldDisplay={shouldDisplay} {...props}>{children}</FadeWrapper>;
};

export default FadeContainer;
