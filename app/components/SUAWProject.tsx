"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import Image from "next/image";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import { useRef } from "react";

interface SUAWProjectProps {
  onClose: () => void;
}

export default function SUAWProject({ onClose }: SUAWProjectProps) {
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
            src="/SUAW_Logo_Main_Yellow.png"
            alt="Shut Up & Write! Logo"
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
          A community-driven event platform from one of the world&apos;s largest
          nonprofit writing groups
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
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl font-bold text-black">Project Overview</h2>
          <p className="text-lg text-black leading-relaxed">
            Shut Up & Write! is a nonprofit that helps writers around the world
            build sustainable writing habits through free, peer-led events.
            Brought on as the platform&apos;s first in-house software engineer,
            I helped architect a full frontend rebuild and contributed across
            the stack to support a growing global user base. My work emphasized
            accessibility, performance, and thoughtful UX, helping evolve the
            product from a simple productivity tool into a dynamic community
            platform.
          </p>
        </div>
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
            "Helped architect and rebuild the frontend from scratch, implementing a scalable component system",
            "Collaborated cross-functionally with product, design, and executive teams to shape features",
            "Interviewed and hired a contract UX designer, serving as the bridge between design and engineering",
            "Integrated Whereby to support in-app video calls for safer, branded writing sessions",
            "Led implementation of accessibility best practices across the app",
            "Worked in a small, mission-driven team with full ownership of the web platform",
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-2 h-2 bg-black rounded-full mt-[0.5em] flex-shrink-0" />
              <span className="text-black">{text}</span>
            </li>
          ))}
        </ul>
      </motion.section>
      {/* Core Features */}
      <motion.section
        className="flex flex-col items-center gap-12 text-center"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-black">Core Features</h2>
        <div className="grid md:grid-cols-3 gap-8 w-full">
          {[
            {
              title: "Event Scheduling",
              desc: "Event scheduling with timezone, DST, and recurrence handling",
              icon: "📅",
            },
            {
              title: "RSVP System",
              desc: "RSVP and check-in system for online and in-person events",
              icon: "✅",
            },
            {
              title: "Event Feed",
              desc: "Event feed with real-time messaging and post threads",
              icon: "💬",
            },
            {
              title: "Notifications",
              desc: "Email and in-app notifications for events and organizer tools",
              icon: "🔔",
            },
            {
              title: "Admin Dashboard",
              desc: "Admin dashboard with approval workflows and moderation controls",
              icon: "⚙️",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-black flex flex-col gap-3 p-6 text-left transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="text-xl font-bold text-black">{feature.title}</h3>
              <p className="text-black">{feature.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Technology Stack */}
      <motion.section
        className="flex flex-col items-center gap-12 text-center"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-black">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {[
            { name: "Vue.js" },
            { name: "JavaScript" },
            { name: "Apollo Client" },
            { name: "C# .NET" },
            { name: "Hasura" },
            { name: "GraphQL" },
            { name: "PostgreSQL" },
            { name: "AWS" },
          ].map((tech, index) => (
            <motion.div
              key={index}
              className="bg-white border border-black p-6 text-black text-center font-semibold"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              {tech.name}
            </motion.div>
          ))}
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
            Ready to Explore More?
          </h2>
          <p className="text-xl text-black">
            Discover how Shut Up & Write! can transform your writing
            productivity and help you build lasting habits.
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

// "use client";

// import { motion, useInView, AnimatePresence } from "motion/react";
// import Image from "next/image";
// import ChevronDownIcon from "../icons/ChevronDownIcon";
// import { useRef } from "react";
// interface SUAWProjectProps {
//   onClose: () => void;
// }

// export default function SUAWProject({ onClose }: SUAWProjectProps) {
//   const overviewRef = useRef(null);
//   const isInView = useInView(overviewRef);
//   const showChevron = !isInView;

//   return (
//     <div className="min-h-screen flex flex-col p-4 gap-8 bg-white">
//       {/* Hero Section */}
//       <div className="relative h-[calc(100dvh-3*var(--layout-size))] flex flex-col  mt-16 justify-between items-center overflow-hidden">
//         <motion.div
//           className="mb-6"
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <Image
//             src="/SUAW_Logo_Main_Yellow.png"
//             alt="Shut Up & Write! Logo"
//             width={400}
//             height={200}
//             className="mx-auto"
//             priority
//           />
//         </motion.div>
//         <motion.p
//           className="text-2xl text-black p-2 text-center"
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           A community-driven event platform from one of the world&apos;s largest
//           nonprofit writing groups
//         </motion.p>
//         <div className="h-16 relative w-full flex justify-center items-end">
//           <AnimatePresence>
//             {showChevron && (
//               <motion.div
//                 key="chevron"
//                 className="absolute bottom-0"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <motion.div
//                   animate={{ y: [0, 6, 0] }}
//                   transition={{
//                     duration: 1.5,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   <ChevronDownIcon className="w-12 h-12 text-black" />
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Content Sections */}
//       <div>
//         {/* Overview Section */}
//         <motion.section
//           ref={overviewRef}
//           className="grid md:grid-cols-2 gap-12 items-center"
//           initial={{ y: 100, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true, amount: 0 }}
//         >
//           <div>
//             <h2 className="text-4xl font-bold text-black mb-6">
//               Project Overview
//             </h2>
//             <p className="text-lg text-black leading-relaxed">
//               Shut Up & Write! is a nonprofit that helps writers around the
//               world build sustainable writing habits through free, peer-led
//               events. Brought on as the platform&apos;s first in-house software
//               engineer, I helped architect a full frontend rebuild and
//               contributed across the stack to support a growing global user
//               base. My work emphasized accessibility, performance, and
//               thoughtful UX, helping evolve the product from a simple
//               productivity tool into a dynamic community platform.
//             </p>
//           </div>
// <h2 className="text-4xl font-bold text-black mb-6">Key Highlights</h2>{" "}
// <ul className="space-y-3">
//   <li className="flex items-start">
//     <span className="w-2 h-2 bg-black mr-3 mt-2 flex-shrink-0"></span>
//     <span className="text-black">
//       Helped architect and rebuild the frontend from scratch,
//       implementing a scalable component system
//     </span>
//   </li>
//   <li className="flex items-start">
//     <span className="w-2 h-2 bg-black mr-3 mt-2 flex-shrink-0"></span>
//     <span className="text-black">
//       Collaborated cross-functionally with product, design, and
//       executive teams to shape features
//     </span>
//   </li>
//   <li className="flex items-start">
//     <span className="w-2 h-2 bg-black mr-3 mt-2 flex-shrink-0"></span>
//     <span className="text-black">
//       Interviewed and hired a contract UX designer, serving as the
//       bridge between design and engineering
//     </span>
//   </li>
//   <li className="flex items-start">
//     <span className="w-2 h-2 bg-black mr-3 mt-2 flex-shrink-0"></span>
//     <span className="text-black">
//       Integrated Whereby to support in-app video calls for safer,
//       branded writing sessions
//     </span>
//   </li>
//   <li className="flex items-start">
//     <span className="w-2 h-2 bg-black mr-3 mt-2 flex-shrink-0"></span>
//     <span className="text-black">
//       Led implementation of accessibility best practices across the
//       app
//     </span>
//   </li>
//   <li className="flex items-start">
//     <span className="w-2 h-2 bg-black mr-3 mt-2 flex-shrink-0"></span>
//     <span className="text-black">
//       Worked in a small, mission-driven team with full ownership of
//       the web platform
//     </span>
//   </li>
// </ul>
//         </motion.section>

