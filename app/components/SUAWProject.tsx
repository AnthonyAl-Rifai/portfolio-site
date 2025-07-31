"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { useLayout } from "../context/LayoutContext";
import Image from "next/image";
import MenuIconAUpsideDown from "../icons/MenuIconAUpsideDown";
import { useRef } from "react";
import CallToAction from "./CallToAction";

interface SuawProjectProps {
  onClose: () => void;
}

export default function SuawProject({ onClose }: SuawProjectProps) {
  const { isMobileLandscape } = useLayout();
  const overviewRef = useRef(null);
  const isInView = useInView(overviewRef);
  const showChevron = !isInView;

  return (
    <div
      className={clsx(
        "min-h-screen flex flex-col  bg-white",
        isMobileLandscape ? "px-16 py-8 pb-4 gap-8 mb-4" : "p-4 gap-16 mb-16"
      )}
    >
      {/* Hero Section */}
      <div
        className={clsx(
          "relative flex flex-col items-center text-center",
          isMobileLandscape
            ? "h-auto min-h-screen gap-8"
            : "h-[calc(100vh-3*var(--layout-size))] justify-center gap-16"
        )}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src="/SUAW_Logo_Main_Yellow.png"
            alt="Shut Up & Write! Logo"
            width={isMobileLandscape ? 300 : 400} // smaller width in landscape
            height={isMobileLandscape ? 150 : 200} // maintain aspect ratio
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
          A community-driven event platform from one of the world&apos;s largest
          nonprofit writing groups
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
        <h2 className="text-4xl font-bold text-black">Project Overview</h2>
        <div className="border border-black">
          <Image
            src="/suaw-hero-section.png"
            alt="SUAW Hero Section"
            width={800}
            height={400}
            className="w-full"
            priority
          />
        </div>
        <p className="text-lg text-black leading-relaxed">
          Shut Up & Write! is an initiative of Writing Partners, a California
          based nonprofit organization that helps writers around the world build
          sustainable writing habits through free, peer-led events. Brought on
          as the platform&apos;s first in-house software engineer, I helped
          architect a full frontend rebuild and contributed across the stack to
          support a growing global user base. My work emphasized accessibility,
          performance, and thoughtful UX, helping evolve the product from a
          simple productivity tool into a dynamic community platform.
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
        <div className="border border-black">
          <Image
            src="/suaw-online-event-section.png"
            alt="SUAW Online Event Section"
            width={800}
            height={400}
            className="w-full"
            priority
          />
        </div>
        <ul className="flex flex-col gap-4">
          {[
            "Architected the frontend rebuild with Vue.js and GraphQL, owning development of all core pages for 100,000+ users; partnered with the Executive Director on product strategy, accelerating delivery and reducing release cycles by 33%",
            "Led development of a responsive Vue.js component library with 50+ reusable components; introduced Storybook for faster feedback and configured GitLab CI/CD for versioning, doubling development velocity and eliminating UI inconsistencies",
            "Modernized the design system, ensured accessibility compliance, and streamlined layouts; used New Relic and DevTools to fix bottlenecks, improving load speed by 60% and reducing CLS/LCP by 80% and 45%",
            "Reduced GraphQL response times by 35% by extending C# command handlers in a CQRS pattern, optimizing queries and mutations, and improving database efficiency for tighter frontend-backend integration",
            "Strengthened API reliability and backend stability by engineering robust PostgreSQL migrations and optimizing Hasura meta-data tracking, ensuring consistent schemas and smooth deployments across staging, production, and local environments",
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 ">
            {[
              { name: "Vue.js" },
              { name: "JavaScript" },
              { name: "Apollo Client" },
              { name: "SCSS" },
              { name: "Storybook" },
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
            {[
              { name: "C# .NET" },
              { name: "Hasura" },
              { name: "GraphQL" },
              { name: "PostgreSQL" },
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
            {[
              { name: "Docker" },
              { name: "GitLab CI/CD" },
              { name: "AWS" },
              { name: "S3" },
              { name: "EC2" },
              { name: "CloudWatch" },
              { name: "Fargate" },
              { name: "New Relic" },
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
            {[{ name: "Jest" }].map((tech, index) => (
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
