"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoadingScreen from "./components/layout/LoadingScreen";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import MenuNav from "./components/layout/MenuNav";
import Footer from "./components/layout/Footer";
import LayoutBorders from "./components/layout/LayoutBorders";
import LenisProvider from "./components/layout/LenisProvider";
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
        <title>
          Anthony Al-Rifai | Full Stack Developer - Frontend Focused
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico?v=1" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico?v=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.anthonyalrifai.com/" />
        <meta
          property="og:title"
          content="Anthony Al-Rifai | Full Stack Developer - Frontend Focused"
        />
        <meta
          property="og:description"
          content="Frontend-focused Full Stack Developer skilled in React, Vue, and TypeScript, with a creative background in music composition for television."
        />
        <meta
          property="og:image"
          content="/assets/images/ui/anthonyalrifai-website-logo-rectangle.png"
        />
        <meta property="og:image:width" content="1201" />
        <meta property="og:image:height" content="631" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.anthonyalrifai.com/"
        />
        <meta
          property="twitter:title"
          content="Anthony Al-Rifai | Full Stack Developer - Frontend Focused"
        />
        <meta
          property="twitter:description"
          content="Frontend-focused Full Stack Developer skilled in React, Vue, and TypeScript, with a creative background in music composition for television."
        />
        <meta
          property="twitter:image"
          content="/assets/images/ui/anthonyalrifai-website-logo-rectangle.png"
        />

        {/* Additional meta tags */}
        <meta
          name="description"
          content="Frontend-focused Full Stack Developer skilled in React, Vue, and TypeScript, with a creative background in music composition for television."
        />
        <meta
          name="keywords"
          content="Full Stack Developer, Frontend Developer, React, Vue.js, Next.js, TypeScript, Web Development"
        />
        <meta name="author" content="Anthony Al-Rifai" />
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
