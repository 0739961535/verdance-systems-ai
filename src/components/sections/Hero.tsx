"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

/* 3D scene - client-only, no SSR */
const HeroScene = dynamic(
  () => import("@/components/visuals/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

/* ─── Hero - centered, big sans, real 3D scene ─────────────── */
export function Hero() {
  return (
    <section className="relative bg-canvas overflow-hidden" style={{ minHeight: "115vh" }}>

      {/* ── Ambient wash ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[700px]"
             style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(245,241,232,0.85) 0%, rgba(245,241,232,0.4) 40%, transparent 70%)" }} />
        <div className="noise-overlay opacity-25" />
      </div>

      {/* ── 3D diorama - anchored to bottom 70% of hero ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-0"
        style={{ height: "85%" }}
      >
        <HeroScene />
      </motion.div>

      {/* ── Top-to-middle fade - keeps text zone clean ── */}
      <div className="absolute inset-x-0 top-0 h-[55%] pointer-events-none z-[5]"
           style={{ background: "linear-gradient(180deg, #F5F1E8 0%, rgba(245,241,232,0.92) 35%, rgba(245,241,232,0.55) 65%, transparent 100%)" }} />

      {/* ── Bottom soft fade into next section ── */}
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-[5]"
           style={{ background: "linear-gradient(180deg, transparent 0%, rgba(245,241,232,0.7) 50%, #F5F1E8 100%)" }} />

      {/* ── Text content - anchored to top half ── */}
      <div className="relative z-10 pt-32 md:pt-36">
        <div className="container-wide flex flex-col items-center text-center">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-[#00C896] animate-glow-pulse" />
            <span className="eyebrow">Verdance · Studio of Systems · MMXXVI</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="headline-display max-w-[1000px] mb-7"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)" }}
          >
            The quiet AI infrastructure<br className="hidden md:block" />
            behind <span className="italic-serif text-gradient-brand" style={{ fontWeight: 400 }}>growing businesses</span>.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#5A6660] text-base md:text-lg leading-[1.55] max-w-xl mb-8"
          >
            We compose the systems that attend to every enquiry, every appointment, every relationship - gracefully, at any hour.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 mb-12"
          >
            <Link href="/contact" className="btn-primary group">
              Get a demo
              <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link href="/products" className="btn-ghost">
              View the system
            </Link>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[0.62rem] tracking-[0.30em] text-[#8B958F] uppercase">
              Scroll to begin
            </span>
            <ChevronDown size={14} className="text-[#8B958F] animate-scroll-hint" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

