import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import MusicSection from "./components/sections/MusicSection";
import ContactSection from "./components/sections/ContactSection";
import DevelopmentSection from "./components/sections/DevelopmentSection";

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
