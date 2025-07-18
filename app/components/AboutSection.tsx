"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

export default function AboutSection() {
  const sectionRef = useRef(null);

  const topLineStyle = "text-3xl font-medium leading-relaxed";
  const bottomLineStyle = "text-3xl font-light leading-relaxed";

  // useRef<HTMLDivElement>(null) is RefObject<HTMLDivElement | null>
  const line0Ref = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const line5Ref = useRef<HTMLDivElement>(null);

  // Accept a wide-enough ref type
  const useLineMotion = (ref: React.RefObject<HTMLElement | null>) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "center center"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

    return { style: { opacity, y } };
  };

  // Works now with no errors
  const line0 = useLineMotion(line0Ref);
  const line1 = useLineMotion(line1Ref);
  const line2 = useLineMotion(line2Ref);
  const line3 = useLineMotion(line3Ref);
  const line4 = useLineMotion(line4Ref);
  const line5 = useLineMotion(line5Ref);

  return (
    <Section ref={sectionRef} id="about" className="h-auto">
      <SectionTitle name="About" isSticky />

      <div
        className="
          grid gap-y-48 p-4 py-24
          grid-cols-1 grid-rows-auto
          md:grid-cols-8
          lg:grid-cols-16
        "
      >
        <motion.div
          ref={line0Ref}
          {...line0}
          className="col-span-full flex flex-col"
        >
          <p className={topLineStyle}>I&apos;m Anthony,</p>
          <p className={bottomLineStyle}>
            a software engineer and composer based in Los Angeles.
          </p>
        </motion.div>

        <motion.div
          ref={line1Ref}
          {...line1}
          className="col-span-full flex flex-col"
        >
          <p className={topLineStyle}>I build web applications</p>
          <p className={bottomLineStyle}>
            that are intuitive, accessible, and meaningful to real people.
          </p>
        </motion.div>

        <motion.div
          ref={line2Ref}
          {...line2}
          className="col-span-full flex flex-col"
        >
          <p className={topLineStyle}>I bring a creative edge</p>
          <p className={bottomLineStyle}>
            from my background in music and a love of clean, thoughtful code.
          </p>
        </motion.div>

        <motion.div
          ref={line3Ref}
          {...line3}
          className="col-span-full flex flex-col"
        >
          <p className={topLineStyle}>I care about the details</p>
          <p className={bottomLineStyle}>
            from solving complex UX challenges to collaborating across teams.
          </p>
        </motion.div>

        <motion.div
          ref={line4Ref}
          {...line4}
          className="col-span-full flex flex-col"
        >
          <p className={topLineStyle}>I stay curious</p>
          <p className={bottomLineStyle}>
            and I&apos;m always learning, building, and refining.
          </p>
        </motion.div>

        <motion.div
          ref={line5Ref}
          {...line5}
          className="col-span-full flex flex-col"
        >
          <p className={topLineStyle}>Let&apos;s connect.</p>
        </motion.div>
      </div>
    </Section>
  );
}
