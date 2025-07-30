"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";
import { Step } from "./Step";
import SectionTitle from "./SectionTitle";

interface ScrollSectionProps {
  id: string;
  name: string;
  steps: React.ReactNode[];
  stepHeight?: number;
  directions?: ("left" | "right" | "up" | "down" | "none")[];
}

export default function ScrollSection({
  id,
  name,
  steps,
  stepHeight = 150,
  directions = [],
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });

  // Split the first element as the static initial component
  const [initial, ...animatedSteps] = steps;

  return (
    <section
      ref={sectionRef}
      id={id}
      style={{ height: `${animatedSteps.length * stepHeight}vh` }}
      className="relative"
    >
      {/* SectionTitle handles its own sticky behavior */}
      <SectionTitle name={name} isSticky />

      {/* Container for steps, offset by the SectionTitle height */}
      <div className="sticky top-[calc(var(--layout-size)*2)] h-[calc(100vh-var(--layout-size)*2)] overflow-hidden">
        {/* Static component always in the background */}
        <div className="absolute inset-0">{initial}</div>

        {/* Animated steps */}
        {animatedSteps.map((step, index) => (
          <Step
            key={index}
            index={index}
            totalSteps={animatedSteps.length}
            scrollYProgress={scrollYProgress}
            direction={directions[index + 1] || "right"}
          >
            {step}
          </Step>
        ))}
      </div>
    </section>
  );
}
