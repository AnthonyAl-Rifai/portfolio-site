export default function HeroPage() {
  return (
    <>
      <h1 className="text-6xl font-bold row-start-2 col-span-full">
        <span className="block overflow-hidden">
          <span className="block animate-reveal-from-bottom">Full Stack</span>
        </span>
        <span className="block overflow-hidden">
          <span className="block animate-reveal-from-bottom">Developer</span>
        </span>
      </h1>
      <p className="text-xl font-bold col-start-2 row-start-6 col-span-full">
        <span className="block animate-reveal-from-bottom-delayed">
          Design-minded, detail-obsessed, always curious.
        </span>
        <span className="block h-0.25 bg-black my-2 animate-line-in"></span>
      </p>
    </>
  );
}
