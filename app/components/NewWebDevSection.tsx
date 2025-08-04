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

export default function NewWebDevSection() {
  const projectIds = [
    { id: "suaw", label: "Shut Up & Write!" },
    { id: "dbspy", label: "dbSpy" },
    { id: "budspot", label: "BudSpot." },
    { id: "sb1", label: "SB-1 Audio Player" },
    { id: "skills", label: "Skills" },
  ];

  const suawRef = useRef(null);
  const dbspyRef = useRef(null);
  const budspotRef = useRef(null);
  const sb1Ref = useRef(null);
  const skillsRef = useRef(null);

  const suawInView = useInView(suawRef, { margin: "0px 0px 0px 0px" });
  const dbspyInView = useInView(dbspyRef, { margin: "0px 0px 0px 0px" });
  const budspotInView = useInView(budspotRef, {
    margin: "-128px 0px 0px 0px",
  });
  const sb1InView = useInView(sb1Ref, { margin: "-128px 0px 0px 0px" });
  const skillsInView = useInView(skillsRef, { margin: "-128px 0px 0px 0px" });

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
      className="relative grid"
      style={{
        gridTemplateColumns: "1fr 4fr",
        gridTemplateRows: "var(--layout-size) 1fr",
      }}
    >
      {/* Sticky Header */}
      <div className="col-span-full border-b flex items-center p-4 sticky top-[var(--layout-size)] bg-white z-20">
        <h1 className="text-4xl font-bold">Web Dev</h1>
      </div>

      {/* Sidebar */}
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
            <span className="text-4xl font-bold">{label}</span>
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

      {/* Project Content */}
      <div className="col-start-2 border-b">
        <div id="suaw" ref={suawRef}>
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
