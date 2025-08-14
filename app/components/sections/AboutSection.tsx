"use client";

import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useLayout } from "../../context/LayoutContext";
import { useIsLargerThanMobile } from "../../hooks/useIsLargerThanMobile";
import Image from "next/image";

export default function AboutSection() {
  const { isTabletLandscape, isNavigating } = useLayout();
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

  // thresholds (added exitHighThreshold)
  const enterThreshold = isTabletLandscape ? 0.3 : 0.25;
  const exitThreshold = isTabletLandscape ? 0.2 : 0.1;
  const exitHighThreshold = 0.95; // close as block nears the top

  useMotionValueEvent(scrollYProgress1, "change", v => {
    if (isNavigating) return;
    if (v >= exitHighThreshold && showFullText1) {
      setShowFullText1(false);
      return;
    }
    if (v > enterThreshold && v < exitHighThreshold && !showFullText1) {
      setShowFullText1(true);
    } else if (v < exitThreshold && showFullText1) {
      setShowFullText1(false);
    }
  });

  useMotionValueEvent(scrollYProgress2, "change", v => {
    if (isNavigating) return;
    if (v >= exitHighThreshold && showFullText2) {
      setShowFullText2(false);
      return;
    }
    if (v > enterThreshold && v < exitHighThreshold && !showFullText2) {
      setShowFullText2(true);
    } else if (v < exitThreshold && showFullText2) {
      setShowFullText2(false);
    }
  });

  useMotionValueEvent(scrollYProgress3, "change", v => {
    if (isNavigating) return;
    if (v >= exitHighThreshold && showFullText3) {
      setShowFullText3(false);
      return;
    }
    if (v > enterThreshold && v < exitHighThreshold && !showFullText3) {
      setShowFullText3(true);
    } else if (v < exitThreshold && showFullText3) {
      setShowFullText3(false);
    }
  });

  useMotionValueEvent(scrollYProgress4, "change", v => {
    if (isNavigating) return;
    if (v >= exitHighThreshold && showFullText4) {
      setShowFullText4(false);
      return;
    }
    if (v > enterThreshold && v < exitHighThreshold && !showFullText4) {
      setShowFullText4(true);
    } else if (v < exitThreshold && showFullText4) {
      setShowFullText4(false);
    }
  });

  return (
    <Section id="about" className="h-auto mt-[25vh]">
      <SectionTitle name="About" isSticky />
      <div className="min-h-[calc(100vh-var(--layout-size))] p-4 grid gap-12 md:grid-cols-2">
        <motion.div
          className="w-auto h-full flex items-center"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-[clamp(1rem,2vw+0.5rem,3rem)] max-w-[1300px]">
            I&apos;m a frontend-focused full stack developer with a background
            in music composition for television. I like to be involved from
            concept to launch, working closely with designers, engineers, and
            stakeholders to create clean, intuitive interfaces and
            well-structured features that deliver real value. I live in LA with
            my wife, and when I&apos;m not coding I enjoy hosting BBQs, biking
            with friends, and making music.
          </h3>
        </motion.div>
        <motion.div
          className="md:max-h-[calc(100dvh-(2*var(--layout-size))-32px)] w-full flex justify-center items-center"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/assets/images/hero/anthony-big-sur-b-w.png"
            alt="Anthony Big Sur Black and White"
            width={800}
            height={600}
            className="h-full object-cover border"
          />
        </motion.div>

        {/* expandable sections */}
        {isLargerThanMobile ? (
          <div className="h-[calc(3*var(--layout-size))] col-span-full md:mt-12">
            <motion.div
              ref={motionRef1}
              layout
              className="w-full flex flex-col justify-between"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.h2
                layout
                className="font-medium text-3xl lg:text-4xl xl:text-5xl 3xl:text-6xl pb-4 3xl:pb-6"
              >
                Holistic builds
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
                <p className="text-xl md:text-2xl lg:w-[600px] xl:w-[800px] 2xl:w-[1000px] 3xl:w-[1200px] xl:text-3xl 3xl:text-4xl pb-1">
                  I consider the entire product, from user experience and visual
                  design to performance and maintainability, making sure every
                  piece works together.
                </p>
              </motion.div>

              <motion.div
                layout
                className="border-b mt-4"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        ) : (
          <div className="w-full flex flex-col justify-between gap-8">
            <SectionTitle
              name="Holistic builds"
              zIndex={20}
              removeLeftPadding
            />
            <p className="text-2xl">
              I consider the entire product, from user experience and visual
              design to performance and maintainability, making sure every piece
              works together.
            </p>
          </div>
        )}

        {isLargerThanMobile ? (
          <div className="h-[calc(3*var(--layout-size))] col-span-full">
            <motion.div
              ref={motionRef2}
              layout
              className="w-full flex flex-col justify-between"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.h2
                layout
                className="font-medium text-3xl lg:text-4xl xl:text-5xl 3xl:text-6xl pb-4 3xl:pb-6"
              >
                Solutions with purpose
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
                <p className="text-xl md:text-2xl lg:w-[600px] xl:w-[800px] 2xl:w-[1000px] 3xl:w-[1200px] xl:text-3xl 3xl:text-4xl pb-1">
                  I focus on understanding the goals behind what I build, so
                  every decision moves the product closer to delivering real
                  value for its users.
                </p>
              </motion.div>

              <motion.div
                layout
                className="border-b mt-4"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        ) : (
          <div className="w-full flex flex-col justify-between gap-8">
            <SectionTitle
              name="Solutions with purpose"
              zIndex={20}
              removeLeftPadding
            />
            <p className="text-2xl">
              I focus on understanding the goals behind what I build, so every
              decision moves the product closer to delivering real value for its
              users.
            </p>
          </div>
        )}

        {isLargerThanMobile ? (
          <div className="h-[calc(3*var(--layout-size))] col-span-full">
            <motion.div
              ref={motionRef3}
              layout
              className="w-full flex flex-col justify-between"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.h2
                layout
                className="font-medium text-3xl lg:text-4xl xl:text-5xl 3xl:text-6xl pb-4 3xl:pb-6"
              >
                A creative edge
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
                <p className="text-xl md:text-2xl lg:w-[600px] xl:w-[800px] 2xl:w-[1000px] 3xl:w-[1200px] xl:text-3xl 3xl:text-4xl pb-1">
                  My background in music composition taught me how to blend
                  structure and imagination, and I bring that same mindset to
                  solving engineering challenges.
                </p>
              </motion.div>

              <motion.div
                layout
                className="border-b mt-4"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        ) : (
          <div className="w-full flex flex-col justify-between gap-8">
            <SectionTitle
              name="A creative edge"
              zIndex={20}
              removeLeftPadding
            />
            <p className="text-2xl">
              My background in music composition taught me how to blend
              structure and imagination, and I bring that same mindset to
              solving engineering challenges.
            </p>
          </div>
        )}

        {isLargerThanMobile ? (
          <div className="h-[calc(3*var(--layout-size))] col-span-full">
            <motion.div
              ref={motionRef4}
              layout
              className="w-full flex flex-col justify-between"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.h2
                layout
                className="font-medium text-3xl lg:text-4xl xl:text-5xl 3xl:text-6xl pb-4 3xl:pb-6"
              >
                Collaboration first
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
                <p className="text-xl md:text-2xl lg:w-[600px] xl:w-[800px] 2xl:w-[1000px] 3xl:w-[1200px] xl:text-3xl 3xl:text-4xl pb-1">
                  I work best on small, tight-knit teams where feedback is open,
                  ideas flow freely, and everyone contributes to creating
                  something meaningful.
                </p>
              </motion.div>

              <motion.div
                layout
                className="border-b mt-4"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        ) : (
          <div className="w-full flex flex-col justify-between gap-8">
            <SectionTitle
              name="Collaboration first"
              zIndex={20}
              removeLeftPadding
            />
            <p className="text-2xl">
              I work best on small, tight-knit teams where feedback is open,
              ideas flow freely, and everyone contributes to creating something
              meaningful.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
