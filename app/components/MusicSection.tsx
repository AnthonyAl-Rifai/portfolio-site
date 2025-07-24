"use client";

import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { useState, useRef } from "react";
import { useLayout } from "../context/LayoutContext";
import { AnimatePresence, motion, useInView } from "motion/react";
import { PlayerProvider } from "../sensei-bonus-player/context/PlayerContext";
import { ViewportProvider } from "../sensei-bonus-player/context/ViewportContext";
import MinimalAudioPlayer from "../sensei-bonus-player/components/AudioPlayer/MinimalAudioPlayer";
import InstagramIcon from "../icons/InstagramIcon";
import SpotifyIcon from "../icons/SpotifyIcon";
import BandcampIcon from "../icons/BandcampIcon";
import AppleMusicIcon from "../icons/AppleMusicIcon";
import YoutubeIcon from "../icons/YoutubeIcon";

export default function MusicSection() {
  const { isMobileLandscape } = useLayout();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showCloseAnimation, setShowCloseAnimation] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const logoContainerRef = useRef(null);

  const isInView = useInView(logoContainerRef, {
    once: false,
    margin: "-20% 0px",
  });

  const openDrawer = () => {
    setDrawerOpen(true);
    setShowCloseAnimation(false);
    setTimeout(() => setShowCloseAnimation(true), 50);
  };

  const closeDrawer = () => {
    setShowCloseAnimation(false);
    setDrawerOpen(false);
    sectionRef.current?.scrollIntoView();
  };

  return (
    <Section id="music" ref={sectionRef}>
      <SectionTitle name="Music" isSticky />
      <div
        // className="h-full"
        className={`grid gap-4 p-4 relative ${
          isMobileLandscape
            ? "h-[calc(100vh-var(--layout-size))]"
            : "h-[calc(100vh-2*var(--layout-size))]"
        } grid-cols-4 grid-rows-4`}
        style={
          {
            // backgroundImage: "url('/sensei-bonus-2.jpg')",
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            // backgroundRepeat: "no-repeat",
          }
        }
      >
        <h3 className="row-start-1 col-span-3 text-xl">
          My music project, Sensei Bonus draws from the propulsive energy of
          electronic body music, finding truth in the controlled chaos of punk
          and techno. Born from the instinctual yearn for dark, crowded dance
          floors, Sensei Bonus offers a symbiotic chance to revel in the malaise
          and jubilance of the human condition.
        </h3>
        <div className="row-start-3 col-start-1 col-span-4 row-span-2 flex items-center">
          <motion.button
            onClick={openDrawer}
            className="row-start-3 row-span-2 h-[58px] w-[200px] bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 border border-black rounded-full cursor-pointer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg font-semibold">SB-1 Player</span>
          </motion.button>
        </div>
        {/* Social Media Icons - Positioned absolutely outside the grid */}
        <div
          ref={logoContainerRef}
          className="col-start-4 row-start-1 row-span-full flex flex-col items-center gap-4"
        >
          <motion.div
            className="flex flex-col items-center gap-4 mt-4"
            style={{ transformOrigin: "right" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
            }
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
      </div>

      <AnimatePresence mode="wait">
        {drawerOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-white border-l h-dvh"
          >
            <motion.div className="h-full flex flex-col overflow-y-auto">
              <PlayerProvider>
                <ViewportProvider>
                  <MinimalAudioPlayer
                    onClose={closeDrawer}
                    showCloseAnimation={showCloseAnimation}
                  />
                </ViewportProvider>
              </PlayerProvider>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
