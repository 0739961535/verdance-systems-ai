import type { ComponentType, CSSProperties } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Scale,
  Building2,
  Heart,
  Car,
  Wrench,
  Dumbbell,
  Sparkles,
  UtensilsCrossed,
  GraduationCap,
  ShoppingBag,
  Globe,
  MessageCircle,
  Phone,
  UserCheck,
  RefreshCw,
  Calendar,
  Repeat,
  Star,
  LayoutDashboard,
  ClipboardList,
  Send,
  MessageSquare,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { AnimatedDivider } from "@/components/primitives/AnimatedDivider";
import { GradientMesh } from "@/components/primitives/GradientMesh";
import { FinalCTA } from "@/components/sections/v3/FinalCTA";
import { industries, getIndustryBySlug } from "@/data/industries";
import { getProductBySlug } from "@/data/products";
import type { Metadata } from "next";

type IconComponent = ComponentType<{ size?: number; className?: string; style?: CSSProperties }>;

const industryIconMap: Record<string, IconComponent> = {
  Scale,
  Building2,
  Heart,
  Car,
  Wrench,
  Dumbbell,
  Sparkles,
  UtensilsCrossed,
  GraduationCap,
  ShoppingBag,
};

const productIconMap: Record<string, IconComponent> = {
  Globe,
  MessageCircle,
  Phone,
  UserCheck,
  RefreshCw,
  Calendar,
  Repeat,
  Star,
  LayoutDashboard,
  ClipboardList,
  Send,
  MessageSquare,
};

const productColors: Record<string, { color: string; bg: string; border: string }> = {
  Presence:      { color: "var(--color-accent)", bg: "rgba(var(--accent-rgb),0.08)", border: "rgba(var(--accent-rgb),0.20)" },
  Messaging:     { color: "var(--color-accent)", bg: "rgba(var(--accent-rgb),0.08)", border: "rgba(var(--accent-rgb),0.20)" },
  Communication: { color: "#5AAEFF", bg: "rgba(90,174,255,0.08)", border: "rgba(90,174,255,0.20)" },
  Pipeline:      { color: "#33DDD3", bg: "rgba(51,221,211,0.08)", border: "rgba(51,221,211,0.20)" },
  Booking:       { color: "var(--color-accent)", bg: "rgba(var(--accent-rgb),0.08)", border: "rgba(var(--accent-rgb),0.20)" },
  Intelligence:  { color: "var(--color-accent)", bg: "rgba(var(--accent-rgb),0.08)", border: "rgba(var(--accent-rgb),0.20)" },
  Reputation:    { color: "#5AAEFF", bg: "rgba(90,174,255,0.08)", border: "rgba(90,174,255,0.20)" },
  "Follow-Up":   { color: "#33DDD3", bg: "rgba(51,221,211,0.08)", border: "rgba(51,221,211,0.20)" },
  Conversion:    { color: "var(--color-accent)", bg: "rgba(var(--accent-rgb),0.08)", border: "rgba(var(--accent-rgb),0.20)" },
};

/** Industry headlines are plain sentences (no italicWord field like services).
 *  Split off the last sentence to get a consistent italic-accent punchline;
 *  single-sentence headlines render plain. */
