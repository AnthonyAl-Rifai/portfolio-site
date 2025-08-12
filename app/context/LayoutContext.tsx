"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface LayoutContextType {
  isMobileLandscape: boolean;
  isTabletLandscape: boolean;
  hasMounted: boolean;
  isNavigating: boolean;
  setIsNavigating: (b: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  isMobileLandscape: false,
  isTabletLandscape: false,
  hasMounted: false,
  isNavigating: false,
  setIsNavigating: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isTabletLandscape, setIsTabletLandscape] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const update = () => {
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const isTablet = window.matchMedia(
        "(min-width: 768px) and (max-width: 1200px)"
      ).matches;

      setIsMobileLandscape(isLandscape && isMobile);
      setIsTabletLandscape(isLandscape && isTablet);
    };

    update();
    const timeout = window.setTimeout(() => {
      setHasMounted(true);
    }, 1000);

    window.addEventListener("resize", update);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("resize", update);
    };
  }, []);

  // When navigating via menu, drop the flag shortly after scrolling stops
  useEffect(() => {
    if (!isNavigating) return;
    let t: number | undefined;

    const onScroll = () => {
      if (!isNavigating) return;
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => setIsNavigating(false), 200);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (t) window.clearTimeout(t);
    };
  }, [isNavigating]);

  return (
    <LayoutContext.Provider
      value={{
        isMobileLandscape,
        isTabletLandscape,
        hasMounted,
        isNavigating,
        setIsNavigating,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
