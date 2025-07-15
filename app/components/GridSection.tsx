interface GridSectionProps {
  className?: string;
  children: React.ReactNode;
  isLandscape?: boolean;
  fillParent?: boolean;
  hasPadding?: boolean;
}

export default function GridSection({
  className = "",
  children,
  isLandscape = false,
  fillParent = true,
  hasPadding = true,
}: GridSectionProps) {
  return (
    <div
      className={`
        w-full
        ${fillParent ? "flex-1 h-0 min-h-0" : "h-full"}
        ${hasPadding ? "p-4" : ""}
        grid
        ${isLandscape ? "grid-cols-5" : "grid-cols-4"}
        grid-rows-10 gap-4
        md:grid-cols-8 md:grid-rows-12
        lg:grid-cols-16 lg:grid-rows-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}
