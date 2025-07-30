"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import StickyParagraph from "./StickyParagraph";
import { useLayout } from "../context/LayoutContext";
import { useIsLargerThanMobile } from "../hooks/useIsLargerThanMobile";
import Image from "next/image";

export default function AboutSection() {
  const { isMobileLandscape } = useLayout();
  const isLargerThanMobile = useIsLargerThanMobile();

  const fadeInOut = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { amount: 0.4, once: false },
  };

  const lines = [
    { top: "", bottom: "" },
    {
      top: "I build web applications",
      bottom: "that are intuitive, accessible, and meaningful to real people.",
    },
    {
      top: "I bring a creative edge",
      bottom:
        "from my background in music and a love of clean, thoughtful code.",
    },
    {
      top: "I care about the details",
      bottom:
        "from solving complex UX challenges to collaborating across teams.",
    },
    {
      top: "I stay curious",
      bottom: "and I’m always learning, building, and refining.",
    },
  ];

  const gridClasses = clsx(
    "relative grid grid-cols-1 md:grid-cols-2 gap-4 px-4",
    isMobileLandscape && ""
  );

  const stickyIntroWrapper = clsx(
    "col-span-full sticky z-20",
    "top-[calc(2*var(--layout-size))]",
    "md:col-span-1",
    isMobileLandscape && "top-[var(--layout-size)]"
  );

  const stickyIntroInner = "relative bg-white";

  const lineClasses = {
    top: clsx(
      "text-3xl font-medium leading-relaxed",
      isMobileLandscape && "text-2xl"
    ),
    bottom: clsx(
      "text-3xl font-light leading-relaxed",
      isMobileLandscape && "text-xl"
    ),
  };

  const connectWrapperClasses = clsx(
    "relative",
    isMobileLandscape ? "h-[150vh]" : "h-[175vh]"
  );

  const connectBlockClasses = clsx(
    "sticky z-10 flex flex-col bg-white",
    isMobileLandscape
      ? "top-[calc(3*var(--layout-size)-1rem)]"
      : "top-[calc(6*var(--layout-size))]"
  );

  const stickyImageWrapper = clsx(
    "sticky z-10 flex justify-center overflow-hidden py-4 rounded-lg",
    "md:col-span-1 md:col-start-2",
    isMobileLandscape
      ? "top-[calc(3*var(--layout-size)-1rem)]"
      : "top-[calc(2*var(--layout-size))]"
  );

  // const carouselWrapperClasses = clsx(
  //   "sticky bottom-0 left-0 right-0 w-full z-20 bg-white",
  //   isLargerThanMobile && "pb-4"
  // );

  return (
    <Section id="about" className="h-auto">
      <SectionTitle name="About" isSticky />

      <div className={gridClasses}>
        {/* Sticky Intro */}
        <div className={stickyIntroWrapper}>
          <div className={stickyIntroInner}>
            <motion.div
              key="intro"
              {...fadeInOut}
              className="flex flex-col py-4 relative"
            >
              <p className={lineClasses.top}>I&apos;m Anthony,</p>
              <p className={lineClasses.bottom}>
                a software engineer and composer based in Los Angeles.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Sticky Image */}
        {isLargerThanMobile && (
          <div className={stickyImageWrapper}>
            <motion.div
              key="image"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              viewport={{ amount: 0, once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="w-full max-w-2xl"
            >
              <Image
                src="/anthony-big-sur.jpg"
                alt="Anthony in Big Sur"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
                priority
              />
            </motion.div>
          </div>
        )}

        {/* Sticky Paragraphs */}
        <div className="col-span-full md:col-span-1">
          {lines.map((line, idx) => (
            <StickyParagraph
              key={idx}
              top={line.top}
              bottom={line.bottom}
              topLineStyle={lineClasses.top}
              bottomLineStyle={lineClasses.bottom}
            />
          ))}

          <div className={connectWrapperClasses}>
            <motion.div className={connectBlockClasses}>
              <div className={lineClasses.top}>
                Let&apos;s{" "}
                <motion.button
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView()
                  }
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  connect.
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
