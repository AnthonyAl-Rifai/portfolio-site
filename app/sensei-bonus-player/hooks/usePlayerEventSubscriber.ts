import { useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";
import { PLAYER_EVENTS, PlayerListeners } from "../player/types/playerEvents";

function usePlayerEventSubscriber<E extends PLAYER_EVENTS>(
  event: E,
  listener: E extends keyof PlayerListeners
    ? PlayerListeners[E]
    : (...args: any[]) => void
) {
  const player = usePlayer();

  useEffect(() => {
    player.on(event, listener);

    return () => {
      player.removeListener(event, listener);
    };
  }, [player, event, listener]);
}

export default usePlayerEventSubscriber;
