"use client";
import { useState } from "react";

export default function HomePage() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen text-black">
      {/* BACKGROUND GRADIENT */}
      {/* <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-500 via-gray-400 to-emerald-800" /> */}

      {/* Corner Square (Toggle or Logo) */}
      <button
        onClick={() => setNavOpen(!navOpen)}
        className="fixed top-0 left-0 w-[100px] h-[100px] max-md:w-[75px] max-md:h-[75px] z-50 flex items-center border-r justify-center bg-white/10 backdrop-blur-md p-4 transition-colors hover:bg-white/20"
      >
        <span className="text-2xl">⠿</span>
      </button>

      {/* Fixed Sidebar (below the square) */}
      <div className="fixed top-[100px] max-md:top-[75px] left-0 h-[calc(100vh-100px)] max-md:h-[calc(100vh-75px)] w-[100px] max-md:w-[75px] border-r border-t z-40" />

      {/* Main content offset from sidebar and top nav */}
      <div className="pl-[100px] pt-[1px] max-md:pl-[75px]">
        {/* Top Nav */}
        <header className="h-[100px] max-md:h-[75px] flex items-center justify-between px-6 border-b">
        <h1 className="text-lg font-bold">Anthony Al-Rifai</h1>
          <div className="space-x-4">
            <a href="#" className="text-sm hover:underline">Projects</a>
            <a href="#" className="text-sm hover:underline">Experience</a>
            <a href="#" className="text-sm hover:underline">Contact</a>
          </div>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-12 gap-4 px-6 py-6">
          {/* Sidebar Panel inside content area */}
          <aside className="col-span-12 md:col-span-3">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 shadow-sm">
              {!navOpen ? (
                <div>
                  <h2 className="text-lg font-semibold mb-2">About Me</h2>
                  <p className="text-sm text-gray-700">
                    Full Stack Developer and composer passionate about building responsive and thoughtful user interfaces.
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

          {/* Main Content Cards */}
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
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
