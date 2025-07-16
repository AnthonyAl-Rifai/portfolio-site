import { useIsLargerThanMobile } from "../hooks/useIsLargerThanMobile";
import GridSection from "./GridSection";
import { useLayout } from "./LayoutContext";

interface MenuNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MenuNav({ open, onClose }: MenuNavProps) {
  const { isMobileLandscape } = useLayout();
  const isLargerThanMobile = useIsLargerThanMobile();

  const top = isMobileLandscape ? 0 : "var(--layout-size)";
  const height = isMobileLandscape
    ? "100dvh"
    : "calc(100dvh - var(--layout-size))";
  const left = isLargerThanMobile ? "var(--layout-size)" : 0;
  const right = isMobileLandscape ? "var(--layout-size)" : 0;

  const baseClass =
    "bg-black/70 rounded-md flex items-center justify-center hover:bg-black/50 transition-colors text-white font-bold text-2xl backdrop-blur-md border border-black/20";

  return (
    <nav
      className={`fixed bg-white/10 backdrop-blur-md transition-opacity duration-300 z-40 md:border-l
        ${isMobileLandscape ? "border-r" : "border-t"}
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      style={{
        top,
        height,
        left,
        right,
      }}
    >
      <GridSection isMobileLandscape={isMobileLandscape} fillParent={true}>
        <a
          href="#about"
          onClick={onClose}
          className={`${
            isMobileLandscape
              ? "col-span-1 row-span-full"
              : "col-span-4 row-span-2"
          } md:row-span-8 lg:col-span-4 lg:row-span-6 ${baseClass}`}
        >
          About
        </a>

        <a
          href="#webdev"
          onClick={onClose}
          className={`${
            isMobileLandscape
              ? "col-span-1 row-span-full"
              : "col-span-4 row-span-2"
          } md:row-span-4 lg:col-span-6 lg:row-span-3 ${baseClass}`}
        >
          Web Dev
        </a>

        <a
          href="#music"
          onClick={onClose}
          className={`${
            isMobileLandscape
              ? "col-span-1 row-span-full"
              : "col-span-4 row-span-2"
          } md:row-span-4 lg:col-span-6 lg:row-span-3 ${baseClass}`}
        >
          Music
        </a>

        <a
          href="#resume"
          onClick={onClose}
          className={`${
            isMobileLandscape
              ? "col-span-1 row-span-full"
              : "col-span-4 row-span-2"
          } md:row-span-4 lg:col-span-6 lg:row-span-3 ${baseClass}`}
        >
          Resume
        </a>

        <a
          href="#contact"
          onClick={onClose}
          className={`${
            isMobileLandscape
              ? "col-span-1 row-span-full"
              : "col-span-4 row-span-2"
          } md:row-span-4 lg:col-span-6 lg:row-span-3 ${baseClass}`}
        >
          Contact
        </a>
      </GridSection>
    </nav>
  );
}
