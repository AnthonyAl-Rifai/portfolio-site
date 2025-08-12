"use client";

import { PlayerProvider } from "../senseibonus/src/context/PlayerContext";
import { ViewportProvider } from "../senseibonus/src/context/ViewportContext";
import AudioPlayer from "../senseibonus/src/components/AudioPlayer/AudioPlayer";

export default function SenseiBonusPlayer() {
  return (
    <PlayerProvider>
      <ViewportProvider>
        <AudioPlayer />
        {/* <div className="flex justify-center items-center w-full flex-1 overflow-hidden">
          <div className="w-full max-w-full flex justify-center">
          </div>
        </div> */}
      </ViewportProvider>
    </PlayerProvider>
  );
}
