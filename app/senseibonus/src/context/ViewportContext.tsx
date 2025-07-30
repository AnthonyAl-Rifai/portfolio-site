import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export const PLAYER_WIDTH = 450;
export const PLAYER_HEIGHT = 650;

interface ViewportContextProps {
  width: number;
}

const ViewportContext = createContext<ViewportContextProps | undefined>(
  undefined
);

interface ViewportProviderProps {
  children: ReactNode;
}

export const ViewportProvider: React.FC<ViewportProviderProps> = ({
  children,
}) => {
  const [width, setWidth] = useState(
    Math.min(window.innerWidth - 60, PLAYER_WIDTH)
  );

  useEffect(() => {
    const handleWindowResize = () =>
      setWidth(Math.min(window.innerWidth - 60, PLAYER_WIDTH));
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ width }}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = () => {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error("useViewport must be used within a ViewportProvider");
  }
  return context;
};
