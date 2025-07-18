"use client";
import { useLayout } from "../context/LayoutContext";
import { motion, useAnimation } from "framer-motion";
import MenuIconA from "../icons/MenuIconA";
import MenuIconAUpsideDown from "../icons/MenuIconAUpsideDown";
import { useEffect, useState } from "react";

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
  const { isMobileLandscape } = useLayout();

  const topControls = useAnimation();
  const bottomControls = useAnimation();

  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const handleToggle = () => {
    setHasUserInteracted(true);
    onMenuToggle();
  };

  useEffect(() => {
    if (!hasUserInteracted) return;

    const topKeyframes = menuOpen
      ? {
          scale: [1, 1.3, 1],
          rotate: [0, 180, 180],
          y: [0, -2, 0],
        }
      : {
          scale: [1, 1.3, 1],
          rotate: [180, 360, 360],
          y: [0, -2, 0],
        };

    const bottomKeyframes = menuOpen
      ? {
          scale: [1, 1.3, 1],
          rotate: [0, -180, -180],
          y: [0, 2, 0],
        }
      : {
          scale: [1, 1.3, 1],
          rotate: [-180, -360, -360],
          y: [0, 2, 0],
        };

    topControls.start(topKeyframes);
    bottomControls.start(bottomKeyframes);
  }, [menuOpen, hasUserInteracted, topControls, bottomControls]);

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

  const headerClass = isMobileLandscape
    ? "fixed top-0 right-0 w-[var(--layout-size)] h-[100dvh] flex flex-col items-center justify-start bg-white z-40"
    : "fixed top-0 left-0 right-0 h-[var(--layout-size)] flex items-center bg-white z-40";

  const menuButtonClass = isMobileLandscape
    ? "w-full h-[var(--layout-size)]"
    : "h-full w-[var(--layout-size)]";

  const nameButtonClass = isMobileLandscape
    ? "mt-4 text-vertical text-xl"
    : "ml-4 text-4xl";

  return (
    <header
      className={headerClass}
      style={{ transform: "translateZ(0)", willChange: "transform" }}
    >
      <button
        onClick={handleToggle}
        className={`z-50 flex items-center justify-center bg-white/10 backdrop-blur-md p-4 transition-colors hover:bg-white/20 ${menuButtonClass}`}
      >
        <div className="flex flex-col items-center justify-center gap-1 relative">
          <motion.div
            initial={
              isMobileLandscape
                ? { y: -50, opacity: 0 }
                : { x: -50, opacity: 0 }
            }
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="flex items-center justify-center"
          >
            <motion.div
              animate={topControls}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
              className="flex items-center justify-center"
            >
              <MenuIconA size={20} color="#000" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={
              isMobileLandscape
                ? { y: -50, opacity: 0 }
                : { x: -50, opacity: 0 }
            }
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="flex items-center justify-center -mt-1"
          >
            <motion.div
              animate={bottomControls}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
              className="flex items-center justify-center"
            >
              <MenuIconAUpsideDown size={20} color="#000" />
            </motion.div>
          </motion.div>
        </div>
      </button>

      <motion.button
        initial={
          isMobileLandscape ? { x: 50, opacity: 0 } : { y: -50, opacity: 0 }
        }
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={handleNameClick}
        className={`font-bold bg-transparent border-none p-0 m-0 cursor-pointer focus:outline-none ${nameButtonClass}`}
        style={{ lineHeight: 1 }}
        aria-label="Scroll to top"
      >
        Anthony Al-Rifai
      </motion.button>
    </header>
  );
}
