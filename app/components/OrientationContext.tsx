import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface OrientationContextType {
  isLandscape: boolean;
}

const OrientationContext = createContext<OrientationContextType>({
  isLandscape: false,
});

export const useOrientation = () => useContext(OrientationContext);

export const OrientationProvider = ({ children }: { children: ReactNode }) => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    function handleOrientation() {
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    }
    handleOrientation();
    window.addEventListener("resize", handleOrientation);
    return () => window.removeEventListener("resize", handleOrientation);
  }, []);

  return (
    <OrientationContext.Provider value={{ isLandscape }}>
      {children}
    </OrientationContext.Provider>
  );
};
