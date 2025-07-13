import GridSection from "./GridSection";
interface MenuNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MenuNav({ open, onClose }: MenuNavProps) {
  return (
    <nav
      className={`fixed bg-white/10 backdrop-blur-md border border-white/20 transition-opacity duration-300 z-40 menu-nav-overlay ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{
        top: "var(--layout-size)",
        //dvh is compatible with all modern browsers so this should be fine
        height: "calc(100dvh - var(--layout-size))",
        // i don't know if this is necessary
        // paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <GridSection id="nav">
        {/* About */}
        <a
          href="#about"
          onClick={onClose}
          className="col-span-4 row-span-2 md:row-span-4 lg:col-span-4 lg:row-span-6 bg-black/70 rounded-md flex items-center justify-center hover:bg-black/50 transition-colors text-white font-bold text-2xl backdrop-blur-md border border-black/20"
        >
          About
        </a>

        {/* Web Dev */}
        <a
          href="#webdev"
          onClick={onClose}
          className="col-span-4 row-span-2 md:row-span-2 lg:col-span-6 lg:row-span-3 bg-black/70 rounded-md flex items-center justify-center hover:bg-black/50 transition-colors text-white font-bold text-2xl backdrop-blur-md border border-black/20"
        >
          Web Dev
        </a>

        {/* Music */}
        <a
          href="#music"
          onClick={onClose}
          className="col-span-4 row-span-2 md:row-span-2 lg:col-span-6 lg:row-span-3 bg-black/70 rounded-md flex items-center justify-center hover:bg-black/50 transition-colors text-white font-bold text-2xl backdrop-blur-md border border-black/20"
        >
          Music
        </a>

        {/* Resume */}
        <a
          href="#resume"
          onClick={onClose}
          className="col-span-4 row-span-2 md:row-span-2 lg:col-span-6 lg:row-span-3 bg-black/70 rounded-md flex items-center justify-center hover:bg-black/50 transition-colors text-white font-bold text-2xl backdrop-blur-md border border-black/20"
        >
          Resume
        </a>

        {/* Contact */}
        <a
          href="#contact"
          onClick={onClose}
          className="col-span-4 row-span-2 md:row-span-2 lg:col-span-6 lg:row-span-3 bg-black/70 rounded-md flex items-center justify-center hover:bg-black/50 transition-colors text-white font-bold text-2xl backdrop-blur-md border border-black/20"
        >
          Contact
        </a>
      </GridSection>
    </nav>
  );
}
