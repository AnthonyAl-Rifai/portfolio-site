"use client";

import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";
import { useState, useRef, useEffect } from "react";
import { useLayout } from "../../context/LayoutContext";
import { AnimatePresence, motion, useInView } from "motion/react";
import InstagramIcon from "../../icons/InstagramIcon";
import SpotifyIcon from "../../icons/SpotifyIcon";
import BandcampIcon from "../../icons/BandcampIcon";
import AppleMusicIcon from "../../icons/AppleMusicIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";
import MenuIconA from "../../icons/MenuIconA";
import MenuIconAUpsideDown from "../../icons/MenuIconAUpsideDown";
import SenseiBonusPlayer from "../projects/SenseiBonusPlayer";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import clsx from "clsx";

export default function MusicSection() {
  const { isMobileLandscape } = useLayout();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showCloseAnimation, setShowCloseAnimation] = useState(false);
  const [isPlayerPlaying, setIsPlayerPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const logoContainerRef = useRef(null);
  const isDesktop = useIsDesktop();

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

  // Listen for play events from the audio player
  useEffect(() => {
    const handlePlayEvent = () => {
      setIsPlayerPlaying(true);
    };

    // Listen for custom play event from the audio player
    window.addEventListener("sb-player-play", handlePlayEvent);

    return () => {
      window.removeEventListener("sb-player-play", handlePlayEvent);
    };
  }, []);

  return (
    <Section id="music" ref={sectionRef} className="h-auto">
      <SectionTitle name="Music" isSticky />

      <div
        className={clsx(
          "grid",
          "gap-4 p-4",
          "md:grid-cols-4",
          isMobileLandscape
            ? "min-h-[100vh]"
            : "min-h-[calc(100vh-(2*var(--layout-size)))]"
        )}
      >
        <motion.div
          className={clsx(
            "flex flex-col justify-between",
            isDesktop && !isMobileLandscape
              ? "col-span-2 row-span-full xl:col-span-2 xl:row-start-1 xl:col-start-1 xl:mt-24 2xl:col-span"
              : "col-span-3 lg:col-span-3"
          )}
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-[clamp(1rem,2vw+0.5rem,3rem)]">
            My music project, Sensei Bonus draws from the propulsive energy of
            electronic body music, finding truth in the controlled chaos of punk
            and techno. Born from the instinctual yearn for dark, crowded dance
            floors, Sensei Bonus offers a symbiotic chance to revel in the
            malaise and jubilance of the human condition. Fire up the SB-1
            player to immerse yourself in the sound, manipulate it in real time,
            and make it your own.
          </h3>
        </motion.div>
        <motion.div
          ref={logoContainerRef}
          className={clsx(
            "flex flex-col items-center gap-4",
            "mt-2",
            "md:mt-4 md:gap-8 xl:flex-row",
            isDesktop && !isMobileLandscape
              ? "col-start-2 row-start-1 row-span-full xl:col-start-1 xl:items-start"
              : "col-start-4 row-start-1 row-span-full xl:items-start xl:col-start-1"
          )}
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
            className={clsx(
              "flex items-center justify-center",
              "hover:scale-110 transition-transform"
            )}
          >
            <InstagramIcon size={40} className="md:w-12 md:h-12" color="#000" />
          </a>

          <a
            href="https://open.spotify.com/artist/3Jm51SlB9hlhiFcMdSuRjs?si=GWPbjCiMQ1mth2t6bYnvtg"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "flex items-center justify-center",
              "hover:scale-110 transition-transform"
            )}
          >
            <SpotifyIcon size={40} className="md:w-12 md:h-12" color="#000" />
          </a>

          <a
            href="https://senseibonus.bandcamp.com/album/one-punch-eraser"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "flex items-center justify-center",
              "hover:scale-110 transition-transform"
            )}
          >
            <BandcampIcon size={40} className="md:w-12 md:h-12" color="#000" />
          </a>

          <a
            href="https://music.apple.com/us/artist/sensei-bonus/1725067885"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "flex items-center justify-center",
              "hover:scale-110 transition-transform"
            )}
          >
            <AppleMusicIcon
              size={40}
              className="md:w-12 md:h-12"
              color="#000"
            />
          </a>

          <a
            href="https://www.youtube.com/@senseibonus"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "flex items-center justify-center",
              "hover:scale-110 transition-transform"
            )}
          >
            <YoutubeIcon size={40} className="md:w-12 md:h-12" color="#000" />
          </a>
        </motion.div>
        {isDesktop && !isMobileLandscape ? (
          <div
            className={clsx(
              "col-start-3 col-span-2 row-start-1 row-span-full relative",
              "flex flex-col justify-center items-center gap-4"
            )}
          >
            <SenseiBonusPlayer />
            <motion.div
              className="flex gap-6 ml-[40px]"
              animate={{
                opacity: isPlayerPlaying ? 0 : 1,
                scale: isPlayerPlaying ? 0.8 : 1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <motion.div
                animate={{
                  y: isPlayerPlaying ? 0 : [3, 12, 3],
                  opacity: isPlayerPlaying ? 0 : 1,
                }}
                transition={{
                  duration: isPlayerPlaying ? 0.3 : 2,
                  repeat: isPlayerPlaying ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              >
                <MenuIconA size={24} color="#000" />
              </motion.div>
              <span className="text-2xl">play with me</span>
            </motion.div>
          </div>
        ) : (
          <>
            <motion.button
              onClick={openDrawer}
              className={clsx(
                "h-[58px] w-[200px]",
                "px-8 py-4",
                "font-semibold",
                "bg-[var(--foreground)] text-[var(--background)]",
                "border rounded-full",
                "cursor-pointer"
              )}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg font-semibold">SB-1 Player</span>
            </motion.button>
            <AnimatePresence mode="wait">
              {drawerOpen && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="fixed inset-0 z-50 bg-[var(--background)] border-l h-dvh"
                >
                  <motion.div className="h-full flex flex-col overflow-y-auto">
                    <div className="sticky top-0 h-[var(--layout-size)] flex items-center bg-[var(--background)] z-10">
                      <button
                        onClick={closeDrawer}
                        className="flex items-center w-[var(--layout-size)] h-[var(--layout-size)] border-r justify-center z-50"
                        aria-label="Close modal"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <motion.div
                            animate={{
                              scale: [1, 1.3, 1],
                              rotate: showCloseAnimation ? 180 : 0,
                              y: [0, -2, 0],
                            }}
                            transition={{
                              duration: 0.6,
                              ease: "easeInOut",
                              times: [0, 0.5, 1],
                            }}
                          >
                            <MenuIconA size={20} color="#000" />
                          </motion.div>
                          <motion.div
                            className="-mt-1"
                            animate={{
                              scale: [1, 1.3, 1],
                              rotate: showCloseAnimation ? -180 : 0,
                              y: [0, 2, 0],
                            }}
                            transition={{
                              duration: 0.6,
                              ease: "easeInOut",
                              times: [0, 0.5, 1],
                            }}
                          >
                            <MenuIconAUpsideDown size={20} color="#000" />
                          </motion.div>
                        </div>
                      </button>
                      <h2 className="text-4xl font-bold mx-4 whitespace-nowrap">
                        SB-1 Audio Player
                      </h2>
                      <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                          delay: 0.5,
                        }}
                        className="bg-black origin-left"
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: 0,
                          height: 1,
                        }}
                      />
                    </div>

                    <div className="flex-1 bg-[var(--background)] flex flex-col justify-center items-center p-4 relative gap-4">
                      <SenseiBonusPlayer />
                      <motion.div
                        className="flex gap-6 ml-[70px]"
                        animate={{
                          opacity: isPlayerPlaying ? 0 : 1,
                          scale: isPlayerPlaying ? 0.8 : 1,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      >
                        <motion.div
                          animate={{
                            y: isPlayerPlaying ? 0 : [3, 12, 3],
                            opacity: isPlayerPlaying ? 0 : 1,
                          }}
                          transition={{
                            duration: isPlayerPlaying ? 0.3 : 2,
                            repeat: isPlayerPlaying ? 0 : Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <MenuIconA size={24} color="#000" />
                        </motion.div>
                        <span className="text-2xl">play with me</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </Section>
  );
}
