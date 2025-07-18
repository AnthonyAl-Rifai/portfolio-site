"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

export default function AboutSection() {
  const topLineStyle = "text-3xl font-medium leading-relaxed";
  const bottomLineStyle = "text-3xl font-light leading-relaxed";

  // Create refs for each paragraph
  const line0Ref = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const line5Ref = useRef<HTMLDivElement>(null);

  // Custom hook for scroll-linked fade in/out animation
  const useParagraphAnimation = (ref: React.RefObject<HTMLElement | null>) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["end end", "start start"], // From bottom of viewport to top of viewport
    });

    const opacity = useTransform(
      scrollYProgress,
      [0, 0.3, 0.7, 1],
      [0, 1, 1, 0]
    );
    const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [20, 0, 0, -20]);

    return { style: { opacity, y } };
  };

  // Apply animations to each paragraph
  const line0 = useParagraphAnimation(line0Ref);
  const line1 = useParagraphAnimation(line1Ref);
  const line2 = useParagraphAnimation(line2Ref);
  const line3 = useParagraphAnimation(line3Ref);
  const line4 = useParagraphAnimation(line4Ref);
  const line5 = useParagraphAnimation(line5Ref);

  return (
    <Section id="about" className="h-auto">
      <SectionTitle name="About" isSticky />

      <div
        className="
          grid p-4 
          grid-cols-1 grid-rows-auto
          md:grid-cols-8
          lg:grid-cols-16
        "
      >
        <motion.div
          ref={line0Ref}
          {...line0}
          className="col-span-full flex flex-col mt-4"
        >
          <p className={topLineStyle}>I&apos;m Anthony,</p>
          <p className={bottomLineStyle}>
            a software engineer and composer based in Los Angeles.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center col-span-full mt-4"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
          }}
        >
          <Image
            src="/anthony-big-sur.jpg"
            alt="Anthony in Big Sur"
            width={800}
            height={600}
            className="w-full max-w-2xl h-auto rounded-lg shadow-lg"
            priority
          />
        </motion.div>

        <motion.div
          ref={line1Ref}
          {...line1}
          className="col-span-full flex flex-col my-12"
        >
          <p className={topLineStyle}>I build web applications</p>
          <p className={bottomLineStyle}>
            that are intuitive, accessible, and meaningful to real people.
          </p>
        </motion.div>

        <motion.div
          ref={line2Ref}
          {...line2}
          className="col-span-full flex flex-col my-12"
        >
          <p className={topLineStyle}>I bring a creative edge</p>
          <p className={bottomLineStyle}>
            from my background in music and a love of clean, thoughtful code.
          </p>
        </motion.div>

        <motion.div
          ref={line3Ref}
          {...line3}
          className="col-span-full flex flex-col my-12"
        >
          <p className={topLineStyle}>I care about the details</p>
          <p className={bottomLineStyle}>
            from solving complex UX challenges to collaborating across teams.
          </p>
        </motion.div>

        <motion.div
          ref={line4Ref}
          {...line4}
          className="col-span-full flex flex-col my-12"
        >
          <p className={topLineStyle}>I stay curious</p>
          <p className={bottomLineStyle}>
            and I&apos;m always learning, building, and refining.
          </p>
        </motion.div>

        <motion.div
          ref={line5Ref}
          {...line5}
          className="col-span-full flex flex-col my-12"
        >
          <div className={topLineStyle}>
            Let&apos;s{" "}
            <motion.button
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView();
              }}
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1,
              }}
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              connect.
            </motion.button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
