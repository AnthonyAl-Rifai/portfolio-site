import ScrollSection from "./ScrollSection";

function InitSection() {
  return (
    <div className="flex justify-center items-center h-full w-full bg-gray-100 border">
      <h1>Init Section</h1>
    </div>
  );
}

function SecondSection() {
  return (
    <div className="flex justify-center items-center h-full w-full bg-white border">
      <h1>Second Section</h1>
    </div>
  );
}

function ThirdSection() {
  return (
    <div className="flex justify-center items-center h-full w-full bg-gray-400 border">
      <h1>Third Section</h1>
    </div>
  );
}

function FourthSection() {
  return (
    <div className="flex justify-center items-center h-full w-full bg-green-200 border">
      <h1>Fourth Section</h1>
    </div>
  );
}

export default function TestSection() {
  return (
    <ScrollSection
      id="test"
      name="Test"
      steps={[
        <InitSection key="init" />,
        <SecondSection key="second" />,
        <ThirdSection key="third" />,
        <FourthSection key="fourth" />,
      ]}
      directions={["left", "right", "up", "down"]}
    />
  );
}
