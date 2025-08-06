import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MusicSection from "./components/MusicSection";
import ContactSection from "./components/ContactSection";
import DevelopmentSection from "./components/DevelopmentSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <DevelopmentSection />
      <MusicSection />
      <ContactSection />
    </>
  );
}
