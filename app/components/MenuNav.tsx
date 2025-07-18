"use client";

import { motion } from "framer-motion";
import { useIsLargerThanMobile } from "../hooks/useIsLargerThanMobile";
import GridSection from "./GridSection";
import { useLayout } from "../context/LayoutContext";

interface MenuNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MenuNav({ open, onClose }: MenuNavProps) {
  const { isMobileLandscape } = useLayout();
  const isLargerThanMobile = useIsLargerThanMobile();

  const top = isMobileLandscape ? 0 : "var(--layout-size)";
  const height = isMobileLandscape
    ? "100dvh"
    : "calc(100dvh - var(--layout-size))";
  const left = isLargerThanMobile ? "var(--layout-size)" : 0;
  const right = isMobileLandscape ? "var(--layout-size)" : 0;

  const baseClass =
    "bg-black/70 rounded-md flex items-center justify-center hover:bg-black/50 transition-colors text-white font-bold text-2xl backdrop-blur-md border border-black/20";

  const getMotionProps = () => ({
    animate: open ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 },
    transition: {
      duration: 0.3,
      ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
      opacity: { duration: 0.3 },
    },
    style: { originX: 0, originY: 0 },
  });

  return (
    <nav
      className={`fixed bg-white/10 backdrop-blur-md transition-opacity duration-300 z-40 md:border-l
        ${isMobileLandscape ? "border-r" : "border-t"}
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      style={{ top, height, left, right }}
    >
      <GridSection isMobileLandscape={isMobileLandscape} fillParent={true}>
        <motion.a
          href="#about"
          onClick={onClose}
          {...getMotionProps()}
          className={`${
            isMobileLandscape
              ? "col-span-1 row-span-full"
              : "col-span-4 row-span-2"
          } md:row-span-8 lg:col-span-4 lg:row-span-6 ${baseClass}`}
        >
          About
        </motion.a>

        <motion.a
          href="#webdev"
          onClick={onClose}
          {...getMotionProps()}
          className={`${
            isMobileLandscape
              ? "col-span-1 row-span-full"
              : "col-span-4 row-span-2"
          } md:row-span-4 lg:col-span-6 lg:row-span-3 ${baseClass}`}
        >
          Web Dev
        </motion.a>

        <motion.a
          href="#music"
          onClick={onClose}
          {...getMotionProps()}
          className={`${
            isMobileLandscape
              ? "col-span-1 row-span-full"
              : "col-span-4 row-span-2"
          } md:row-span-4 lg:col-span-6 lg:row-span-3 ${baseClass}`}
        >
          Music
        </motion.a>

        <motion.a
          href="/anthony-al-rifai-resume.pdf"
          download="anthony-al-rifai-resume.pdf"
          onClick={onClose}
          {...getMotionProps()}
          className={`${
            isMobileLandscape
              ? "col-span-1 row-span-full"
              : "col-span-4 row-span-2"
          } md:row-span-4 lg:col-span-6 lg:row-span-3 ${baseClass}`}
        >
          Download Resume
        </motion.a>

        <motion.a
          href="#contact"
          onClick={onClose}
          {...getMotionProps()}
          className={`${
            isMobileLandscape
              ? "col-span-1 row-span-full"
              : "col-span-4 row-span-2"
          } md:row-span-4 lg:col-span-6 lg:row-span-3 ${baseClass}`}
        >
          Contact
        </motion.a>
      </GridSection>
    </nav>
  );
}
