"use client";

import ScrollSection from "./ScrollSection";
import InitialContent from "./InitialContent";
import ScrollContent from "./ScrollContent";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PlayerProvider } from "../sensei-bonus-player/context/PlayerContext";
import { ViewportProvider } from "../sensei-bonus-player/context/ViewportContext";
import MinimalAudioPlayer from "../sensei-bonus-player/components/AudioPlayer/MinimalAudioPlayer";
import InstagramIcon from "../icons/InstagramIcon";
import SpotifyIcon from "../icons/SpotifyIcon";
import BandcampIcon from "../icons/BandcampIcon";
import AppleMusicIcon from "../icons/AppleMusicIcon";
import YoutubeIcon from "../icons/YoutubeIcon";

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
        <div className="flex flex-col items-center gap-4">
          <motion.a
            href="https://www.instagram.com/senseibonus/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:scale-110 transition-transform"
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: 0.1,
            }}
          >
            <InstagramIcon size={40} color="#000" />
          </motion.a>

          <motion.a
            href="https://open.spotify.com/artist/3Jm51SlB9hlhiFcMdSuRjs?si=GWPbjCiMQ1mth2t6bYnvtg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:scale-110 transition-transform"
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: 0.2,
            }}
          >
            <SpotifyIcon size={40} color="#000" />
          </motion.a>

          <motion.a
            href="https://senseibonus.bandcamp.com/album/one-punch-eraser"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:scale-110 transition-transform"
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: 0.3,
            }}
          >
            <BandcampIcon size={40} color="#000" />
          </motion.a>

          <motion.a
            href="https://music.apple.com/us/artist/sensei-bonus/1725067885"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:scale-110 transition-transform"
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: 0.4,
            }}
          >
            <AppleMusicIcon size={40} color="#000" />
          </motion.a>

          <motion.a
            href="https://www.youtube.com/@senseibonus"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:scale-110 transition-transform"
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: 0.5,
            }}
          >
            <YoutubeIcon size={40} color="#000" />
          </motion.a>
        </div>
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
      <div className="col-span-full row-span-full md:col-start-3 md:col-end-7 md:row-start-4 md:row-end-10 lg:col-start-6 lg:col-end-12 lg:row-start-2 lg:row-end-5 flex items-center justify-center">
        <ViewportProvider>
          <PlayerProvider>
            <MinimalAudioPlayer />
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
