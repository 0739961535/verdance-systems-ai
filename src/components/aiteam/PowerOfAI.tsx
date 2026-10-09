import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { AI_TEAM_PATH, POWER } from "@/data/aiTeam";

/**
 * "The true power of AI" - four before/after moments. Full on the AI team
 * page; the short version leads with the Ashford's Staff card (homepage,
 * services page).
 */
export function PowerOfAI({ variant = "full" }: { variant?: "full" | "short" }) {
  const examples = variant === "full" ? POWER.examples : POWER.examples;
  return (
    <section className="section-pad bg-canvas" aria-labelledby="power-title" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container-wide">
        <Reveal variant="wipe" className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">{POWER.title}</p>
            <h2 id="power-title" className="h2 mt-5">
              Not a chatbot. <span className="italic-accent">Staff that never sleeps.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{POWER.intro}</p>
        </Reveal>

        {variant === "short" && (
          <Reveal delay={0.05} className="mt-10 md:mt-12">
            <Link
              href={AI_TEAM_PATH}
              className="sheen group flex flex-col gap-5 rounded-[24px] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
              data-tilt="3"
              style={{ background: "radial-gradient(120% 140% at 0% 0%, rgba(var(--accent-rgb),0.16), transparent 55%), var(--bg-2)", border: "1px solid rgba(var(--accent-rgb),0.3)" }}
            >
              <span>
                <span className="block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[color:var(--color-accent)]">New service</span>
                <span className="mt-2 block font-display text-[clamp(1.5rem,1.5vw+1rem,2.25rem)] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.035em", lineHeight: 1.1 }}>
                  Ashford&apos;s Staff
                </span>
                <span className="mt-2 block max-w-xl text-[0.98rem] leading-[1.55] text-[color:var(--color-ink-soft)]">
                  Your private AI operations team. Agents that run the day-to-day alongside you, with a live command centre. You approve anything that goes out.
                </span>
              </span>
              <span className="inline-flex min-h-11 shrink-0 items-center gap-2 font-medium text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent)]">
                See how it works <ArrowUpRight size={16} aria-hidden />
              </span>
            </Link>
          </Reveal>
        )}

        <ol className={`mt-12 grid gap-4 md:mt-16 ${variant === "full" ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-4"}`}>
          {examples.map((e, i) => (
            <li key={e.title}>
              <Reveal delay={i * 0.06} className="h-full">
                <div className="sheen glass-panel g-border flex h-full flex-col" data-tilt="4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[0.75rem] tracking-[0.12em] text-[color:var(--color-accent)] tabular">{e.moment}</span>
                    <span className="font-mono text-[0.7rem] text-[color:var(--color-ink-muted)] tabular">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-4 font-display text-[1.35rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                    {e.title}
                  </h3>
                  <div className="mt-5 grid flex-1 content-start gap-3">
                    <p className="text-[0.95rem] leading-[1.55] text-[color:var(--color-ink-muted)]">
                      <span className="mr-2 font-mono text-[0.65rem] uppercase tracking-[0.14em]">Before</span>
                      <span className="line-through decoration-[rgba(var(--hairline-rgb),0.35)]">{e.before}</span>
                    </p>
                    <p className="text-[0.98rem] leading-[1.55] text-[color:var(--color-ink)]">
                      <span className="mr-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[color:var(--color-accent)]">With AI</span>
                      {e.after}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
