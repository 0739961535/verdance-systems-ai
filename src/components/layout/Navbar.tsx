"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VSAILogo } from "@/components/primitives/VSAILogo";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { ThemeToggle } from "@/components/primitives/ThemeToggle";
import { NAV_ITEMS, SITE } from "@/data/site";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`enter-drop fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
      style={{
        background: scrolled ? "rgba(var(--bg-rgb),0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(var(--hairline-rgb),0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="container-wide flex items-center justify-between gap-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-3"
          aria-label="Verdance Systems AI — home"
        >
          <VSAILogo size={34} withWordmark={false} />
          <span className="hidden sm:inline-flex flex-col leading-none">
            <span className="font-display text-[15px] font-medium tracking-tight text-[color:var(--color-ink)]">
              Verdance
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
              Systems AI
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((it) => {
            const active = pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`relative inline-flex items-center px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? "text-[color:var(--color-ink)]"
                    : "text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full border"
                    style={{
                      background: "rgba(var(--accent-rgb),0.06)",
                      borderColor: "rgba(var(--accent-rgb),0.22)",
                    }}
                    transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                  />
                )}
                <span className="relative">{it.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href={SITE.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all"
            style={{
              borderColor: "rgba(var(--accent-rgb),0.30)",
              color: "var(--color-accent)",
              background: "rgba(var(--accent-rgb),0.04)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
              <path d="M16 4C9.4 4 4 9.4 4 16c0 2.1.5 4.2 1.6 6L4 28l6.1-1.6c1.7 1 3.7 1.5 5.9 1.5 6.6 0 12-5.4 12-12S22.6 4 16 4z" />
            </svg>
            WhatsApp
          </a>
          <MagneticButton href="/contact" variant="accent">
            Book a consult
          </MagneticButton>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border"
            style={{ borderColor: "var(--color-hairline-2)" }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="relative block h-0.5 w-5 bg-[color:var(--color-ink)]">
              <span
                className={`absolute left-0 right-0 block h-0.5 bg-[color:var(--color-ink)] transition-transform ${
                  open ? "translate-y-0 rotate-90" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute left-0 right-0 block h-0.5 bg-[color:var(--color-ink)] transition-opacity ${
                  open ? "opacity-0" : "translate-y-1.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-3 mx-4 surface p-4 flex flex-col gap-1.5">
          {NAV_ITEMS.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[color:var(--color-ink)] hover:bg-[color:var(--surface-tint-2)]"
            >
              {it.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2">
            <a
              href={SITE.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline flex-1 text-sm py-3"
            >
              WhatsApp
            </a>
            <Link href="/contact" className="btn btn-accent flex-1 text-sm py-3">
              Book a consult
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
