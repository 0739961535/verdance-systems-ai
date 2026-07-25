"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    n:    "01",
    head: "Capture every signal",
    title: "Seamless presence",
    body: "Websites, WhatsApp, voice and web widgets - every enquiry recorded the moment it arrives.",
  },
  {
    n:    "02",
    head: "Convert with grace",
    title: "Considered automation",
    body: "Diary-aware scheduling, follow-up sequences and AI receptionists move leads to bookings without manual touch.",
  },
  {
    n:    "03",
    head: "Compound the relationship",
    title: "Quiet retention",
    body: "Post-interaction notes, review collection and reactivation kept clients warm long after the first transaction.",
  },
];

export function ProductsOverview() {
  return (
    <section className="section-padding bg-canvas relative overflow-hidden">
      <div className="container-wide">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-6 h-px bg-[#1B4D3E]" />
              <span className="eyebrow">What makes Verdance distinct</span>
            </div>
            <h2 className="headline-display" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}>
              Three things that <span className="italic-serif text-gradient-brand" style={{ fontWeight: 400 }}>separate us</span><br />
              from automation shops.
            </h2>
          </div>
          <p className="text-[#5A6660] text-base md:text-lg leading-[1.65] max-w-md">
            We don&apos;t ship templates. Every Verdance engagement is composed for a single business and tended for years.
          </p>
        </motion.div>

        {/* 3 numbered cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.article
              key={card.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl p-8 surface-card overflow-hidden hover:-translate-y-1 transition-transform duration-500"
            >
              {/* Subtle wash */}
              <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full pointer-events-none"
                   style={{ background: "radial-gradient(circle, rgba(0,200,150,0.10), transparent 70%)" }} />

              {/* Top row */}
              <div className="flex items-center justify-between mb-12 relative">
                <span className="inline-flex items-center gap-2 text-[0.72rem] font-medium text-[#1B4D3E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1B4D3E]" />
                  {card.head}
                </span>
                <ArrowUpRight size={16} className="text-[#B5BDB7] group-hover:text-[#1B4D3E] transition-colors duration-500" />
              </div>

              {/* Number */}
              <div className="font-display font-bold text-[#1B4D3E] mb-8 leading-none relative"
                   style={{ fontSize: "clamp(3.4rem, 5.2vw, 4.4rem)", letterSpacing: "-0.04em" }}>
                {card.n}
              </div>

              <h3 className="font-display font-bold text-[1.6rem] text-[#0B1812] leading-[1.1] mb-3 relative">
                {card.title}
              </h3>
              <p className="text-[#5A6660] text-[0.95rem] leading-[1.65] relative">
                {card.body}
              </p>
            </motion.article>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-16 pt-10 border-t border-[rgba(11,24,18,0.06)]"
        >
          <p className="text-[#5A6660] text-[0.95rem] italic-serif max-w-md text-center sm:text-left">
            Begin where you stand. Each Verdance engagement is scoped privately, never templated.
          </p>
          <div className="flex gap-3">
            <Link href="/products" className="btn-ghost group">
              View all instruments
              <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link href="/contact" className="btn-primary group">
              Get a demo
              <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
