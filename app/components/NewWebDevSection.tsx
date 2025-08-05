"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { motion } from "motion/react";
import clsx from "clsx";
import SuawProject from "./SuawProject";
import DbSpyProject from "./DbSpyProject";
import BudSpotProject from "./BudSpotProject";
import SenseiBonusProject from "./SenseiBonusProject";
import SkillsProject from "./SkillsProject";
import MenuIconARight from "../icons/MenuIconARight";
import { useLayout } from "../context/LayoutContext";
import { useIsLargerThanMobile } from "../hooks/useIsLargerThanMobile";
import SectionTitle from "./SectionTitle";
export default function NewWebDevSection() {
  const isLargerThanMobile = useIsLargerThanMobile();
  const { isMobileLandscape } = useLayout();
  const projectIds = [
    { id: "suaw", label: "Shut Up & Write!", shortLabel: "SUAW" },
    { id: "dbspy", label: "dbSpy", shortLabel: "dbSpy" },
    { id: "budspot", label: "BudSpot.", shortLabel: "BudSpot" },
    { id: "sb1", label: "SB-1 Audio Player", shortLabel: "SB-1" },
    { id: "skills", label: "Skills", shortLabel: "Skills" },
  ];

  const suawRef = useRef(null);
  const dbspyRef = useRef(null);
  const budspotRef = useRef(null);
  const sb1Ref = useRef(null);
  const skillsRef = useRef(null);

  const suawInView = useInView(suawRef);
  const dbspyInView = useInView(dbspyRef);
  const budspotInView = useInView(budspotRef);
  const sb1InView = useInView(sb1Ref);
  const skillsInView = useInView(skillsRef);

  const inViews = [
    suawInView,
    dbspyInView,
    budspotInView,
    sb1InView,
    skillsInView,
  ];
  const activeIndex = inViews.findIndex(Boolean);

  return (
    <section
      id="webdev"
      className={clsx(
        "relative grid",
        "grid-cols-1 grid-rows-[var(--layout-size)_var(--layout-size)_1fr]",
        "md:grid-cols-[1fr_4fr] md:grid-rows-[var(--layout-size)_1fr]"
      )}
    >
      {/* Sticky Header */}
      {/* <div className="col-span-full border-b flex items-center p-4 sticky top-[var(--layout-size)] bg-white z-20">
        <h1 className="text-4xl font-bold">Web Dev</h1>
      </div> */}
      <SectionTitle name="Web Dev" isSticky />
      {/* Sidebar or TopNav */}
      {isLargerThanMobile ? (
        <div className="sticky z-10 top-[calc(2*var(--layout-size))] h-[calc(100dvh-2*var(--layout-size))] w-full grid grid-rows-5 border-r bg-white">
          {projectIds.map(({ id, label }, index) => (
            <motion.a
              key={id}
              href={`#${id}`}
              className={clsx(
                "flex items-center justify-between p-4 border-b cursor-pointer text-left transition-colors",
                activeIndex === index ? "bg-gray-200 font-bold" : ""
              )}
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl lg:text-4xl font-bold">{label}</span>
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
            </motion.a>
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-5 border-b sticky bg-white z-10 h-[calc(var(--layout-size)/2)]"
          style={{
            top: isMobileLandscape
              ? "var(--layout-size)"
              : "calc(2*var(--layout-size))",
          }}
        >
          {projectIds.map(({ id, shortLabel }, index) => (
            <motion.a
              key={id}
              href={`#${id}`}
              className={clsx(
                "flex items-center justify-center px-2 border-r text-sm font-bold transition-colors",
                activeIndex === index ? "bg-gray-200" : ""
              )}
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.98 }}
            >
              {shortLabel}
            </motion.a>
          ))}
        </div>
      )}

      {/* Project Content */}
      <div className="md:col-start-2 border-b">
        <div
          id="suaw"
          ref={suawRef}
          className="scroll-mt-[calc(2*var(--layout-size))]"
        >
          <SuawProject />
        </div>
        <div id="dbspy" ref={dbspyRef}>
          <DbSpyProject />
        </div>
        <div id="budspot" ref={budspotRef}>
          <BudSpotProject />
        </div>
        <div id="sb1" ref={sb1Ref}>
          <SenseiBonusProject />
        </div>
        <div id="skills" ref={skillsRef}>
          <SkillsProject />
        </div>
      </div>
    </section>
  );
}
