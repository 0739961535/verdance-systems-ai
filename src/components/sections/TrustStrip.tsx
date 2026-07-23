"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "99.8%", label: "Enquiries answered",   sub: "Across every channel, day and night" },
  { value: "<5s",   label: "Median response",      sub: "From inbound to first reply" },
  { value: "12",    label: "Instruments",          sub: "In the Verdance system" },
  { value: "4×",    label: "Continents in use",    sub: "ZA · UK · US · AU" },
];

const logos = [
  "BRYANT & GREY",
  "MOSSON LEGAL",
  "ATELIER NORTH",
  "CAPRI MEDICAL",
  "VERIDIAN HOMES",
  "OAKBARN ATELIER",
];

export function TrustStrip() {
  return (
    <section className="relative bg-canvas-2 border-y border-[rgba(11,24,18,0.06)] overflow-hidden">

      {/* ── Headline + stats ─────────────────────────────── */}
      <div className="container-wide section-padding-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-6 h-px bg-[#1B4D3E]" />
              <span className="eyebrow">By the numbers</span>
            </div>
            <h2 className="headline-display" style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)" }}>
              Just as digital wallets <span className="italic-serif text-gradient-brand" style={{ fontWeight: 400 }}>reshaped finance</span>,
              AI is reshaping how businesses keep promises.
            </h2>
          </div>

          {/* Visual block */}
          <div className="relative aspect-[5/4] rounded-2xl overflow-hidden surface-card hidden lg:flex items-center justify-center"
               style={{ background: "linear-gradient(135deg, #FAF7F0 0%, rgba(0,200,150,0.06) 60%, #EFEADD 100%)" }}>
            <div className="noise-overlay opacity-30" />
            <div className="relative w-56 h-56">
              <div className="absolute inset-0 rounded-full animate-spin-slow"
                   style={{ background: "conic-gradient(from 90deg, transparent, rgba(184,148,100,0.25), rgba(0,200,150,0.22), transparent)", filter: "blur(10px)" }} />
              <div className="absolute inset-10 rounded-full"
                   style={{ background: "radial-gradient(circle at 30% 30%, rgba(184,148,100,0.45), rgba(27,77,62,0.85) 70%, #0B1812 100%)",
                            boxShadow: "inset 0 0 32px rgba(0,200,150,0.22), 0 16px 40px rgba(11,24,18,0.18)" }} />
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-r border-[rgba(11,24,18,0.06)]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative px-8 py-10 border-t border-b border-[rgba(11,24,18,0.06)]"
              style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(11,24,18,0.06)" : undefined }}
            >
              <span className="font-display font-bold text-[#0B1812] block leading-none mb-3"
                    style={{ fontSize: "clamp(2.4rem, 4vw, 3.4rem)", letterSpacing: "-0.04em" }}>
                {stat.value}
              </span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[#1B4D3E] mb-2 block">
                {stat.label}
              </span>
              <span className="text-[0.82rem] text-[#5A6660] italic-serif">{stat.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Trusted-by logo marquee ──────────────────────── */}
      <div className="border-t border-[rgba(11,24,18,0.06)]">
        <div className="container-wide py-14">
          <p className="text-center font-mono text-[0.62rem] tracking-[0.30em] uppercase text-[#8B958F] mb-10">
            Trusted by considered practices · ZA · UK · US · AU
          </p>
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-16 animate-marquee" style={{ width: "max-content" }}>
              {[...logos, ...logos].map((logo, idx) => (
                <span
                  key={`${logo}-${idx}`}
                  className="font-display font-bold text-[#8B958F] tracking-[0.04em] whitespace-nowrap"
                  style={{ fontSize: "1.4rem", letterSpacing: "0.06em" }}
                >
                  {logo}
                </span>
              ))}
            </div>
            {/* Fade edges */}
            <span className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#EFEADD] to-transparent pointer-events-none" />
            <span className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#EFEADD] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
