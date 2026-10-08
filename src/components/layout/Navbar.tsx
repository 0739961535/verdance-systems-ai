"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { VSAILogo } from "@/components/primitives/VSAILogo";
import { ThemeToggle } from "@/components/primitives/ThemeToggle";
import { NAV_ITEMS, SITE } from "@/data/site";
import { GENERIC_BOOK_URL, bookUrl } from "@/data/booking";

export type MegaMenuItem = { slug: string; name: string; number: string };
export type MegaMenuGroup = { title: string; items: MegaMenuItem[] };
export type MegaMenu = {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  base: string;
  items: MegaMenuItem[];
  /** When set, the dropdown renders one column per group (the four pillars). */
  groups?: MegaMenuGroup[];
  /** Optional highlighted link under the columns. */
  feature?: { href: string; label: string; note: string };
};
export type NicheLink = { slug: string; name: string; bookSlug: string };

/**
 * Menus and niche links are built on the server (see navMenus.ts) and passed
 * in, so the big data files never ship in the client bundle.
 */
export function Navbar({ menus, niches }: { menus: Record<string, MegaMenu>; niches: NicheLink[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // Book CTA: the niche's own pre-audit flow on a niche page, else the general one.
  const niche = niches.find((n) => pathname === `/industries/${n.slug}`);
  const bookHref = niche ? bookUrl(niche.bookSlug) : GENERIC_BOOK_URL;

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
          aria-label="Verdance Systems AI - home"
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

        <nav className="relative hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((it) => {
            const active = pathname === it.href;
            const menu = menus[it.href];
            const link = (
              <Link
                href={it.href}
                className={`relative inline-flex items-center px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? "text-[color:var(--color-ink)]"
                    : "text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)]"
                }`}
              >
                {active && (
                  <span
                    className="absolute inset-0 rounded-full border"
                    style={{
                      background: "rgba(var(--accent-rgb),0.06)",
                      borderColor: "rgba(var(--accent-rgb),0.22)",
                    }}
                  />
                )}
                <span className="relative">{it.label}</span>
              </Link>
            );

            if (!menu) {
              return <span key={it.href}>{link}</span>;
            }

            const isOpen = openMenu === it.href;
            const half = Math.ceil(menu.items.length / 2);
            const columns = [menu.items.slice(0, half), menu.items.slice(half)];

            return (
              <div
                key={it.href}
                onMouseEnter={() => setOpenMenu(it.href)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                {link}
                {isOpen && (
                    <div
                      className={`nav-menu-enter absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50 ${menu.groups ? "w-[min(880px,calc(100vw-2rem))]" : "w-[min(640px,calc(100vw-2rem))]"}`}
                    >
                      <div
                        className="rounded-2xl p-6 shadow-2xl border"
                        style={{ background: "var(--bg-4)", borderColor: "var(--hairline-2)" }}
                      >
                        <span className="eyebrow">{menu.eyebrow}</span>
                        <h3 className="mt-2 font-display text-xl font-medium text-[color:var(--color-ink)]">
                          {menu.heading}{" "}
                          <span className="italic-accent">{menu.headingAccent}</span>
                        </h3>
                        {menu.groups ? (
                          <div
                            className="mt-5 grid gap-x-6"
                            style={{ gridTemplateColumns: `repeat(${menu.groups.length}, minmax(0, 1fr))` }}
                          >
                            {menu.groups.map((group) => (
                              <div key={group.title} className="flex flex-col">
                                <div
                                  className="mb-2 pb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-accent)]"
                                  style={{ borderBottom: "1px solid var(--hairline)" }}
                                >
                                  {group.title}
                                </div>
                                {group.items.map((item) => (
                                  <Link
                                    key={item.slug}
                                    href={`${menu.base}/${item.slug}`}
                                    onClick={() => setOpenMenu(null)}
                                    className="group rounded-lg px-2 py-2 -mx-2 transition-colors hover:bg-[color:var(--surface-tint-2)]"
                                  >
                                    <span className="font-display text-sm font-medium text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent)] transition-colors">
                                      {item.name}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-5 grid grid-cols-2 gap-x-8">
                            {columns.map((col, ci) => (
                              <div key={ci} className="flex flex-col gap-y-1">
                                {col.map((item) => (
                                  <Link
                                    key={item.slug}
                                    href={`${menu.base}/${item.slug}`}
                                    onClick={() => setOpenMenu(null)}
                                    className="group flex items-baseline gap-2.5 rounded-lg px-2 py-2 -mx-2 transition-colors hover:bg-[color:var(--surface-tint-2)]"
                                  >
                                    <span className="font-mono text-[10px] text-[color:var(--color-ink-faint)]">
                                      {item.number}
                                    </span>
                                    <span className="font-display text-sm font-medium text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent)] transition-colors">
                                      {item.name}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                        {menu.feature && (
                          <Link
                            href={menu.feature.href}
                            onClick={() => setOpenMenu(null)}
                            className="mt-5 flex items-center justify-between gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-[color:var(--surface-tint-2)]"
                            style={{ border: "1px solid rgba(var(--accent-rgb),0.3)" }}
                          >
                            <span>
                              <span className="block font-display text-sm font-medium text-[color:var(--color-ink)]">{menu.feature.label}</span>
                              <span className="block text-xs text-[color:var(--color-ink-muted)]">{menu.feature.note}</span>
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-accent)]">New</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
              </div>
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
          <a href={bookHref} className="btn btn-accent">
            Book a pre-audit
          </a>
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
          <Link
            href="/services/ai-operations-system"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[color:var(--color-ink)] hover:bg-[color:var(--surface-tint-2)]"
          >
            Ashford&apos;s Staff <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">New</span>
          </Link>
          <div className="mt-2 px-3 pt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-accent)]">
            Current offers
          </div>
          {niches.map((n) => (
            <Link
              key={n.slug}
              href={`/industries/${n.slug}`}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-[color:var(--color-ink-soft)] hover:bg-[color:var(--surface-tint-2)]"
            >
              {n.name}
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
            <Link href={bookHref} className="btn btn-accent flex-1 text-sm py-3">
              Book a pre-audit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
