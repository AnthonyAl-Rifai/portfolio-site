import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface LayoutContextType {
  isMobileLandscape: boolean;
  hasMounted: boolean;
}

const LayoutContext = createContext<LayoutContextType>({
  isMobileLandscape: false,
  hasMounted: false,
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const update = () => {
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      setIsMobileLandscape(isLandscape && isMobile);
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
    <LayoutContext.Provider value={{ isMobileLandscape, hasMounted }}>
      {children}
    </LayoutContext.Provider>
  );
};
