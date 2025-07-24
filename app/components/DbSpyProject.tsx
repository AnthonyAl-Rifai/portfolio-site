"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import Image from "next/image";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import { useRef } from "react";
import CallToAction from "./CallToAction";

interface DbSpyProjectProps {
  onClose: () => void;
}

export default function DbSpyProject({ onClose }: DbSpyProjectProps) {
  const overviewRef = useRef(null);
  const isInView = useInView(overviewRef);
  const showChevron = !isInView;

  return (
    <div className="min-h-screen flex flex-col gap-16 bg-white p-4 mb-16">
      {/* Hero Section */}
      <div className="relative h-[calc(100vh-3*var(--layout-size))] flex flex-col items-center justify-center text-center gap-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src="/dbspy-logo-dark.png"
            alt="DBSpy Logo"
            width={400}
            height={200}
            className="mx-auto"
            priority
          />
        </motion.div>

        <motion.p
          className="text-2xl text-black max-w-3xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          A visual SQL dev tool built to streamline database design and schema
          management
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
        <h2 className="text-4xl font-bold text-black">Project Overview</h2>
        <div className="border border-black">
          <Image
            src="/dbspy-demo-resize.gif"
            alt="DBSpy Demo gif"
            width={800}
            height={400}
            className="w-full"
            priority
          />
        </div>
        <p className="text-lg text-black leading-relaxed">
          dbSpy is a developer tool built through the OSLabs tech accelerator
          that helps developers visualize and manage relational databases with
          ER diagrams, schema editing, and query testing. I worked on both the
          frontend and backend as part of a five-person team, contributing to
          major architectural improvements and performance optimizations. My
          work helped simplify the codebase, improve cross-database
          compatibility, and enhance the overall developer experience.
        </p>
      </motion.section>
      {/* Key Highlights Section */}
      <motion.section
        className="flex flex-col gap-8"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0 }}
      >
        <h2 className="text-4xl font-bold text-black">Key Highlights</h2>
        <ul className="flex flex-col gap-4">
          {[
            "Proposed and led migration to React Flow for ERD visualization, cutting code by 50%, reducing bundle size by 20%, and resolving UI bugs with a more modular, scalable architecture still used today",
            "Overhauled the Node.js backend architecture to enable compatibility with both PostgreSQL and MySQL databases, reducing data retrieval latency by 30% and improving API speeds",
            "Introduced Zustand for modular state management, improving reactivity and state isolation across components; reduced state-related bugs by 40% and improved long-term maintainability of the front-end codebase",
            "Reduced infrastructure costs by deploying the app on AWS with Docker, EC2, and Elastic Beanstalk, optimizing resource allocation, automating scaling, and increasing platform availability",
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-2 h-2 bg-black rounded-full mt-[0.5em] flex-shrink-0" />
              <span className="text-black">{text}</span>
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
              { name: "React" },
              { name: "React Flow" },
              { name: "TypeScript" },
              { name: "Zustand" },
              { name: "Tailwind CSS" },
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
              { name: "RESTful API" },
              { name: "SQL" },
              { name: "PostgreSQL" },
              { name: "MySQL" },
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

        {/* DevOps & Tooling */}
        <div className="w-full">
          <h3 className="text-2xl font-bold text-black mb-4">
            DevOps & Tooling
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { name: "AWS" },
              { name: "Docker" },
              { name: "EC2" },
              { name: "Elastic Beanstalk" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-black font-semibold flex justify-center items-center text-center"
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
            {[{ name: "React Testing Library" }].map((tech, index) => (
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
      <CallToAction onButtonClick={onClose} />
    </div>
  );
}
