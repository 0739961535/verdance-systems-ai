import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | Verdance Systems AI",
    description: "Projects built by Verdance Systems AI — automation systems deployed for businesses worldwide.",
    url: "https://verdancesystemsai.com/portfolio",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Verdance Systems AI",
    description: "Projects built by Verdance Systems AI — automation systems deployed for businesses worldwide.",
  },
  robots: { index: false, follow: true },
  title: "Portfolio | Verdance Systems AI",
  description: "Projects built by Verdance Systems AI — automation systems deployed for businesses worldwide.",
};

const placeholders = [
  { label: "Legal Practice Automation", category: "AI Receptionist + Client Intake", color: "var(--color-accent)", bg: "rgba(var(--accent-rgb),0.06)", border: "rgba(var(--accent-rgb),0.20)" },
  { label: "Real Estate Lead System", category: "WhatsApp AI + Lead Reactivation", color: "var(--color-accent)", bg: "rgba(var(--accent-rgb),0.06)", border: "rgba(var(--accent-rgb),0.20)" },
  { label: "Medical Booking Automation", category: "Smart Scheduler + Voice AI", color: "#5AAEFF", bg: "rgba(90,174,255,0.06)", border: "rgba(90,174,255,0.20)" },
  { label: "Automotive Dealership CRM", category: "CRM + Follow-Up System", color: "#33DDD3", bg: "rgba(51,221,211,0.06)", border: "rgba(51,221,211,0.20)" },
  { label: "Fitness Studio Growth Stack", category: "Full Scale Package", color: "var(--color-accent)", bg: "rgba(var(--accent-rgb),0.06)", border: "rgba(var(--accent-rgb),0.20)" },
  { label: "eCommerce Review Automation", category: "Google Reviews + Follow-Up", color: "var(--color-accent)", bg: "rgba(var(--accent-rgb),0.06)", border: "rgba(var(--accent-rgb),0.20)" },
];

export default function PortfolioPage() {
  return (
    <main className="bg-canvas min-h-screen">
      <section className="section-padding pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(var(--accent-rgb),0.08),transparent)] pointer-events-none" />
        <div className="container-wide relative z-10">
          <div className="max-w-2xl mb-14">
            <span className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold bg-[rgba(var(--accent-rgb),0.10)] border border-[color:rgba(var(--accent-rgb),0.22)] text-[color:var(--color-accent)] mb-5">
              Portfolio
            </span>
            <h1 className="font-display font-bold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-[color:var(--color-ink)] mb-4">
              What we&apos;ve built.
            </h1>
            <p className="text-[color:var(--color-ink-muted)] text-lg leading-relaxed">
              A growing collection of systems deployed for businesses for businesses worldwide.
              Case studies and project details coming soon.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {placeholders.map((item) => (
              <div
                key={item.label}
                className="group rounded-2xl overflow-hidden"
                style={{ background: item.bg, border: `1px solid ${item.border}` }}
              >
                <div className="h-44 relative flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${item.color}, transparent 70%)` }}
                  />
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: `linear-gradient(${item.color} 1px, transparent 1px), linear-gradient(90deg, ${item.color} 1px, transparent 1px)`,
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="flex flex-col items-center gap-2 relative z-10">
                    <Clock size={24} style={{ color: item.color }} className="opacity-50" />
                    <span className="text-[0.65rem] font-semibold text-[color:var(--color-ink-muted)] tracking-wide">Coming soon</span>
                  </div>
                </div>
                <div className="p-5 border-t" style={{ borderColor: item.border }}>
                  <span className="text-[0.6rem] font-bold tracking-[0.12em] uppercase mb-1.5 block" style={{ color: item.color }}>
                    {item.category}
                  </span>
                  <h3 className="font-display font-semibold text-base text-[color:var(--color-ink)]">{item.label}</h3>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-14 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl"
            style={{ background: "rgba(var(--accent-rgb),0.05)", border: "1px solid rgba(var(--accent-rgb),0.18)" }}
          >
            <div>
              <h3 className="font-display font-bold text-lg text-[color:var(--color-ink)] mb-1">Want to be in this section?</h3>
              <p className="text-[color:var(--color-ink-muted)] text-sm">Book a strategy call and let&apos;s build your system.</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)] text-[color:var(--color-ink)] font-semibold px-7 py-3.5 rounded-lg shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.4),0_4px_20px_rgba(var(--accent-rgb),0.35)] hover:-translate-y-px transition-all duration-300 text-sm"
            >
              Get started <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
