"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

export default function AboutSection() {
  const topLineStyle = "text-3xl font-medium leading-relaxed";
  const bottomLineStyle = "text-3xl font-light leading-relaxed";

  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { amount: 0.4, once: false },
  };

  return (
    <Section id="about" className="h-auto">
      <SectionTitle name="About" isSticky />

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <div className="pt-4 bg-white z-10 sticky top-[calc(2*var(--layout-size))]">
          <motion.div key="intro" {...fadeInOut} className="flex flex-col">
            <p className={topLineStyle}>I&apos;m Anthony,</p>
            <p className={bottomLineStyle}>
              a software engineer and composer based in Los Angeles.
            </p>
          </motion.div>
        </div>

        {/* Scrollable content below */}

        <AnimatePresence>
          <motion.div
            key="image"
            className="flex justify-center mt-8"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            viewport={{ amount: 0.2, once: false }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Image
              src="/anthony-big-sur.jpg"
              alt="Anthony in Big Sur"
              width={800}
              height={600}
              className="w-full max-w-2xl h-auto rounded-lg"
              priority
            />
          </motion.div>

          <motion.div
            key="line1"
            {...fadeInOut}
            className="flex flex-col my-12"
          >
            <p className={topLineStyle}>I build web applications</p>
            <p className={bottomLineStyle}>
              that are intuitive, accessible, and meaningful to real people.
            </p>
          </motion.div>

          <motion.div
            key="line2"
            {...fadeInOut}
            className="flex flex-col my-12"
          >
            <p className={topLineStyle}>I bring a creative edge</p>
            <p className={bottomLineStyle}>
              from my background in music and a love of clean, thoughtful code.
            </p>
          </motion.div>

          <motion.div
            key="line3"
            {...fadeInOut}
            className="flex flex-col my-12"
          >
            <p className={topLineStyle}>I care about the details</p>
            <p className={bottomLineStyle}>
              from solving complex UX challenges to collaborating across teams.
            </p>
          </motion.div>

          <motion.div
            key="line4"
            {...fadeInOut}
            className="flex flex-col my-12"
          >
            <p className={topLineStyle}>I stay curious</p>
            <p className={bottomLineStyle}>
              and I&apos;m always learning, building, and refining.
            </p>
          </motion.div>

          <motion.div
            key="connect"
            {...fadeInOut}
            className="flex flex-col my-12"
          >
            <div className={topLineStyle}>
              Let&apos;s{" "}
              <motion.button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView();
                }}
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
        </AnimatePresence>
      </div>
    </Section>
  );
}
