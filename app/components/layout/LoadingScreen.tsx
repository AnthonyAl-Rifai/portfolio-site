"use client";

import { motion, AnimatePresence } from "motion/react";

export default function LoadingScreen() {
  console.log("Loading screen rendered!");

  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white text-black"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold tracking-wide"
        >
          Welcome
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
