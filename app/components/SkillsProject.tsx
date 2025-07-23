"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import { useRef } from "react";

interface SkillsProjectProps {
  onClose: () => void;
}

export default function SkillsProject({ onClose }: SkillsProjectProps) {
  const overviewRef = useRef(null);
  const isInView = useInView(overviewRef);
  const showChevron = !isInView;

  return (
    <div className="min-h-screen flex flex-col gap-16 bg-white p-4 mb-16">
      {/* Hero Section */}
      <div className="relative h-[calc(100vh-3*var(--layout-size))] flex flex-col items-center justify-center text-center gap-16">
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-black mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
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

        <div className="absolute bottom-0">
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
                  <ChevronDownIcon className="w-12 h-12 text-black" />
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
        <h2 className="text-4xl font-bold text-black">Skills Overview</h2>
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
        <h2 className="text-4xl font-bold text-black">Key Strengths</h2>
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
        <h2 className="text-4xl font-bold text-black text-left w-full">
          Technology Stack
        </h2>

        {/* Frontend */}
        <div className="w-full">
          <h3 className="text-2xl font-bold text-black mb-4">Frontend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { name: "JavaScript ES6" },
              { name: "TypeScript" },
              { name: "Vue.js" },
              { name: "React" },
              { name: "React Native" },
              { name: "Next.js" },
              { name: "Redux" },
              { name: "Zustand" },
              { name: "HTML5" },
              { name: "CSS3" },
              { name: "Tailwind CSS" },
              { name: "RESTful API" },
              { name: "GraphQL" },
              { name: "Framer-Motion" },
              { name: "Storybook" },
              { name: "Figma" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-black text-center font-semibold"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="w-full">
          <h3 className="text-2xl font-bold text-black mb-4">Backend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { name: "Node.js" },
              { name: "Express.js" },
              { name: "C# .NET" },
              { name: "PostgreSQL" },
              { name: "Prisma" },
              { name: "SQL" },
              { name: "NoSQL" },
              { name: "MongoDB" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-black text-center font-semibold"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* DevOps & Tools */}
        <div className="w-full">
          <h3 className="text-2xl font-bold text-black mb-4">DevOps & Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { name: "AWS" },
              { name: "S3" },
              { name: "EC2" },
              { name: "CloudWatch" },
              { name: "Fargate" },
              { name: "Docker" },
              { name: "New Relic" },
              { name: "GitLab CI/CD" },
              { name: "GitHub" },
              { name: "Google Cloud" },
              { name: "Microservices" },
              { name: "Agile" },
              { name: "Scrum" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-black text-center font-semibold"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testing */}
        <div className="w-full">
          <h3 className="text-2xl font-bold text-black mb-4">Testing</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "React Testing Library" },
              { name: "Jest" },
              { name: "Cypress" },
              { name: "Vitest" },
              { name: "TDD" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-black text-center font-semibold"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="flex flex-col items-center text-center gap-6"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="border border-black bg-white flex flex-col items-center gap-6 p-12 max-w-3xl w-full">
          <h2 className="text-4xl font-bold text-black">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-black">
            Let&apos;s discuss how my skills and experience can help bring your
            next project to life.
          </p>
          <button
            onClick={onClose}
            className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 border border-black"
          >
            Return to Portfolio
          </button>
        </div>
      </motion.section>
    </div>
  );
}
