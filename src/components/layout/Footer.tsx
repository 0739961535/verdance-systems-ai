import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { NICHES } from "@/data/niches";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { Logo } from "@/components/brand/LogoMark";
import { SITE } from "@/data/site";

/**
 * Footer: a closing band (promise, one CTA, direct contact) above a tidy
 * five-column link index. Two columns at 390px, three at 768, five at 1024+.
 * Every link target from the previous footer is kept.
 */

type FooterLink = { href: string; label: string; external?: boolean };
type FooterGroup = { title: string; links: FooterLink[] };

const GROUPS: FooterGroup[] = [
  {
    title: "Company",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/ai-agency", label: "Where we work" },
      { href: "/contact", label: "Contact" },
      { href: SITE.linkedin, label: "LinkedIn", external: true },
    ],
  },
  {
    title: "What we build",
    links: [
      { href: "/services", label: "All services" },
      { href: "/services/ai-operations-system", label: "The Revenue Team" },
      { href: "/services/conversation-ai", label: "Message replies" },
      { href: "/services/voice-ai", label: "Phone answering" },
      { href: "/services/follow-up-nurture", label: "Follow-up" },
    ],
  },
  {
    title: "Industries",
    links: [
      { href: "/industries", label: "All industries" },
      ...NICHES.map((n) => ({
        href: `/industries/${n.slug}`,
        // Long niche names read better trimmed at the colon in a footer.
        label: n.name.split(":")[0],
      })),
    ],
  },
  {
    title: "Free tools",
    links: [
      { href: "/audit", label: "Free Operations Map" },
      { href: "/missed-call-calculator", label: "Missed call calculator" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

const linkClass =
  "group inline-flex min-h-11 items-center gap-1 text-[0.9375rem] leading-snug text-[color:var(--color-ink-soft)] transition-colors duration-150 hover:text-[color:var(--color-ink)] md:min-h-0 md:py-1.5";

function FooterAnchor({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {link.label}
        <ArrowUpRight
          size={13}
          strokeWidth={1.5}
          aria-hidden
          className="shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
        />
      </a>
    );
  }
  return (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  );
}

const contactClass =
  "flex min-h-11 items-center gap-3 text-[0.9375rem] text-[color:var(--color-ink-soft)] transition-colors duration-150 hover:text-[color:var(--color-ink)]";

const iconClass = "shrink-0 text-[color:var(--color-accent)]";

export function Footer() {
  const year = new Date().getFullYear();
  const tel = SITE.phone.replace(/\s+/g, "");

  return (
    <footer
      className="relative mt-12 border-t"
      style={{ background: "var(--color-bg)", borderColor: "var(--color-hairline)" }}
    >
      {/* single accent hairline on the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.4), transparent)",
        }}
      />

      <div className="container-wide pt-16 pb-8 md:pt-24">
        {/* Closing band */}
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-end md:gap-16">
          <div>
            <Logo size={36} />
            <p className="font-display mt-6 max-w-[22ch] text-[clamp(1.625rem,1.2rem+1.8vw,2.5rem)] leading-[1.12] tracking-[-0.025em] text-[color:var(--color-ink)]">
              Every enquiry answered within 60 seconds.{" "}
              <span className="whitespace-nowrap text-[color:var(--color-ink-muted)]">Every follow-up done.</span>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <a
                href={GENERIC_BOOK_URL}
                className="btn btn-outline w-full justify-center text-sm sm:w-auto"
                style={{ minHeight: 52 }}
              >
                Get your free Operations Map
                <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />
              </a>
              <span className="font-mono text-xs text-[color:var(--color-ink-muted)]">
                No sales pitch.
              </span>
            </div>
          </div>

          <ul className="flex flex-col md:items-end" aria-label="Contact">
            <li>
              <a
                href={SITE.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className={contactClass}
              >
                <MessageCircle size={16} strokeWidth={1.5} aria-hidden className={iconClass} />
                WhatsApp {SITE.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className={contactClass}>
                <Mail size={16} strokeWidth={1.5} aria-hidden className={iconClass} />
                <span className="break-all">{SITE.email}</span>
              </a>
            </li>
            <li>
              <a href={`tel:${tel}`} className={contactClass}>
                <Phone size={16} strokeWidth={1.5} aria-hidden className={iconClass} />
                {SITE.phone}
              </a>
            </li>
          </ul>
        </div>

        {/* Link index */}
        <nav
          aria-label="Footer"
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t pt-10 md:mt-20 md:grid-cols-3 md:pt-14 lg:grid-cols-5"
          style={{ borderColor: "var(--color-hairline)" }}
        >
          {GROUPS.map((group) => (
            <div key={group.title} className="min-w-0">
              <h2 className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)] md:mb-4">
                {group.title}
              </h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <FooterAnchor link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom line */}
        <div
          className="mt-14 flex flex-col gap-3 border-t pt-6 text-[0.8125rem] text-[color:var(--color-ink-muted)] md:mt-20 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--color-hairline)" }}
        >
          <p>
            © {year} {SITE.name}. Registered in South Africa, registration number {SITE.regNumber}.
          </p>
          <p>Built in South Africa. Your data stays in accounts you own. POPIA-ready.</p>
        </div>
      </div>
    </footer>
  );
}
