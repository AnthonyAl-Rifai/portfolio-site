"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionTitle from "./SectionTitle";

interface ScrollSectionProps {
  name: string;
  id: string;
  sectionHeight?: string;
  initialComponent: React.ReactNode;
  scrollComponent: React.ReactNode;
}

export default function ScrollSection({
  name,
  id,
  sectionHeight = "h-[300vh]",
  initialComponent,
  scrollComponent,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const scrollX = useTransform(scrollYProgress, [0.25, 0.75], ["-100%", "0%"]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative ${sectionHeight}`}
      style={{ scrollMarginTop: "var(--layout-size)" }}
    >
      <div className="sticky top-[var(--layout-size)] h-[calc(100vh-var(--layout-size))] overflow-hidden z-10">
        <SectionTitle name={name} />

        <div className="relative w-full h-full">
          {/* Initial component: base layer */}
          <div className="absolute inset-0 z-0 h-full w-full">
            {initialComponent}
          </div>

          {/* Scroll component: animates on top */}
          <motion.div
            className="absolute top-0 left-0 h-full w-full z-10"
            style={{ x: scrollX }}
          >
            {scrollComponent}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
