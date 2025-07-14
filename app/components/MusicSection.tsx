import SectionTitle from "./SectionTitle";
import Section from "./Section";
import GridSection from "./GridSection";

export default function MusicSection() {
  return (
    <Section id="music">
      <SectionTitle name="Music" />
      <GridSection>
        <div>music</div>
      </GridSection>
    </Section>
  );
}
