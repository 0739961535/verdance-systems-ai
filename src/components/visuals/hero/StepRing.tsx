import { PROCESS } from "@/data/process";

/**
 * StepRing - where this step sits in the six: a ring of six arcs with the
 * current one lit, the step in the middle, and what you leave with.
 */
export function StepRing({ index, deliverable }: { index: number; deliverable: string }) {
  const n = PROCESS.length;
  const r = 84;
  const c = 2 * Math.PI * r;
  const gap = 10;
  const seg = c / n - gap;
  return (
    <div className="mx-auto flex max-w-[30rem] flex-col items-center gap-6" aria-hidden>
      <div className="relative aspect-square w-[min(19rem,78vw)]">
        <div className="absolute inset-[18%] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(var(--accent-glow-rgb),0.35), transparent)" }} />
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90">
          {PROCESS.map((s, i) => (
            <circle
              key={s.slug}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              strokeLinecap="round"
              strokeWidth={i === index ? 7 : 4}
              stroke={i < index ? "rgba(var(--accent-rgb),0.55)" : i === index ? "rgb(var(--accent-bright-rgb))" : "rgba(var(--hairline-rgb),0.14)"}
              strokeDasharray={`${seg} ${c - seg}`}
              strokeDashoffset={-(i * (c / n))}
              className={i === index ? "ring-current" : undefined}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
            Step {PROCESS[index].n} of {String(n).padStart(2, "0")}
          </span>
          <span className="mt-2 font-display text-[2rem] leading-none text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.03em" }}>
            {PROCESS[index].name}
          </span>
        </div>
      </div>
      <div className="card-x is-accent w-full p-5">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">You leave this step with</p>
        <p className="mt-2 text-[0.98rem] leading-[1.55] text-[color:var(--color-ink)]">{deliverable}</p>
      </div>
    </div>
  );
}
