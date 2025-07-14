interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  useDvhHeight?: boolean;
}

export default function Section({
  id,
  className = "",
  children,
  useDvhHeight = false,
}: SectionProps) {
  return (
    <section
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
