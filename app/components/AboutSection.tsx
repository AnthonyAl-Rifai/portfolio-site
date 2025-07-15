"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionTitle from "./SectionTitle";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  // Transform scroll progress to width percentage (0% to 100%)
  const purpleWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <section ref={sectionRef} className="relative h-[600vh] bg-gray-800">
        <div className="sticky top-0 bg-amber-300">
          <SectionTitle name="About" />
          <div className="h-[calc(100vh-var(--layout-size))] overflow-hidden relative">
            <motion.div
              className="bg-purple-200 border-r absolute top-[var(--layout-size)] left-0 h-[calc(100%-var(--layout-size))] z-10"
              style={{ width: purpleWidth }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
