import GridSection from "./components/GridSection";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import WebDevSection from "./components/WebDevSection";
import MusicSection from "./components/MusicSection";
import ResumeSection from "./components/ResumeSection";
import ContactSection from "./components/ContactSection";
export default function HomePage() {
  return (
    <>
      <GridSection id="hero">
        <HeroSection />
      </GridSection>
      <GridSection id="about">
        <AboutSection />
      </GridSection>
      <GridSection id="webdev">
        <WebDevSection />
      </GridSection>
      <GridSection id="music">
        <MusicSection />
      </GridSection>
      <GridSection id="resume">
        <ResumeSection />
      </GridSection>
      <GridSection id="contact">
        <ContactSection />
      </GridSection>
    </>
  );
}
