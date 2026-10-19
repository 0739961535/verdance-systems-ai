"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE } from "@/data/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * StickyMobileCTA - bottom action bar, mobile only. Appears after the
 * hero's own CTAs scroll away; hides while the audit section (whose
 * calendar it points at) or the footer is on screen, and while the pinned
 * rocket flight fills the screen (its Orbit step has its own button). Fixed + transform
 * only, so it can never cause layout shift.
 */
interface StickyMobileCTAProps {
  href?: string;
  label?: string;
}

export function StickyMobileCTA({ href = "/contact", label = "Book a Meeting" }: StickyMobileCTAProps = {}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let heroGone = false;
    let auditVisible = false;
    let footerVisible = false;
    let flightVisible = false;

    const update = () => {
      const on = heroGone && !auditVisible && !footerVisible && !flightVisible;
      setShow(on);
      // one thing at the bottom of a phone screen: the chat bubble hides while the bar shows (CSS)
      document.documentElement.toggleAttribute("data-sticky-bar", on);
    };

    const hero = document.querySelector("section"); // first section = hero
    const audit = document.getElementById("audit");
    const footer = document.querySelector("footer");

    const ios: IntersectionObserver[] = [];
    if (hero) {
      const io = new IntersectionObserver(([e]) => { heroGone = !e.isIntersecting; update(); }, { threshold: 0.15 });
      io.observe(hero); ios.push(io);
    }
    if (audit) {
      const io = new IntersectionObserver(([e]) => { auditVisible = e.isIntersecting; update(); }, { threshold: 0.05 });
      io.observe(audit); ios.push(io);
    }
    if (footer) {
      const io = new IntersectionObserver(([e]) => { footerVisible = e.isIntersecting; update(); }, { threshold: 0.05 });
      io.observe(footer); ios.push(io);
    }
    const flight = document.querySelector(".fl");
    if (flight) {
      const io = new IntersectionObserver(([e]) => { flightVisible = e.isIntersecting; update(); }, { rootMargin: "-30% 0px -30% 0px" });
      io.observe(flight); ios.push(io);
    }
    return () => {
      ios.forEach((io) => io.disconnect());
      document.documentElement.removeAttribute("data-sticky-bar");
    };
  }, []);

  return (
    <nav
      aria-label="Quick actions"
      data-cta-location="sticky_mobile"
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        background: "var(--bg-glass)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid var(--hairline-2)",
        transform: show ? "translateY(0)" : "translateY(110%)",
        transition: "transform 0.3s var(--ease-luxury)",
      }}
    >
      <div className="flex items-center gap-2 px-4 py-3">
        {href.startsWith("http") ? (
          <a href={href} className="btn btn-accent min-w-0 flex-1 justify-center whitespace-nowrap min-h-12 px-4 text-[0.92rem]" style={{ whiteSpace: "nowrap", paddingInline: 14 }}>
            {label}
          </a>
        ) : (
          <Link href={href} className="btn btn-accent min-w-0 flex-1 justify-center whitespace-nowrap min-h-12 px-4 text-[0.92rem]" style={{ whiteSpace: "nowrap", paddingInline: 14 }}>
            {label}
          </Link>
        )}
        <a
          href={SITE.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-1.5 rounded-full px-3.5 text-[0.9rem] font-medium text-[color:var(--color-ink)]"
          style={{ border: "1px solid var(--hairline-2)" }}
        >
          <WhatsAppIcon className="h-4 w-4 text-[color:var(--color-accent)]" />
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
