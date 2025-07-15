"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function AnimatedVerticalLine() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative">
      {/* Animated vertical line */}
      <motion.div
        className="fixed left-[var(--layout-size)] top-[var(--layout-size)] w-px bg-black z-50"
        style={{
          height: lineHeight,
          transformOrigin: "top",
        }}
      />
    </div>
  );
}
