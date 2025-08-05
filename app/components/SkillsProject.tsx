"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { useLayout } from "../context/LayoutContext";
import MenuIconAUpsideDown from "../icons/MenuIconAUpsideDown";
import { useRef } from "react";

export default function SkillsProject() {
  const { isMobileLandscape } = useLayout();
  const overviewRef = useRef(null);
  const isInView = useInView(overviewRef);
  const showChevron = !isInView;

  return (
    <div
      className={clsx(
        "min-h-screen flex flex-col  bg-white",
        isMobileLandscape ? "px-4 py-8 pb-4 gap-8 mb-4" : "px-4 gap-16 mb-16"
      )}
    >
      {/* Hero Section */}
      <div
        className={clsx(
          "relative flex flex-col items-center text-center",
          isMobileLandscape
            ? "h-auto min-h-screen gap-8 mt-[calc(2*var(--layout-size))]"
            : "h-[calc(100vh-3*var(--layout-size))] justify-center gap-16 mt-[calc(1.5*var(--layout-size))]"
        )}
      >
        <motion.h1
          className={clsx(
            "font-bold text-black mb-6",
            isMobileLandscape ? "text-4xl" : "text-4xl md:text-8xl"
          )}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0 }}
        >
          Technical Skills
        </motion.h1>

        <motion.p
          className="text-2xl text-black max-w-3xl"
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
            isMobileLandscape ? "bottom-16" : "bottom-0"
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
        className="flex flex-col gap-8"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0 }}
      >
        <h2 className="text-3xl font-medium text-black">Skills Overview</h2>
        <p className="text-lg text-black leading-relaxed">
          I&apos;m a full stack developer with a strong frontend focus and a
          sharp product mindset. I specialize in building responsive, accessible
          web applications and enjoy working across the stack to deliver fast,
          scalable, and maintainable solutions. I thrive at the intersection of
          engineering and product, where thoughtful design and real-world
          usability meet.
        </p>
      </motion.section>

      {/* Key Strengths Section */}
      <motion.section
        className="flex flex-col gap-8"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0 }}
      >
        <h2 className="text-3xl font-medium text-black">Key Strengths</h2>
        <ul className="flex flex-col gap-4">
          {[
            {
              title: "Product-Focused Engineering",
              description:
                "Experienced in translating product goals into scalable, user-centered web applications with a strong eye for usability and accessibility.",
            },
            {
              title: "Frontend Architecture",
              description:
                "Skilled in designing modular, reusable component systems and leading UI rebuilds across complex applications.",
            },
            {
              title: "Cross-Stack Collaboration",
              description:
                "Adept at bridging frontend and backend concerns, optimizing API performance, database queries, and deployment workflows.",
            },
            {
              title: "Creative Problem Solving",
              description:
                "Brings a compositional mindset to code, balancing structure, flow, and maintainability in both interface and infrastructure.",
            },
            {
              title: "Rapid Iteration & Ownership",
              description:
                "Thrives in fast-moving environments, driving feature delivery from concept to deployment while maintaining code quality and stability.",
            },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-2 h-2 bg-black rounded-full mt-[0.5em] flex-shrink-0" />
              <span className="text-black">
                <span className="font-bold">{item.title}: </span>
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Technology Stack */}
      <motion.section
        className="flex flex-col items-center gap-8"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-medium text-black text-left w-full">
          Technology Stack
        </h2>

        {/* Frontend */}
        <div className="w-full">
          <h3 className="text-2xl font-medium text-black mb-4">Frontend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
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
                className="bg-white border border-black p-6 text-black text-center font-semibold flex justify-center items-center"
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
          <h3 className="text-2xl font-medium text-black mb-4">Backend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
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
                className="bg-white border border-black p-6 text-black text-center font-semibold flex justify-center items-center"
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
          <h3 className="text-2xl font-medium text-black mb-4">
            DevOps & Tools
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
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
                className="bg-white border border-black p-6 text-black text-center font-semibold flex justify-center items-center"
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
          <h3 className="text-2xl font-medium text-black mb-4">Testing</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {["React Testing Library", "Jest", "Cypress", "Vitest", "TDD"].map(
              (name, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-black p-6 text-black text-center font-semibold flex justify-center items-center"
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