function splitHeadline(headline: string): { lead: string; accent: string | null } {
  const sentences = headline.trim().split(/(?<=\.)\s+/).filter(Boolean);
  if (sentences.length < 2) return { lead: headline, accent: null };
  return { lead: sentences.slice(0, -1).join(" "), accent: sentences[sentences.length - 1] };
}

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
  const { lead, accent } = splitHeadline(industry.headline);

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <GradientMesh intensity="soft" />
        </div>
        <div className="container-wide">
          <Reveal>
            <nav className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
              <Link href="/industries" className="hover:text-[color:var(--color-accent)] transition-colors">
                Industries
              </Link>
              <span className="mx-2 text-[color:var(--color-ink-faint)]">/</span>
              <span className="text-[color:var(--color-accent)]">{industry.name}</span>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <span className="mt-6 inline-flex items-center gap-2 eyebrow">
              <IndustryIcon size={12} />
              {industry.name}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 headline-hero max-w-[20ch]">
              {lead} {accent && <span className="italic-accent">{accent}</span>}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              {industry.subheadline}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticButton href="/contact" variant="accent">
                Book a free consult
              </MagneticButton>
              <MagneticButton href="/industries" variant="ghost">
                All industries
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="relative section-pad bg-canvas-2">
        <div className="container-wide">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow">The challenges</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 headline-section">
                What&apos;s costing you{" "}
                <span className="italic-accent">customers.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {industry.problems.map((problem, i) => (
              <Reveal key={problem.title} delay={i * 0.05}>
                <div
                  className="rounded-2xl border p-6 h-full"
                  style={{ borderColor: "var(--color-hairline)", background: "rgba(var(--hairline-rgb),0.02)" }}
                >
                  <p className="font-display text-lg font-medium text-[color:var(--color-ink)] mb-2">
                    {problem.title}
                  </p>
                  <p className="text-[color:var(--color-ink-soft)] text-sm leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RELEVANT PRODUCTS */}
      {relevantProducts.length > 0 && (
        <section className="relative section-pad bg-canvas">
          <div className="container-wide">
            <div className="max-w-3xl">
              <Reveal>
                <span className="eyebrow">What we&apos;d build</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 headline-section">
                  Recommended for{" "}
                  <span className="italic-accent">{industry.name.toLowerCase()}.</span>
                </h2>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relevantProducts.map((product, i) => {
                if (!product) return null;
                const ProductIcon = productIconMap[product.icon] ?? Zap;
                const colors = productColors[product.category] ?? productColors.Presence;
                return (
                  <Reveal key={product.slug} delay={i * 0.04}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="group rounded-2xl p-5 flex gap-3.5 items-start h-full transition-all duration-300"
                      style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `${colors.color}20` }}
                      >
                        <ProductIcon size={16} style={{ color: colors.color }} />
                      </div>
                      <div>
                        <p className="font-display font-medium text-[15px] text-[color:var(--color-ink)] leading-snug mb-1">
                          {product.name}
                        </p>
                        <p className="text-[color:var(--color-ink-soft)] text-xs leading-relaxed">
                          {product.tagline}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <div className="container-wide">
        <AnimatedDivider variant="accent" />
      </div>

      {/* AUTOMATION FLOW */}
      <section className="relative section-pad bg-canvas-2">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <span className="eyebrow">How it works</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 headline-section">
              The system,{" "}
              <span className="italic-accent">step by step.</span>
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col gap-3">
            {industry.automationFlow.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.05}>
                <div
                  className="flex gap-4 rounded-2xl p-5 items-start"
                  style={{ background: "rgba(var(--accent-rgb),0.05)", border: "1px solid rgba(var(--accent-rgb),0.16)" }}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-mono text-xs font-semibold"
                    style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
                  >
                    {step.step}
                  </span>
                  <div>
                    <p className="font-display font-medium text-[15px] text-[color:var(--color-ink)] mb-1">
                      {step.label}
                    </p>
                    <p className="text-[color:var(--color-ink-soft)] text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="relative section-pad bg-canvas">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <span className="eyebrow">Expected outcomes</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 headline-section">
              What changes,{" "}
              <span className="italic-accent">on the numbers.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {industry.outcomes.map((outcome, i) => (
              <Reveal key={outcome.description} delay={i * 0.05}>
                <div
                  className="rounded-2xl p-6 h-full"
                  style={{ background: "rgba(var(--accent-rgb),0.06)", border: "1px solid rgba(var(--accent-rgb),0.20)" }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[color:var(--color-accent)] shrink-0" />
                    <p className="font-display font-medium text-2xl text-[color:var(--color-accent)] leading-none">
                      {outcome.metric}
                    </p>
                  </div>
                  <p className="mt-3 text-[color:var(--color-ink-soft)] text-sm leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
