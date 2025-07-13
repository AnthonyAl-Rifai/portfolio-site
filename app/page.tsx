import GridSection from "./components/GridSection";

export default function HomePage() {
  return (
    <>
      <GridSection id="hero">
        <h1 className="text-6xl font-bold col-start-1">Full Stack Developer</h1>
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
