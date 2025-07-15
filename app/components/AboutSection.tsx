import ScrollSection from "./ScrollSection";
import InitialContent from "./InitialContent";
import ScrollContent from "./ScrollContent";

export default function AboutSection() {
  const initialComponent = (
    <InitialContent>
      <div className="col-span-2 row-span-2 bg-red-200 flex items-center justify-center rounded">
        Initial 1
      </div>
      <div className="col-span-2 row-span-2 bg-blue-200 flex items-center justify-center rounded">
        Initial 2
      </div>
      <div className="col-span-4 row-span-2 bg-green-200 flex items-center justify-center rounded">
        Initial 3
      </div>
      <div className="row-start-5 col-span-4 row-span-full bg-orange-200 flex items-center justify-center rounded">
        Initial 4
      </div>
    </InitialContent>
  );

  const scrollComponent = (
    <ScrollContent className="bg-white border-r">
      <div className="col-span-2 row-span-3 bg-purple-200 flex items-center justify-center rounded">
        Scroll 1
      </div>
      <div className="col-span-2 row-span-3 bg-yellow-200 flex items-center justify-center rounded">
        Scroll 2
      </div>
      <div className="row-start-4 col-span-4 row-span-full bg-pink-200 flex items-center justify-center rounded">
        Scroll 3
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
