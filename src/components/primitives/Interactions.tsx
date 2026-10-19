"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Interactions - one small controller for the site's pointer and scroll
 * polish, driven by data attributes so the components that use it stay
 * server-rendered:
 *
 *   data-tilt[="6"]      perspective tilt toward the pointer (max degrees),
 *                        and --mx / --my for a light sheen that follows it
 *   data-magnetic        primary buttons lean toward the pointer, with
 *                        inertia, and their icon leans a little further
 *   data-parallax="0.08" gentle vertical parallax while scrolling
 *
 * Plus a short page transition on client-side navigation (not first load).
 *
 * All of it is off for touch / coarse pointers and reduced motion, and
 * parallax is desktop-width only. Transforms only, no layout work.
 */
/** Magnetic buttons are off (design review, Oct 2026); flip to bring them back. */
const MAGNETIC = false as boolean;

export function Interactions() {
  const pathname = usePathname();
  const first = useRef(true);

  // Route transition (Web Animations API, transform + opacity, 420ms).
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.querySelector("main");
    main?.animate(
      [
        { opacity: 0, transform: "translate3d(0, 14px, 0)", filter: "blur(4px)" },
        { opacity: 1, transform: "none", filter: "blur(0)" },
      ],
      { duration: 480, easing: "cubic-bezier(0.19, 1, 0.22, 1)" },
    );
    // A hairline of accent light sweeps across the top as the new page lands.
    let line = document.querySelector<HTMLElement>(".route-line");
    if (!line) {
      line = document.createElement("div");
      line.className = "route-line";
      line.setAttribute("aria-hidden", "true");
      document.body.appendChild(line);
    }
    line.animate(
      [
        { transform: "scaleX(0)", opacity: 1, transformOrigin: "0 50%" },
        { transform: "scaleX(1)", opacity: 1, transformOrigin: "0 50%", offset: 0.7 },
        { transform: "scaleX(1)", opacity: 0, transformOrigin: "0 50%" },
      ],
      { duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    );
  }, [pathname]);

  // Tilt + magnetic (fine pointer only).
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let tiltEl: HTMLElement | null = null;
    let magEl: HTMLElement | null = null;

    // Magnetic buttons ease toward their target with a little inertia
    // (critically damped lerp on rAF), and the icon inside leans a touch
    // further than the button for depth. Transform only.
    type Mag = { x: number; y: number; tx: number; ty: number };
    const mags = new Map<HTMLElement, Mag>();
    let magRaf = 0;
    const magLoop = () => {
      magRaf = 0;
      let moving = false;
      for (const [el, m] of mags) {
        m.x += (m.tx - m.x) * 0.16;
        m.y += (m.ty - m.y) * 0.16;
        const settled = Math.abs(m.tx - m.x) < 0.05 && Math.abs(m.ty - m.y) < 0.05;
        if (settled) {
          m.x = m.tx;
          m.y = m.ty;
        } else moving = true;
        if (settled && m.tx === 0 && m.ty === 0) {
          el.style.transform = "";
          el.style.removeProperty("--mag-x");
          el.style.removeProperty("--mag-y");
          el.classList.remove("mag-on");
          mags.delete(el);
          continue;
        }
        el.style.transform = `translate3d(${m.x.toFixed(2)}px, ${m.y.toFixed(2)}px, 0)`;
        el.style.setProperty("--mag-x", `${(m.x * 0.45).toFixed(2)}px`);
        el.style.setProperty("--mag-y", `${(m.y * 0.45).toFixed(2)}px`);
      }
      if (moving) magRaf = requestAnimationFrame(magLoop);
    };
    const pull = (el: HTMLElement, tx: number, ty: number) => {
      let m = mags.get(el);
      if (!m) {
        m = { x: 0, y: 0, tx: 0, ty: 0 };
        mags.set(el, m);
        el.classList.add("mag-on");
      }
      m.tx = tx;
      m.ty = ty;
      if (!magRaf) magRaf = requestAnimationFrame(magLoop);
    };

    const resetTilt = (el: HTMLElement) => {
      el.style.transform = "";
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    };

    const onMove = (e: PointerEvent) => {
      const t = e.target as Element | null;
      // Spotlight only (no tilt): cards with .card-x follow the pointer.
      const spot = t?.closest<HTMLElement>(".card-x:not([data-tilt]), [data-spotlight]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        spot.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      }
      const tilt = t?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (tiltEl && tiltEl !== tilt) resetTilt(tiltEl);
      tiltEl = tilt;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const max = Number(tilt.dataset.tilt) || 6;
        tilt.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`;
        tilt.style.setProperty("--mx", `${px * 100}%`);
        tilt.style.setProperty("--my", `${py * 100}%`);
      }

      // magnetic buttons retired (design review, Oct 2026): buttons stay put
      const mag = MAGNETIC ? (t?.closest<HTMLElement>("[data-magnetic]") ?? null) : null;
      if (magEl && magEl !== mag) pull(magEl, 0, 0);
      magEl = mag;
      if (mag) {
        const r = mag.getBoundingClientRect();
        // measure against the resting position, not the pulled one
        const m = mags.get(mag);
        const cx = r.left - (m?.x ?? 0) + r.width / 2;
        const cy = r.top - (m?.y ?? 0) + r.height / 2;
        pull(mag, (e.clientX - cx) * 0.22, (e.clientY - cy) * 0.32);
      }
    };
    const onLeaveDoc = () => {
      if (tiltEl) resetTilt(tiltEl);
      if (magEl) pull(magEl, 0, 0);
      tiltEl = magEl = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveDoc);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveDoc);
      cancelAnimationFrame(magRaf);
      for (const el of mags.keys()) {
        el.style.transform = "";
        el.classList.remove("mag-on");
      }
      mags.clear();
    };
  }, []);

  // Parallax (desktop width, no reduced motion). Re-scans per route.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 1024) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!els.length) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const f = Number(el.dataset.parallax) || 0.06;
        const offset = (r.top + r.height / 2 - vh / 2) * -f;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      els.forEach((el) => (el.style.transform = ""));
    };
  }, [pathname]);

  return null;
}
