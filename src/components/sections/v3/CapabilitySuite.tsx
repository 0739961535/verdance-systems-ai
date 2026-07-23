"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { motion } from "framer-motion";
import { CAPABILITY_SUITE } from "@/data/site";

export function CapabilitySuite() {
  return (
    <section className="relative section-pad bg-canvas">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">Capability suite</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 headline-section max-w-[18ch]">
            Twelve systems.{" "}
            <span className="italic-accent">One booking machine.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-[color:var(--color-ink-soft)]">
            Every capability built, run, and optimised by Verdance. Mix and match
            what fits your business.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITY_SUITE.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: (i % 6) * 0.04,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="group surface p-7 surface-card-hover"
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg font-mono text-xs font-medium"
                  style={{
                    background: "rgba(var(--accent-rgb),0.08)",
                    border: "1px solid rgba(var(--accent-rgb),0.25)",
                    color: "var(--color-accent)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-medium leading-tight text-[color:var(--color-ink)]">
                  {c.title}
                </h3>
              </div>
              <p className="mt-4 text-[color:var(--color-ink-soft)] text-[15px] leading-relaxed">
                {c.blurb}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
