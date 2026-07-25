"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function BookDemoCTA() {
  return (
    <section className="relative bg-canvas-2 overflow-hidden border-t border-[rgba(11,24,18,0.06)]">
      <div className="container-wide section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-[1fr_auto] gap-12 items-center"
        >
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-7">
              <span className="block w-6 h-px bg-[#1B4D3E]" />
              <span className="eyebrow">Ready to experience the future?</span>
            </div>

            <h2 className="headline-display mb-7" style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}>
              Accelerate<br />
              <span className="italic-serif text-gradient-brand" style={{ fontWeight: 400 }}>today</span>.
            </h2>

            <p className="text-[#5A6660] text-base md:text-lg leading-[1.65] max-w-lg mb-10">
              Discover how the Verdance system can transform every customer interaction your business has - from first hello to long-tail loyalty.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-primary group">
                Get a demo
                <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a href="mailto:hello@verdancesystemsai.com" className="btn-ghost group">
                Email the studio
                <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right - emblem */}
          <div className="relative hidden lg:flex items-center justify-center w-[360px] h-[360px]">
            <div className="absolute inset-0 rounded-full animate-spin-slow"
                 style={{ background: "conic-gradient(from 0deg, transparent, rgba(184,148,100,0.28), rgba(0,200,150,0.24), rgba(27,77,62,0.18), transparent)", filter: "blur(16px)" }} />
            <div className="absolute inset-14 rounded-full"
                 style={{
                   background: "radial-gradient(circle at 30% 30%, rgba(184,148,100,0.50), rgba(27,77,62,0.85) 70%, #0B1812 100%)",
                   boxShadow: "inset 0 0 40px rgba(0,200,150,0.22), 0 24px 60px rgba(11,24,18,0.20)",
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
        </motion.div>
      </div>
    </section>
  );
}
