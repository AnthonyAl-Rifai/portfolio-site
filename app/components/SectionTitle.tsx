"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function SectionTitle({ name }: { name: string }) {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "-50px 0px", // Start animation slightly before the section is fully in view
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="row-start-1 col-span-full">
      {/* heading */}
      <h1
        ref={sectionRef}
        className="text-6xl font-bold md:text-7xl lg:text-9xl mx-4"
      >
        {name}
      </h1>

      {/* Animated underline - extends to edges */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={
          isInView ? { width: "100%", opacity: 1 } : { width: 0, opacity: 0 }
        }
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.5,
        }}
        className="bg-black self-end"
        style={{
          gridColumn: "1 / -1",
          marginLeft: "0",
          marginRight: "0",
          height: 1,
          transformOrigin: "right",
        }}
      />
    </div>
  );
}
