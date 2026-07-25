"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Effortless intake",
    body: "AI-led intake handles enquiries from any channel - phone, web, WhatsApp, email - and writes them straight into your pipeline.",
    accent: "emerald",
  },
  {
    title: "Diary-aware scheduling",
    body: "Bookings, reschedules and reminders, all aware of your live calendar. Clients never wait for someone to confirm a time.",
    accent: "forest",
  },
  {
    title: "Always-warm follow-up",
    body: "Sequenced correspondence - natural, attentive, never robotic - keeps relationships warm long after the first contact.",
    accent: "champagne",
  },
];

export function HowItWorksPreview() {
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
              <span className="eyebrow">Features for more efficiency</span>
            </div>
            <h2 className="headline-display" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}>
              Save your precious time<br className="hidden md:block" />
              for <span className="italic-serif text-gradient-brand" style={{ fontWeight: 400 }}>better things</span>.
            </h2>
          </div>
          <p className="text-[#5A6660] text-base md:text-lg leading-[1.65] max-w-md">
            What our systems quietly take off your plate - so you can spend your days on the work only you can do.
          </p>
        </motion.div>

        {/* Two-column showcase */}
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-5">
          {/* Big feature card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl surface-card p-10 overflow-hidden flex flex-col"
            style={{ minHeight: "520px" }}
          >
            <div className="absolute top-0 right-0 w-[420px] h-[420px] pointer-events-none"
                 style={{ background: "radial-gradient(circle at 70% 30%, rgba(0,200,150,0.10), transparent 65%)" }} />
            <div className="noise-overlay opacity-25" />

            <div className="relative z-10 max-w-md">
              <span className="inline-flex items-center gap-2 text-[0.72rem] font-medium text-[#1B4D3E] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B4D3E]" />
                Effortless automation
              </span>
              <h3 className="font-display font-bold text-[2.4rem] text-[#0B1812] leading-[1.0] mb-4">
                Automate routine touchpoints with our AI - saving time, eliminating errors.
              </h3>
              <p className="text-[#5A6660] text-[0.95rem] leading-[1.65] mb-8">
                Verdance handles the work no business owner should spend their weeks on: intake, scheduling, reminders, follow-up, review collection - quietly, in your brand voice.
              </p>

              <Link href="/contact" className="btn-primary group inline-flex">
                Get a demo
                <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Decorative emblem */}
            <div className="absolute -bottom-16 -right-16 w-80 h-80 pointer-events-none">
              <div className="absolute inset-0 rounded-full animate-spin-slow"
                   style={{ background: "conic-gradient(from 45deg, transparent, rgba(184,148,100,0.20), rgba(0,200,150,0.18), transparent)", filter: "blur(14px)" }} />
              <div className="absolute inset-10 rounded-full"
                   style={{
                     background: "radial-gradient(circle at 30% 30%, rgba(184,148,100,0.50), rgba(27,77,62,0.85) 70%, #0B1812 100%)",
                     boxShadow: "inset 0 0 32px rgba(0,200,150,0.22), 0 20px 50px rgba(11,24,18,0.20)",
                   }} />
            </div>
          </motion.div>

          {/* Right column - 3 smaller feature cards */}
          <div className="flex flex-col gap-5">
            {features.map((feat, i) => (
              <motion.article
                key={feat.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl surface-card p-6 flex items-start gap-5 hover:-translate-y-0.5 transition-transform duration-500"
              >
                {/* Accent square */}
                <div className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                     style={{
                       background:
                         feat.accent === "emerald"   ? "linear-gradient(135deg, rgba(0,200,150,0.20), rgba(0,200,150,0.06))" :
                         feat.accent === "forest"    ? "linear-gradient(135deg, rgba(27,77,62,0.16), rgba(27,77,62,0.04))" :
                                                       "linear-gradient(135deg, rgba(184,148,100,0.24), rgba(184,148,100,0.06))",
                       border:
                         feat.accent === "emerald"   ? "1px solid rgba(0,200,150,0.25)" :
                         feat.accent === "forest"    ? "1px solid rgba(27,77,62,0.20)" :
                                                       "1px solid rgba(184,148,100,0.30)",
                     }}>
                  <span className="font-display font-bold text-[1.15rem] text-[#0B1812]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-[1.05rem] text-[#0B1812] leading-snug mb-1.5">
                    {feat.title}
                  </h4>
                  <p className="text-[#5A6660] text-[0.86rem] leading-[1.6]">{feat.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex justify-center mt-10"
        >
          <Link href="/how-it-works" className="btn-ghost group">
            See the full method
            <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
