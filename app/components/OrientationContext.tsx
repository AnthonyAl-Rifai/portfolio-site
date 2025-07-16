import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface OrientationContextType {
  isMobileLandscape: boolean;
}

const OrientationContext = createContext<OrientationContextType>({
  isMobileLandscape: false,
});

export const useOrientation = () => useContext(OrientationContext);

export const OrientationProvider = ({ children }: { children: ReactNode }) => {
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    function updateOrientation() {
      const isMobileLandscape = window.matchMedia(
        "(orientation: landscape)"
      ).matches;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      setIsMobileLandscape(isMobileLandscape && isMobile);
    }

    updateOrientation();
    window.addEventListener("resize", updateOrientation);
    return () => window.removeEventListener("resize", updateOrientation);
  }, []);

  return (
    <OrientationContext.Provider value={{ isMobileLandscape }}>
      {children}
    </OrientationContext.Provider>
  );
};
