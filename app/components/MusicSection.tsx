"use client";

import ScrollSection from "./ScrollSection";
import InitialContent from "./InitialContent";
import ScrollContent from "./ScrollContent";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
            className="object-contain opacity-80"
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
            src="/bandcamp-button-bc-circle-black-64.png"
            alt="Bandcamp"
            width={60}
            height={60}
            className="object-contain opacity-80"
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
      className="border-r"
    >
      <div className="col-span-2 row-span-3 bg-purple-200/80 flex items-center justify-center rounded backdrop-blur-sm">
        Scroll 1
      </div>
      <div className="col-span-2 row-span-3 bg-yellow-200/80 flex items-center justify-center rounded backdrop-blur-sm">
        Scroll 2
      </div>
      <div className="row-start-4 col-span-4 row-span-full bg-pink-200/80 flex items-center justify-center rounded backdrop-blur-sm">
        Scroll 3
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
