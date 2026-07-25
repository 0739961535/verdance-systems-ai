"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";

interface SectionHeadingProps {
  eyebrow?: string;
  index?: string;             // e.g. "02"
  headline: string;
  italicWord?: string;        // word/phrase to render in serif italic
  italicVariant?: "champagne" | "emerald" | "ivory";
  subtext?: string;
  align?: "left" | "center" | "right";
  className?: string;
  headlineClassName?: string;
  maxWidth?: string;
}

const alignClasses = {
  left:   "text-left items-start",
  center: "text-center items-center",
  right:  "text-right items-end",
};

export function SectionHeading({
  eyebrow,
  index,
  headline,
  italicWord,
  italicVariant = "champagne",
  subtext,
  align = "center",
  className = "",
  headlineClassName = "",
  maxWidth = "max-w-3xl",
}: SectionHeadingProps) {
  const italicClass =
    italicVariant === "emerald"  ? "text-gradient-emerald" :
    italicVariant === "ivory"    ? "text-[#ECE7DD]"        :
                                   "text-gradient-champagne";

  // Splits headline around italicWord if provided; otherwise renders straight
  const renderHeadline = () => {
    if (!italicWord) return headline;
    const idx = headline.indexOf(italicWord);
    if (idx === -1) return headline;
    return (
      <>
        {headline.slice(0, idx)}
        <span className={`italic-serif ${italicClass}`} style={{ fontWeight: 400 }}>
          {italicWord}
        </span>
        {headline.slice(idx + italicWord.length)}
      </>
    );
  };

  return (
    <motion.div
      className={`flex flex-col ${alignClasses[align]} ${maxWidth} ${align === "center" ? "mx-auto" : ""} ${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      {(eyebrow || index) && (
        <motion.div
          variants={fadeInUp}
          className={`flex items-center gap-3 mb-6 ${align === "center" ? "justify-center" : ""}`}
        >
          {index && (
            <span className="font-mono text-[0.62rem] tracking-[0.22em] text-[#5C6862] uppercase">
              - {index}
            </span>
          )}
          {eyebrow && (
            <>
              <span className="block w-6 h-px bg-[#D4B27E]" />
              <span className="eyebrow-warm">{eyebrow}</span>
            </>
          )}
        </motion.div>
      )}

      <motion.h2
        variants={fadeInUp}
        className={`headline-display ${headlineClassName}`}
        style={{ fontSize: "clamp(2.2rem, 4.6vw, 4rem)" }}
      >
        {renderHeadline()}
      </motion.h2>

      {subtext && (
        <motion.p
          variants={fadeInUp}
          className="text-[#8B968F] text-base md:text-lg leading-[1.6] font-body max-w-[640px] mt-6"
        >
          {subtext}
        </motion.p>
      )}
    </motion.div>
  );
}
