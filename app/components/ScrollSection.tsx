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
    <>
      <section
        ref={sectionRef}
        id={id}
        className={`relative ${sectionHeight}`}
        style={{ scrollMarginTop: "var(--layout-size)" }}
      >
        {/* This container tracks full scroll for animation */}
        <div className="sticky top-0 h-screen overflow-hidden z-10">
          {/* SectionTitle sticks to top */}
          <div className="h-[var(--layout-size)] z-20 bg-white sticky top-[var(--layout-size)]">
            <SectionTitle name={name} />
          </div>

          {/* Scrollable content below the sticky title */}
          <div
            className="relative"
            style={{ height: `calc(100% - var(--layout-size))` }}
          >
            <div className="absolute inset-0 z-0">{initialComponent}</div>

            <motion.div
              className="absolute left-0 w-full z-10"
              style={{
                x: scrollX,
                top: "var(--layout-size)", // pushes it down below the sticky title
                height: `calc(100% - var(--layout-size))`,
              }}
            >
              {scrollComponent}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
