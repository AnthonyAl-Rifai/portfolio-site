"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SectionTitle({
  name,
  isSticky = false,
}: {
  name: string;
  isSticky?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-50px 0px", // similar to your rootMargin
    amount: 0.3, // similar to threshold
    once: false, // 👈 allow it to re-trigger every time it enters
  });

  return (
    <div
      ref={ref}
      className={`relative h-[var(--layout-size)] min-h-[var(--layout-size)] bg-white w-full flex items-center ${
        isSticky ? "sticky" : ""
      }`}
      style={isSticky ? { top: "var(--layout-size)" } : {}}
    >
      <h1 className="text-4xl font-bold mx-4">{name}</h1>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
        }
        transition={{
          duration: 0.6,
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
