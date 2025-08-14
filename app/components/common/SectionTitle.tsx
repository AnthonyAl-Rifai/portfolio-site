"use client";

import { forwardRef, useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLayout } from "../../context/LayoutContext";

const SectionTitle = forwardRef(function SectionTitle(
  {
    name,
    isSticky = false,
    showBottomBorder = true,
    zIndex = 25,
    removeLeftPadding = false,
  }: {
    name: string;
    isSticky?: boolean;
    showBottomBorder?: boolean;
    zIndex?: number;
    removeLeftPadding?: boolean;
  },
  ref: React.Ref<HTMLDivElement>
) {
  const { isMobileLandscape } = useLayout();
  const internalRef = useRef<HTMLDivElement>(null);
  const targetRef = (ref ?? internalRef) as React.RefObject<HTMLDivElement>;

  const isInView = useInView(targetRef, {
    margin: "-50px 0px",
    amount: 0.3,
    once: false,
  });

  const nameClass = isMobileLandscape ? "text-3xl" : "text-3xl lg:text-4xl";
  const topOffset = isMobileLandscape ? "0px" : "var(--layout-size)";

  return (
    <div
      ref={targetRef}
      className={`relative h-[calc(var(--layout-size)+1px)] min-h-[calc(var(--layout-size)+1px)] col-span-full bg-[var(--background)] w-full flex items-center ${
        isSticky ? "sticky" : ""
      }`}
      style={{
        zIndex,
        ...(isSticky ? { top: topOffset } : {}),
      }}
    >
      <h1
        className={`${nameClass} font-medium ${removeLeftPadding ? "mr-4" : "mx-4"}`}
      >
        {name}
      </h1>

      {showBottomBorder && (
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
      )}
    </div>
  );
});

export default SectionTitle;
