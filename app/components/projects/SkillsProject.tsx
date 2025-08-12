"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { useLayout } from "../../context/LayoutContext";
import MenuIconAUpsideDown from "../../icons/MenuIconAUpsideDown";
import { useRef } from "react";
import SectionTitle from "../SectionTitle";

export default function SkillsProject() {
  const { isMobileLandscape } = useLayout();
  const overviewRef = useRef(null);
  const isInView = useInView(overviewRef);
  const showChevron = !isInView;

  return (
    <div
      className={clsx(
        "min-h-screen flex flex-col",
        isMobileLandscape
          ? "px-4 pb-8 gap-8 mb-4"
          : "px-4 gap-16 pb-16 lg:px-8 3xl:border-x"
      )}
    >
      {/* Hero Section */}
      <div
        className={clsx(
          "relative flex flex-col items-center text-center",
          isMobileLandscape
            ? "h-auto min-h-screen gap-8"
            : "h-[calc(100vh-2*var(--layout-size))] min-h-0 justify-center gap-16 pb-20 md:pb-32"
        )}
      >
        <motion.h1
          className={clsx(
            "font-bold mb-6",
            isMobileLandscape
              ? "text-4xl"
              : "text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
          )}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0 }}
        >
          Technical Skills
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl md:px-8 lg:px-24 lg:text-4xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Full-stack development expertise with modern technologies and best
          practices for building scalable web applications.
        </motion.p>

        <div
          className={clsx(
            "absolute",
            isMobileLandscape
              ? "bottom-16"
              : "bottom-24 md:bottom-32 lg:bottom-16"
          )}
        >
          <AnimatePresence>
            {showChevron && (
              <motion.div
                key="chevron"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MenuIconAUpsideDown size={24} color="#000" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Overview Section */}
      <motion.section
        ref={overviewRef}
        className="flex flex-col gap-8 md:gap-12"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0 }}
      >
        <SectionTitle name="Skills Overview" zIndex={20} removeLeftPadding />
        <p className="leading-relaxed text-xl lg:text-2xl xl:text-3xl">
          I&apos;m a frontend-focused full stack developer who thrives at the
          intersection of engineering and product. I build scalable,
          maintainable applications with an emphasis on usability, performance,
          and clean architecture. I&apos;m equally comfortable designing
          component systems, optimizing APIs, and refining deployment workflows
          to support efficient, reliable releases.
        </p>
      </motion.section>

      {/* Key Strengths Section */}
      <motion.section
        className="flex flex-col gap-8 md:gap-12"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0 }}
      >
        <SectionTitle name="Key Strengths" zIndex={20} removeLeftPadding />
        <ul className="flex flex-col gap-4 text-lg md:gap-6 lg:text-2xl xl:text-3xl">
          {[
            {
              title: "Product-Focused Engineering",
              description:
                "Translate product goals into user-centered applications with a strong emphasis on usability and accessibility.",
            },
            {
              title: "Frontend Architecture",
              description:
                "Design modular, reusable component systems and lead UI rebuilds for complex applications.",
            },
            {
              title: "Cross-Stack Collaboration",
              description:
                "Bridge frontend and backend concerns to optimize APIs, database queries, and deployment workflows.",
            },
            {
              title: "Creative Problem Solving",
              description:
                "Apply a structured, creative approach to code, balancing flow, maintainability, and performance.",
            },
            {
              title: "Rapid Iteration & Ownership",
              description:
                "Deliver features from concept to deployment in fast-moving environments while maintaining code quality.",
            },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-2 h-2 bg-black rounded-full mt-[0.6em] flex-shrink-0 xl:mt-[0.5em]" />
              <span>
                <span className="font-bold">{item.title}: </span>
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Technology Stack */}
      <motion.section
        className="flex flex-col items-center gap-8 md:gap-12"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SectionTitle name="Technology Stack" zIndex={20} removeLeftPadding />

        {/* Frontend */}
        <div className="w-full">
          <h3 className="text-2xl font-medium mb-4 lg:text-3xl">Frontend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 xl:grid-cols-4">
            {[
              "JavaScript ES6",
              "TypeScript",
              "Vue.js",
              "React",
              "React Native",
              "Next.js",
              "Redux",
              "Zustand",
              "HTML5",
              "CSS3",
              "Tailwind CSS",
              "RESTful API",
              "GraphQL",
              "Framer-Motion",
              "Storybook",
              "Figma",
            ].map((name, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-center font-semibold flex justify-center items-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="w-full">
          <h3 className="text-2xl font-medium mb-4 lg:text-3xl">Backend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 xl:grid-cols-4">
            {[
              "Node.js",
              "Express.js",
              "C# .NET",
              "PostgreSQL",
              "Prisma",
              "SQL",
              "NoSQL",
              "MongoDB",
            ].map((name, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-center font-semibold flex justify-center items-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* DevOps & Tools */}
        <div className="w-full">
          <h3 className="text-2xl font-medium mb-4 lg:text-3xl">
            DevOps & Tools
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 xl:grid-cols-4">
            {[
              "AWS",
              "S3",
              "EC2",
              "CloudWatch",
              "Fargate",
              "Docker",
              "New Relic",
              "GitLab CI/CD",
              "GitHub",
              "Google Cloud",
              "Microservices",
              "Agile",
              "Scrum",
            ].map((name, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-center font-semibold flex justify-center items-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testing */}
        <div className="w-full">
          <h3 className="text-2xl font-medium mb-4 lg:text-3xl">Testing</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 xl:grid-cols-4">
            {["React Testing Library", "Jest", "Cypress", "Vitest", "TDD"].map(
              (name, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-black p-6 text-center font-semibold flex justify-center items-center"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {name}
                </motion.div>
              )
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
