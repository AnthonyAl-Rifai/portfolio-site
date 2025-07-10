import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full flex flex-col gap-6 items-start py-24 px-4 sm:px-12">
      <h1 className="text-5xl sm:text-7xl font-bold leading-tight">Full Stack <span className="text-purple-400">Developer</span></h1>
      <p className="text-lg text-gray-600 max-w-xl">A software design team specialized in branding, websites, products and systems from 0 → 1</p>
      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
        <span>🏆 An award-winning remote team</span>
        <span className="font-semibold">since 2014 til Infinity</span>
      </div>
    </section>
  );
};

export default HeroSection; 