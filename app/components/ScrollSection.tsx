"use client";

import { motion, useScroll, useTransform, easeOut } from "framer-motion";
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

  // Transform scroll progress to x translation (-100% to 0%) with easing
  const scrollX = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"], {
    ease: easeOut,
  });

  return (
    <>
      <section ref={sectionRef} className={`relative ${sectionHeight}`}>
        <div className="sticky top-0">
          <SectionTitle name={name} />
          <div className="h-[calc(100vh-var(--layout-size))] overflow-hidden relative">
            {/* Initial component (always visible) */}
            <div className="absolute inset-0 z-0">{initialComponent}</div>

            {/* Scroll component (slides in from left) */}
            <motion.div
              className="absolute top-[var(--layout-size)] left-0 h-[calc(100%-var(--layout-size))] z-10 overflow-hidden"
              style={{ width: "100%" }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  x: scrollX,
                }}
              >
                {scrollComponent}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
