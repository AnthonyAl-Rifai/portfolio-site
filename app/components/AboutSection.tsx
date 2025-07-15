"use client";

import ScrollSection from "./ScrollSection";
import InitialContent from "./InitialContent";
import ScrollContent from "./ScrollContent";

export default function AboutSection() {
  // Initial component (always visible)
  const initialComponent = (
    <InitialContent>
      <div className="col-span-full row-span-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome</h2>
          <p className="text-gray-600">Scroll to reveal more content</p>
        </div>
      </div>
    </InitialContent>
  );

  // Scroll component (slides in from left)
  const scrollComponent = (
    <ScrollContent className="bg-white border-r">
      <div className="col-span-full row-span-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p>This content slides in as you scroll</p>
        </div>
      </div>
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
