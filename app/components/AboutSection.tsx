"use client";

import { motion } from "motion/react";
// import Image from "next/image";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import StickyParagraph from "./StickyParagraph";

export default function AboutSection() {
  const topLineStyle = "text-3xl font-medium leading-relaxed";
  const bottomLineStyle = "text-3xl font-light leading-relaxed";

  const fadeInOut = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { amount: 0.4, once: false },
  };

  const lines = [
    {
      top: "",
      bottom: "",
    },
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

  return (
    <Section id="about" className="h-auto">
      <SectionTitle name="About" isSticky />
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        <div className="col-span-full sticky top-[calc(2*var(--layout-size))] z-20">
          <div className="relative bg-white">
            <motion.div
              key="intro"
              {...fadeInOut}
              className="flex flex-col py-4 relative"
            >
              <p className={topLineStyle}>I&apos;m Anthony,</p>
              <p className={bottomLineStyle}>
                a software engineer and composer based in Los Angeles.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="col-span-full">
          {/* Image block */}
          {/* <motion.div
            key="image"
            className="flex justify-center mt-8 overflow-hidden rounded-lg"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            viewport={{ amount: 0, once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Image
              src="/anthony-big-sur.jpg"
              alt="Anthony in Big Sur"
              width={800}
              height={600}
              className="w-full max-w-2xl h-auto"
              priority
            />
          </motion.div> */}

          {/* Scroll‑pin paragraphs */}
          {lines.map((line, idx) => (
            <StickyParagraph
              key={idx}
              top={line.top}
              bottom={line.bottom}
              topLineStyle={topLineStyle}
              bottomLineStyle={bottomLineStyle}
            />
          ))}
          <div className="relative h-[200vh]">
            {/* taller container */}
            <motion.div className="sticky top-[calc(6*var(--layout-size))] z-10 flex flex-col bg-white">
              <div className={topLineStyle}>
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
