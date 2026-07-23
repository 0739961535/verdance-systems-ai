"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { packages } from "@/data/packages";

export function PackagesPreview() {
  return (
    <section className="section-padding bg-canvas relative overflow-hidden border-t border-[rgba(11,24,18,0.06)]">
      <div className="container-wide">
        {/* Heading */}
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
              <span className="eyebrow">Engagements</span>
            </div>
            <h2 className="headline-display" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}>
              Three engagements,<br />
              <span className="italic-serif text-gradient-brand" style={{ fontWeight: 400 }}>scaled to your stage</span>.
            </h2>
          </div>
          <p className="text-[#5A6660] text-base md:text-lg leading-[1.65] max-w-md">
            Begin where you stand. Each engagement is a complete system in its own right; together they describe a path from foundation to scale.
          </p>
        </motion.div>

        {/* 3 tiers */}
        <div className="grid md:grid-cols-3 gap-5">
          {packages.map((pkg, i) => {
            const isAccent = !!pkg.badge;
            return (
              <motion.article
                key={pkg.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-2xl p-8 flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-500 ${
                  isAccent ? "bg-[#0B1812] text-[#F5F1E8]" : "surface-card"
                }`}
              >
                {isAccent && (
                  <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full pointer-events-none"
                       style={{ background: "radial-gradient(circle, rgba(184,148,100,0.20), transparent 70%)" }} />
                )}

                <div className="flex items-center justify-between mb-10 relative">
                  <span className={`font-mono text-[0.62rem] tracking-[0.22em] uppercase ${isAccent ? "text-[#D4B27E]" : "text-[#1B4D3E]"}`}>
                    Tier {pkg.tier}
                  </span>
                  {pkg.badge && (
                    <span className="inline-flex items-center gap-1.5 text-[0.66rem] font-medium text-[#D4B27E]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4B27E]" />
                      Most chosen
                    </span>
                  )}
                </div>

                <h3 className={`font-display font-bold mb-3 leading-none relative ${isAccent ? "text-[#F5F1E8]" : "text-[#0B1812]"}`}
                    style={{ fontSize: "clamp(2.2rem, 3vw, 2.6rem)", letterSpacing: "-0.035em" }}>
                  {pkg.name}
                </h3>
                <p className={`italic-serif text-[1.02rem] mb-8 leading-snug relative ${isAccent ? "text-[#D4B27E]" : "text-[#5A6660]"}`}>
                  {pkg.positioning}
                </p>

                <div className={`h-px mb-8 ${isAccent ? "bg-[rgba(245,241,232,0.12)]" : "bg-[rgba(11,24,18,0.08)]"}`} />

                <span className={`font-mono text-[0.6rem] tracking-[0.22em] uppercase mb-3 relative ${isAccent ? "text-[#8B958F]" : "text-[#8B958F]"}`}>
                  Best for
                </span>
                <p className={`text-[0.92rem] leading-[1.65] mb-7 relative ${isAccent ? "text-[#B5BDB7]" : "text-[#5A6660]"}`}>
                  {pkg.bestFor}
                </p>

                <span className={`font-mono text-[0.6rem] tracking-[0.22em] uppercase mb-3 relative ${isAccent ? "text-[#8B958F]" : "text-[#8B958F]"}`}>
                  Includes
                </span>
                <ul className="flex flex-col gap-2 flex-1 mb-8 relative">
                  {pkg.products.map((product) => (
                    <li key={product.slug} className="flex items-baseline gap-2.5">
                      <Check size={11} className={`shrink-0 mt-0.5 ${isAccent ? "text-[#D4B27E]" : "text-[#1B4D3E]"}`} strokeWidth={2.5} />
                      <span className={`text-[0.9rem] ${isAccent ? "text-[#ECE7DD]" : "text-[#0B1812]"}`}>{product.name}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`group inline-flex items-center justify-between w-full pt-5 border-t text-[0.9rem] font-medium transition-colors duration-500 relative ${
                    isAccent
                      ? "text-[#F5F1E8] hover:text-[#D4B27E] border-[rgba(245,241,232,0.12)]"
                      : "text-[#0B1812] hover:text-[#1B4D3E] border-[rgba(11,24,18,0.08)]"
                  }`}
                >
                  Begin engagement
                  <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.article>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-center text-[#8B958F] text-[0.84rem] mt-10"
        >
          Every engagement is scoped privately.{" "}
          <Link href="/packages" className="text-[#1B4D3E] hover:text-[#0F3A2D] underline underline-offset-4 transition-colors duration-300 ml-1">
            Compare in detail →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
