"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, fadeIn, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";

type Direction = "up" | "in" | "scale" | "left" | "right";

interface FadeInProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const variantMap = { up: fadeInUp, in: fadeIn, scale: scaleIn, left: slideInLeft, right: slideInRight };

export function FadeIn({ children, direction = "up", delay = 0, duration, className = "", once = true }: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const variants = variantMap[direction];

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={delay}
      transition={duration ? { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] } : { delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
