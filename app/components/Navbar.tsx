import React from "react";

type NavbarProps = {
  onMenuClick?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 border-b border-gray-200 bg-white/80 backdrop-blur-md fixed top-0 left-0 z-30">
      <div className="flex items-center gap-3">
        <button aria-label="Open menu" className="p-2 rounded hover:bg-gray-100 focus:outline-none" onClick={onMenuClick}>
          <span className="text-2xl">☰</span>
        </button>
        <span className="font-bold text-lg tracking-tight">anthonyAlRifai</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="hidden sm:block text-sm text-gray-600">Good afternoon!</span>
        <a href="#contact" className="bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition text-sm">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar; 