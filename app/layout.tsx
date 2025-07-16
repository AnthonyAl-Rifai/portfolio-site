"use client";

import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MenuNav from "./components/MenuNav";
import LayoutBorders from "./components/LayoutBorders";
import {
  OrientationProvider,
  useOrientation,
} from "./components/OrientationContext";
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

  useEffect(() => {
    const handleResize = () => {
      document.body.style.overflow = menuOpen ? "hidden" : "";
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

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
            <LayoutContent menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
              {children}
            </LayoutContent>
          </LenisProvider>
        </OrientationProvider>
      </body>
    </html>
  );
}

function LayoutContent({
  children,
  menuOpen,
  setMenuOpen,
}: {
  children: React.ReactNode;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  const { isLandscape } = useOrientation();

  return (
    <div className="relative w-full text-black">
      <Sidebar />

      <Header
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        onNameClick={() => setMenuOpen(false)}
      />

      <LayoutBorders />

      <div className="transition-all duration-500 pl-0 md:pl-[var(--layout-size)]">
        <main
          className={`relative w-full ${isLandscape ? "" : "pt-[var(--layout-size)]"}`}
        >
          {children}
        </main>
        <MenuNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </div>
  );
}
