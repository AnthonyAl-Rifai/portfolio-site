import { forwardRef } from "react";

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  useDvhHeight?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, className = "", children, useDvhHeight = false }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={`
        w-full flex flex-col
        ${
          useDvhHeight
            ? "min-h-[calc(100dvh-var(--layout-size))] h-[calc(100dvh-var(--layout-size))]"
            : "min-h-[calc(100vh-var(--layout-size))] h-[calc(100vh-var(--layout-size))]"
        }
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
