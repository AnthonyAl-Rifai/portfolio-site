"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoadingScreen from "./components/LoadingScreen";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MenuNav from "./components/MenuNav";
import Footer from "./components/Footer";
import LayoutBorders from "./components/LayoutBorders";
import LenisProvider from "./components/LenisProvider";
import { LayoutProvider, useLayout } from "./context/LayoutContext";

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
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </LayoutProvider>
      </body>
    </html>
  );
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { hasMounted, isMobileLandscape } = useLayout();

  if (!hasMounted) return <LoadingScreen />;

  return (
    <LenisProvider menuOpen={menuOpen}>
      <div className="relative w-full h-dvh">
        <Header
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen(!menuOpen)}
          onNameClick={() => setMenuOpen(false)}
        />
        <Sidebar />
        <LayoutBorders />
        <MenuNav open={menuOpen} onClose={() => setMenuOpen(false)} />
        <main
          className={`relative w-full h-full ${
            isMobileLandscape
              ? "pt-0 pr-[var(--layout-size)]"
              : "pt-[var(--layout-size)] pl-0 md:pl-[var(--layout-size)]"
          }`}
        >
          {children}
          <Footer />
        </main>
      </div>
    </LenisProvider>
  );
}
