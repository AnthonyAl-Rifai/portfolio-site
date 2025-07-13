interface GridSectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export default function GridSection({
  id,
  className = "",
  children,
}: GridSectionProps) {
  return (
    <section
      id={id}
      className={`
        w-full
        min-h-[calc(100vh-var(--layout-size))]
        h-[calc(100vh-var(--layout-size))]
        grid grid-cols-4 grid-rows-10 gap-4 p-4
        md:grid-cols-8 md:grid-rows-6
        lg:grid-cols-16 lg:grid-rows-6
        ${className}
      `}
      style={{ scrollMarginTop: "var(--layout-size)" }}
    >
      {children}
    </section>
  );
}
