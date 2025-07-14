"use client";

import { motion } from "framer-motion";

interface HeaderProps {
  menuOpen: boolean;
  onMenuToggle: () => void;
  onNameClick?: () => void;
}

export default function Header({
  menuOpen,
  onMenuToggle,
  onNameClick,
}: HeaderProps) {
  function handleNameClick() {
    if (onNameClick) onNameClick();
    const el = document.getElementById("home");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.location.hash = "home";
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.location.hash = "home";
    }
  }
  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center bg-white"
        style={{
          height: "var(--layout-size)",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        <button
          onClick={onMenuToggle}
          className="z-50 h-full flex items-center justify-center bg-white/10 backdrop-blur-md p-4 transition-colors hover:bg-white/20"
          style={{
            width: "var(--layout-size)",
          }}
        >
          <span className="text-4xl">{menuOpen ? "×" : "⠿"}</span>
        </button>
        <button
          onClick={handleNameClick}
          className="text-4xl font-bold ml-4 bg-transparent border-none p-0 m-0 cursor-pointer focus:outline-none"
          style={{ lineHeight: 1 }}
          aria-label="Scroll to top"
        >
          Anthony Al-Rifai
        </button>
      </header>
      {/* Animated horizontal line under header */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="fixed left-0 bg-black z-40"
        style={{
          top: "var(--layout-size)",
          height: 1,
          // On mobile, width is var(--layout-size); on md+ screens, width is 100vw
          width: undefined,
        }}
      >
        <div
          className="block md:hidden"
          style={{ width: "var(--layout-size)", height: 1 }}
        />
        <div
          className="hidden md:block"
          style={{ width: "100vw", height: 1 }}
        />
      </motion.div>
    </>
  );
}
