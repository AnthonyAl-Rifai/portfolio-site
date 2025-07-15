import ScrollSection from "./ScrollSection";
import InitialContent from "./InitialContent";
import ScrollContent from "./ScrollContent";

export default function AboutSection() {
  const initialComponent = (
    <InitialContent>
      <p className="text-4xl font-bold col-span-full row-span-full flex i justify-center rounded p-6 text-center leading-relaxed">
        My name is Anthony. I&apos;m a human based out of Los Angeles.
      </p>
    </InitialContent>
  );

  const scrollComponent = (
    <ScrollContent className="bg-white border-r">
      <p className="text-xl font-bold col-span-full row-span-full flex justify-center rounded p-6 text-center leading-relaxed">
        I&apos;m a full stack software engineer with a frontend focus and a
        background in music. I&apos;ve worked on large platforms, solving UX
        challenges and collaborating across teams. Before tech, I composed music
        for TV and ads. I still write and perform, and occasionally host
        backyard BBQ popups in LA. I care about craft, clarity, and building
        things that connect.
      </p>
    </ScrollContent>
  );

  return (
    <ScrollSection
      name="About"
      id="about"
      initialComponent={initialComponent}
      scrollComponent={scrollComponent}
    />
  );
}
