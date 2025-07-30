"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import Image from "next/image";
import CallToAction from "./CallToAction";
import MenuIconAUpsideDown from "../icons/MenuIconAUpsideDown";
import { useRef } from "react";

interface SenseiBonusProjectProps {
  onClose: () => void;
}

export default function SenseiBonusProject({
  onClose,
}: SenseiBonusProjectProps) {
  const overviewRef = useRef(null);
  const isInView = useInView(overviewRef);
  const showChevron = !isInView;

  return (
    <div className="min-h-screen flex flex-col gap-16 bg-white p-4 mb-16">
      {/* Hero Section */}
      <div className="relative h-[calc(100vh-3*var(--layout-size))] flex flex-col items-center justify-center text-center gap-16">
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-black mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
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

        <div className="absolute bottom-0">
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
        <h2 className="text-4xl font-bold text-black">Project Overview</h2>
        {/* Screenshot */}
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
            width={800}
            height={600}
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
        <h2 className="text-4xl font-bold text-black">Key Highlights</h2>
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
        <h2 className="text-4xl font-bold text-black text-left w-full">
          Technology Stack
        </h2>

        {/* Frontend */}
        <div className="w-full">
          <h3 className="text-2xl font-bold text-black mb-4">Frontend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { name: "React" },
              { name: "TypeScript" },
              { name: "Emotion" },
              { name: "Web Audio API" },
              { name: "Custom Hooks" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-black text-center font-semibold"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="w-full">
          <h3 className="text-2xl font-bold text-black mb-4">Backend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[{ name: "Express Server" }, { name: "Asset Serving" }].map(
              (tech, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-black p-6 text-black text-center font-semibold"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {tech.name}
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* DevOps & Tooling */}
        <div className="w-full">
          <h3 className="text-2xl font-bold text-black mb-4">
            DevOps & Tooling
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { name: "Webpack" },
              { name: "AWS S3" },
              { name: "Heroku" },
              { name: "ESLint" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-black text-center font-semibold"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testing */}
        <div className="w-full">
          <h3 className="text-2xl font-bold text-black mb-4">Testing</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{ name: "Jest" }, { name: "Component Validation" }].map(
              (tech, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-black p-6 text-black text-center font-semibold"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {tech.name}
                </motion.div>
              )
            )}
          </div>
        </div>
      </motion.section>

      <CallToAction onButtonClick={onClose} />
    </div>
  );
}
