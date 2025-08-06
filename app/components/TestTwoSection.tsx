"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function TestTwoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Green panel slides left
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  // Yellow panel expands left while keeping right edge fixed
  const yellowWidth = useTransform(scrollYProgress, [0, 1], ["100%", "300%"]);
  const yellowX = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  // Yellow panel also grows in height
  const yellowHeight = useTransform(scrollYProgress, [0, 1], ["100%", "300%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-[var(--layout-size)] h-[calc(100vh-var(--layout-size))] bg-red-200 grid grid-cols-3 grid-rows-4">
        {/* Green panel that slides left */}
        <motion.div
          style={{ x: xTransform }}
          className="border-r bg-green-200 flex justify-center items-center z-10 col-start-1 col-span-2 row-span-full"
        >
          sup
        </motion.div>

        {/* Yellow panel that expands left */}
        <motion.div
          style={{
            width: yellowWidth,
            x: yellowX,
            height: yellowHeight,
          }}
          className="bg-amber-300 flex justify-center items-center col-start-3 border-b self-start z-10"
        >
          hello
        </motion.div>

        {/* Static cyan panel */}
        <div className="bg-cyan-500 flex justify-center items-center col-start-3 row-start-2 row-span-full">
          hi there
        </div>
      </div>
    </section>
  );
}

// "use client";

// import { useState } from "react";
// import { motion } from "motion/react";

// export default function LayoutExample() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <motion.div
//       layout
//       onClick={() => setIsOpen(!isOpen)}
//       className="w-40 bg-blue-400 p-4 cursor-pointer rounded-md"
//     >
//       <motion.h2 layout className="text-white text-lg">
//         Click Me
//       </motion.h2>

//       {isOpen && (
//         <motion.p layout className="text-white mt-2">
//           This text smoothly appears because layout animates the size change!
//         </motion.p>
//       )}
//     </motion.div>
//   );
// }
