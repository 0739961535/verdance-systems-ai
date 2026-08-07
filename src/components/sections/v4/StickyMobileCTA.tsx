"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE } from "@/data/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * StickyMobileCTA - bottom action bar, mobile only. Appears after the
 * hero's own CTAs scroll away; hides while the audit section (whose
 * calendar it points at) or the footer is on screen. Fixed + transform
 * only, so it can never cause layout shift.
 */
export function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let heroGone = false;
    let auditVisible = false;
    let footerVisible = false;

    const update = () => setShow(heroGone && !auditVisible && !footerVisible);

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
    return () => ios.forEach((io) => io.disconnect());
  }, []);

  return (
    <nav
      aria-label="Quick actions"
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
        <Link href="#audit" className="btn btn-accent flex-1 justify-center min-h-12 text-[0.95rem]">
          Book audit
        </Link>
        <a
          href={SITE.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex items-center justify-center w-12 h-12 rounded-full text-[color:var(--color-accent)]"
          style={{ border: "1px solid var(--hairline-2)" }}
        >
          <WhatsAppIcon className="w-5 h-5" />
        </a>
      </div>
    </nav>
  );
}
