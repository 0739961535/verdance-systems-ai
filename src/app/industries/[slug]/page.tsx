import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle, Scale, Building2, Heart, Car, Hammer, Dumbbell, Sparkles, UtensilsCrossed, BookOpen, ShoppingBag, Globe, MessageCircle, Phone, UserCheck, RefreshCw, Calendar, Mail, Star, BarChart2, ClipboardList, Bell, Zap } from "lucide-react";
import { industries, getIndustryBySlug } from "@/data/industries";
import { getProductBySlug } from "@/data/products";
import type { Metadata } from "next";

const industryIconMap: Record<string, React.ElementType> = {
  Scale, Building2, Heart, Car, Hammer, Dumbbell, Sparkles, UtensilsCrossed, BookOpen, ShoppingBag,
};

const productIconMap: Record<string, React.ElementType> = {
  Globe, MessageCircle, Phone, UserCheck, RefreshCw, Calendar, Mail, Star, BarChart2, ClipboardList, Bell, Zap,
};

const productColors: Record<string, { color: string; bg: string; border: string }> = {
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
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  const title = `AI Receptionist for ${industry.name} | Verdance Systems AI`;
  const description = `AI answering & booking for ${industry.name.toLowerCase()}: ${industry.subheadline} Answers every call, text and DM 24/7 and books the job. Free consult.`;
  const url = `https://verdancesystemsai.com/industries/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: { title, description, url, type: "website", siteName: "Verdance Systems AI" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const IndustryIcon = industryIconMap[industry.icon] ?? Scale;
  const relevantProducts = industry.relevantProducts
    .map((s) => getProductBySlug(s))
    .filter(Boolean);

  const url = `https://verdancesystemsai.com/industries/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://verdancesystemsai.com/" },
      { "@type": "ListItem", position: 2, name: "Industries", item: "https://verdancesystemsai.com/industries" },
      { "@type": "ListItem", position: 3, name: industry.name, item: url },
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(var(--accent-rgb),0.08),transparent)] pointer-events-none" />
        <div className="container-wide relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold bg-[rgba(var(--accent-rgb),0.10)] border border-[color:rgba(var(--accent-rgb),0.22)] text-[color:var(--color-accent)] mb-6">
            <IndustryIcon size={12} />
            {industry.name}
          </span>
          <h1 className="font-display font-bold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-[color:var(--color-ink)] mb-4">
            {industry.headline}
          </h1>
          <p className="text-[color:var(--color-ink-muted)] text-xl leading-relaxed mb-8">{industry.subheadline}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)] text-[color:var(--color-ink)] font-semibold px-7 py-3.5 rounded-lg shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.4),0_4px_20px_rgba(var(--accent-rgb),0.35)] hover:shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.6),0_6px_28px_rgba(var(--accent-rgb),0.5)] hover:-translate-y-px active:translate-y-0 transition-all duration-300 text-base"
          >
            Book a Strategy Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Problems */}
      <section className="section-padding bg-canvas-2">
        <div className="container-wide max-w-3xl">
          <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-6 block text-[color:var(--color-accent)]">The Challenges</span>
          <div className="grid sm:grid-cols-2 gap-4">
            {industry.problems.map((problem, i) => (
              <div
                key={i}
                className="rounded-xl p-5"
                style={{ background: "rgba(var(--hairline-rgb),0.03)", border: "1px solid rgba(var(--accent-rgb),0.12)" }}
              >
                <p className="font-semibold text-sm text-[color:var(--color-ink)] mb-2">{problem.title}</p>
                <p className="text-[color:var(--color-ink-muted)] text-xs leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relevant Products */}
      {relevantProducts.length > 0 && (
        <section className="section-padding bg-canvas">
          <div className="container-wide max-w-3xl">
            <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-6 block text-[color:var(--color-accent)]">Recommended Products</span>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relevantProducts.map((product) => {
                if (!product) return null;
                const ProductIcon = productIconMap[product.icon] ?? Zap;
                const colors = productColors[product.category] ?? productColors.Presence;
                return (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    className="group rounded-xl p-4 flex gap-3 items-start transition-all duration-300"
                    style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${colors.color}20` }}
                    >
                      <ProductIcon size={14} style={{ color: colors.color }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[color:var(--color-ink)] leading-snug mb-0.5">{product.name}</p>
                      <p className="text-[color:var(--color-ink-muted)] text-xs leading-relaxed line-clamp-2">{product.tagline}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Automation Flow */}
      <section className="section-padding bg-canvas-2">
        <div className="container-wide max-w-3xl">
          <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-6 block text-[color:var(--color-accent)]">How It Works</span>
          <div className="flex flex-col gap-3">
            {industry.automationFlow.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-xl p-4"
                style={{ background: "rgba(var(--accent-rgb),0.06)", border: "1px solid rgba(var(--accent-rgb),0.15)" }}
              >
                <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[0.7rem] font-bold bg-[var(--color-accent)] text-[color:var(--color-on-accent)]">
                  {step.step}
                </span>
                <div>
                  <p className="font-semibold text-sm text-[color:var(--color-ink)] mb-0.5">{step.label}</p>
                  <p className="text-[color:var(--color-ink-muted)] text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section-padding bg-canvas">
        <div className="container-wide max-w-3xl">
          <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-6 block text-[color:var(--color-accent)]">Expected Outcomes</span>
          <div className="grid sm:grid-cols-3 gap-4">
            {industry.outcomes.map((outcome, i) => (
              <div
                key={i}
                className="rounded-xl p-5 flex gap-3 items-start"
                style={{ background: "rgba(var(--accent-rgb),0.06)", border: "1px solid rgba(var(--accent-rgb),0.18)" }}
              >
                <CheckCircle size={16} className="text-[color:var(--color-accent)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-bold text-lg text-[color:var(--color-accent)] leading-none mb-1">{outcome.metric}</p>
                  <p className="text-[color:var(--color-ink-muted)] text-xs leading-relaxed">{outcome.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-canvas-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(var(--accent-rgb),0.08),transparent)] pointer-events-none" />
        <div className="container-wide max-w-2xl text-center relative z-10">
          <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,2.5rem)] text-[color:var(--color-ink)] leading-tight tracking-tight mb-4">
            Ready to automate your {industry.name.toLowerCase()} business?
          </h2>
          <p className="text-[color:var(--color-ink-muted)] text-base leading-relaxed mb-8">
            Book a strategy call and we&apos;ll map out exactly how these systems fit into your workflow.
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
