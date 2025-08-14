"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";
import { motion } from "motion/react";
import clsx from "clsx";
import SuawProject from "../projects/SuawProject";
import DbSpyProject from "../projects/DbSpyProject";
import BudSpotProject from "../projects/BudSpotProject";
import SenseiBonusProject from "../projects/SenseiBonusProject";
import SkillsProject from "../projects/SkillsProject";
import MenuIconARight from "../../icons/MenuIconARight";
import { useLayout } from "../../context/LayoutContext";
import { useIsLargerThanMobile } from "../../hooks/useIsLargerThanMobile";
import SectionTitle from "../common/SectionTitle";

export default function DevelopmentSection() {
  const isLargerThanMobile = useIsLargerThanMobile();
  const { isMobileLandscape } = useLayout();
  const [activeIndex, setActiveIndex] = useState(0);

  const projectIds = [
    { id: "suaw", label: "Shut Up & Write!", shortLabel: "SUAW" },
    { id: "dbspy", label: "dbSpy", shortLabel: "dbSpy" },
    { id: "budspot", label: "BudSpot.", shortLabel: "BudSpot." },
    { id: "sb1", label: "SB-1 Audio Player", shortLabel: "SB-1" },
    { id: "skills", label: "Skills", shortLabel: "Skills" },
  ];

  const sectionTitleRef = useRef(null);
  const topNavVisible = useInView(sectionTitleRef, { amount: 1 });

  const suawRef = useRef(null);
  const dbspyRef = useRef(null);
  const budspotRef = useRef(null);
  const sb1Ref = useRef(null);
  const skillsRef = useRef(null);

  const suawInView = useInView(suawRef, {
    amount: isMobileLandscape ? 0 : 0.1,
  });
  const dbspyInView = useInView(dbspyRef, {
    amount: isMobileLandscape ? 0 : 0.1,
  });
  const budspotInView = useInView(budspotRef, {
    amount: isMobileLandscape ? 0 : 0.1,
  });
  const sb1InView = useInView(sb1Ref, { amount: isMobileLandscape ? 0 : 0.1 });
  const skillsInView = useInView(skillsRef, {
    amount: isMobileLandscape ? 0 : 0.1,
  });

  // Update activeIndex when a new section comes into view
  useEffect(() => {
    const inViews = [
      suawInView,
      dbspyInView,
      budspotInView,
      sb1InView,
      skillsInView,
    ];

    const newActiveIndex = inViews.findIndex(Boolean);
    if (newActiveIndex !== -1 && newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
  }, [
    suawInView,
    dbspyInView,
    budspotInView,
    sb1InView,
    skillsInView,
    activeIndex,
  ]);

  return (
    <section
      id="development"
      className={clsx(
        "relative grid border-b",
        "grid-cols-1 grid-rows-[var(--layout-size)_var(--layout-size)_1fr]",
        "md:grid-cols-[1fr_4fr] md:grid-rows-[var(--layout-size)_1fr] 3xl:bg-[var(--background-secondary)]"
      )}
    >
      <SectionTitle
        ref={sectionTitleRef}
        name="Development"
        isSticky
        showBottomBorder={isLargerThanMobile}
      />

      {isLargerThanMobile ? (
        <motion.div
          initial={{ x: "-100%" }}
          animate={topNavVisible ? { x: 0 } : { x: "-100%" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="sticky z-10 top-[calc(2*var(--layout-size))] h-[calc(100dvh-2*var(--layout-size))] w-full grid grid-rows-5  bg-[var(--background)]"
        >
          {projectIds.map(({ id, label }, index) => (
            <motion.a
              key={id}
              href={`#${id}`}
              animate={{
                backgroundColor:
                  activeIndex === index
                    ? "var(--background-secondary)"
                    : "var(--background)",
              }}
              transition={{
                duration: 0.2,
              }}
              className={clsx(
                "flex items-center justify-between p-4 cursor-pointer text-left font-bold border-r",
                index !== projectIds.length - 1 && "border-b",
                activeIndex === index && "3xl:border-r-0"
              )}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl 2xl:text-3xl 3xl:text-4xl font-medium">
                {label}
              </span>
              <motion.div
                variants={{
                  hover: { x: 6 },
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <MenuIconARight size={20} color="#000" />
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ x: "-100%" }}
          animate={topNavVisible ? { x: 0 } : { x: "-100%" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="grid grid-cols-5 border-y sticky bg-[var(--background)] z-30 h-[calc(var(--layout-size)/2)]"
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
              animate={{
                backgroundColor:
                  activeIndex === index
                    ? "var(--background-secondary)"
                    : "var(--background)",
              }}
              transition={{
                duration: 0.2,
                delay: 0.1,
              }}
              className={clsx(
                "flex items-center justify-center px-2 text-sm font-bold",
                index !== projectIds.length - 1 && "border-r"
              )}
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.98 }}
            >
              {shortLabel}
            </motion.a>
          ))}
        </motion.div>
      )}

      <div className="md:col-start-2 flex justify-center 3xl:bg-[var(--background-secondary)]">
        <div className="w-full max-w-[1300px] 3xl:bg-[var(--background)]">
          <div
            id="suaw"
            ref={suawRef}
            className="scroll-mt-[calc(2*var(--layout-size))]"
          >
            <SuawProject />
          </div>
          <div
            id="dbspy"
            ref={dbspyRef}
            className="scroll-mt-[calc(2*var(--layout-size))]"
          >
            <DbSpyProject />
          </div>
          <div
            id="budspot"
            ref={budspotRef}
            className="scroll-mt-[calc(2*var(--layout-size))]"
          >
            <BudSpotProject />
          </div>
          <div
            id="sb1"
            ref={sb1Ref}
            className="scroll-mt-[calc(2*var(--layout-size))]"
          >
            <SenseiBonusProject />
          </div>
          <div
            id="skills"
            ref={skillsRef}
            className="scroll-mt-[calc(2*var(--layout-size))]"
          >
            <SkillsProject />
          </div>
        </div>
      </div>
    </section>
  );
}
