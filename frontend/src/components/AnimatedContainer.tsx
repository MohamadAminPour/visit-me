"use client";
import { motion } from "framer-motion";

export default function AnimatedContainer({ children }: any) {
  return (
    <motion.div
      initial={{ opacity: 0,  }}
      animate={{ opacity: 1, }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-center justify-center flex-col px-[1rem] md:px-0"
    >
      {children}
    </motion.div>
  );
}
