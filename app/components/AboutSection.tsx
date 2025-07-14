"use client";

import SectionTitle from "./SectionTitle";
import Section from "./Section";
import GridSection from "./GridSection";

export default function AboutSection() {
  return (
    <Section id="about" className="relative">
      <SectionTitle name="About" />
      <GridSection>
        <div className="bg-amber-100 col-span-full row-span-full"></div>
      </GridSection>
      <div className="bg-purple-100 p-4 flex-1 absolute top-[var(--layout-size)] -right-full"></div>
    </Section>
  );
}
