"use client";
import { useState } from "react";

export default function HomePage() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen text-black">
      {/* Corner Square (Toggle Button) */}
      <button
        onClick={() => setNavOpen(!navOpen)}
        className="fixed top-0 left-0 z-50 flex items-center justify-center border-r bg-white/10 backdrop-blur-md p-4 transition-colors hover:bg-white/20"
        style={{
          width: "var(--layout-size)",
          height: "var(--layout-size)",
        }}
      >
        <span className="text-2xl">⠿</span>
      </button>

      {/* Fixed Sidebar */}
      <div
        className="fixed left-0 border-r border-t z-40"
        style={{
          top: "var(--layout-size)",
          width: "var(--layout-size)",
          height: `calc(100vh - var(--layout-size))`,
        }}
      />

      {/* Main content area, offset by sidebar */}
      <div
        className="pt-[1px]"
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
          <h1 className="text-lg font-bold">Anthony Al-Rifai</h1>
          <div className="space-x-4">
            <a href="#" className="text-sm hover:underline">
              Projects
            </a>
            <a href="#" className="text-sm hover:underline">
              Experience
            </a>
            <a href="#" className="text-sm hover:underline">
              Contact
            </a>
          </div>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-12 gap-4 px-6 py-6">
          {/* Sidebar Panel inside content */}
          <aside className="col-span-12 md:col-span-3">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 shadow-sm">
              {!navOpen ? (
                <div>
                  <h2 className="text-lg font-semibold mb-2">About Me</h2>
                  <p className="text-sm text-gray-700">
                    Full Stack Developer and composer passionate about building
                    responsive and thoughtful user interfaces.
                  </p>
                </div>
              ) : (
                <nav className="space-y-2">
                  {["About", "Projects", "Experience", "Skills", "Contact"].map((item) => (
                    <button
                      key={item}
                      className="w-full flex justify-between items-center px-4 py-2 text-left bg-white rounded-md border hover:bg-gray-50 transition"
                    >
                      <span>{item}</span>
                      <span className="text-gray-400">{">"}</span>
                    </button>
                  ))}
                </nav>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-12 md:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-4 flex flex-col space-y-4"
                >
                  <div className="aspect-video bg-gray-200 rounded-md" />
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 rounded w-2/3" />
                  <button className="self-start bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                    View Project
                  </button>
                  <div className="bg-red-300 lg:bg-green-500 p-4">
                    Resize me! I turn green at the `lg` breakpoint (1024px+)
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
