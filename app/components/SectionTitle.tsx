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
    <div
      className="h-[var(--layout-size)] min-h-[var(--layout-size)] w-full sticky z-[100] flex items-center"
      style={{ top: "var(--layout-size)" }}
    >
      {/* heading */}
      <h1 ref={sectionRef} className="text-4xl font-bold mx-4">
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
        className="bg-black"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
          transformOrigin: "right",
        }}
      />
    </div>
  );
}
