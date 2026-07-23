import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { packages } from "@/data/packages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Packages | Verdance Systems AI",
    description: "Three automation packages built around real business stages. Foundation, Growth, and Scale.",
    url: "https://verdancesystemsai.com/packages",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packages | Verdance Systems AI",
    description: "Three automation packages built around real business stages. Foundation, Growth, and Scale.",
  },
  robots: { index: false, follow: true },
  title: "Packages | Verdance Systems AI",
  description: "Three automation packages built around real business stages. Foundation, Growth, and Scale.",
};

const tierColors = [
  { color: "#5AAEFF", border: "rgba(90,174,255,0.25)", bg: "rgba(90,174,255,0.06)", glow: "rgba(90,174,255,0.15)" },
  { color: "var(--color-accent)", border: "rgba(var(--accent-rgb),0.45)", bg: "rgba(var(--accent-rgb),0.08)", glow: "rgba(var(--accent-rgb),0.25)" },
  { color: "var(--color-accent)", border: "rgba(var(--accent-rgb),0.35)", bg: "rgba(var(--accent-rgb),0.06)", glow: "rgba(var(--accent-rgb),0.20)" },
];

export default function PackagesPage() {
  return (
    <main className="bg-canvas min-h-screen">
      <section className="section-padding pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(var(--accent-rgb),0.10),transparent)] pointer-events-none" />
        <div className="container-wide relative z-10">
          <div className="max-w-2xl mb-14">
            <span className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold bg-[rgba(var(--accent-rgb),0.10)] border border-[color:rgba(var(--accent-rgb),0.22)] text-[color:var(--color-accent)] mb-5">
              Packages
            </span>
            <h1 className="font-display font-bold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-[color:var(--color-ink)] mb-4">
              Choose the system that fits where you are.
            </h1>
            <p className="text-[color:var(--color-ink-muted)] text-lg leading-relaxed">
              Three tiers built around real business stages. Start where you are — scale when you&apos;re ready.
              No pricing shown — every system is scoped and quoted based on your specific business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => {
              const colors = tierColors[i];
              const isPopular = !!pkg.badge;
              return (
                <div
                  key={pkg.id}
                  className="relative rounded-2xl p-6 flex flex-col"
                  style={{
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    boxShadow: isPopular ? `0 0 40px ${colors.glow}` : undefined,
                  }}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[0.65rem] font-bold tracking-wide bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)] text-[color:var(--color-ink)] shadow-[0_0_16px_rgba(var(--accent-rgb),0.4)]">
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase mb-3 block" style={{ color: colors.color }}>
                    Tier {pkg.tier}
                  </span>
                  <h2 className="font-display font-bold text-2xl text-[color:var(--color-ink)] mb-1">{pkg.name}</h2>
                  <p className="text-sm text-[color:var(--color-ink-muted)] mb-2 leading-relaxed">{pkg.positioning}</p>
                  <p className="text-xs text-[color:var(--color-accent)] font-medium italic mb-4">&ldquo;{pkg.tagline}&rdquo;</p>

                  <div className="h-px mb-4" style={{ background: `${colors.color}20` }} />

                  <p className="text-[0.7rem] text-[color:var(--color-ink-muted)] font-semibold uppercase tracking-wide mb-1">Best for</p>
                  <p className="text-[color:var(--color-ink-muted)] text-xs leading-relaxed mb-3">{pkg.bestFor}</p>

                  <p className="text-[0.7rem] text-[color:var(--color-ink-muted)] font-semibold uppercase tracking-wide mb-1">Solves</p>
                  <p className="text-[color:var(--color-ink-muted)] text-xs leading-relaxed mb-5">{pkg.solves}</p>

                  <p className="text-[0.7rem] text-[color:var(--color-ink-muted)] font-semibold uppercase tracking-wide mb-2">Includes</p>
                  <ul className="flex flex-col gap-1.5 flex-1">
                    {pkg.products.map((product) => (
                      <li key={product.slug} className="flex items-center gap-2">
                        <Check size={11} style={{ color: colors.color }} className="shrink-0" />
                        <Link href={`/products/${product.slug}`} className="text-xs text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] transition-colors">
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300"
                    style={
                      isPopular
                        ? { background: "linear-gradient(135deg, var(--color-accent), var(--color-accent))", color: "white", boxShadow: "0 4px 20px rgba(var(--accent-rgb),0.35)" }
                        : { background: "transparent", border: `1px solid ${colors.border}`, color: "#E8F0EA" }
                    }
                  >
                    Book a Strategy Call <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
