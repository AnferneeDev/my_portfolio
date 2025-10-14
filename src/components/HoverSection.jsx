"use client";

import { motion } from "framer-motion";

export default function HoverSection({ children }) {
  return (
    <motion.div
      className="h-full w-full"
      whileHover={{
        scale: 1.02,
        filter: "brightness(1.1)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}
