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
    if (drawerOpen && selectedProject !== project) {
      // Close current drawer
      setDrawerOpen(false);
      setShowCloseAnimation(false);

      // After animation completes, open new project
      setTimeout(() => {
        setSelectedProject(project);
        setDrawerOpen(true);
        setTimeout(() => setShowCloseAnimation(true), 1000);
      }, 500); // match your exit animation duration
    } else {
      // Normal open behavior
      setSelectedProject(project);
      setDrawerOpen(true);
      setShowCloseAnimation(false);
      setTimeout(() => setShowCloseAnimation(true), 50);
    }
  };

  const closeDrawer = () => {
    setShowCloseAnimation(false);
    setDrawerOpen(false);
    setSelectedProject(null);
    sectionRef.current?.scrollIntoView();
  };

  const stickyWrapperClasses = clsx(
    "sticky z-20 bg-white",
    isMobileLandscape
      ? "top-[var(--layout-size)]"
      : "top-[calc(2*var(--layout-size))]"
  );

  const innerGridClasses = clsx(
    "grid gap-4 p-4 grid-cols-4 md:p-0 md:gap-0",
    isMobileLandscape
      ? "h-[calc(100vh-var(--layout-size))] grid-rows-6"
      : "h-[calc(100vh-2*var(--layout-size))] grid-rows-6"
  );

  const renderProject = () => {
    switch (selectedProject) {
      case "BudSpot.":
        return <BudSpotProject onClose={closeDrawer} />;
      case "dbSpy":
        return <DbSpyProject onClose={closeDrawer} />;
      case "Shut Up & Write!":
        return <SuawProject onClose={closeDrawer} />;
      case "SB-1 Audio Player":
        return <SenseiBonusProject onClose={closeDrawer} />;
      case "Skills":
        return <SkillsProject onClose={closeDrawer} />;
      default:
        return null;
    }
  };

  return (
    <Section id="webdev" ref={sectionRef} className="h-auto">
      <SectionTitle name="Web Dev" isSticky />

      <div className="relative">
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
                className="flex items-center justify-between p-4 border col-span-full md:col-span-1 md:col-start-1 md:border-0 md:border-b md:text-left cursor-pointer"
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

            {/* Placeholder */}
            <div className="hidden md:flex col-start-2 col-span-3 row-start-1 row-span-5 border-b border-l bg-white items-center justify-center p-8 text-center z-0">
              <p className="text-lg font-medium w-1/2">
                Click on the project button to find out more about what
                I&apos;ve worked on.
              </p>
            </div>

            {/* Modal INSIDE grid for tablet+ */}
            <AnimatePresence mode="wait">
              {drawerOpen && selectedProject && (
                <div className="hidden md:flex col-start-2 col-span-3 row-start-1 row-span-5 overflow-x-hidden overflow-y-auto z-10">
                  <motion.div
                    key={selectedProject}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex flex-col border-b border-l bg-white w-full overflow-y-auto"
                  >
                    <div className="sticky top-0 h-[var(--layout-size)] flex justify-between items-center bg-white z-10">
                      <h2 className="text-2xl font-bold mx-4">
                        {selectedProject}
                      </h2>

                      <button
                        onClick={closeDrawer}
                        className="flex items-center justify-center w-[var(--layout-size)] h-[var(--layout-size)] border-l"
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

                      {/* Animated bottom border (TABLET) */}
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

                    <div className="flex-1 overflow-y-auto">
                      {renderProject()}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="relative h-[125vh]" />
      </div>

      {/* Full-screen modal for mobile/landscape mobile */}
      <AnimatePresence mode="wait">
        {drawerOpen && selectedProject && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 z-50 bg-white border-l h-dvh"
          >
            <motion.div className="h-full flex flex-col overflow-hidden">
              <div
                className={clsx(
                  isMobileLandscape
                    ? "absolute top-0 right-0 h-full w-[var(--layout-size)] flex flex-col items-center justify-start bg-white z-10"
                    : "sticky top-0 h-[var(--layout-size)] w-full flex justify-between items-center bg-white z-10 relative"
                )}
              >
                {!isMobileLandscape && (
                  <h2 className="text-4xl font-bold mx-4 whitespace-nowrap">
                    {selectedProject}
                  </h2>
                )}
                <button
                  onClick={closeDrawer}
                  className="flex items-center justify-center w-[var(--layout-size)] h-[var(--layout-size)] border-l z-50"
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

                {isMobileLandscape && (
                  <h2 className="text-vertical text-2xl font-bold mt-6 mb-4 whitespace-nowrap">
                    {selectedProject}
                  </h2>
                )}

                {/* Animated bottom border (MOBILE) */}
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

              <div
                className={clsx(
                  "flex-1 bg-white overflow-y-auto",
                  isMobileLandscape ? "pr-[var(--layout-size)]" : ""
                )}
              >
                {renderProject()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
