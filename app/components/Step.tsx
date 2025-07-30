"use client";

import { motion, useTransform, MotionValue } from "motion/react";

interface StepProps {
  index: number;
  totalSteps: number;
  scrollYProgress: MotionValue<number>;
  direction?: "left" | "right" | "up" | "down" | "none";
  children: React.ReactNode;
}

export function Step({
  index,
  totalSteps,
  scrollYProgress,
  direction = "right",
  children,
}: StepProps) {
  const stepSize = 1 / totalSteps;
  const start = index * stepSize;
  const end = start + stepSize;

  // ✅ Start exactly at section entry
  const xLeft = useTransform(scrollYProgress, [start, end], ["-100%", "0%"]);
  const xRight = useTransform(scrollYProgress, [start, end], ["100%", "0%"]);
  const yUp = useTransform(scrollYProgress, [start, end], ["100%", "0%"]);
  const yDown = useTransform(scrollYProgress, [start, end], ["-100%", "0%"]);

  const x =
    direction === "left" ? xLeft : direction === "right" ? xRight : undefined;
  const y = direction === "up" ? yUp : direction === "down" ? yDown : undefined;

  return (
    <motion.div
      style={{ x, y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}
