"use client";

import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { useState, useRef } from "react";
import { useLayout } from "../context/LayoutContext";
import MenuIconA from "../icons/MenuIconA";
import MenuIconAUpsideDown from "../icons/MenuIconAUpsideDown";
import { AnimatePresence, motion } from "motion/react";
import SuawProject from "./SuawProject";
import BudSpotProject from "./BudSpotProject";
import DBSpyProject from "./DBSpyProject";
import SkillsProject from "./SkillsProject";
type ProjectType = "Shut Up & Write!" | "DbSpy" | "BudSpot." | "Skills" | null;

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
            ? "h-[calc(100dvh-var(--layout-size))]"
            : "h-[calc(100dvh-2*var(--layout-size))]"
        } grid-cols-4 grid-rows-5`}
      >
        {["Shut Up & Write!", "DbSpy", "BudSpot.", "Skills"].map(project => (
          <motion.button
            key={project}
            onClick={() => openDrawer(project as ProjectType)}
            className="flex items-center justify-center border col-span-full"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg font-semibold">{project}</span>
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
                {selectedProject === "DbSpy" && (
                  <DBSpyProject onClose={() => setSelectedProject(null)} />
                )}
                {selectedProject === "Shut Up & Write!" && (
                  <SuawProject onClose={() => setSelectedProject(null)} />
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
