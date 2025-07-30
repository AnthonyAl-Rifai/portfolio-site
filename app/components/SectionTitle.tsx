"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLayout } from "../context/LayoutContext"; // adjust path as needed

export default function SectionTitle({
  name,
  isSticky = false,
}: {
  name: string;
  isSticky?: boolean;
}) {
  const { isMobileLandscape } = useLayout();
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    margin: "-50px 0px",
    amount: 0.3,
    once: false,
  });

  const topOffset = isMobileLandscape ? "0px" : "var(--layout-size)";

  return (
    <div
      ref={ref}
      className={`relative z-25 h-[calc(var(--layout-size)+1px)] min-h-[calc(var(--layout-size)+1px)] bg-white w-full flex items-center ${
        isSticky ? "sticky" : ""
      }`}
      style={isSticky ? { top: topOffset } : {}}
    >
      <h1 className="text-4xl font-bold mx-4">{name}</h1>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
        }
        transition={{
          duration: 0.4,
          ease: "easeOut",
          delay: 0.2,
        }}
        className="bg-black origin-left"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
        }}
      />
    </div>
  );
}
