"use client";
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MenuNav from "./components/MenuNav";

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
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative w-full min-h-screen text-black">
          {/* Fixed Sidebar with transition */}
          <div
            className="fixed left-0 border-r z-30 transition-all duration-500 -translate-x-full md:translate-x-0"
            style={{
              top: "var(--layout-size)",
              width: "var(--layout-size)",
              height: `calc(100vh - var(--layout-size))`,
            }}
          />

          {/* Header: always full width */}
          <header
            className="fixed top-0 left-0 right-0 z-40 flex items-center border-b bg-white"
            style={{ height: "var(--layout-size)" }}
          >
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="z-50 h-full flex items-center justify-center border-r bg-white/10 backdrop-blur-md p-4 transition-colors hover:bg-white/20"
              style={{
                width: "var(--layout-size)",
              }}
            >
              <span className="text-4xl">{menuOpen ? "×" : "⠿"}</span>
            </button>
            <h1 className="text-4xl font-bold ml-4">Anthony Al-Rifai</h1>
          </header>

          {/* Main content area, offset by sidebar */}
          <div
            className="transition-all duration-500 pl-0 md:pl-[var(--layout-size)]"
            style={{ marginTop: "var(--layout-size)" }}
          >
            {/* Main scrollable grid section container */}
            <main
              className={`relative h-screen snap-y ${
                menuOpen ? "overflow-hidden" : "overflow-y-scroll"
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
