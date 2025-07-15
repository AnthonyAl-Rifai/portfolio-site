import GridSection from "./GridSection";
import Image from "next/image";

interface ScrollContentProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  backgroundOpacity?: number;
}

export default function ScrollContent({
  children,
  className = "",
  backgroundImage,
  backgroundImageAlt = "Background image",
  backgroundOpacity = 1,
}: ScrollContentProps) {
  return (
    <div
      className={`w-full ${className}`}
      style={{ height: "calc(100vh - 2 * var(--layout-size))" }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt}
            fill
            className="object-cover"
            style={{ opacity: backgroundOpacity }}
          />
        </div>
      )}
      <div
        className={`relative z-10 h-full ${backgroundImage ? "" : "bg-blue-400"}`}
      >
        <GridSection className="h-full">{children}</GridSection>
      </div>
    </div>
  );
}
