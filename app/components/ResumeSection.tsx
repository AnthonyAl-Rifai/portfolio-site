import SectionTitle from "./SectionTitle";
import Section from "./Section";
import GridSection from "./GridSection";

export default function ResumeSection() {
  return (
    <Section id="resume">
      <SectionTitle name="Resume" />
      <GridSection>
        <div>resume</div>
      </GridSection>
    </Section>
  );
}
