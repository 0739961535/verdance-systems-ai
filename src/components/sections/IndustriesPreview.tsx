"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { industries } from "@/data/industries";

export function IndustriesPreview() {
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
              <span className="eyebrow">Practices we serve</span>
            </div>
            <h2 className="headline-display" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}>
              Built for the practices<br />
              <span className="italic-serif text-gradient-brand" style={{ fontWeight: 400 }}>we know intimately</span>.
            </h2>
          </div>
          <p className="text-[#5A6660] text-base md:text-lg leading-[1.65] max-w-md">
            Verdance is not a template shop. Every industry we serve is one we have built and tended systems within.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {industries.map((industry, idx) => (
            <motion.div
              key={industry.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/industries/${industry.slug}`}
                className="group relative flex flex-col h-full p-6 rounded-xl surface-card hover:-translate-y-1 transition-transform duration-500"
              >
                <div className="flex items-baseline justify-between mb-12">
                  <span className="font-mono text-[0.62rem] tracking-[0.22em] text-[#1B4D3E] uppercase">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight size={14} className="text-[#B5BDB7] group-hover:text-[#1B4D3E] transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h3 className="font-display font-bold text-[1rem] text-[#0B1812] leading-[1.15] mb-2">
                  {industry.name}
                </h3>
                <p className="text-[#5A6660] text-[0.8rem] leading-[1.55] italic-serif">
                  {industry.headline}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <Link href="/industries" className="btn-ghost group">
            View all practices
            <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
