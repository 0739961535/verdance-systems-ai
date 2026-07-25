"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { HOW_IT_WORKS_STEPS } from "@/data/site";
import { ConicBorder } from "@/components/primitives/ConicBorder";

export function ProcessPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  // Decide layout on the client: pin + scrub only on desktop with motion
  // allowed. Mobile / reduced-motion get a clean vertical stack - no
  // scroll-jacking, which the UX guidelines flag as nausea-inducing.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPinned(wide.matches && !reduce.matches);
    update();
    wide.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useLayoutEffect(() => {
    if (!pinned) return;

    let ctx: { revert: () => void } | undefined;
    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const steps = gsap.utils.toArray<HTMLElement>(".pp-step");
        const total = steps.length;

        gsap.set(steps, { opacity: 0, y: 30, pointerEvents: "none" });
        gsap.set(steps[0], { opacity: 1, y: 0, pointerEvents: "auto" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (total - 0.4)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        steps.forEach((step, i) => {
          if (i === 0) return;
          const base = (i - 1) * 1.5;
          tl.to(steps[i - 1], { opacity: 0, y: -30, pointerEvents: "none", duration: 0.6 }, base);
          tl.to(step, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.6 }, base + 0.6);
        });

        const bar = trackRef.current?.querySelector<HTMLDivElement>(".pp-bar");
        if (bar) {
          gsap.to(bar, {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight * (total - 0.4)}`,
              scrub: 0.6,
            },
          });
        }

        ScrollTrigger.refresh();
      }, containerRef);
    })();

    return () => {
      ctx?.revert();
    };
  }, [pinned]);

  return (
    <section
      ref={containerRef}
      className={`relative bg-ambient-soft overflow-hidden ${pinned ? "min-h-screen" : ""}`}
    >
      <div
        className={`container-wide section-pad relative flex flex-col ${pinned ? "h-screen" : ""}`}
      >
        <div className="flex items-start justify-between gap-8">
          <div>
            <span className="eyebrow">How it works</span>
            <h2 className="mt-4 headline-section max-w-[16ch]">
              Three steps. <span className="italic-accent">Then it runs.</span>
            </h2>
          </div>
          {pinned && (
            <div className="hidden md:flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                Scroll
              </span>
              <div
                ref={trackRef}
                className="relative h-1 w-32 rounded-full overflow-hidden"
                style={{ background: "rgba(var(--hairline-rgb),0.08)" }}
              >
                <div
                  className="pp-bar absolute inset-y-0 left-0 w-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-accent-deep), var(--color-accent))",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {pinned ? (
          <div className="relative flex-1 mt-12 grid place-items-center">
            {HOW_IT_WORKS_STEPS.map((s, i) => (
              <div
                key={s.n}
                className="pp-step absolute inset-0 grid md:grid-cols-2 gap-10 items-center"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <StepText s={s} />
                <StepVisual idx={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col gap-16 md:gap-24">
            {HOW_IT_WORKS_STEPS.map((s, i) => (
              <div
                key={s.n}
                className="grid md:grid-cols-2 gap-8 md:gap-10 items-center"
              >
                <StepText s={s} />
                <StepVisual idx={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StepText({ s }: { s: (typeof HOW_IT_WORKS_STEPS)[number] }) {
  return (
    <div>
      <div className="font-mono text-sm uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
        Step {s.n}
      </div>
      <h3 className="mt-5 font-display text-4xl md:text-6xl font-medium tracking-tight leading-[1.04] text-[color:var(--color-ink)]">
        {s.title}
      </h3>
      <p className="mt-6 max-w-lg text-lg md:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
        {s.body}
      </p>
    </div>
  );
}

function StepVisual({ idx }: { idx: number }) {
  if (idx === 0) {
    return (
      <div className="relative">
        <ConicBorder glow="#4F8DFF" duration={8} radius={18} surface="var(--color-bg-3)" border="rgba(var(--accent-rgb),0.18)" halo>
        <div className="p-7">
          <div className="eyebrow text-[10px]">Build phase · Free</div>
          <div className="mt-4 font-display text-2xl font-medium text-[color:var(--color-ink)]">
            Mapping your lead flow
          </div>
          <ul className="mt-6 space-y-3">
            {["Where leads enter", "Who handles them", "Where they drop off"].map((t, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-[color:var(--color-ink-soft)]"
              >
                <span
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium"
                  style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
                >
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        </ConicBorder>
      </div>
    );
  }
  if (idx === 1) {
    return (
      <div className="relative">
        <ConicBorder glow="#4F8DFF" duration={8} radius={18} surface="var(--color-bg-3)" border="rgba(var(--accent-rgb),0.18)" halo>
        <div className="p-7">
          <div className="eyebrow text-[10px]">Connecting</div>
          <div className="mt-4 font-display text-2xl font-medium text-[color:var(--color-ink)]">
            Live in a few days
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {["Phone", "Website", "Calendar"].map((t, i) => (
              <div
                key={i}
                className="rounded-xl border p-4 text-center"
                style={{
                  borderColor: "var(--color-hairline)",
                  background: "rgba(var(--hairline-rgb),0.02)",
                }}
              >
                <div
                  className="mx-auto h-10 w-10 rounded-full grid place-items-center text-xs"
                  style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
                >
                  ✓
                </div>
                <div className="mt-3 text-sm font-medium text-[color:var(--color-ink)]">{t}</div>
              </div>
            ))}
          </div>
        </div>
        </ConicBorder>
      </div>
    );
  }
  return (
    <div className="relative">
      <ConicBorder glow="#4F8DFF" duration={8} radius={18} surface="var(--color-bg-3)" border="rgba(var(--accent-rgb),0.18)" halo>
      <div className="p-7">
        <div className="eyebrow text-[10px]">24/7 live</div>
        <div className="mt-4 font-display text-2xl font-medium text-[color:var(--color-ink)]">
          Bookings rolling in
        </div>
        <div className="mt-6 space-y-2.5">
          {[
            { time: "07:42", name: "Sarah W. · Consultation" },
            { time: "11:08", name: "Mike D. · Quote" },
            { time: "19:21", name: "Amara N. · Booking" },
            { time: "23:57", name: "James P. · Callback" },
          ].map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border px-4 py-3"
              style={{
                borderColor: "var(--color-hairline)",
                background: "rgba(var(--hairline-rgb),0.02)",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M3 8.5l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm font-medium text-[color:var(--color-ink)]">{r.name}</span>
              </div>
              <span className="font-mono text-xs text-[color:var(--color-ink-muted)]">
                {r.time}
              </span>
            </div>
          ))}
        </div>
      </div>
      </ConicBorder>
    </div>
  );
}
