"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TOP_ANIMATION_DURATION = 0.1;
const BOTTOM_ANIMATION_DELAY = 0.05;
const BOTTOM_ANIMATION_DURATION = 1.1;

export default function LayoutBorders() {
  const [hasMounted, setHasMounted] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [topRevealed, setTopRevealed] = useState(false);
  const [bottomRevealed, setBottomRevealed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const topTargetLeft = "var(--layout-size)";
  const bottomTargetLeft = isDesktop ? "var(--layout-size)" : "-5px";

  return (
    <>
      {/* Header horizontal line */}
      <motion.span
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        className="fixed left-0 top-[var(--layout-size)] h-px bg-black z-40"
      />

      {/* Top vertical segment */}
      {hasMounted && (
        <motion.div
          initial={{ height: 0, opacity: 0, left: topTargetLeft }}
          animate={{
            height: "var(--layout-size)",
            opacity: 1,
            left: topTargetLeft,
          }}
          transition={{
            height: { duration: TOP_ANIMATION_DURATION, ease: "easeOut" },
            opacity: { duration: 0.4 },
          }}
          onAnimationComplete={() => {
            if (!topRevealed) setTopRevealed(true);
          }}
          className="fixed bg-black z-40"
          style={{
            top: 0,
            width: 1,
            height: "var(--layout-size)",
          }}
        />
      )}

      {/* Bottom vertical segment */}
      {hasMounted && (
        <motion.div
          initial={
            bottomRevealed
              ? { left: bottomTargetLeft }
              : { height: 0, opacity: 0, left: bottomTargetLeft }
          }
          animate={
            bottomRevealed
              ? { left: bottomTargetLeft }
              : {
                  height: "calc(100vh - var(--layout-size))",
                  opacity: 1,
                  left: bottomTargetLeft,
                }
          }
          transition={
            bottomRevealed
              ? { left: { duration: 0.5, ease: "easeOut" } }
              : {
                  height: {
                    duration: BOTTOM_ANIMATION_DURATION,
                    ease: "easeOut",
                    delay: BOTTOM_ANIMATION_DELAY,
                  },
                  opacity: {
                    duration: 0.4,
                    delay: BOTTOM_ANIMATION_DELAY,
                  },
                }
          }
          onAnimationComplete={() => {
            if (!bottomRevealed) setBottomRevealed(true);
            if (!hasRevealed) setHasRevealed(true);
          }}
          className="fixed bg-black z-40"
          style={{
            top: "var(--layout-size)",
            width: 1,
            height: "calc(100vh - var(--layout-size))",
          }}
        />
      )}
    </>
  );
}
