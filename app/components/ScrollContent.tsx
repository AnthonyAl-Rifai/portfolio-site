import GridSection from "./GridSection";
import Image from "next/image";

interface ScrollContentProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  backgroundOverlayClassName?: string;
  gridHasPadding?: boolean;
}

export default function ScrollContent({
  children,
  className = "",
  backgroundImage,
  backgroundImageAlt = "Background image",
  backgroundOverlayClassName,
  gridHasPadding = true,
}: ScrollContentProps) {
  return (
    <div
      className={`w-full relative ${className}`}
      style={{ height: "calc(100vh - 2 * var(--layout-size))" }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
          />
        </div>
      )}

      {backgroundOverlayClassName && (
        <div className="absolute inset-0 z-0 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-16 grid-rows-10 md:grid-rows-12 lg:grid-rows-6 pointer-events-none">
          <div
            className={`col-start-1 col-end-[-1] row-start-1 row-end-[-1] ${backgroundOverlayClassName}`}
          />
        </div>
      )}

      <div className="relative z-10 h-full">
        <GridSection className="h-full" hasPadding={gridHasPadding}>
          {children}
        </GridSection>
      </div>
    </div>
  );
}
