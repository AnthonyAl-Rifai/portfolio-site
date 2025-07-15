import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Player from "../player";
import LoadingPlayer from "../components/AudioPlayer/LoadingPlayer";

const PlayerContext = createContext<Player | undefined>(undefined);

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Only run on client
    const instance = new Player();
    if (process.env.NODE_ENV === "development") {
      // @ts-expect-error - Adding player to window for debugging
      window.player = instance;
    }
    setPlayer(instance);
  }, []);

  // Only render children when player is ready
  return (
    <PlayerContext.Provider value={player}>
      {isClient && player ? children : <LoadingPlayer />}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
