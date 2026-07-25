"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/* ─── Sodium-style numbered feature blocks ─── */
const blocks = [
  {
    label: "The Verdance Cycle",
    title: "Built so every signal becomes a kept appointment.",
    body:
      "Verdance composes the systems that catch every enquiry, convert every conversation, and keep every client warm - across phone, web, WhatsApp and email.",
    cta: "Watch the cycle",
    image: "/visual-cycle.png",
  },
  {
    label: "Integrating AI with your operation",
    title: "Sophisticated AI, tuned to your business.",
    body:
      "Our studio combines large language models, voice agents and pipeline automations to deliver speed and accuracy in your customer-facing operation.",
    cta: "How it works",
    image: "/visual-ops.png",
  },
  {
    label: "Operating in seconds",
    title: "Reply, schedule and follow up in moments.",
    body:
      "Our systems answer first contact in under five seconds, schedule diary-aware, and follow up consistently - quietly, at any hour, without dropping a thread.",
    cta: "See the speed",
    image: "/visual-speed.png",
  },
];

export function WhatVerdanceBuilds() {
  return (
    <section className="relative bg-canvas overflow-hidden">
      {blocks.map((block, idx) => (
        <FeatureBlock key={block.label} block={block} index={idx} />
      ))}
    </section>
  );
}

function FeatureBlock({ block, index }: { block: typeof blocks[number]; index: number }) {
  return (
    <div className="relative border-t border-[rgba(11,24,18,0.06)]">
      <div className="container-wide section-padding-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-center"
        >
          {/* LEFT - visual */}
          <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
            <div className="relative aspect-[5/4] rounded-2xl overflow-hidden surface-card flex items-center justify-center"
                 style={{ background: "linear-gradient(135deg, #FAF7F0 0%, #EFEADD 60%, rgba(184,148,100,0.10) 100%)" }}>
              <div className="noise-overlay opacity-25" />

              {/* Floating emblem */}
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full animate-spin-slow"
                     style={{ background: "conic-gradient(from 0deg, transparent, rgba(0,200,150,0.18), rgba(184,148,100,0.20), transparent)", filter: "blur(12px)" }} />
                <div className="absolute inset-8 rounded-full"
                     style={{
                       background: "radial-gradient(circle at 30% 30%, rgba(184,148,100,0.4), rgba(27,77,62,0.85) 70%, #0B1812 100%)",
                       boxShadow: "inset 0 0 40px rgba(0,200,150,0.25), 0 16px 40px rgba(11,24,18,0.18)",
                     }}>
                  <div className="absolute inset-2 rounded-full"
                       style={{ background: "radial-gradient(circle at 25% 25%, rgba(255,245,220,0.30) 0%, transparent 50%)" }} />
                </div>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="absolute inset-0 rounded-full border animate-float"
                       style={{
                         borderColor: i === 0 ? "rgba(184,148,100,0.20)" : i === 1 ? "rgba(0,200,150,0.16)" : "rgba(27,77,62,0.16)",
                         transform: `scale(${1 - i * 0.16})`,
                         animationDuration: `${8 + i * 2}s`,
                         animationDelay: `${i * 0.6}s`,
                       }}
                  />
                ))}
              </div>

              {/* Watch / scroll cue */}
              <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-[rgba(11,24,18,0.85)] backdrop-blur-md px-4 py-2 text-[#F5F1E8] text-[0.72rem]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-glow-pulse" />
                {block.cta}
              </div>
              <div className="absolute top-5 right-5 font-mono text-[0.6rem] tracking-[0.22em] text-[#5A6660] uppercase">
                Fig. {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* RIGHT - copy */}
          <div className={`flex flex-col ${index % 2 === 1 ? "lg:order-1" : ""}`}>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-6 h-px bg-[#1B4D3E]" />
              <span className="eyebrow">{block.label}</span>
            </div>

            <h2 className="headline-display mb-6" style={{ fontSize: "clamp(1.8rem, 3.6vw, 3rem)" }}>
              {block.title}
            </h2>

            <p className="text-[#5A6660] text-base md:text-lg leading-[1.65] max-w-lg mb-8">
              {block.body}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-primary group">
                Get a demo
                <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="/how-it-works" className="btn-ghost group">
                {block.cta}
                <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Scroll continue hint */}
            {index === 0 && (
              <div className="flex items-center gap-2 mt-10 text-[#8B958F]">
                <span className="font-mono text-[0.62rem] tracking-[0.30em] uppercase">Scroll to continue</span>
                <span className="w-8 h-px bg-[#B5BDB7]" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
