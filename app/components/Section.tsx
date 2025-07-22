"use client";
import { forwardRef } from "react";
import { useLayout } from "../context/LayoutContext";

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  /** Use dvh instead of vh */
  useDvhHeight?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, className = "", children, useDvhHeight = false }, ref) => {
    const { isMobileLandscape } = useLayout();
    const usesCustomHeight = className.includes("h-[");
    const heightClass = usesCustomHeight
      ? ""
      : useDvhHeight
        ? "h-[calc(100dvh-var(--layout-size))]"
        : "h-[calc(100vh-var(--layout-size))]";

    return (
      <section
        ref={ref}
        id={id}
        className={`relative w-full flex flex-col ${heightClass} ${className}`}
        style={{
          scrollMarginTop: isMobileLandscape ? 0 : "var(--layout-size)",
        }}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
