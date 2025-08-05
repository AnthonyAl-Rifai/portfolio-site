import React, { useEffect, useState } from "react";
import { useScroll, motion, useTransform } from "motion/react";
import { useIsLargerThanMobile } from "../hooks/useIsLargerThanMobile";

export default function Sidebar() {
  const { scrollYProgress } = useScroll();
  const [lineHeight, setLineHeight] = useState(0);
  const isLargerThanMobile = useIsLargerThanMobile();

  useEffect(() => {
    const updateHeight = () => {
      setLineHeight(window.innerHeight * 0.25 - 16);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, lineHeight]);

  return (
    <>
      {isLargerThanMobile && (
        <div className="w-[1px] h-1/4 z-50 bg-gray-400 fixed top-3/8 left-[calc(var(--layout-size)/2)]">
          <motion.div
            className="w-[17px] h-[17px] z-50 border border-gray-400 fixed top-3/8 left-[calc(var(--layout-size)/2-8px)] origin-top"
            style={{ y }}
          />
        </div>
      )}
      <div
        className="fixed left-0 z-30 transition-all duration-500 -translate-x-full md:translate-x-0 bg-white"
        style={{
          top: "var(--layout-size)",
          width: "var(--layout-size)",
          height: `calc(100svh - var(--layout-size))`,
        }}
      />
    </>
  );
}
