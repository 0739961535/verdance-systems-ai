"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Megaphone, MessageCircle, Settings2, Workflow, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { PILLARS, type Pillar } from "@/data/landing";

/**
 * PillarGrid - the four-pillar service architecture. Cards read like
 * labelled modules in a rack; tapping one expands its catalogue in
 * place (grid-template-rows 0fr -> 1fr, transform-free). One pillar
 * open at a time keeps the section calm.
 */

const ICONS = {
  "megaphone": Megaphone,
  "message-circle": MessageCircle,
  "settings-2": Settings2,
  "workflow": Workflow,
} as const;

function PillarCard({ pillar, open, onToggle }: { pillar: Pillar; open: boolean; onToggle: () => void }) {
  const Icon = ICONS[pillar.icon];
  return (
    <div
      className="surface surface-card-hover overflow-hidden"
      style={{
        borderRadius: 20,
        border: `1px solid ${open ? "var(--hairline-glow)" : "var(--hairline)"}`,
        transition: "border-color 0.2s var(--ease-luxury)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`pillar-panel-${pillar.slug}`}
        className="w-full text-left px-5 py-5 md:px-7 md:py-6 cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className="font-mono text-[color:var(--color-ink-faint)]"
            style={{ fontSize: "clamp(1.5rem, 2vw + 1rem, 2.25rem)", fontVariantNumeric: "tabular-nums" }}
          >
            {pillar.index}
          </span>
          <ChevronDown
            size={18}
            aria-hidden
            className="mt-2 shrink-0 text-[color:var(--color-ink-muted)]"
            style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s var(--ease-luxury)" }}
          />
        </div>
        <Icon size={20} strokeWidth={1.5} aria-hidden className="mt-3 text-[color:var(--color-accent)]" />
        <h3 className="font-display text-[color:var(--color-ink)] mt-3" style={{ fontSize: "clamp(1.35rem, 1.2vw + 1.05rem, 1.75rem)", lineHeight: 1.15 }}>
          {pillar.name}
        </h3>
        <p className="mt-2 text-[0.9rem] leading-[1.5] text-[color:var(--color-ink-soft)]">
          {pillar.promise}
        </p>
        <p className="mt-4 font-mono text-[0.68rem] tracking-[0.1em] text-[color:var(--color-ink-muted)]">
          {pillar.capabilities.join(" · ")}
        </p>
      </button>

      {/* catalogue - expands in place */}
      <div
        id={`pillar-panel-${pillar.slug}`}
        className="grid"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.3s var(--ease-luxury)",
        }}
      >
        <div className="overflow-hidden">
          <ul style={{ borderTop: "1px solid var(--hairline)" }}>
            {pillar.offers.map((o) => (
              <li key={o.name} style={{ borderBottom: "1px solid var(--hairline)" }}>
                <Link
                  href={o.href}
                  className="flex items-center justify-between gap-3 px-5 py-3.5 md:px-7 min-h-14 group"
                  style={{ transition: "background-color 0.15s var(--ease-luxury)" }}
                >
                  <span>
                    <span className="block text-[0.9rem] font-medium text-[color:var(--color-ink)]">{o.name}</span>
                    <span className="block text-[0.78rem] text-[color:var(--color-ink-muted)]">{o.outcome}</span>
                  </span>
                  <ArrowUpRight size={14} aria-hidden className="shrink-0 text-[color:var(--color-ink-muted)] group-hover:text-[color:var(--color-accent)]" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-5 py-4 md:px-7">
            <Link href={pillar.href} className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
              View {pillar.name.toLowerCase()} systems →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PillarGrid() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <section className="section-pad bg-canvas" aria-labelledby="pillars-title">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">What we build</span>
          <h2
            id="pillars-title"
            className="font-display text-[color:var(--color-ink)] mt-4 max-w-[20ch]"
            style={{ fontSize: "clamp(1.9rem, 3.2vw + 1.2rem, 3.5rem)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
          >
            Four pillars. One <span className="italic-accent">connected</span> system.
          </h2>
          <p className="mt-5 max-w-xl text-[color:var(--color-ink-soft)]" style={{ lineHeight: 1.6 }}>
            Every system we ship lives in one of four pillars, and they are built to work together. Open a pillar to see what&apos;s inside.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4 items-start">
          {PILLARS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <PillarCard
                pillar={p}
                open={openSlug === p.slug}
                onToggle={() => setOpenSlug(openSlug === p.slug ? null : p.slug)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
