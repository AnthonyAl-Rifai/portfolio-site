import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.45, 0.7], // start fading out around 0.3
    [0, 1, 1, 0] // fully visible, then fade to 0 by 0.5
  );

  // const y = useTransform(
  //   scrollYProgress,
  //   [0, 0.1, 0.3, 0.6], // move up while fading out
  //   [30, 0, 0, -90]
  // );

  return (
    <div ref={ref} className="relative h-[150vh] my-12">
      <motion.div
        style={{ opacity }}
        className="sticky top-[calc(5*var(--layout-size)+1rem)] z-10 flex flex-col"
      >
        <p className={topLineStyle}>{top}</p>
        {bottom && <p className={bottomLineStyle}>{bottom}</p>}
      </motion.div>
    </div>
  );
}
