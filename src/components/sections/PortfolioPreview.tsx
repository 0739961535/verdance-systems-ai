"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const cases = [
  { fig: "I",   sector: "Legal Practice",        note: "AI Receptionist · Client Intake",     body: "An always-on first point of contact for a partner-led firm. Intake captured, conflicts checked, consultations scheduled before counsel's diary is opened." },
  { fig: "II",  sector: "Real Estate Atelier",   note: "WhatsApp AI · Lead Reactivation",     body: "A boutique agency's dormant database brought back to life - sequenced, qualified, handed warm to the agent who originally listed." },
  { fig: "III", sector: "Medical Practice",      note: "Smart Scheduler · Voice AI",          body: "Diary-aware voice agent for a specialist clinic. Bookings, reschedules and preparation notes - handled politely, twenty-four hours a day." },
];

export function PortfolioPreview() {
  return (
    <section className="section-padding bg-canvas-2 relative overflow-hidden border-t border-[rgba(11,24,18,0.06)]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-6 h-px bg-[#1B4D3E]" />
              <span className="eyebrow">Selected work</span>
            </div>
            <h2 className="headline-display" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}>
              A discreet portfolio<br />
              of systems, <span className="italic-serif text-gradient-brand" style={{ fontWeight: 400 }}>quietly running</span>.
            </h2>
          </div>
          <p className="text-[#5A6660] text-base md:text-lg leading-[1.65] max-w-md">
            Our work is, by design, invisible to the end client - it simply makes the business feel attentive. A small selection, anonymised.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.article
              key={c.fig}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl surface-card overflow-hidden hover:-translate-y-1 transition-transform duration-500"
            >
              {/* Plate */}
              <div className="relative h-52 overflow-hidden flex items-center justify-center"
                   style={{ background: "linear-gradient(160deg, rgba(184,148,100,0.10) 0%, rgba(0,200,150,0.06) 100%)" }}>
                <div className="noise-overlay opacity-30" />
                <div className="absolute inset-0 opacity-[0.08]"
                     style={{
                       backgroundImage: "linear-gradient(rgba(11,24,18,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(11,24,18,0.4) 1px, transparent 1px)",
                       backgroundSize: "32px 32px",
                     }} />
                <span className="italic-serif text-[#1B4D3E] text-[6rem] leading-none opacity-50 group-hover:opacity-80 transition-opacity duration-700">
                  {c.fig}
                </span>
                <span className="absolute top-4 left-4 font-mono text-[0.6rem] tracking-[0.22em] text-[#1B4D3E] uppercase">
                  Fig. {c.fig}
                </span>
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 text-[0.62rem] text-[#5A6660]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C896]" />
                  In operation
                </span>
              </div>

              <div className="p-7">
                <span className="font-mono text-[0.6rem] tracking-[0.22em] text-[#1B4D3E] uppercase mb-3 block">
                  {c.note}
                </span>
                <h3 className="font-display font-bold text-[1.25rem] text-[#0B1812] leading-tight mb-3">
                  {c.sector}
                </h3>
                <p className="text-[#5A6660] text-[0.88rem] leading-[1.65]">{c.body}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <Link href="/portfolio" className="btn-ghost group">
            View the full portfolio
            <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
