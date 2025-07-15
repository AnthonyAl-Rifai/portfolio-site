"use client";

import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MenuNav from "./components/MenuNav";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AnimatedVerticalLine from "./components/AnimatedVerticalLine";
import { motion } from "framer-motion";
import { OrientationProvider } from "./components/OrientationContext";
import LenisProvider from "./components/LenisProvider";

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
  const [hasMounted, setHasMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [topRevealed, setTopRevealed] = useState(false);
  const [bottomRevealed, setBottomRevealed] = useState(false);

  const TOP_ANIMATION_DURATION = 0.1;
  const BOTTOM_ANIMATION_DELAY = 0.05;
  const BOTTOM_ANIMATION_DURATION = 1.1;

  const topTargetLeft = "var(--layout-size)";
  const bottomTargetLeft = isDesktop ? "var(--layout-size)" : "-5px";

  useEffect(() => {
    setHasMounted(true);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateBorder(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrientationProvider>
          <LenisProvider>
            <div className="relative w-full text-black">
              <Sidebar />
              <Header
                menuOpen={menuOpen}
                onMenuToggle={() => setMenuOpen(!menuOpen)}
                onNameClick={() => setMenuOpen(false)}
              />

              {/* Header animated border */}
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={
                  animateBorder
                    ? { width: "100%", opacity: 1 }
                    : { width: 0, opacity: 0 }
                }
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                className="fixed left-0 top-[var(--layout-size)] h-px bg-black z-40"
              />

              {/* Top segment */}
              {hasMounted && (
                <motion.div
                  initial={{ height: 0, opacity: 0, left: topTargetLeft }}
                  animate={{
                    height: "var(--layout-size)",
                    opacity: 1,
                    left: topTargetLeft,
                  }}
                  transition={{
                    height: {
                      duration: TOP_ANIMATION_DURATION,
                      ease: "easeOut",
                    },
                    opacity: { duration: 0.4 },
                  }}
                  onAnimationComplete={() => {
                    if (!topRevealed) setTopRevealed(true);
                  }}
                  className="fixed bg-black z-40"
                  style={{
                    top: 0,
                    width: 1,
                    height: "var(--layout-size)",
                  }}
                />
              )}

              {/* Bottom segment */}
              {hasMounted && (
                <motion.div
                  initial={{ height: 0, opacity: 0, left: bottomTargetLeft }}
                  animate={{
                    height: "calc(100vh - var(--layout-size))",
                    opacity: 1,
                    left: bottomTargetLeft,
                  }}
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
                    top: "var(--layout-size)",
                    width: 1,
                    height: "calc(100vh - var(--layout-size))",
                  }}
                />
              )}

              {/* Main content scrolls normally */}
              <div className="transition-all duration-500 pl-0 md:pl-[var(--layout-size)]">
                <main className={`relative w-full pt-[var(--layout-size)]`}>
                  {children}
                </main>
                <MenuNav open={menuOpen} onClose={() => setMenuOpen(false)} />
              </div>

              {/* Animated vertical line */}
              <AnimatedVerticalLine />
            </div>
          </LenisProvider>
        </OrientationProvider>
      </body>
    </html>
  );
}
