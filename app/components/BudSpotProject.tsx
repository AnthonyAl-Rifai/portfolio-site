"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { useLayout } from "../context/LayoutContext";
import Image from "next/image";
import MenuIconAUpsideDown from "../icons/MenuIconAUpsideDown";
import { useRef } from "react";
import SectionTitle from "./SectionTitle";

export default function BudSpotProject() {
  const { isMobileLandscape } = useLayout();
  const overviewRef = useRef(null);
  const isInView = useInView(overviewRef);
  const showChevron = !isInView;

  return (
    <div
      className={clsx(
        "min-h-screen flex flex-col",
        isMobileLandscape ? "px-4 pb-8 gap-8 mb-4" : "px-4 gap-16 pb-16 lg:px-8"
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
            src="/budspot-logo.png"
            alt="BudSpot Logo"
            width={375}
            height={375}
            className="mx-auto w-[200px] md:w-[250px] lg:w-[300px] xl:w-[375px] h-auto"
            priority
          />
        </motion.div>

        <motion.p
          className="text-2xl md:text-3xl md:px-8 lg:px-24 lg:text-4xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          A peer-to-peer marketplace for hosting and discovering curated social
          experiences.
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
        <p className="text-lg leading-relaxed md:text-xl lg:text-2xl xl:text-3xl">
          BudSpot is a peer-to-peer marketplace for hosting and discovering
          real-world social experiences. As my first startup role after
          transitioning from the music industry, I joined the founding team to
          help bring the product to life. I contributed across the stack to
          build a performant MERN application, with a strong focus on real-time
          features, server-side rendering, and infrastructure reliability to
          support a seamless user experience.
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
            "Engineered frontend architecture for an isomorphic MERN-stack web application; optimized server-side rendering, reducing page load times by 60% and enhancing user experience across all devices",
            "Deployed Socket.io for real-time messaging and web notifications, leading to a 30% increase in user engagement; streamlined background checks with Checkr, improving onboarding efficiency by 25%",
            "Implemented automated cron jobs on Google Cloud Platform that improved system uptime by 15% and reduced manual intervention by 20 hours per week for infrastructure maintenance",
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
              { name: "TypeScript" },
              { name: "SCSS" },
              { name: "Redux" },
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
              { name: "Express.js" },
              { name: "RESTful API" },
              { name: "MongoDB" },
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
            {[{ name: "Google Cloud Platform" }].map((tech, index) => (
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
            {[{ name: "Jest" }, { name: "Cypress" }].map((tech, index) => (
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
