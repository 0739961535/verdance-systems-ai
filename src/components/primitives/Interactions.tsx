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
 *   data-magnetic        primary buttons lean toward the pointer
 *   data-parallax="0.08" gentle vertical parallax while scrolling
 *   data-scroll-tilt     sets --orbit-tilt as the element scrolls into view
 *
 * Plus a short page transition on client-side navigation (not first load).
 *
 * All of it is off for touch / coarse pointers and reduced motion, and
 * parallax is desktop-width only. Transforms only, no layout work.
 */
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
        { opacity: 0, transform: "translate3d(0, 14px, 0)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 420, easing: "cubic-bezier(0.19, 1, 0.22, 1)" },
    );
  }, [pathname]);

  // Tilt + magnetic (fine pointer only).
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let tiltEl: HTMLElement | null = null;
    let magEl: HTMLElement | null = null;

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

      const mag = t?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (magEl && magEl !== mag) magEl.style.transform = "";
      magEl = mag;
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.2;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        mag.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
    };
    const onLeaveDoc = () => {
      if (tiltEl) resetTilt(tiltEl);
      if (magEl) magEl.style.transform = "";
      tiltEl = magEl = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveDoc);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveDoc);
    };
  }, []);

  // Parallax (desktop width, no reduced motion). Re-scans per route.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 1024) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const tilts = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-tilt]"));
    if (!els.length && !tilts.length) return;
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
      // Scroll tilt: the plane lies back as it enters and settles near flat
      // at the middle of the screen.
      for (const el of tilts) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const p = Math.min(1, Math.max(0, (vh - (r.top + r.height / 2)) / (vh / 2)));
        el.style.setProperty("--orbit-tilt", `${(26 - p * 20).toFixed(1)}deg`);
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
      tilts.forEach((el) => el.style.removeProperty("--orbit-tilt"));
    };
  }, [pathname]);

  return null;
}
