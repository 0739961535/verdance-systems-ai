"use client";

import { useEffect, useRef } from "react";

/**
 * WebsitesScroll - the one scroll-linked moment of chapter 07.
 *
 * Renders nothing visible. It finds its parent <section> and scrolls every
 * screenshot marked `[data-ws-shot]` inside it with a transform:
 * - data-mode="stage": progress of the whole sticky section (desktop stage).
 * - data-mode="self": progress of the frame itself through the viewport (phone).
 * - data-speed: 1 by default, 1.2 for the phone so it runs a little ahead.
 *
 * One passive scroll listener, attached only while the section is on screen,
 * work batched into a single rAF. Transform only. Under prefers-reduced-motion
 * nothing runs and the screenshots stay at the top.
 */
export function WebsitesScroll() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shots = Array.from(section.querySelectorAll<HTMLElement>("[data-ws-shot]"));
    let raf = 0;
    let listening = false;
    let inView = false;

    const clamp = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const s = section.getBoundingClientRect();
      const stageP = clamp(-s.top / Math.max(1, s.height - vh));
      for (const frame of shots) {
        const img = frame.querySelector<HTMLElement>("[data-ws-img]");
        if (!img || frame.offsetParent === null) continue; // hidden at this width
        const travel = img.offsetHeight - frame.clientHeight;
        if (travel <= 0) continue;
        let p = stageP;
        if (frame.dataset.mode === "self") {
          const r = frame.getBoundingClientRect();
          // From the frame's top at 75% of the screen to its bottom at 25%.
          p = clamp((vh * 0.75 - r.top) / (vh * 0.5 + r.height));
        }
        const speed = Number(frame.dataset.speed || 1);
        const y = Math.min(1, p * speed) * travel;
        img.style.transform = `translate3d(0, ${-y.toFixed(1)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const attach = () => {
      if (listening || media.matches) return;
      listening = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      onScroll();
    };
    const detach = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const reset = () => {
      for (const frame of shots) {
        const img = frame.querySelector<HTMLElement>("[data-ws-img]");
        if (img) img.style.transform = "";
      }
    };

    const io = new IntersectionObserver((entries) => {
      inView = entries.some((e) => e.isIntersecting);
      if (inView) attach();
      else detach();
    });
    io.observe(section);

    const onMotionPref = () => {
      if (media.matches) {
        detach();
        reset();
      } else if (inView) {
        attach();
      }
    };
    media.addEventListener("change", onMotionPref);

    return () => {
      io.disconnect();
      media.removeEventListener("change", onMotionPref);
      detach();
    };
  }, []);

  return <span ref={ref} hidden aria-hidden />;
}
