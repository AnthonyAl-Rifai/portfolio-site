"use client";

interface HeaderProps {
  menuOpen: boolean;
  onMenuToggle: () => void;
}

export default function Header({ menuOpen, onMenuToggle }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center border-b bg-white"
      style={{ height: "var(--layout-size)" }}
    >
      <button
        onClick={onMenuToggle}
        className="z-50 h-full flex items-center justify-center border-r bg-white/10 backdrop-blur-md p-4 transition-colors hover:bg-white/20"
        style={{
          width: "var(--layout-size)",
        }}
      >
        <span className="text-4xl">{menuOpen ? "×" : "⠿"}</span>
      </button>
      <h1 className="text-4xl font-bold ml-4">Anthony Al-Rifai</h1>
    </header>
  );
}
