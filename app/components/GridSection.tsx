interface GridSectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  useDvhHeight?: boolean;
  isLandscape?: boolean; // add this
}

export default function GridSection({
  id,
  className = "",
  children,
  useDvhHeight = false, // default: false
  isLandscape = false, // default
}: GridSectionProps) {
  return (
    <section
      id={id}
      className={`
        w-full
        ${
          useDvhHeight
            ? "min-h-[calc(100dvh-var(--layout-size))] h-[calc(100dvh-var(--layout-size))]"
            : "min-h-[calc(100vh-var(--layout-size))] h-[calc(100vh-var(--layout-size))]"
        }
        grid
        ${isLandscape ? "grid-cols-5" : "grid-cols-4"}
        grid-rows-10 gap-4 p-4
        md:grid-cols-8 md:grid-rows-12
        lg:grid-cols-16 lg:grid-rows-6
        ${className}
      `}
      style={{ scrollMarginTop: "var(--layout-size)" }}
    >
      {children}
    </section>
  );
}
