"use client";
import { useLayout } from "../../context/LayoutContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import Section from "../common/Section";

export default function HeroSection() {
  const titles = [
    "Full Stack Developer",
    "Frontend Engineer",
    "Web Designer",
    "Composer",
    "Artist",
    "Pit Master",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const { isMobileLandscape } = useLayout();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex(prevIndex => (prevIndex + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <Section id="hero">
      <div
        className={clsx(
          "grid grid-rows-10 grid-cols-4 gap-4 flex-1 h-full md:grid-cols-8 md:grid-rows-8 text-6xl",
          isMobileLandscape && "min-h-[100vh]"
        )}
      >
        <h1
          className={clsx(
            "mx-4 font-medium row-start-3 col-span-full pt-4 self-center",
            "sm:flex",
            "md:row-start-3 md:pt-16 md:block md:col-span-6",
            "lg:row-start-4 lg:mx-8 lg:pt-0 lg:col-span-4",
            isMobileLandscape && "row-start-3"
          )}
          style={{
            minHeight: "2.5em",
            fontSize: "clamp(4rem, 8vw, 13rem)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentTitleIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              style={{ display: "block" }}
            >
              {titles[currentTitleIndex]}
            </motion.span>
          </AnimatePresence>
        </h1>

        <p
          className={clsx(
            "text-xl font-medium col-start-2 row-start-6 col-span-full",
            "md:text-2xl md:col-start-4 md:row-start-6",
            "lg:col-start-5 lg:self-center",
            "xl:text-3xl",
            "3xl:col-start-6",
            isMobileLandscape && "row-start-6"
          )}
        >
          <motion.span
            className="block mr-4"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          >
            Design-minded, detail-obsessed, always curious.
          </motion.span>
          <motion.span
            className="block h-0.25 bg-black my-2 origin-right"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.7, ease: "easeOut" }}
          />
        </p>
      </div>
    </Section>
  );
}
