import GridSection from "./GridSection";

export default function InitialContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className="w-full"
      style={{ height: "calc(100vh - 2 * var(--layout-size))" }}
    >
      <GridSection className={`h-full ${className}`}>{children}</GridSection>
    </div>
  );
}
