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
          <Sidebar />
          <Header
            menuOpen={menuOpen}
            onMenuToggle={() => setMenuOpen(!menuOpen)}
          />

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
