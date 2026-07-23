"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerContainerFast, staggerContainerSlow } from "@/lib/motion";

type Speed = "normal" | "fast" | "slow";

interface StaggerChildrenProps {
  children: React.ReactNode;
  speed?: Speed;
  className?: string;
  delay?: number;
}

const containerMap = { normal: staggerContainer, fast: staggerContainerFast, slow: staggerContainerSlow };

export function StaggerChildren({ children, speed = "normal", className = "", delay = 0 }: StaggerChildrenProps) {
  const variants = { ...containerMap[speed], visible: { ...containerMap[speed].visible, transition: { ...((containerMap[speed].visible as { transition?: object }).transition), delayChildren: delay } } };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
