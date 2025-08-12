"use client";

import { motion } from "motion/react";
import { useLayout } from "../../context/LayoutContext";
import GitHubIcon from "../../icons/GitHubIcon";
import Image from "next/image";

export default function Footer() {
  const { isMobileLandscape } = useLayout();

  const footerHeight = isMobileLandscape
    ? "h-[var(--layout-size)]"
    : "h-[calc(2*var(--layout-size))] md:h-[var(--layout-size)]";

  return (
    <motion.div
      className={`flex items-center justify-between md: gap-16 p-4 ${footerHeight} font-light relative`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Animated top border */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false }}
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
          top: 0,
          height: 1,
        }}
      />

      {/* Copyright */}
      <div className="font-light text-lg">© 2025 Anthony Al-Rifai</div>

      {/* Social Links */}
      <div className="flex gap-8">
        <a
          href="https://www.linkedin.com/in/anthony-al-rifai/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <Image
            src="/InBug-Black.png"
            alt="LinkedIn"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </a>

        <a
          href="https://github.com/AnthonyAl-Rifai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          aria-label="GitHub"
        >
          <GitHubIcon size={24} />
        </a>
      </div>
    </motion.div>
  );
}
