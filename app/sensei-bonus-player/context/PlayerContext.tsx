import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Player from "../player";
import LoadingPlayer from "../components/AudioPlayer/LoadingPlayer";
import playlistConfig from "../configs/one-punch-eraser.json";

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

  // Load playlist when player is ready
  useEffect(() => {
    if (player && isClient) {
      console.log("Loading playlist...");
      // Remove artwork URLs to avoid 500 errors, keep the rest of the playlist
      const fixedPlaylist = playlistConfig.album.map(track => ({
        ...track,
        artwork: [], // Remove artwork for now to avoid 500 errors
      }));

      console.log("Playlist to load:", fixedPlaylist);

      player
        .load(fixedPlaylist)
        .then(() => {
          console.log("Playlist loaded successfully");
        })
        .catch(error => {
          console.error("Failed to load playlist:", error);
        });
    }
  }, [player, isClient]);

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
