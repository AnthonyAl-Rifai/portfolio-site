"use client";

interface HeaderProps {
  menuOpen: boolean;
  onMenuToggle: () => void;
}

export default function Header({ menuOpen, onMenuToggle }: HeaderProps) {
  function handleNameClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center bg-white"
      style={{
        height: "var(--layout-size)",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      <button
        onClick={onMenuToggle}
        className="z-50 h-full flex items-center justify-center bg-white/10 backdrop-blur-md p-4 transition-colors hover:bg-white/20"
        style={{
          width: "var(--layout-size)",
        }}
      >
        <span className="text-4xl">{menuOpen ? "×" : "⠿"}</span>
      </button>
      <button
        onClick={handleNameClick}
        className="text-4xl font-bold ml-4 bg-transparent border-none p-0 m-0 cursor-pointer focus:outline-none"
        style={{ lineHeight: 1 }}
        aria-label="Scroll to top"
      >
        Anthony Al-Rifai
      </button>
    </header>
  );
}
