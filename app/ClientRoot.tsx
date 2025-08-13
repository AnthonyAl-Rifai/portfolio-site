"use client";

import { useState } from "react";
import LoadingScreen from "./components/layout/LoadingScreen";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import MenuNav from "./components/layout/MenuNav";
import Footer from "./components/layout/Footer";
import LayoutBorders from "./components/layout/LayoutBorders";
import LenisProvider from "./components/layout/LenisProvider";
import { LayoutProvider, useLayout } from "./context/LayoutContext";

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

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutProvider>
      <LayoutWrapper>{children}</LayoutWrapper>
    </LayoutProvider>
  );
}
