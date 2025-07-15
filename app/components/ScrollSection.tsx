"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionTitle from "./SectionTitle";

interface ScrollSectionProps {
  name: string;
  sectionHeight?: string;
  initialComponent: React.ReactNode;
  scrollComponent: React.ReactNode;
}

export default function ScrollSection({
  name,
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
    <>
      <section ref={sectionRef} className={`relative ${sectionHeight}`}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <SectionTitle name={name} />

          <div
            className="relative"
            style={{ height: `calc(100% - var(--layout-size))` }}
          >
            <div className="absolute inset-0 z-0">{initialComponent}</div>

            <motion.div
              className="absolute top-0 left-0 h-full w-full z-10"
              style={{ x: scrollX }}
            >
              {scrollComponent}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
