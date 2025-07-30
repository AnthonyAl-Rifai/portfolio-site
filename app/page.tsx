import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import WebDevSection from "./components/WebDevSection";
import MusicSection from "./components/MusicSection";
import ContactSection from "./components/ContactSection";
// import TestSection from "./components/TestSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* <TestSection /> */}
      <AboutSection />
      <WebDevSection />
      <MusicSection />
      <ContactSection />
    </>
  );
}