// {/* Features Grid */}
// <motion.section
//   initial={{ y: 100, opacity: 0 }}
//   whileInView={{ y: 0, opacity: 1 }}
//   transition={{ duration: 0.8 }}
//   viewport={{ once: true }}
// >
//   <h2 className="text-4xl font-bold text-black mb-12 text-center">
//     Core Features
//   </h2>
//   <div className="grid md:grid-cols-3 gap-8">
//     {[
//       {
//         title: "Event Scheduling",
//         desc: "Event scheduling with timezone, DST, and recurrence handling",
//         icon: "📅",
//       },
//       {
//         title: "RSVP System",
//         desc: "RSVP and check-in system for online and in-person events",
//         icon: "✅",
//       },
//       {
//         title: "Event Feed",
//         desc: "Event feed with real-time messaging and post threads",
//         icon: "💬",
//       },
//       {
//         title: "Notifications",
//         desc: "Email and in-app notifications for events and organizer tools",
//         icon: "🔔",
//       },
//       {
//         title: "Admin Dashboard",
//         desc: "Admin dashboard with approval workflows and moderation controls",
//         icon: "⚙️",
//       },
//     ].map((feature, index) => (
//       <motion.div
//         key={index}
//         className="bg-white p-8 border border-black transition-all duration-300"
//         initial={{ y: 50, opacity: 0 }}
//         whileInView={{ y: 0, opacity: 1 }}
//         transition={{ delay: index * 0.2 }}
//         viewport={{ once: true }}
//         whileHover={{ y: -10 }}
//       >
//         <div className="text-4xl mb-4">{feature.icon}</div>
//         <h3 className="text-xl font-bold text-black mb-3">
//           {feature.title}
//         </h3>
//         <p className="text-black">{feature.desc}</p>
//       </motion.div>
//     ))}
//   </div>
// </motion.section>

// {/* Tech Stack */}
// <motion.section
//   initial={{ y: 100, opacity: 0 }}
//   whileInView={{ y: 0, opacity: 1 }}
//   transition={{ duration: 0.8 }}
//   viewport={{ once: true }}
// >
//   <h2 className="text-4xl font-bold text-black mb-12 text-center">
//     Technology Stack
//   </h2>
//   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//     {[
//       { name: "Vue.js" },
//       { name: "JavaScript" },
//       { name: "Apollo Client" },
//       { name: "C# .NET" },
//       { name: "Hasura" },
//       { name: "GraphQL" },
//       { name: "PostgreSQL" },
//       { name: "AWS" },
//     ].map((tech, index) => (
//       <motion.div
//         key={index}
//         className="bg-white border border-black p-6 text-black text-center font-semibold"
//         initial={{ scale: 0, opacity: 0 }}
//         whileInView={{ scale: 1, opacity: 1 }}
//         transition={{ delay: index * 0.1 }}
//         viewport={{ once: true }}
//         whileHover={{ scale: 1.05 }}
//       >
//         {tech.name}
//       </motion.div>
//     ))}
//   </div>
// </motion.section>

// {/* Call to Action */}
// <motion.section
//   className="text-center py-16"
//   initial={{ y: 100, opacity: 0 }}
//   whileInView={{ y: 0, opacity: 1 }}
//   transition={{ duration: 0.8 }}
//   viewport={{ once: true }}
// >
//   <div className="border border-black p-12 bg-white">
//     <h2 className="text-4xl font-bold mb-6 text-black">
//       Ready to Explore More?
//     </h2>
//     <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
//       Discover how Shut Up & Write! can transform your writing
//       productivity and help you build lasting habits.
//     </p>
//     <button
//       onClick={onClose}
//       className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 border border-black"
//     >
//       Return to Portfolio
//     </button>
//   </div>
// </motion.section>
//       </div>
//     </div>
//   );
// }
