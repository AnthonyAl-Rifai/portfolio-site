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
}

const LayoutContext = createContext<LayoutContextType>({
  isMobileLandscape: false,
  isTabletLandscape: false,
  hasMounted: false,
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isTabletLandscape, setIsTabletLandscape] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

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
    const timeout = setTimeout(() => {
      setHasMounted(true);
    }, 1000); // Delay mounting flag for 500ms

    window.addEventListener("resize", update);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <LayoutContext.Provider
      value={{ isMobileLandscape, isTabletLandscape, hasMounted }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
