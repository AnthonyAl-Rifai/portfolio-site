import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import WebDevSection from "./components/WebDevSection";
import MusicSection from "./components/MusicSection";
import ContactSection from "./components/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WebDevSection />
      <MusicSection />
      <ContactSection />
    </>
  );
}
