"use client";

import { PlayerProvider } from "../../senseibonus/src/context/PlayerContext";
import { ViewportProvider } from "../../senseibonus/src/context/ViewportContext";
import AudioPlayer from "../../senseibonus/src/components/AudioPlayer/AudioPlayer";
import { useEffect } from "react";
import { usePlayer } from "../../senseibonus/src/context/PlayerContext";
import { PLAYER_EVENTS } from "../../senseibonus/src/player/types/playerEvents";

function AudioPlayerWithEvents() {
  const player = usePlayer();

  useEffect(() => {
    const handlePlay = () => {
      // Emit custom event that MusicSection can listen to
      window.dispatchEvent(new CustomEvent("sb-player-play"));
    };

    player.on(PLAYER_EVENTS.play, handlePlay);

    return () => {
      player.removeListener(PLAYER_EVENTS.play, handlePlay);
    };
  }, [player]);

  return <AudioPlayer />;
}

export default function SenseiBonusPlayer() {
  return (
    <PlayerProvider>
      <ViewportProvider>
        <AudioPlayerWithEvents />
      </ViewportProvider>
    </PlayerProvider>
  );
}
