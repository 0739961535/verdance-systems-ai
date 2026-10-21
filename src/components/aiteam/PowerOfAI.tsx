import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SplitWords } from "@/components/primitives/Reveal";
import { AI_TEAM_PATH, CTA_LABEL, CTA_MICRO, MOMENTS, POWER } from "@/data/aiTeam";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { MomentCard } from "./MomentCard";
import m from "./moments.module.css";

/**
 * Four "Before / With Verdance" moments: an enquiry after hours, a quote follow-up,
 * the Monday admin pile and a month-end decision.
 * variant="full": the moment cards with timelines (Operations Team page).
 * variant="short": compact clock pairs plus a link card to the Operations Team page
 * (homepage and /services).
 */
export function PowerOfAI({ variant = "full" }: { variant?: "full" | "short" }) {
  const full = variant === "full";
  return (
    <section
      className={`section-pad ${full ? "bg-canvas-2" : "bg-canvas"}`}
      aria-labelledby="power-title"
      style={{ borderTop: "1px solid var(--hairline)" }}
    >
      <div className={full ? "container-narrow" : "container-wide"}>
        <Reveal variant="wipe" className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">{POWER.eyebrow}</p>
            <h2 id="power-title" className="h2 mt-5 max-w-[20ch]">
              <SplitWords text="Same moment. A" />{" "}
              <span className="italic-accent">
                <SplitWords text="different" start={3} />
              </span>{" "}
              <SplitWords text="ending." start={4} />
            </h2>
          </div>
          <p className="max-w-[26rem] text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{POWER.intro}</p>
        </Reveal>

        {!full && (
          <Reveal delay={0.05} className="mt-10 md:mt-12">
            <Link
              href={AI_TEAM_PATH}
              className="group flex flex-col gap-5 rounded-[22px] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
              style={{ background: "var(--bg-3)", border: "1px solid var(--hairline-glow)" }}
            >
              <span>
                <span className="block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[color:var(--color-accent)]">Operations Team</span>
                <span
                  className="mt-2 block font-display text-[clamp(1.5rem,1.5vw+1rem,2.25rem)] text-[color:var(--color-ink)]"
                  style={{ letterSpacing: "-0.035em", lineHeight: 1.1 }}
                >
                  A private team that runs the business alongside you
                </span>
                <span className="mt-2 block max-w-xl text-[0.98rem] leading-[1.55] text-[color:var(--color-ink-soft)]">
                  It answers, chases and clears the admin. You choose what goes out on its own, and anything important waits for you.
                </span>
              </span>
              <span className="inline-flex min-h-11 shrink-0 items-center gap-2 font-medium text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent)]">
                See how it works <ArrowUpRight size={16} aria-hidden />
              </span>
            </Link>
          </Reveal>
        )}

        {full ? (
          <ol className={`${m.list} mt-10 md:mt-14`}>
            {MOMENTS.map((mo, i) => (
              <li key={mo.title}>
                <MomentCard moment={mo} index={i} />
              </li>
            ))}
          </ol>
        ) : (
          <ol className={`${m.compactList} mt-6 md:mt-8`}>
            {MOMENTS.map((mo, i) => (
              <li key={mo.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <article className={`${m.card} ${m.compact}`}>
                    <header className={m.head}>
                      <span>{mo.stamp}</span>
                    </header>
                    <h3 className={m.title}>{mo.title}</h3>
                    <div className={m.pairClocks}>
                      <div className={m.col} data-side="before">
                        <span className={m.colLabel}>Before</span>
                        <p className={m.clock}>
                          <span className={m.clockNum}>{mo.before.clock}</span>
                        </p>
                      </div>
                      <div className={m.col} data-side="after">
                        <span className={m.colLabel}>With Verdance</span>
                        <p className={m.clock}>
                          <span className={m.clockNum}>{mo.after.clock}</span>
                        </p>
                      </div>
                    </div>
                    <footer className={m.foot}>
                      <p className={m.delta}>{mo.delta}</p>
                      <p className={m.note}>Illustrative scenario</p>
                    </footer>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        )}

        {full && (
          <div className="mt-[var(--space-cta)] flex flex-col items-start gap-3">
            <a href={GENERIC_BOOK_URL} className="btn btn-ghost min-h-[52px] w-full justify-center px-6 sm:w-auto">
              {CTA_LABEL}
              <ArrowUpRight size={16} aria-hidden />
            </a>
            <p className="font-mono text-[0.75rem] text-[color:var(--color-ink-muted)]">{CTA_MICRO}</p>
          </div>
        )}
      </div>
    </section>
  );
}
