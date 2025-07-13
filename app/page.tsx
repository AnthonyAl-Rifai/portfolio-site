import GridSection from "./components/GridSection";
import HeroPage from "./components/HeroPage";
export default function HomePage() {
  return (
    <>
      <GridSection id="hero">
        <HeroPage />
      </GridSection>
      <GridSection id="about">
        <h1 className="text-6xl font-bold">About</h1>
      </GridSection>
      <GridSection id="webdev">
        <h1 className="text-6xl font-bold">Web Dev</h1>
      </GridSection>
      <GridSection id="music">
        <h1 className="text-6xl font-bold">Music</h1>
      </GridSection>
      <GridSection id="resume">
        <h1 className="text-6xl font-bold">Resume</h1>
      </GridSection>
      <GridSection id="contact">
        <h1 className="text-6xl font-bold">Contact</h1>
      </GridSection>
    </>
  );
}
