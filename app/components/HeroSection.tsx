"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import GridSection from "./GridSection";

export default function HeroSection() {
  const titles = [
    "Full Stack Developer",
    "Frontend Engineer",
    "Composer",
    "Artist",
    "Pit Master",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex(prevIndex => (prevIndex + 1) % titles.length);
    }, 3000); // Change title every 3 seconds

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <Section id="hero">
      <GridSection>
        <h1
          className="text-6xl mx-4 font-bold overflow-hidden row-start-3 col-span-full md:text-7xl md:row-start-4 pt-4 self-center sm:flex md:block lg:text-9xl"
          style={{ minHeight: "2.5em" }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentTitleIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }} // Faster fade out
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ display: "block" }}
            >
              {titles[currentTitleIndex]}
            </motion.span>
          </AnimatePresence>
        </h1>
        <p className="text-xl font-bold col-start-2 row-start-6 col-span-full md:text-2xl md:col-start-5 md:row-start-7">
          <motion.span
            className="block mr-4"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          >
            Design-minded, detail-obsessed, always curious.
          </motion.span>
          <motion.span
            className="block h-0.25 bg-black my-2"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.7, ease: "easeOut" }}
          />
        </p>
      </GridSection>
    </Section>
  );
}
