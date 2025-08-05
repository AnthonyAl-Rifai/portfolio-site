"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { useLayout } from "../context/LayoutContext";
import Image from "next/image";
// import CallToAction from "./CallToAction";
import MenuIconAUpsideDown from "../icons/MenuIconAUpsideDown";
import { useRef } from "react";

// interface SenseiBonusProjectProps {
//   onClose: () => void;
// }

export default function SenseiBonusProject() {
  const { isMobileLandscape } = useLayout();
  const overviewRef = useRef(null);
  const isInView = useInView(overviewRef);
  const showChevron = !isInView;

  return (
    <div
      className={clsx(
        "min-h-screen flex flex-col  bg-white",
        isMobileLandscape ? "px-4 py-8 pb-4 gap-8 mb-4" : "px-4 gap-16 mb-16"
      )}
    >
      {/* Hero Section */}
      <div
        className={clsx(
          "relative flex flex-col items-center text-center",
          isMobileLandscape
            ? "h-auto min-h-screen gap-8 mt-[calc(2*var(--layout-size))]"
            : "h-[calc(100vh-3*var(--layout-size))] justify-center gap-16 mt-[calc(1.5*var(--layout-size))]"
        )}
      >
        <motion.h1
          className={clsx(
            "font-bold text-black mb-6",
            isMobileLandscape ? "text-4xl" : "text-4xl md:text-8xl"
          )}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0 }}
        >
          SB‑1 Audio Player
        </motion.h1>

        <motion.p
          className="text-2xl text-black max-w-3xl"
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
            isMobileLandscape ? "bottom-16" : "bottom-0"
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
        className="flex flex-col gap-8"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0 }}
      >
        <h2 className="text-3xl font-medium text-black">Project Overview</h2>

        <motion.div
          className="flex justify-center items-center w-full"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/sb-1-screenshot.png"
            alt="SB-1 Audio Player Screenshot"
            width={isMobileLandscape ? 400 : 800}
            height={isMobileLandscape ? 300 : 600}
            className="max-w-full h-auto"
            priority
          />
        </motion.div>

        <p className="text-lg text-black leading-relaxed">
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
        className="flex flex-col gap-8"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0 }}
      >
        <h2 className="text-3xl font-medium text-black">Key Highlights</h2>
        <ul className="flex flex-col gap-4">
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
              <span className="w-2 h-2 bg-black rounded-full mt-[0.5em] flex-shrink-0" />
              <span className="text-black">{text}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Technology Stack */}
      <motion.section
        className="flex flex-col items-center gap-8"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-medium text-black text-left w-full">
          Technology Stack
        </h2>

        {/* Frontend */}
        <div className="w-full">
          <h3 className="text-2xl font-medium text-black mb-4">Frontend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
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
                className="bg-white border border-black p-6 text-black text-center font-semibold flex justify-center items-center"
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
          <h3 className="text-2xl font-medium text-black mb-4">Backend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {["Express.js", "PostgreSQL"].map((name, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-black text-center font-semibold flex justify-center items-center"
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
          <h3 className="text-2xl font-medium text-black mb-4">
            DevOps & Tooling
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {["AWS S3", "Heroku"].map((name, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-black text-center font-semibold flex justify-center items-center"
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
          <h3 className="text-2xl font-medium text-black mb-4">Testing</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {["Jest"].map((name, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-black text-center font-semibold flex justify-center items-center"
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

      {/* <CallToAction onButtonClick={onClose} /> */}
    </div>
  );
}
