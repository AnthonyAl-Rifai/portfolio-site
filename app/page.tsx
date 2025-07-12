"use client";
import { useState } from "react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen text-black">
      {/* Corner Square (Toggle Button) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-0 left-0 z-50 flex items-center justify-center border-r border-b bg-white/10 backdrop-blur-md p-4 transition-colors hover:bg-white/20"
        style={{
          width: "var(--layout-size)",
          height: "var(--layout-size)",
        }}
      >
        <span className="text-2xl">{menuOpen ? "×" : "⠿"}</span>
      </button>

      {/* Menu Overlay
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black text-white grid grid-cols-4 grid-rows-2 gap-4 p-10">
          <div className="col-span-1 row-span-2 bg-neutral-900 rounded-xl p-8 flex flex-col justify-between">
            <nav className="flex flex-col space-y-6 text-xl">
              <a href="#" className="hover:underline">Home</a>
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Work</a>
              <a href="#" className="hover:underline">Contact</a>
            </nav>
            <p className="text-sm text-neutral-400">Contact us<br />hey@yourdomain.com</p>
          </div>
          <div className="col-span-1 bg-neutral-800 rounded-xl flex items-center justify-center">Product Design</div>
          <div className="col-span-1 bg-neutral-800 rounded-xl flex items-center justify-center">Branding Design</div>
          <div className="col-span-1 bg-neutral-800 rounded-xl flex items-center justify-center">Website Design</div>
          <div className="col-span-2 bg-neutral-800 rounded-xl flex items-center justify-center">Design Systems</div>
        </div>
      )} */}

      {/* Fixed Sidebar */}
      <div
        className="fixed left-0 border-r  z-30"
        style={{
          top: "var(--layout-size)",
          width: "var(--layout-size)",
          height: `calc(100vh - var(--layout-size))`,
        }}
      />

      {/* Main content area, offset by sidebar */}
      <div
        style={{
          paddingLeft: "var(--layout-size)",
        }}
      >
        {/* Top Nav */}
        <header
          className="flex items-center justify-between px-6 border-b"
          style={{
            height: "var(--layout-size)",
          }}
        >
          <h1 className="text-3xl font-bold">Anthony Al-Rifai</h1>
          <div className="space-x-4">
            <a href="#" className="text-lg font-bold hover:underline">
              Projects
            </a>
            <a href="#" className="text-lg font-bold hover:underline">
              Experience
            </a>
            <a href="#" className="text-lg font-bold hover:underline">
              Contact
            </a>
          </div>
        </header>

        {/* Grid Layout */}
        <main className="grid grid-cols-16 grid-rows-6 flex-1 min-h-[calc(100vh-var(--layout-size))] gap-4 px-6 py-6 relative">
          {/* Main Content Grid */}
          <div
            className={`col-start-1 col-span-16 row-start-2 row-span-1 self-center transition-all duration-500 ease-in-out ${
              menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <h1 className="text-9xl">Full Stack Developer</h1>
          </div>

          {/* Menu Overlay Grid */}
          <div
            className={`col-start-1 row-start-1 col-span-16 row-span-6 transition-all duration-500 ease-in-out ${
              menuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            } grid grid-cols-16 grid-rows-6 gap-4`}
          >
            {/* Sidebar */}
            <div className="col-span-4 row-span-6 bg-neutral-800 rounded-md p-8 flex flex-col justify-between">
              <nav className="flex flex-col space-y-6 text-xl">
                <a href="#" className="hover:underline">
                  Home
                </a>
                <a href="#" className="hover:underline">
                  About
                </a>
                <a href="#" className="hover:underline">
                  Work
                </a>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </nav>
              <p className="text-sm text-neutral-400">
                Contact us
                <br />
                hey@yourdomain.com
              </p>
            </div>

            {/* Content Tiles */}
            <a
              href="#"
              className="col-start-5 col-span-6 row-span-3 bg-neutral-800 rounded-md flex items-center justify-center hover:bg-neutral-700 transition-colors"
            >
              Product Design
            </a>
            <a
              href="#"
              className="col-start-11 col-span-6 row-span-3 bg-neutral-800 rounded-md flex items-center justify-center hover:bg-neutral-700 transition-colors"
            >
              Branding Design
            </a>
            <a
              href="#"
              className="col-start-5 col-span-6 row-start-4 row-span-3 bg-neutral-800 rounded-md flex items-center justify-center hover:bg-neutral-700 transition-colors"
            >
              Website Design
            </a>
            <a
              href="#"
              className="col-start-11 col-span-6 row-start-4 row-span-3 bg-neutral-800 rounded-md flex items-center justify-center hover:bg-neutral-700 transition-colors"
            >
              Design Systems
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
