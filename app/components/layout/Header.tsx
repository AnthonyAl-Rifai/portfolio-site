// components/Header.tsx
"use client";
import { useLayout } from "../../context/LayoutContext";
import {
  motion,
  useAnimation,
  useMotionValue,
  animate,
  AnimatePresence,
} from "motion/react";
import MenuIconA from "../../icons/MenuIconA";
import MenuIconAUpsideDown from "../../icons/MenuIconAUpsideDown";
import { useEffect, useState } from "react";
import { useIsLargerThanMobile } from "../../hooks/useIsLargerThanMobile";

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
  const { isMobileLandscape, setIsNavigating } = useLayout();
  const isLargerThanMobile = useIsLargerThanMobile();

  const topControls = useAnimation();
  const bottomControls = useAnimation();
  const topIconY = useMotionValue(0);
  const bottomIconY = useMotionValue(0);
  const menuTextOpacity = useMotionValue(0);
  const menuTextScale = useMotionValue(0.8);

  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const handleToggle = () => {
    setHasUserInteracted(true);
    onMenuToggle();
  };

  const handleButtonHover = () => {
    animate(topIconY, -15, { duration: 0.2 });
    animate(bottomIconY, 15, { duration: 0.2 });
    animate(menuTextOpacity, 1, { duration: 0.2, delay: 0.1 });
    animate(menuTextScale, 1, { duration: 0.2 });
  };

  const handleButtonLeave = () => {
    animate(topIconY, 0, { duration: 0.2, ease: "easeOut" });
    animate(bottomIconY, 0, { duration: 0.2, ease: "easeOut" });
    animate(menuTextOpacity, 0, { duration: 0.1, ease: "easeOut" });
    animate(menuTextScale, 0.8, { duration: 0.1, ease: "easeOut" });
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
    setIsNavigating(true); // <-- added
    if (onNameClick) onNameClick();
    const el = document.getElementById("home");
    if (el) {
      el.scrollIntoView();
      window.location.hash = "home";
    } else {
      window.scrollTo({ top: 0 });
      window.location.hash = "home";
    }
  }

  function handleContactClick() {
    setIsNavigating(true); // <-- added
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.location.hash = "contact";
    }
  }

  const headerClass = isMobileLandscape
    ? "fixed top-0 right-0 w-[var(--layout-size)] h-[100dvh] flex flex-col items-center justify-start bg-[var(--background)] z-40"
    : "fixed top-0 left-0 right-0 h-[var(--layout-size)] flex items-center bg-[var(--background)] z-40";

  const menuButtonClass = isMobileLandscape
    ? "w-full h-[var(--layout-size)]"
    : "h-full w-[var(--layout-size)]";

  const nameButtonClass = isMobileLandscape
    ? "text-vertical text-2xl"
    : "text-3xl lg:text-4xl";

  return (
    <header className={headerClass}>
      <motion.button
        onClick={handleToggle}
        onHoverStart={handleButtonHover}
        onHoverEnd={handleButtonLeave}
        className={`z-50 flex items-center justify-center bg-[var(--background)]/10 backdrop-blur-md p-4 transition-colors cursor-pointer hover:bg-[var(--background)]/20 ${menuButtonClass}`}
      >
        <div className="flex flex-col items-center justify-center gap-1 relative">
          <motion.div
            initial={
              isMobileLandscape
                ? { y: -50, opacity: 0 }
                : { x: -50, opacity: 0 }
            }
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 16,
            }}
            style={{ y: topIconY }}
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

          <AnimatePresence mode="wait">
            <motion.div
              key={menuOpen ? "close" : "menu"}
              style={{
                opacity: menuTextOpacity,
                scale: menuTextScale,
                position: "absolute",
                top: "10%",
                right: menuOpen ? "-47%" : "-55%",
                zIndex: 10,
              }}
              className="font-medium text-black whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: menuTextOpacity.get(),
                scale: menuTextScale.get(),
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {menuOpen ? "close" : "menu"}
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={
              isMobileLandscape
                ? { y: -50, opacity: 0 }
                : { x: -50, opacity: 0 }
            }
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 16,
            }}
            style={{ y: bottomIconY }}
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
      </motion.button>

      <div className="flex items-center justify-between flex-1 p-4">
        <motion.button
          initial={
            isMobileLandscape ? { x: 50, opacity: 0 } : { y: -50, opacity: 0 }
          }
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={handleNameClick}
          className={`font-medium bg-transparent border-none p-0 m-0 cursor-pointer focus:outline-none ${nameButtonClass}`}
          style={{ lineHeight: 1 }}
          aria-label="Scroll to top"
        >
          Anthony Al-Rifai
        </motion.button>

        {isLargerThanMobile && (
          <motion.button
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            onClick={handleContactClick}
            className="px-6 py-2 lg:px-8 lg:py-3 lg:text-xl bg-[var(--foreground)] rounded-4xl hover:bg-purple-950 text-[var(--background)] font-medium transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            aria-label="Contact"
          >
            Contact
          </motion.button>
        )}
      </div>
    </header>
  );
}
