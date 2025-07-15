import GridSection from "./GridSection";

interface ScrollContentProps {
  children?: React.ReactNode;
  className?: string;
  useGrid?: boolean;
}

export default function ScrollContent({
  children,
  className = "",
  useGrid = true,
}: ScrollContentProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      {useGrid ? <GridSection>{children}</GridSection> : children}
    </div>
  );
}
