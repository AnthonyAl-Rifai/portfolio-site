"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

export default function NewAboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);

  // Track scroll progress of the first motion.div
  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["end end", "end start"],
  });

  // Track scroll progress of the second motion.div
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: divRef2,
    offset: ["end end", "end start"],
  });

  // Transform scroll progress to height animation (for first content div)
  const height1 = useTransform(
    scrollYProgress,
    [0.1, 0.3, 1], // scroll progress values
    [75, 300, 300] // height values in pixels
  );

  // Transform scroll progress to height animation (for second content div)
  const height2 = useTransform(
    scrollYProgress2,
    [0, 0.3, 0.8, 1], // scroll progress values
    [75, 75, 300, 300] // height values in pixels
  );

  // Transform scroll progress to width animation (for border divs)
  const width = useTransform(
    scrollYProgress,
    [0.1, 0.3, 1], // scroll progress values
    ["50%", "100%", "100%"] // width values
  );

  // Transform scroll progress to width animation (for second border divs)
  const width2 = useTransform(
    scrollYProgress2,
    [0, 0.3, 0.8, 1], // scroll progress values
    ["50%", "50%", "100%", "100%"] // width values
  );

  // Transform scroll progress to opacity animation (for first p tag)
  const opacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 1], // scroll progress values
    [0, 1, 1] // opacity values
  );

  // Transform scroll progress to opacity animation (for second p tag)
  const opacity2 = useTransform(
    scrollYProgress2,
    [0.1, 0.35, 0.8, 1], // scroll progress values
    [0, 0, 1, 1] // opacity values
  );

  // Transform scroll progress to y animation (for wrapper div)
  const y = useTransform(
    scrollYProgress,
    [0.1, 1], // scroll progress values
    ["0%", "60%"] // y values in percentages
  );

  return (
    <Section id="about" className="h-[200vh]" ref={containerRef}>
      <SectionTitle name="About" isSticky />
      <motion.div
        className="flex flex-col h-[calc(100vh-(2*var(--layout-size)))] items-end justify-end"
        style={{ y }}
      >
        {/* Top "border" div with width animation */}
        <motion.div className="bg-black h-[1px]" style={{ width }} />
        {/* Content div with height animation */}
        <motion.div
          ref={divRef}
          className="flex flex-col justify-between w-1/2 my-4"
          style={{ height: height1 }}
        >
          <h2 className="text-6xl">Top talents as partners</h2>
          <motion.p className="w-xl text-lg" style={{ opacity }}>
            Top talents as partners Work with the industry&apos;s finest—an
            experienced senior team that&apos;s grown together through years of
            collaboration, united by one goal: making your project exceed every
            expectation.
          </motion.p>
        </motion.div>
        {/* Bottom "border" div with width animation */}
        <motion.div className="bg-black h-[1px]" style={{ width }} />

        {/* Content div with height animation */}
        <motion.div
          ref={divRef2}
          className="flex flex-col justify-between w-1/2 my-4"
          style={{ height: height2 }}
        >
          <h2 className="text-6xl">Innovation-aligned</h2>
          <motion.p className="w-xl text-lg" style={{ opacity: opacity2 }}>
            We adopt a forward-thinking mindset to ensure you have the peace of
            mind that comes with the most modern representation of your
            business.
          </motion.p>
        </motion.div>

        {/* Bottom "border" div with width animation */}
        <motion.div className="bg-black h-[1px]" style={{ width: width2 }} />
      </motion.div>
    </Section>
  );
}
