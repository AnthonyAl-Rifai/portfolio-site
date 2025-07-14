"use client";
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MenuNav from "./components/MenuNav";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { motion } from "framer-motion";
import { OrientationProvider } from "./components/OrientationContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animateBorder, setAnimateBorder] = useState(false);

  // Responsive state for desktop breakpoint
  const [hasMounted, setHasMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768);
    }
    handleResize(); // Set initial value on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    // Wait for layout to stabilize, then trigger animation
    const timer = setTimeout(() => setAnimateBorder(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Track if initial vertical reveal animation is done
  const [hasRevealed, setHasRevealed] = useState(false);

  // State for initial animation of both segments
  const [topRevealed, setTopRevealed] = useState(false);
  const [bottomRevealed, setBottomRevealed] = useState(false);

  // Timing for staggered animation
  const TOP_ANIMATION_DURATION = 0.1; // seconds
  const BOTTOM_ANIMATION_DELAY = 0.05; // seconds, just before top finishes
  const BOTTOM_ANIMATION_DURATION = 1.2; // seconds

  // After initial animation, use hasRevealed for responsive left animation

  // Top segment left position: always var(--layout-size)
  const topTargetLeft = "var(--layout-size)";
  // Bottom segment left position: desktop = var(--layout-size), mobile = 0
  const bottomTargetLeft = isDesktop ? "var(--layout-size)" : "-5px";

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrientationProvider>
          <div className="relative w-full text-black">
            <Sidebar />
            <Header
              menuOpen={menuOpen}
              onMenuToggle={() => setMenuOpen(!menuOpen)}
              onNameClick={() => setMenuOpen(false)}
            />
            <span
              className={`header-animated-border${animateBorder ? " animate" : ""}`}
            />
            {/* Top segment: animates height first, always stays at right border of button */}
            {hasMounted && (
              <motion.div
                initial={{ height: 0, opacity: 0, left: topTargetLeft }}
                animate={{
                  height: "var(--layout-size)",
                  opacity: 1,
                  left: topTargetLeft,
                }}
                transition={{
                  height: { duration: TOP_ANIMATION_DURATION, ease: "easeOut" },
                  opacity: { duration: 0.4 },
                }}
                onAnimationComplete={() => {
                  if (!topRevealed) setTopRevealed(true);
                }}
                className="fixed bg-black z-40"
                style={{
                  left: undefined,
                  top: 0,
                  width: 1,
                  height: "var(--layout-size)",
                }}
              />
            )}
            {/* Bottom segment: animates height after top, then animates left with sidebar */}
            {hasMounted && (
              <motion.div
                initial={{ height: 0, opacity: 0, left: bottomTargetLeft }}
                animate={
                  bottomRevealed
                    ? {
                        height: "calc(100vh - var(--layout-size))",
                        opacity: 1,
                        left: bottomTargetLeft,
                      }
                    : {
                        height: "calc(100vh - var(--layout-size))",
                        opacity: 1,
                        left: bottomTargetLeft,
                      }
                }
                transition={
                  bottomRevealed
                    ? { left: { duration: 0.5, ease: "easeOut" } }
                    : {
                        height: {
                          duration: BOTTOM_ANIMATION_DURATION,
                          ease: "easeOut",
                          delay: BOTTOM_ANIMATION_DELAY,
                        },
                        opacity: {
                          duration: 0.4,
                          delay: BOTTOM_ANIMATION_DELAY,
                        },
                      }
                }
                onAnimationComplete={() => {
                  if (!bottomRevealed) setBottomRevealed(true);
                  if (!hasRevealed) setHasRevealed(true);
                }}
                className="fixed bg-black z-40"
                style={{
                  left: undefined,
                  top: "var(--layout-size)",
                  width: 1,
                  height: "calc(100vh - var(--layout-size))",
                }}
              />
            )}

            {/* Main content area, offset by sidebar */}
            <div className="transition-all duration-500 pl-0 md:pl-[var(--layout-size)]">
              <main
                className={`relative w-full pt-[var(--layout-size)] ${
                  menuOpen ? "overflow-hidden" : "overflow-y-auto"
                }`}
              >
                {children}
              </main>
              <MenuNav open={menuOpen} onClose={() => setMenuOpen(false)} />
            </div>
          </div>
        </OrientationProvider>
      </body>
    </html>
  );
}
