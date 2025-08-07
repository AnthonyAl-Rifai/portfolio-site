"use client";

import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useLayout } from "../context/LayoutContext";
import { useIsLargerThanMobile } from "../hooks/useIsLargerThanMobile";

export default function NewAboutSection() {
  const { isTabletLandscape } = useLayout();
  const isLargerThanMobile = useIsLargerThanMobile();

  const motionRef1 = useRef<HTMLDivElement>(null);
  const motionRef2 = useRef<HTMLDivElement>(null);
  const motionRef3 = useRef<HTMLDivElement>(null);
  const motionRef4 = useRef<HTMLDivElement>(null);

  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: motionRef1,
    offset: ["end end", "start start"],
  });

  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: motionRef2,
    offset: ["end end", "start start"],
  });

  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: motionRef3,
    offset: ["end end", "start start"],
  });

  const { scrollYProgress: scrollYProgress4 } = useScroll({
    target: motionRef4,
    offset: ["end end", "start start"],
  });

  const [showFullText1, setShowFullText1] = useState(false);
  const [showFullText2, setShowFullText2] = useState(false);
  const [showFullText3, setShowFullText3] = useState(false);
  const [showFullText4, setShowFullText4] = useState(false);

  useMotionValueEvent(scrollYProgress1, "change", v => {
    const enterThreshold = isTabletLandscape ? 0.3 : 0.4;
    const exitThreshold = isTabletLandscape ? 0.2 : 0.2;

    if (v > enterThreshold && !showFullText1) {
      setShowFullText1(true);
    } else if (v < exitThreshold && showFullText1) {
      setShowFullText1(false);
    }
  });

  useMotionValueEvent(scrollYProgress2, "change", v => {
    const enterThreshold = isTabletLandscape ? 0.3 : 0.4;
    const exitThreshold = isTabletLandscape ? 0.2 : 0.2;

    if (v > enterThreshold && !showFullText2) {
      setShowFullText2(true);
    } else if (v < exitThreshold && showFullText2) {
      setShowFullText2(false);
    }
  });

  useMotionValueEvent(scrollYProgress3, "change", v => {
    const enterThreshold = isTabletLandscape ? 0.3 : 0.4;
    const exitThreshold = isTabletLandscape ? 0.2 : 0.2;

    if (v > enterThreshold && !showFullText3) {
      setShowFullText3(true);
    } else if (v < exitThreshold && showFullText3) {
      setShowFullText3(false);
    }
  });

  useMotionValueEvent(scrollYProgress4, "change", v => {
    const enterThreshold = isTabletLandscape ? 0.3 : 0.4;
    const exitThreshold = isTabletLandscape ? 0.2 : 0.2;

    if (v > enterThreshold && !showFullText4) {
      setShowFullText4(true);
    } else if (v < exitThreshold && showFullText4) {
      setShowFullText4(false);
    }
  });

  return (
    <Section id="about" className="h-[300vh]">
      <SectionTitle name="About" isSticky />
      <div className="grid grid-cols-1 md:grid-cols-2 h-[200vh]">
        <div className="" />
        <div className="mt-[50vh] flex flex-col">
          {isLargerThanMobile ? (
            <motion.div
              ref={motionRef1}
              layout
              className="w-full flex flex-col justify-between py-4"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.h2
                layout
                className="font-medium text-4xl lg:text-5xl pb-4"
              >
                Work with Me
              </motion.h2>

              <motion.div
                layout
                className="overflow-hidden"
                initial={false}
                animate={{
                  height: showFullText1 ? "auto" : 0,
                  opacity: showFullText1 ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className="text-xl lg:w-md">
                  Top talents as partners Work with the industry&apos;s
                  finest—an experienced senior team that&apos;s grown together
                  through years of collaboration, united by one goal: making
                  your project exceed every expectation.
                </p>
              </motion.div>

              <motion.div
                layout
                className="border-b mt-4"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>
          ) : (
            <div className="w-full border-y flex flex-col justify-between p-4 gap-8">
              <h2 className="text-3xl font-medium">Work with Me</h2>
              <p className="text-xl">
                Top talents as partners Work with the industry&apos;s finest—an
                experienced senior team that&apos;s grown together through years
                of collaboration, united by one goal: making your project exceed
                every expectation.
              </p>
            </div>
          )}

          {isLargerThanMobile ? (
            <motion.div
              ref={motionRef2}
              layout
              className="w-full flex flex-col justify-between py-4"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.h2
                layout
                className="font-medium text-4xl lg:text-5xl pb-4"
              >
                Innovation-Aligned
              </motion.h2>

              <motion.div
                layout
                className="overflow-hidden"
                initial={false}
                animate={{
                  height: showFullText2 ? "auto" : 0,
                  opacity: showFullText2 ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className="text-xl lg:w-md">
                  We adopt a forward-thinking mindset to ensure you have the
                  peace of mind that comes with the most modern representation
                  of your business.
                </p>
              </motion.div>

              <motion.div
                layout
                className="border-b mt-4"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>
          ) : (
            <div className="w-full border-y flex flex-col justify-between p-4 gap-8">
              <h2 className="text-3xl font-medium">Innovation-Aligned</h2>
              <p className="text-xl">
                We adopt a forward-thinking mindset to ensure you have the peace
                of mind that comes with the most modern representation of your
                business.
              </p>
            </div>
          )}

          {isLargerThanMobile ? (
            <motion.div
              ref={motionRef3}
              layout
              className="w-full flex flex-col justify-between py-4"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.h2
                layout
                className="font-medium text-4xl lg:text-5xl pb-4"
              >
                Quality-First Approach
              </motion.h2>

              <motion.div
                layout
                className="overflow-hidden"
                initial={false}
                animate={{
                  height: showFullText3 ? "auto" : 0,
                  opacity: showFullText3 ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className="text-xl lg:w-md">
                  Every project is crafted with meticulous attention to detail,
                  ensuring the highest standards of quality and performance in
                  every deliverable.
                </p>
              </motion.div>

              <motion.div
                layout
                className="border-b mt-4"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>
          ) : (
            <div className="w-full border-y flex flex-col justify-between p-4 gap-8">
              <h2 className="text-3xl font-medium">Quality-First Approach</h2>
              <p className="text-xl">
                Every project is crafted with meticulous attention to detail,
                ensuring the highest standards of quality and performance in
                every deliverable.
              </p>
            </div>
          )}

          {isLargerThanMobile ? (
            <motion.div
              ref={motionRef4}
              layout
              className="w-full flex flex-col justify-between py-4"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.h2
                layout
                className="font-medium text-4xl lg:text-5xl pb-4"
              >
                Results-Driven
              </motion.h2>

              <motion.div
                layout
                className="overflow-hidden"
                initial={false}
                animate={{
                  height: showFullText4 ? "auto" : 0,
                  opacity: showFullText4 ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className="text-xl lg:w-md">
                  We focus on delivering measurable outcomes that drive real
                  business value and help you achieve your strategic objectives.
                </p>
              </motion.div>

              <motion.div
                layout
                className="border-b mt-4"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>
          ) : (
            <div className="w-full border-y flex flex-col justify-between p-4 gap-8">
              <h2 className="text-3xl font-medium">Results-Driven</h2>
              <p className="text-xl">
                We focus on delivering measurable outcomes that drive real
                business value and help you achieve your strategic objectives.
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

// "use client";

// import Section from "./Section";
// import SectionTitle from "./SectionTitle";
// import { useRef, useEffect } from "react";
// import { motion, useScroll, useTransform } from "motion/react";
// import { useLayout } from "../context/LayoutContext";
// import { useIsLargerThanMobile } from "../hooks/useIsLargerThanMobile";

// export default function NewAboutSection() {
//   const { isTabletLandscape } = useLayout();
//   const isLargerThanMobile = useIsLargerThanMobile();

//   const motionRef1 = useRef<HTMLDivElement>(null);
//   const motionRef2 = useRef<HTMLDivElement>(null);
//   const motionRef3 = useRef<HTMLDivElement>(null);
//   const motionRef4 = useRef<HTMLDivElement>(null);

//   const { scrollYProgress: scrollYProgress1 } = useScroll({
//     target: motionRef1,
//     offset: ["end end", "start start"],
//   });

//   const { scrollYProgress: scrollYProgress2 } = useScroll({
//     target: motionRef2,
//     offset: ["end end", "start start"],
//   });

//   const { scrollYProgress: scrollYProgress3 } = useScroll({
//     target: motionRef3,
//     offset: ["end end", "start start"],
//   });

//   const { scrollYProgress: scrollYProgress4 } = useScroll({
//     target: motionRef4,
//     offset: ["end end", "start start"],
//   });

//   const dynamicHeight1 = useTransform(
//     scrollYProgress1,
//     isTabletLandscape ? [0, 0.4] : [0.1, 0.4],
//     [60, 250]
//   );

//   const dynamicHeight2 = useTransform(
//     scrollYProgress2,
//     isTabletLandscape ? [0, 0.4] : [0.1, 0.4],
//     [60, 250]
//   );

//   const dynamicHeight3 = useTransform(
//     scrollYProgress3,
//     isTabletLandscape ? [0, 0.4] : [0.1, 0.4],
//     [60, 250]
//   );

//   const dynamicHeight4 = useTransform(
//     scrollYProgress4,
//     isTabletLandscape ? [0, 0.4] : [0.1, 0.4],
//     [60, 250]
//   );

//   const opacity1 = useTransform(
//     scrollYProgress1,
//     isTabletLandscape ? [0.33, 0.4] : [0.35, 0.4],
//     [0, 1] // opacity values
//   );

//   useEffect(() => {
//     const unsub1 = scrollYProgress1.on("change", v =>
//       console.log("scrollYProgress 1:", v)
//     );
//     const unsub2 = scrollYProgress2.on("change", v =>
//       console.log("scrollYProgress 2:", v)
//     );
//     return () => {
//       unsub1();
//       unsub2();
//     };
//   }, [scrollYProgress1, scrollYProgress2]);

//   return (
//     <Section id="about" className="h-[300vh]">
//       <SectionTitle name="About" isSticky />
//       <div className="grid grid-cols-1 md:grid-cols-2 h-[200vh]">
//         <div className=""></div>
//         <div className="mt-[30vh] flex flex-col gap-[calc(2*var(--layout-size))]">
//           {isLargerThanMobile ? (
//             <motion.div
//               ref={motionRef1}
//               style={{ height: dynamicHeight1 }}
//               className="border-b w-full flex flex-col justify-between py-4"
//             >
//               <h2 className="font-medium text-4xl lg:text-5xl pb-4">
//                 Work with Me
//               </h2>
//               <motion.p
//                 className="text-xl lg:w-md"
//                 style={{ opacity: opacity1 }}
//               >
//                 Top talents as partners Work with the industry&apos;s finest—an
//                 experienced senior team that&apos;s grown together through years
//                 of collaboration, united by one goal: making your project exceed
//                 every expectation.
//               </motion.p>
//             </motion.div>
//           ) : (
//             // mobile non animated version
//             <div className="w-full border-y flex flex-col justify-between p-4 gap-8">
//               <h2 className="text-3xl font-medium">Work with Me</h2>
//               <p className="text-xl">
//                 Top talents as partners Work with the industry&apos;s finest—an
//                 experienced senior team that&apos;s grown together through years
//                 of collaboration, united by one goal: making your project exceed
//                 every expectation.
//               </p>
//             </div>
//           )}
//           {isLargerThanMobile ? (
//             <motion.div
//               ref={motionRef2}
//               style={{ height: dynamicHeight2 }}
//               className="border-y w-full origin-bottom bg-black"
//             />
//           ) : (
//             <div className="w-full h-[300px] border-y bg-black" />
//           )}
//           {isLargerThanMobile ? (
//             <motion.div
//               ref={motionRef3}
//               style={{ height: dynamicHeight3 }}
//               className="border-y w-full origin-bottom bg-black"
//             />
//           ) : (
//             <div className="w-full h-[300px] border-y bg-black" />
//           )}
//           {isLargerThanMobile ? (
//             <motion.div
//               ref={motionRef4}
//               style={{ height: dynamicHeight4 }}
//               className="border-y w-full origin-bottom bg-black"
//             />
//           ) : (
//             <div className="w-full h-[300px] border-y bg-black" />
//           )}
//         </div>
//       </div>
//     </Section>
//   );
// }

// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform } from "motion/react";
// import Section from "./Section";
// import SectionTitle from "./SectionTitle";

// export default function NewAboutSection() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const divRef = useRef<HTMLDivElement>(null);
//   const divRef2 = useRef<HTMLDivElement>(null);

//   // Track scroll progress of the first motion.div
//   const { scrollYProgress } = useScroll({
//     target: divRef,
//     offset: ["end end", "end start"],
//   });

//   // Track scroll progress of the second motion.div
//   const { scrollYProgress: scrollYProgress2 } = useScroll({
//     target: divRef2,
//     offset: ["end end", "end start"],
//   });

//   // Transform scroll progress to height animation (for first content div)
//   const height1 = useTransform(
//     scrollYProgress,
//     [0.1, 0.3, 1], // scroll progress values
//     [75, 300, 300] // height values in pixels
//   );

//   // Transform scroll progress to height animation (for second content div)
//   const height2 = useTransform(
//     scrollYProgress2,
//     [0, 0.3, 0.8, 1], // scroll progress values
//     [75, 75, 300, 300] // height values in pixels
//   );

//   // Transform scroll progress to width animation (for border divs)
//   const width = useTransform(
//     scrollYProgress,
//     [0.1, 0.3, 1], // scroll progress values
//     ["50%", "100%", "100%"] // width values
//   );

//   // Transform scroll progress to width animation (for second border divs)
//   const width2 = useTransform(
//     scrollYProgress2,
//     [0, 0.3, 0.8, 1], // scroll progress values
//     ["50%", "50%", "100%", "100%"] // width values
//   );

//   // Transform scroll progress to opacity animation (for first p tag)
//   const opacity = useTransform(
//     scrollYProgress,
//     [0.15, 0.25, 1], // scroll progress values
//     [0, 1, 1] // opacity values
//   );

//   // Transform scroll progress to opacity animation (for second p tag)
//   const opacity2 = useTransform(
//     scrollYProgress2,
//     [0.1, 0.35, 0.8, 1], // scroll progress values
//     [0, 0, 1, 1] // opacity values
//   );

//   // Transform scroll progress to y animation (for wrapper div)
//   const y = useTransform(
//     scrollYProgress,
//     [0.1, 1], // scroll progress values
//     ["0%", "60%"] // y values in percentages
//   );

//   return (
//     <Section id="about" className="h-[200vh]" ref={containerRef}>
//       <SectionTitle name="About" isSticky />
//       <motion.div
//         className="flex flex-col h-[calc(100vh-(2*var(--layout-size)))] items-end justify-end"
//         style={{ y }}
//       >
//         {/* Top "border" div with width animation */}
//         <motion.div className="bg-black h-[1px]" style={{ width }} />
//         {/* Content div with height animation */}
//         <motion.div
//           ref={divRef}
//           className="flex flex-col justify-between w-1/2 my-4"
//           style={{ height: height1 }}
//         >
//           <h2 className="text-6xl">Top talents as partners</h2>
//           <motion.p className="w-xl text-lg" style={{ opacity }}>
//             Top talents as partners Work with the industry&apos;s finest—an
//             experienced senior team that&apos;s grown together through years of
//             collaboration, united by one goal: making your project exceed every
//             expectation.
//           </motion.p>
//         </motion.div>
//         {/* Bottom "border" div with width animation */}
//         <motion.div className="bg-black h-[1px]" style={{ width }} />

//         {/* Content div with height animation */}
//         <motion.div
//           ref={divRef2}
//           className="flex flex-col justify-between w-1/2 my-4"
//           style={{ height: height2 }}
//         >
//           <h2 className="text-6xl">Innovation-aligned</h2>
//           <motion.p className="w-xl text-lg" style={{ opacity: opacity2 }}>
//             We adopt a forward-thinking mindset to ensure you have the peace of
//             mind that comes with the most modern representation of your
//             business.
//           </motion.p>
//         </motion.div>

//         {/* Bottom "border" div with width animation */}
//         <motion.div className="bg-black h-[1px]" style={{ width: width2 }} />
//       </motion.div>
//     </Section>
//   );
// }
