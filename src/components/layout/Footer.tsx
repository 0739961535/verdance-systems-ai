import Link from "next/link";
import { VSAILogo } from "@/components/primitives/VSAILogo";
import { NAV_ITEMS, SITE } from "@/data/site";

export function Footer() {
  return (
    <footer
      className="relative mt-12 border-t"
      style={{
        background: "var(--color-bg)",
        borderColor: "var(--color-hairline)",
      }}
    >
      {/* faint ambient glow at the top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.4), transparent)",
        }}
      />
      <div className="container-wide section-pad-sm">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <VSAILogo size={40} />
              <div className="leading-tight">
                <div className="font-display text-base font-medium text-[color:var(--color-ink)]">
                  {SITE.shortName}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                  Systems AI
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[color:var(--color-ink-soft)]">
              {SITE.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link href="/contact" className="btn btn-accent text-sm">
                Book a free consult
              </Link>
            </div>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)] mb-4">
              Site
            </div>
            <ul className="space-y-2.5 text-[color:var(--color-ink)]">
              {NAV_ITEMS.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="hover:text-[color:var(--color-accent)] transition-colors"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
              {/* Deep pages — surfaced for discovery & internal linking (SEO) */}
              {[
                { href: "/industries", label: "Industries" },
                { href: "/products", label: "Products" },
              ].map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="hover:text-[color:var(--color-accent)] transition-colors"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)] mb-4">
              Contact
            </div>
            <ul className="space-y-2.5 text-[color:var(--color-ink-soft)]">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-[color:var(--color-accent)] transition-colors"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsapp.href}
                  className="hover:text-[color:var(--color-accent)] transition-colors"
                >
                  {SITE.whatsapp.display}
                </a>
              </li>
              <li>{SITE.location}</li>
              <li>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[color:var(--color-accent)] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)] mb-4">
              Legal
            </div>
            <ul className="space-y-2.5 text-[color:var(--color-ink-soft)]">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[color:var(--color-accent)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[color:var(--color-accent)] transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col-reverse items-start gap-4 pt-6 text-sm text-[color:var(--color-ink-muted)] md:flex-row md:items-center md:justify-between border-t"
          style={{ borderColor: "var(--color-hairline)" }}
        >
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.3em] text-xs">
            Built remote-first · Quietly. Intentionally.
          </p>
        </div>
      </div>
    </footer>
  );
}
