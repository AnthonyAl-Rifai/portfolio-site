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
        className="col-start-4 row-start-5 flex flex-col items-center justify-center gap-4 rounded relative"
      >
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            delay: 1,
          }}
        >
          <a
            href="https://www.instagram.com/senseibonus/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:scale-110 transition-transform"
          >
            <InstagramIcon size={40} color="#000" />
          </a>

          <a
            href="https://open.spotify.com/artist/3Jm51SlB9hlhiFcMdSuRjs?si=GWPbjCiMQ1mth2t6bYnvtg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:scale-110 transition-transform"
          >
            <SpotifyIcon size={40} color="#000" />
          </a>

          <a
            href="https://senseibonus.bandcamp.com/album/one-punch-eraser"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:scale-110 transition-transform"
          >
            <BandcampIcon size={40} color="#000" />
          </a>

          <a
            href="https://music.apple.com/us/artist/sensei-bonus/1725067885"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:scale-110 transition-transform"
          >
            <AppleMusicIcon size={40} color="#000" />
          </a>

          <a
            href="https://www.youtube.com/@senseibonus"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:scale-110 transition-transform"
          >
            <YoutubeIcon size={40} color="#000" />
          </a>
        </motion.div>
      </div>
    </InitialContent>
  );

  const scrollComponent = (
    <ScrollContent
      gridHasPadding={false}
      // backgroundImage="/sensei-bonus-3.jpeg"
      // backgroundImageAlt="abstract red and white album cover"
      // backgroundOpacity={0.6}
      backgroundOverlayClassName="bg-white/40 backdrop-blur-md"
      className="border-r"
    >
      <PlayerProvider>
        <ViewportProvider>
          <MinimalAudioPlayer />
        </ViewportProvider>
      </PlayerProvider>

      {/* <div className="col-span-full row-span-full md:col-start-3 md:col-end-7 md:row-start-4 md:row-end-10 lg:col-start-6 lg:col-end-12 lg:row-start-2 lg:row-end-5 flex items-center justify-center"></div> */}
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
