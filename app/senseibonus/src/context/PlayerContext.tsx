import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import Player from '../player';

const PlayerContext = createContext<Player | undefined>(
  undefined
);

interface PlayerProviderProps {
  children: ReactNode;
}

// Singleton instance
const player = new Player();

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.player = player;
}

export const PlayerProvider: React.FC<
  PlayerProviderProps
> = ({ children }) => {
  return (
    <PlayerContext.Provider value={player}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error(
      'usePlayer must be used within a PlayerProvider'
    );
  }
  return context;
};
