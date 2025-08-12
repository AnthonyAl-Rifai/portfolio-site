"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { useLayout } from "../../context/LayoutContext";
import Image from "next/image";
import MenuIconAUpsideDown from "../../icons/MenuIconAUpsideDown";
import { useRef } from "react";
import SectionTitle from "../common/SectionTitle";

export default function SenseiBonusProject() {
  const { isMobileLandscape } = useLayout();
  const overviewRef = useRef(null);
  const isInView = useInView(overviewRef);
  const showChevron = !isInView;

  return (
    <div
      className={clsx(
        "min-h-screen flex flex-col",
        isMobileLandscape
          ? "px-4 pb-8 gap-8 mb-4"
          : "px-4 gap-16 pb-16 lg:px-8 3xl:border-x"
      )}
    >
      {/* Hero Section */}
      <div
        className={clsx(
          "relative flex flex-col items-center text-center",
          isMobileLandscape
            ? "h-auto min-h-screen gap-8"
            : "h-[calc(100vh-2*var(--layout-size))] min-h-0 justify-center gap-16 pb-20 md:pb-32"
        )}
      >
        <motion.h1
          className={clsx(
            "font-bold mb-6",
            isMobileLandscape
              ? "text-4xl"
              : "text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
          )}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0 }}
        >
          SB‑1 Audio Player
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl md:px-8 lg:px-24 lg:text-4xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          A retro‑inspired web audio player with advanced playback controls and
          immersive design
        </motion.p>

        <div
          className={clsx(
            "absolute",
            isMobileLandscape
              ? "bottom-16"
              : "bottom-24 md:bottom-32 lg:bottom-16"
          )}
        >
          <AnimatePresence>
            {showChevron && (
              <motion.div
                key="chevron"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MenuIconAUpsideDown size={24} color="#000" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Overview */}
      <motion.section
        ref={overviewRef}
        className="flex flex-col gap-8 md:gap-12"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0 }}
      >
        <SectionTitle name="Project Overview" zIndex={20} removeLeftPadding />

        <motion.div
          className="flex justify-center items-center w-full"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/assets/images/projects/senseibonus/sb-1-screenshot.png"
            alt="SB-1 Audio Player Screenshot"
            width={800}
            height={600}
            className="w-2/3 lg:w-1/2 xl:w-2/5"
            priority
          />
        </motion.div>

        <p className="leading-relaxed text-xl lg:text-2xl xl:text-3xl">
          SB‑1 Audio Player is a web‑based audio player built for my music
          project Sensei Bonus that merges the tactile charm of vintage cassette
          decks with modern web technologies. Built with React and TypeScript,
          it features advanced audio manipulation like reverse playback and
          real‑time pitch control, while maintaining a polished retro aesthetic.
          The player supports seamless mobile background playback and delivers a
          responsive, optimized experience across devices.
        </p>
      </motion.section>

      {/* Key Highlights */}
      <motion.section
        className="flex flex-col gap-8 md:gap-12"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0 }}
      >
        <SectionTitle name="Key Highlights" zIndex={20} removeLeftPadding />
        <ul className="flex flex-col gap-4 text-lg md:gap-6 lg:text-2xl xl:text-3xl">
          {[
            "Designed and implemented advanced audio features including reverse playback and real‑time pitch control",
            "Created a custom canvas‑based circular scrubber with realistic shading and smooth visual feedback",
            "Integrated the Media Session API to enable seamless mobile background playback",
            "Built a modular React architecture using custom hooks and context for state management",
            "Optimized performance with efficient event handling, preloading, and reduced memory usage",
            "Combined creative retro design with modern UX best practices for an immersive user experience",
            "Deployed and hosted audio assets with a scalable pipeline using Heroku and AWS S3",
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-2 h-2 bg-black rounded-full mt-[0.6em] flex-shrink-0 xl:mt-[0.5em]" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Technology Stack */}
      <motion.section
        className="flex flex-col items-center gap-8 md:gap-12"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SectionTitle name="Technology Stack" zIndex={20} removeLeftPadding />

        {/* Frontend */}
        <div className="w-full">
          <h3 className="text-2xl font-medium mb-4 lg:text-3xl">Frontend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 xl:grid-cols-4">
            {[
              "React",
              "TypeScript",
              "Emotion",
              "Web Audio API",
              "React Context",
              "Custom Hooks",
            ].map((name, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-center font-semibold flex justify-center items-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="w-full">
          <h3 className="text-2xl font-medium mb-4 lg:text-3xl">Backend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 xl:grid-cols-4">
            {["Express.js", "PostgreSQL"].map((name, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-center font-semibold flex justify-center items-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* DevOps & Tooling */}
        <div className="w-full">
          <h3 className="text-2xl font-medium mb-4 lg:text-3xl">
            DevOps & Tooling
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 xl:grid-cols-4">
            {["AWS S3", "Heroku"].map((name, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-center font-semibold flex justify-center items-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testing */}
        <div className="w-full">
          <h3 className="text-2xl font-medium mb-4 lg:text-3xl">Testing</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 xl:grid-cols-4">
            {["Jest"].map((name, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-center font-semibold flex justify-center items-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
