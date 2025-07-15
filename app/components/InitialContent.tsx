import GridSection from "./GridSection";
import Image from "next/image";

interface InitialContentProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

export default function InitialContent({
  children,
  className = "",
  backgroundImage,
  backgroundImageAlt = "Background image",
}: InitialContentProps) {
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
          />
        </div>
      )}
      <div
        className={`relative z-10 h-full ${backgroundImage ? "" : "bg-amber-200"}`}
      >
        <GridSection className="h-full">{children}</GridSection>
      </div>
    </div>
  );
}
