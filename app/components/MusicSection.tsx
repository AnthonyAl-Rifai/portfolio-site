"use client";

import ScrollSection from "./ScrollSection";
import InitialContent from "./InitialContent";
import ScrollContent from "./ScrollContent";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PlayerProvider } from "../sensei-bonus-player/context/PlayerContext";
import { ViewportProvider } from "../sensei-bonus-player/context/ViewportContext";
import AudioPlayer from "../sensei-bonus-player/components/AudioPlayer/AudioPlayer";

export default function MusicSection() {
  const logoContainerRef = useRef(null);
  const isInView = useInView(logoContainerRef, {
    once: false, // 👈 re-trigger every time it enters view
    margin: "-20% 0px",
  });

  const initialComponent = (
    <InitialContent
      backgroundImage="/sensei-bonus-2.jpg"
      backgroundImageAlt="Two men standing against a corrugated metal wall with strong shadows"
      priority={true}
    >
      <div
        ref={logoContainerRef}
        className="col-start-4 row-start-7 flex flex-col items-center justify-center gap-4 rounded backdrop-blur-sm hover:bg-orange-300/80 transition-colors relative"
      >
        <motion.a
          href="https://open.spotify.com/artist/3Jm51SlB9hlhiFcMdSuRjs?si=GWPbjCiMQ1mth2t6bYnvtg"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
          initial={false}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            delay: 0.1,
          }}
        >
          <Image
            src="/spotify-logo.png"
            alt="Spotify"
            width={60}
            height={60}
            className="object-contain opacity-85"
          />
        </motion.a>

        <motion.a
          href="https://senseibonus.bandcamp.com/album/one-punch-eraser"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
          initial={false}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            delay: 0.3,
          }}
        >
          <Image
            src="/bandcamp-button-bc-circle-black-256.png"
            alt="Bandcamp"
            width={60}
            height={60}
            className="object-contain opacity-85"
          />
        </motion.a>
      </div>
    </InitialContent>
  );

  const scrollComponent = (
    <ScrollContent
      backgroundImage="/sensei-bonus-3.jpeg"
      backgroundImageAlt="abstract red and white album cover"
      backgroundOpacity={0.6}
      className="border-r backdrop-blur-sm"
    >
      <div className="col-start-2 col-end-7 row-start-3 row-end-9 md:col-start-3 md:col-end-7 md:row-start-4 md:row-end-10 lg:col-start-6 lg:col-end-12 lg:row-start-2 lg:row-end-5 flex items-center justify-center">
        <ViewportProvider>
          <PlayerProvider>
            <AudioPlayer />
          </PlayerProvider>
        </ViewportProvider>
      </div>
    </ScrollContent>
  );

  return (
    <ScrollSection
      name="Music"
      id="music"
      initialComponent={initialComponent}
      scrollComponent={scrollComponent}
    />
  );
}
