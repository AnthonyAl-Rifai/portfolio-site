import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLayout } from "../context/LayoutContext";
import clsx from "clsx";

interface StickyParagraphProps {
  top: string;
  bottom?: string;
  topLineStyle: string;
  bottomLineStyle: string;
}

export default function StickyParagraph({
  top,
  bottom,
  topLineStyle,
  bottomLineStyle,
}: StickyParagraphProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isMobileLandscape } = useLayout();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.45, 0.7],
    [0, 1, 1, 0]
  );

  const wrapperClasses = clsx(
    "relative",
    isMobileLandscape ? "h-[120vh] my-6" : "h-[150vh] my-6"
  );

  const motionDivClasses = clsx(
    "sticky z-10 flex flex-col",
    isMobileLandscape
      ? "top-[calc(3*var(--layout-size)-1rem)]"
      : "top-[calc(5*var(--layout-size)+1rem)]"
  );

  return (
    <div ref={ref} className={wrapperClasses}>
      <motion.div style={{ opacity }} className={motionDivClasses}>
        <p className={topLineStyle}>{top}</p>
        {bottom && <p className={bottomLineStyle}>{bottom}</p>}
      </motion.div>
    </div>
  );
}
