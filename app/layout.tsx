"use client";
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MenuNav from "./components/MenuNav";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

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
  const [animateVerticalBorder, setAnimateVerticalBorder] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => setAnimateVerticalBorder(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative w-full text-black">
          <Sidebar />
          <Header
            menuOpen={menuOpen}
            onMenuToggle={() => setMenuOpen(!menuOpen)}
          />
          <span
            className={`header-animated-border${animateBorder ? " animate" : ""}`}
          />
          <span
            className={`vertical-animated-border${animateVerticalBorder ? " animate" : ""}`}
          />

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
      </body>
    </html>
  );
}
