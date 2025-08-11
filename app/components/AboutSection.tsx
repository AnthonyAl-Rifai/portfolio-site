"use client";

import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useLayout } from "../context/LayoutContext";
import { useIsLargerThanMobile } from "../hooks/useIsLargerThanMobile";
import Image from "next/image";

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
    const enterThreshold = isTabletLandscape ? 0.3 : 0.3;
    const exitThreshold = isTabletLandscape ? 0.2 : 0.1;

    if (v > enterThreshold && !showFullText1) {
      setShowFullText1(true);
    } else if (v < exitThreshold && showFullText1) {
      setShowFullText1(false);
    }
  });

  useMotionValueEvent(scrollYProgress2, "change", v => {
    const enterThreshold = isTabletLandscape ? 0.3 : 0.3;
    const exitThreshold = isTabletLandscape ? 0.2 : 0.1;

    if (v > enterThreshold && !showFullText2) {
      setShowFullText2(true);
    } else if (v < exitThreshold && showFullText2) {
      setShowFullText2(false);
    }
  });

  useMotionValueEvent(scrollYProgress3, "change", v => {
    const enterThreshold = isTabletLandscape ? 0.3 : 0.3;
    const exitThreshold = isTabletLandscape ? 0.2 : 0.1;

    if (v > enterThreshold && !showFullText3) {
      setShowFullText3(true);
    } else if (v < exitThreshold && showFullText3) {
      setShowFullText3(false);
    }
  });

  useMotionValueEvent(scrollYProgress4, "change", v => {
    const enterThreshold = isTabletLandscape ? 0.3 : 0.3;
    const exitThreshold = isTabletLandscape ? 0.2 : 0.1;

    if (v > enterThreshold && !showFullText4) {
      setShowFullText4(true);
    } else if (v < exitThreshold && showFullText4) {
      setShowFullText4(false);
    }
  });

  return (
    <Section id="about" className="h-auto mt-[25vh]">
      <SectionTitle name="About" isSticky />
      <div className="min-h-[calc(100vh-var(--layout-size))] p-4 grid gap-12 mt-8 md:grid-cols-2">
        <motion.div
          className="w-auto h-full flex items-center"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-5xl">
            I&apos;m a front end leaning full stack developer with a background
            in music composition for television. I thrive on small, tight-knit
            teams where ideas flow and everyone shapes the product. I enjoy
            collaborating with designers, engineers, and stakeholders to create
            clean, intuitive interfaces and well-structured features from
            concept to launch. I live in Los Angeles with my wife, and outside
            of work I&apos;m usually hosting BBQs, biking with friends, or
            making music.
          </h3>
        </motion.div>
        <motion.div
          className="max-h-[calc(100vh-(2*var(--layout-size))-32px)] w-full flex justify-center items-center"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/anthony-big-sur-b-w.png"
            alt="Anthony Big Sur Black and White"
            width={800}
            height={600}
            className="h-full object-cover border"
          />
        </motion.div>
        {/* expandable sections */}
        {isLargerThanMobile ? (
          <div className="h-[calc(4*var(--layout-size))] col-span-full md:mt-12">
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
                I build web applications
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
                <p className="text-xl md:text-2xl lg:w-[600px] xl:w-[800px] 2xl:w-[1000px] 3xl:w-[1200px] xl:text-3xl 3xl:text-4xl">
                  From concept to deployment, I design and develop responsive,
                  accessible, and performant web applications that balance clean
                  code with thoughtful design.
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
              name="I build web applications"
              zIndex={20}
              removeLeftPadding
            />
            <p className="text-2xl">
              From concept to deployment, I design and develop responsive,
              accessible, and performant web applications that balance clean
              code with thoughtful design.
            </p>
          </div>
        )}

        {isLargerThanMobile ? (
          <div className="h-[calc(4*var(--layout-size))] col-span-full">
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
                I bring a creative edge
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
                <p className="text-xl md:text-2xl lg:w-[600px] xl:w-[800px] 2xl:w-[1000px] 3xl:w-[1200px] xl:text-3xl 3xl:text-4xl">
                  With a background in music composition, I approach
                  problem-solving like arranging a piece, blending structure and
                  creativity to craft engaging and intuitive user experiences.
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
              name="I bring a creative edge"
              zIndex={20}
              removeLeftPadding
            />
            <p className="text-2xl">
              With a background in music composition, I approach problem-solving
              like arranging a piece, blending structure and creativity to craft
              engaging and intuitive user experiences.
            </p>
          </div>
        )}

        {isLargerThanMobile ? (
          <div className="h-[calc(4*var(--layout-size))] col-span-full">
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
                I care about the details
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
                <p className="text-xl md:text-2xl lg:w-[600px] xl:w-[800px] 2xl:w-[1000px] 3xl:w-[1200px] xl:text-3xl 3xl:text-4xl">
                  Every interaction, from a button hover to a complex animation,
                  is intentional. I focus on usability, performance, and polish
                  so the final product feels effortless to use.
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
              name="I care about the details"
              zIndex={20}
              removeLeftPadding
            />
            <p className="text-2xl">
              Every interaction, from a button hover to a complex animation, is
              intentional. I focus on usability, performance, and polish so the
              final product feels effortless to use.
            </p>
          </div>
        )}

        {isLargerThanMobile ? (
          <div className="h-[calc(4*var(--layout-size))] col-span-full">
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
                I stay curious
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
                <p className="text-xl md:text-2xl lg:w-[600px] xl:w-[800px] 2xl:w-[1000px] 3xl:w-[1200px] xl:text-3xl 3xl:text-4xl">
                  I am always exploring new tools, patterns, and technologies,
                  bringing fresh ideas into my work while keeping what is
                  practical and reliable for each project.
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
            <SectionTitle name="I stay curious" zIndex={20} removeLeftPadding />

            <p className="text-2xl">
              I am always exploring new tools, patterns, and technologies,
              bringing fresh ideas into my work while keeping what is practical
              and reliable for each project.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
