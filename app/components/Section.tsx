import { forwardRef } from "react";

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  useDvhHeight?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, className = "", children, useDvhHeight = false }, ref) => {
    const heightClass = useDvhHeight
      ? "h-[calc(100dvh-var(--layout-size))]"
      : "h-[calc(100vh-var(--layout-size))]";

    const minHeightClass = "min-h-[600px]"; // prevent squish in mobile landscape

    return (
      <section
        ref={ref}
        id={id}
        className={`
          w-full flex flex-col
          ${heightClass}
          ${minHeightClass}
          ${className}
        `}
        style={{ scrollMarginTop: "var(--layout-size)" }}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
