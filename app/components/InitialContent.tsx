import GridSection from "./GridSection";

interface InitialContentProps {
  children?: React.ReactNode;
  className?: string;
  useGrid?: boolean;
}

export default function InitialContent({
  children,
  className = "",
  useGrid = true,
}: InitialContentProps) {
  return (
    <div className={`w-full h-full mt-[var(--layout-size)] ${className}`}>
      {useGrid ? <GridSection>{children}</GridSection> : children}
    </div>
  );
}
