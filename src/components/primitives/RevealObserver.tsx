"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * RevealObserver - drives every [data-reveal] element on the page.
 *
 * Content is visible by default. An element is only ever hidden after this
 * script has "armed" it, and it only arms elements that are below the fold
 * at that moment, so nothing on screen can flicker out and nothing is hidden
 * when JavaScript fails. Armed elements are revealed by an
 * IntersectionObserver, with a scroll sweep as a backup in case the observer
 * misses one. Reduced-motion visitors are never armed.
 *
 * CSS: `[data-reveal][data-armed]:not([data-revealed])` in globals.css.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const vh = () => window.innerHeight || document.documentElement.clientHeight;
    const reachable = (el: Element) => el.getBoundingClientRect().top < vh() * 0.96;

    const show = (el: Element) => el.setAttribute("data-revealed", "");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );

    const arm = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-armed]):not([data-revealed])")
        .forEach((el) => {
          if (reachable(el)) {
            show(el); // already on screen (or scrolled past): leave it visible
          } else {
            el.setAttribute("data-armed", "");
            io.observe(el);
          }
        });
    };
    arm();

    // Backup sweep: anything armed that is now in or above view gets shown.
    let ticking = false;
    const sweep = () => {
      ticking = false;
      document
        .querySelectorAll<HTMLElement>("[data-armed]:not([data-revealed])")
        .forEach((el) => {
          if (reachable(el)) show(el);
        });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(sweep);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Client components that mount later.
    let moQueued = false;
    const mo = new MutationObserver(() => {
      if (moQueued) return;
      moQueued = true;
      requestAnimationFrame(() => {
        moQueued = false;
        arm();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}
