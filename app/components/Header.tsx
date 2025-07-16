"use client";

import { motion } from "framer-motion";
import { useOrientation } from "./OrientationContext";

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
  const { isLandscape } = useOrientation();

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

  const headerClass = isLandscape
    ? "fixed top-0 right-0 w-[var(--layout-size)] h-[100dvh] flex flex-col items-center justify-start bg-white z-40"
    : "fixed top-0 left-0 right-0 h-[var(--layout-size)] flex items-center bg-white z-40";

  const menuButtonClass = isLandscape
    ? "w-full h-[var(--layout-size)]"
    : "h-full w-[var(--layout-size)]";

  const nameButtonClass = isLandscape
    ? "mt-4 text-vertical text-xl"
    : "ml-4 text-4xl";

  return (
    <>
      <header
        className={headerClass}
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      >
        <button
          onClick={onMenuToggle}
          className={`z-50 flex items-center justify-center bg-white/10 backdrop-blur-md p-4 transition-colors hover:bg-white/20 ${menuButtonClass}`}
        >
          <span className="text-4xl">{menuOpen ? "×" : "⠿"}</span>
        </button>

        <button
          onClick={handleNameClick}
          className={`font-bold bg-transparent border-none p-0 m-0 cursor-pointer focus:outline-none ${nameButtonClass}`}
          style={{ lineHeight: 1 }}
          aria-label="Scroll to top"
        >
          Anthony Al-Rifai
        </button>
      </header>

      {/* Animated line */}
      {!isLandscape && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="fixed left-0 bg-black z-40"
          style={{
            top: "var(--layout-size)",
            height: 1,
          }}
        />
      )}
    </>
  );
}
