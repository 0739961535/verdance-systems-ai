"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Phone } from "./Phone";

export interface StoryStep {
  id: string;
  /** Status-bar clock while this step is on screen. */
  clock: string;
  /** The words for this step (left column on desktop). */
  content: ReactNode;
  /** What the phone shows for this step. Must fill the screen (absolute). */
  screen: ReactNode;
}

/**
 * StickyStory - words scroll, one phone stays put and changes per step.
 *
 * Desktop (lg+): a CSS sticky phone beside the steps; an IntersectionObserver
 * picks the step crossing the middle of the viewport. No pinning, no scroll
 * hijacking: the page scrolls natively and nothing is held hostage.
 *
 * Phones and tablets: a simple stacked layout. Each step is followed by its
 * own small, static phone, so nothing is pinned over the text.
 *
 * Without JavaScript the desktop phone shows the first step, and the stacked
 * phones are all there.
 */
export function StickyStory({
  steps,
  caption = "Sample, for illustration",
  side = "right",
}: {
  steps: StoryStep[];
  caption?: string;
  side?: "left" | "right";
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.step);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const phoneCol = (
    <div className="hidden lg:block">
      <div className="sticky flex flex-col items-center" style={{ top: "max(6rem, calc(50vh - 22rem))" }}>
        <div aria-hidden>
          <Phone clock={steps[active]?.clock}>
            {steps.map((s, i) => (
              <div
                key={s.id}
                className="absolute inset-0"
                style={{
                  opacity: i === active ? 1 : 0,
                  transition: "opacity 0.5s var(--ease-luxury)",
                  zIndex: i === active ? 2 : 1,
                }}
              >
                {s.screen}
              </div>
            ))}
          </Phone>
        </div>
        <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
          {caption}
        </p>
      </div>
    </div>
  );

  return (
    <div className={`mx-auto grid max-w-[1120px] gap-12 lg:gap-24 ${side === "right" ? "lg:grid-cols-[1fr_auto]" : "lg:grid-cols-[auto_1fr]"}`}>
      {side === "left" && phoneCol}
      <ol className="min-w-0">
        {steps.map((s, i) => (
          <li
            key={s.id}
            ref={(el) => {
              refs.current[i] = el as HTMLDivElement | null;
            }}
            data-step={i}
            className="flex flex-col justify-center py-10 lg:min-h-[72vh] lg:py-0"
            style={{
              opacity: 1,
              transition: "opacity 0.4s var(--ease-luxury)",
            }}
          >
            <div className={`lg:transition-opacity lg:duration-500 ${i === active ? "" : "lg:opacity-40"}`}>{s.content}</div>
            {/* stacked phone for small screens */}
            <div className="mt-8 flex justify-center lg:hidden" aria-hidden>
              <Phone clock={s.clock} size="xs">
                {s.screen}
              </Phone>
            </div>
          </li>
        ))}
      </ol>
      {side === "right" && phoneCol}
    </div>
  );
}
