"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { useLayout } from "../../context/LayoutContext";
import Image from "next/image";
import MenuIconAUpsideDown from "../../icons/MenuIconAUpsideDown";
import { useRef } from "react";
import SectionTitle from "../common/SectionTitle";

export default function DbSpyProject() {
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
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0 }}
        >
          <Image
            src="/assets/images/projects/dbspy/dbspy-logo-dark.png"
            alt="DBSpy Logo"
            width={600}
            height={300}
            className="mx-auto w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600] h-auto"
            priority
          />
        </motion.div>

        <motion.p
          className="text-2xl md:text-3xl md:px-8 lg:px-24 lg:text-4xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          A visual SQL dev tool built to streamline database design and schema
          management
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
        <SectionTitle name="Project Overview" zIndex={20} removeLeftPadding />
        <div className="w-full flex justify-center">
          <Image
            src="/assets/images/projects/dbspy/dbspy-demo-resize.gif"
            alt="DBSpy Demo gif"
            width={800}
            height={400}
            className="w-full border border-black lg:w-[1200px] lg:mx-auto xl:w-2/3"
            priority
          />
        </div>
        <p className="leading-relaxed text-xl lg:text-2xl xl:text-3xl">
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
        className="flex flex-col gap-8 md:gap-12"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0 }}
      >
        <SectionTitle name="Key Highlights" zIndex={20} removeLeftPadding />
        <ul className="flex flex-col gap-4 text-lg md:gap-6 lg:text-2xl xl:text-3xl">
          {[
            "Proposed and led migration to React Flow for ERD visualization, cutting code by 50%, reducing bundle size by 20%, and resolving UI bugs with a more modular, scalable architecture still used today",
            "Overhauled the Node.js backend architecture to enable compatibility with both PostgreSQL and MySQL databases, reducing data retrieval latency by 30% and improving API speeds",
            "Introduced Zustand for modular state management, improving reactivity and state isolation across components; reduced state-related bugs by 40% and improved long-term maintainability of the front-end codebase",
            "Reduced infrastructure costs by deploying the app on AWS with Docker, EC2, and Elastic Beanstalk, optimizing resource allocation, automating scaling, and increasing platform availability",
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-2 h-2 bg-black rounded-full mt-[0.6em] flex-shrink-0 xl:mt-[0.5em]" />
              <span>{text}</span>
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
              { name: "React" },
              { name: "React Flow" },
              { name: "TypeScript" },
              { name: "Zustand" },
              { name: "Tailwind CSS" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-center font-semibold flex justify-center items-center"
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
          <h3 className="text-2xl font-medium mb-4 lg:text-3xl">Backend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 xl:grid-cols-4">
            {[
              { name: "Node.js" },
              { name: "RESTful API" },
              { name: "SQL" },
              { name: "PostgreSQL" },
              { name: "MySQL" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-center font-semibold flex justify-center items-center"
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
          <h3 className="text-2xl font-medium mb-4 lg:text-3xl">
            DevOps & Tooling
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 xl:grid-cols-4">
            {[
              { name: "AWS" },
              { name: "Docker" },
              { name: "EC2" },
              { name: "Elastic Beanstalk" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-center font-semibold flex justify-center items-center"
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
          <h3 className="text-2xl font-medium mb-4 lg:text-3xl">Testing</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 xl:grid-cols-4">
            {[{ name: "React Testing Library" }].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white border border-black p-6 text-center font-semibold flex justify-center items-center"
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
    </div>
  );
}
