"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useLayout } from "../context/LayoutContext";
import { useIsLargerThanMobile } from "../hooks/useIsLargerThanMobile";
export default function LayoutBorders() {
  const [hasRevealed, setHasRevealed] = useState(false);
  const [topRevealed, setTopRevealed] = useState(false);
  const [bottomRevealed, setBottomRevealed] = useState(false);
  const { isMobileLandscape } = useLayout();
  const isLargerThanMobile = useIsLargerThanMobile();
  const fastHeightTransition = isLargerThanMobile ? 0.1 : 0.6;
  console.log("isLargerThanMobile:", isLargerThanMobile);

  return (
    <>
      {isMobileLandscape && (
        <>
          {/* Mobile landscape right vertical segment */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100dvh", opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="fixed right-[var(--layout-size)] top-0 w-px bg-black z-40"
          />

          {/* Mobile landscape top horizontal segment */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "var(--layout-size)", opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="fixed bg-black h-px z-40"
            style={{
              top: "var(--layout-size)",
              right: 0,
            }}
          />
        </>
      )}

      {!isMobileLandscape && (
        <>
          {/* Header horizontal line */}
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 top-[var(--layout-size)] h-px bg-black z-40"
          />

          {/* Top vertical segment */}
          <motion.div
            initial={{ height: 0, opacity: 0, left: "var(--layout-size)" }}
            animate={{
              height: "var(--layout-size)",
              opacity: 1,
              left: "var(--layout-size)",
            }}
            transition={{
              height: {
                duration: fastHeightTransition,
                ease: "easeOut",
              },
              opacity: { duration: 0.4 },
            }}
            onAnimationComplete={() => {
              if (!topRevealed) setTopRevealed(true);
            }}
            className="fixed bg-black z-40"
            style={{
              top: 0,
              width: 1,
            }}
          />

          {/* Bottom vertical segment */}
          {isLargerThanMobile && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "calc(100vh - var(--layout-size))",
                opacity: 1,
              }}
              transition={{
                height: {
                  duration: 1.1,
                  ease: "easeOut",
                  delay: 0.05,
                },
                opacity: {
                  duration: 0.4,
                  delay: 0.05,
                },
              }}
              onAnimationComplete={() => {
                if (!bottomRevealed) setBottomRevealed(true);
                if (!hasRevealed) setHasRevealed(true);
              }}
              className="fixed bg-black z-40"
              style={{
                top: "var(--layout-size)",
                width: 1,
                left: "var(--layout-size)",
              }}
            />
          )}
        </>
      )}
    </>
  );
}
