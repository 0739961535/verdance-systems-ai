import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Globe, MessageCircle, Phone, UserCheck, RefreshCw, Calendar, Mail, Star, BarChart2, ClipboardList, Bell, Zap, AlertCircle } from "lucide-react";
import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import type { Metadata } from "next";

const iconMap: Record<string, React.ElementType> = {
  Globe, MessageCircle, Phone, UserCheck, RefreshCw, Calendar, Mail, Star, BarChart2, ClipboardList, Bell, Zap,
};

const categoryColors: Record<string, { color: string; bg: string; border: string }> = {
  Presence:       { color: "var(--color-accent)", bg: "rgba(var(--accent-rgb),0.08)",  border: "rgba(var(--accent-rgb),0.20)" },
  Messaging:      { color: "var(--color-accent)", bg: "rgba(var(--accent-rgb),0.08)",   border: "rgba(var(--accent-rgb),0.20)" },
  Communication:  { color: "#5AAEFF", bg: "rgba(90,174,255,0.08)",  border: "rgba(90,174,255,0.20)" },
  Pipeline:       { color: "#33DDD3", bg: "rgba(51,221,211,0.08)",  border: "rgba(51,221,211,0.20)" },
  Booking:        { color: "var(--color-accent)", bg: "rgba(var(--accent-rgb),0.08)",  border: "rgba(var(--accent-rgb),0.20)" },
  Intelligence:   { color: "var(--color-accent)", bg: "rgba(var(--accent-rgb),0.08)",   border: "rgba(var(--accent-rgb),0.20)" },
  Reputation:     { color: "#5AAEFF", bg: "rgba(90,174,255,0.08)",  border: "rgba(90,174,255,0.20)" },
  "Follow-Up":    { color: "#33DDD3", bg: "rgba(51,221,211,0.08)",  border: "rgba(51,221,211,0.20)" },
  Conversion:     { color: "var(--color-accent)", bg: "rgba(var(--accent-rgb),0.08)",  border: "rgba(var(--accent-rgb),0.20)" },
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const title = `${product.name} | Verdance Systems AI`;
  const description = `${product.name} — ${product.tagline} Done-for-you AI for local service businesses: answers, follows up, and books appointments 24/7. Book a free consult.`;
  const url = `https://verdancesystemsai.com/products/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: { title, description, url, type: "website", siteName: "Verdance Systems AI" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);
  const colors = categoryColors[product.category] ?? categoryColors.Presence;
  const Icon = iconMap[product.icon] ?? Zap;

  const url = `https://verdancesystemsai.com/products/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        description: product.tagline,
        url,
        brand: { "@type": "Organization", name: "Verdance Systems AI" },
        category: product.category,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://verdancesystemsai.com/" },
          { "@type": "ListItem", position: 2, name: "Products", item: "https://verdancesystemsai.com/products" },
          { "@type": "ListItem", position: 3, name: product.name, item: url },
        ],
      },
    ],
  };

  return (
    <main className="bg-canvas min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="section-padding pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${colors.color}12, transparent)` }} />
        <div className="container-wide relative z-10 max-w-3xl">
          {/* Category badge */}
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold mb-6"
            style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.color }}
          >
            <Icon size={12} />
            {product.category}
          </span>

          <h1 className="font-display font-bold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-[color:var(--color-ink)] mb-4">
            {product.name}
          </h1>
          <p className="text-[color:var(--color-ink-muted)] text-xl leading-relaxed mb-8">{product.tagline}</p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)] text-[color:var(--color-ink)] font-semibold px-7 py-3.5 rounded-lg shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.4),0_4px_20px_rgba(var(--accent-rgb),0.35)] hover:shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.6),0_6px_28px_rgba(var(--accent-rgb),0.5)] hover:-translate-y-px active:translate-y-0 transition-all duration-300 text-base"
          >
            Book a Strategy Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* What It Is */}
      <section className="section-padding bg-canvas-2">
        <div className="container-wide max-w-3xl">
          <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-3 block" style={{ color: colors.color }}>What It Is</span>
          <p className="text-[color:var(--color-ink-soft)] text-lg leading-relaxed">{product.whatItIs}</p>
        </div>
      </section>

      {/* The Problem */}
      <section className="section-padding bg-canvas">
        <div className="container-wide max-w-3xl">
          <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-3 block" style={{ color: colors.color }}>The Problem</span>
          <div
            className="rounded-2xl p-6 flex gap-4"
            style={{ background: "rgba(255,60,60,0.05)", border: "1px solid rgba(255,60,60,0.15)" }}
          >
            <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-[color:var(--color-ink-soft)] text-base leading-relaxed">{product.problem}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-canvas-2">
        <div className="container-wide max-w-3xl">
          <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-6 block" style={{ color: colors.color }}>How It Works</span>
          <div className="flex flex-col gap-4">
            {product.howItWorks.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-xl p-4"
                style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[0.7rem] font-bold"
                  style={{ background: colors.color, color: "var(--color-on-accent)" }}
                >
                  {i + 1}
                </span>
                <p className="text-[color:var(--color-ink-soft)] text-sm leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section-padding bg-canvas">
        <div className="container-wide max-w-3xl">
          <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-6 block" style={{ color: colors.color }}>Key Features</span>
          <ul className="grid sm:grid-cols-2 gap-3">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check size={14} style={{ color: colors.color }} className="shrink-0 mt-0.5" />
                <span className="text-[color:var(--color-ink-muted)] text-sm leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section-padding bg-canvas-2">
        <div className="container-wide max-w-3xl">
          <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-6 block" style={{ color: colors.color }}>Who It&apos;s For</span>
          <div className="grid sm:grid-cols-3 gap-4">
            {product.whoItsFor.map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
              >
                <p className="font-semibold text-sm text-[color:var(--color-ink)] mb-1">{item.industry}</p>
                <p className="text-[color:var(--color-ink-muted)] text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="section-padding bg-canvas">
        <div className="container-wide max-w-3xl">
          <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-6 block" style={{ color: colors.color }}>Results</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {product.metrics.map((metric, i) => (
              <div
                key={i}
                className="rounded-xl p-5 text-center"
                style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
              >
                <p className="font-display font-bold text-3xl leading-none mb-2" style={{ color: colors.color }}>
                  {metric.value}
                </p>
                <p className="text-[color:var(--color-ink-muted)] text-xs leading-relaxed">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section-padding bg-canvas-2">
          <div className="container-wide max-w-3xl">
            <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-6 block" style={{ color: colors.color }}>Related Products</span>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((rel) => {
                const RelIcon = iconMap[rel.icon] ?? Zap;
                const relColors = categoryColors[rel.category] ?? categoryColors.Presence;
                return (
                  <Link
                    key={rel.slug}
                    href={`/products/${rel.slug}`}
                    className="group rounded-xl p-4 flex gap-3 items-start transition-all duration-300"
                    style={{ background: relColors.bg, border: `1px solid ${relColors.border}` }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${relColors.color}20` }}
                    >
                      <RelIcon size={14} style={{ color: relColors.color }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[color:var(--color-ink)] leading-snug mb-0.5">{rel.name}</p>
                      <p className="text-[color:var(--color-ink-muted)] text-xs leading-relaxed">{rel.tagline}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="section-padding bg-canvas relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${colors.color}08, transparent)` }} />
        <div className="container-wide max-w-2xl text-center relative z-10">
          <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,2.5rem)] text-[color:var(--color-ink)] leading-tight tracking-tight mb-4">
            Ready to add {product.name} to your system?
          </h2>
          <p className="text-[color:var(--color-ink-muted)] text-base leading-relaxed mb-8">
            Book a strategy call and we&apos;ll walk through exactly how this fits into your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)] text-[color:var(--color-ink)] font-semibold px-8 py-4 rounded-xl shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.4),0_4px_24px_rgba(var(--accent-rgb),0.35)] hover:shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.6),0_6px_32px_rgba(var(--accent-rgb),0.5)] hover:-translate-y-px active:translate-y-0 transition-all duration-300 text-base"
          >
            Book a Strategy Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
