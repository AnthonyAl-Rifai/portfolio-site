"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { useLayout } from "../context/LayoutContext";
import { useState, useRef } from "react";
import MenuIconA from "../icons/MenuIconA";
import MenuIconAUpsideDown from "../icons/MenuIconAUpsideDown";
import MenuIconARight from "../icons/MenuIconARight";
import { AnimatePresence } from "motion/react";
import SuawProject from "./SuawProject";
import BudSpotProject from "./BudSpotProject";
import DbSpyProject from "./DbSpyProject";
import SkillsProject from "./SkillsProject";
import SenseiBonusProject from "./SenseiBonusProject";

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

  // ✅ Classes
  const stickyWrapperClasses = clsx(
    "sticky z-20 bg-white",
    isMobileLandscape
      ? "top-[var(--layout-size)]"
      : "top-[calc(2*var(--layout-size))]"
  );

  const innerGridClasses = clsx(
    "grid gap-4 p-4 grid-cols-4 grid-rows-8",
    isMobileLandscape
      ? "h-[calc(100vh-var(--layout-size))]"
      : "h-[calc(100vh-2*var(--layout-size))]"
  );

  return (
    <Section id="webdev" ref={sectionRef} className="h-auto">
      <SectionTitle name="Web Dev" isSticky />

      <div className="relative">
        {/* Sticky container */}
        <div className={stickyWrapperClasses}>
          <div className={innerGridClasses}>
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
                className="flex items-center justify-between p-4 border-y border-l col-span-full cursor-pointer"
                whileHover={{ scale: 0.95 }}
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
        </div>

        {/* Scrollable content area (creates space for scroll while keeping buttons sticky) */}
        <div className="relative h-[125vh]" />
      </div>

      {/* Drawer */}
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
                  className="bg-black origin-left absolute left-0 right-0 bottom-0 h-px"
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
                  <SenseiBonusProject
                    onClose={() => setSelectedProject(null)}
                  />
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
