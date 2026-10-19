"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Previous / Next buttons for the "Our work" scroller (desktop only).
 * Each press scrolls by one slide. Smooth unless the visitor asks for reduced motion.
 */
export function OurWorkSliderNav({ targetId }: { targetId: string }) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  const go = (dir: 1 | -1) => {
    const el = document.getElementById(targetId);
    const slide = el?.querySelector<HTMLElement>("[data-slide]");
    if (!el || !slide) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (slide.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  const btn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--hairline-3)] text-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--surface-tint-3)] disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]";

  return (
    <div className="hidden items-center gap-2 md:flex">
      <button type="button" className={btn} onClick={() => go(-1)} disabled={atStart} aria-controls={targetId} aria-label="Previous slide">
        <ArrowLeft size={18} aria-hidden />
      </button>
      <button type="button" className={btn} onClick={() => go(1)} disabled={atEnd} aria-controls={targetId} aria-label="Next slide">
        <ArrowRight size={18} aria-hidden />
      </button>
    </div>
  );
}
