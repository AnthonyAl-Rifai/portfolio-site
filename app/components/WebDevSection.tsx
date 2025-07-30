"use client";

import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { useState, useRef } from "react";
import { useLayout } from "../context/LayoutContext";
import MenuIconA from "../icons/MenuIconA";
import MenuIconAUpsideDown from "../icons/MenuIconAUpsideDown";
import MenuIconARight from "../icons/MenuIconARight";
import { AnimatePresence, motion } from "motion/react";
import SuawProject from "./SuawProject";
import BudSpotProject from "./BudSpotProject";
import DbSpyProject from "./DbSpyProject";
import SkillsProject from "./SkillsProject";
import CallToAction from "./CallToAction";
type ProjectType =
  | "Shut Up & Write!"
  | "dbSpy"
  | "BudSpot."
  | "SB-1 Audio Player"
  | "Skills"
  | null;

export default function WebDevSection() {
  const { isMobileLandscape } = useLayout();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType>(null);
  const [showCloseAnimation, setShowCloseAnimation] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const openDrawer = (project: ProjectType) => {
    setSelectedProject(project);
    setDrawerOpen(true);
    setShowCloseAnimation(false);
    setTimeout(() => setShowCloseAnimation(true), 50);
  };

  const closeDrawer = () => {
    setShowCloseAnimation(false);
    setDrawerOpen(false);
    setSelectedProject(null);
    sectionRef.current?.scrollIntoView();
  };

  return (
    <Section id="webdev" ref={sectionRef}>
      <SectionTitle name="Web Dev" isSticky />
      <div
        className={`grid gap-4 p-4 ${
          isMobileLandscape
            ? "h-[calc(100vh-var(--layout-size))]"
            : "h-[calc(100vh-2*var(--layout-size))]"
        } grid-cols-4 grid-rows-8`}
      >
        {[
          "Shut Up & Write!",
          "dbSpy",
          "BudSpot.",
          "SB-1 Audio Player",
          "Skills",
        ].map((project, index) => (
          <motion.button
            key={project}
            onClick={() => openDrawer(project as ProjectType)}
            className="flex items-center justify-between p-4 border-y border-l col-span-full"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg font-semibold">{project}</span>
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            >
              <MenuIconARight size={20} color="#000" />
            </motion.div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {drawerOpen && selectedProject && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-white border-l h-dvh"
          >
            <motion.div className="h-full flex flex-col overflow-y-auto">
              <div className="sticky top-0 h-[var(--layout-size)] flex justify-between items-center bg-white z-10">
                <h2 className="text-4xl font-bold mx-4 whitespace-nowrap">
                  {selectedProject}
                </h2>
                <button
                  onClick={closeDrawer}
                  className="flex items-center w-[var(--layout-size)] h-[var(--layout-size)] border-l justify-center z-50"
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

              <div className="flex-1 bg-white">
                {selectedProject === "BudSpot." && (
                  <BudSpotProject onClose={() => setSelectedProject(null)} />
                )}
                {selectedProject === "dbSpy" && (
                  <DbSpyProject onClose={() => setSelectedProject(null)} />
                )}
                {selectedProject === "Shut Up & Write!" && (
                  <SuawProject onClose={() => setSelectedProject(null)} />
                )}
                {selectedProject === "SB-1 Audio Player" && (
                  <div className="min-h-screen flex flex-col gap-16 bg-white p-4 mb-16">
                    <div className="relative h-[calc(100vh-3*var(--layout-size))] flex flex-col items-center justify-center text-center gap-16">
                      <motion.h1
                        className="text-6xl md:text-8xl font-bold text-black mb-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        SB-1 Audio Player
                      </motion.h1>
                      <motion.p
                        className="text-2xl text-black max-w-3xl"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        A custom audio player built for the Sensei Bonus music
                        project.
                      </motion.p>
                    </div>
                    <motion.section
                      className="flex flex-col gap-8"
                      initial={{ y: 100, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true, amount: 0 }}
                    >
                      <h2 className="text-4xl font-bold text-black">
                        Project Overview
                      </h2>
                      <p className="text-lg text-black leading-relaxed">
                        SB-1 Audio Player is a custom-built audio player
                        component designed specifically for the Sensei Bonus
                        music project. Built with modern web technologies, it
                        features a unique circular scrubber interface, real-time
                        audio visualization, and smooth animations that enhance
                        the listening experience.
                      </p>
                    </motion.section>
                    <motion.section
                      className="flex flex-col gap-8"
                      initial={{ y: 100, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true, amount: 0 }}
                    >
                      <h2 className="text-4xl font-bold text-black">
                        Key Features
                      </h2>
                      <ul className="flex flex-col gap-4">
                        {[
                          "Custom circular scrubber with touch and mouse interaction",
                          "Real-time audio visualization with Web Audio API",
                          "Smooth animations and transitions using Motion library",
                          "Responsive design that works across all devices",
                          "Custom audio controls with pitch and speed adjustment",
                        ].map((text, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-black rounded-full mt-[0.5em] flex-shrink-0" />
                            <span className="text-black">{text}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.section>
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
                      <div className="w-full">
                        <h3 className="text-2xl font-bold text-black mb-4">
                          Frontend
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                          {[
                            { name: "React" },
                            { name: "TypeScript" },
                            { name: "Motion" },
                            { name: "Web Audio API" },
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
                    </motion.section>
                    <CallToAction
                      onButtonClick={() => setSelectedProject(null)}
                    />
                  </div>
                )}
                {selectedProject === "Skills" && (
                  <SkillsProject onClose={() => setSelectedProject(null)} />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
