import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { LOCATIONS, getLocation } from "@/data/locations";
import { DELTAS, DELTAS_FOOTNOTE } from "@/data/landing";
import { SITE } from "@/data/site";

const SITE_URL = "https://verdancesystemsai.com";

export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};

  const title = `AI Agency in ${loc.name} | Answering, Booking & Follow Up | Verdance Systems AI`;
  const description = `We build the thing that answers your phone, replies to your messages and books ${loc.name} customers into your calendar, day or night. ${loc.commonLoss} Free 30 minute audit call.`;
  const url = `${SITE_URL}/ai-agency/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/ai-agency/${slug}` },
    openGraph: { title, description, url, type: "website", siteName: "Verdance Systems AI" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const url = `${SITE_URL}/ai-agency/${slug}`;
  const phone = loc.country === "GB" ? SITE.phoneUK : SITE.phone;

  // ProfessionalService rather than LocalBusiness: there is no walk-in
  // premises, and claiming one we do not have is the fastest way to lose a
  // Google Business Profile. areaServed carries the geography instead.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${url}/#service`,
        name: `Verdance Systems AI - ${loc.name}`,
        description: `${loc.angle} ${loc.localContext}`,
        url,
        telephone: phone,
        email: SITE.email,
        priceRange: "$$$",
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        areaServed: {
          "@type": "City",
          name: loc.name,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: loc.region,
            address: {
              "@type": "PostalAddress",
              addressRegion: loc.addressRegion,
              addressCountry: loc.country,
            },
          },
        },
        knowsAbout: loc.industries,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: `AI agency in ${loc.name}`, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `Do you work with businesses in ${loc.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes. We work remotely, so there is nothing to install and nobody has to come to your premises. Everything is set up on a video call and runs on your own accounts. We currently see the most enquiries from ${loc.industries.slice(0, 3).join(", ").toLowerCase()}.`,
            },
          },
          {
            "@type": "Question",
            name: `What is the most common problem you fix for ${loc.name} businesses?`,
            acceptedAnswer: { "@type": "Answer", text: loc.commonLoss },
          },
          {
            "@type": "Question",
            name: "How long does it take to go live?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most builds go live two to four weeks after the plan is signed off. Your contract includes the launch date.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need to understand AI to use this?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, and you will never touch it. It answers your phone and your messages, books people in, and tells you what it did. Anything needing a decision comes to you in plain English.",
            },
          },
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

      <section className="section-padding pt-32 pb-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
              {loc.name} · {loc.region}
            </span>
            <h1 className="font-display font-bold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-[color:var(--color-ink)] mt-5 mb-6">
              AI that answers your {loc.name} phone, day or night.
            </h1>
            <p className="text-[color:var(--color-ink-soft)] text-lg leading-relaxed">
              We build the thing that picks up your calls, replies to your messages and
              books people straight into your calendar. It runs on your own accounts, you
              own all of it, and you never have to touch it.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn btn-accent justify-center min-h-12">
                Book a free audit call
                <ArrowUpRight size={15} aria-hidden />
              </Link>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="btn btn-ghost justify-center min-h-12">
                {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding py-16 border-t" style={{ borderColor: "var(--hairline)" }}>
        <div className="container-wide">
          <Reveal>
            <h2 className="font-display font-bold text-[clamp(1.6rem,3vw,2.4rem)] tracking-tight text-[color:var(--color-ink)] max-w-[22ch]">
              What we see in {loc.name}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-2xl text-[color:var(--color-ink-soft)] leading-relaxed">
              {loc.angle}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-2xl text-[color:var(--color-ink-soft)] leading-relaxed">
              {loc.localContext}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-wrap gap-2">
              {loc.industries.map((industry) => (
                <span
                  key={industry}
                  className="text-xs font-medium rounded-full px-3.5 py-1.5 border"
                  style={{
                    borderColor: "var(--hairline)",
                    color: "var(--color-ink-muted)",
                  }}
                >
                  {industry}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding py-16 border-t" style={{ borderColor: "var(--hairline)" }}>
        <div className="container-wide">
          <Reveal>
            <h2 className="font-display font-bold text-[clamp(1.6rem,3vw,2.4rem)] tracking-tight text-[color:var(--color-ink)] max-w-[24ch]">
              The change, in the numbers we report on
            </h2>
          </Reveal>
          <div className="mt-10 max-w-3xl">
            {DELTAS.map((d, i) => (
              <Reveal key={d.label} delay={0.05 * (i + 1)}>
                <div
                  className="grid gap-1 py-5 md:grid-cols-[1fr_auto] md:items-baseline md:gap-6 border-b"
                  style={{ borderColor: "var(--hairline)" }}
                >
                  <span className="text-[color:var(--color-ink-soft)]">{d.label}</span>
                  <span className="flex items-baseline gap-3 md:justify-end">
                    <span className="font-mono text-[0.9rem] text-[color:var(--color-ink-muted)] line-through">
                      {d.before}
                    </span>
                    <span className="font-mono text-[color:var(--color-ink)]">{d.after}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-sm text-[color:var(--color-ink-muted)] max-w-2xl">
            {DELTAS_FOOTNOTE}
          </p>
        </div>
      </section>

      <section className="section-padding py-20 border-t" style={{ borderColor: "var(--hairline)" }}>
        <div className="container-wide">
          <Reveal>
            <h2 className="font-display font-bold text-[clamp(1.6rem,3vw,2.4rem)] tracking-tight text-[color:var(--color-ink)] max-w-[20ch]">
              Thirty minutes, and the plan is yours either way.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-2xl text-[color:var(--color-ink-soft)] leading-relaxed">
              We go through how enquiries, follow-up and admin actually work in your
              business today, find where you are losing the most, and leave you with a
              list of what to fix in order. Free, and there is nothing to sign.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <Link href="/contact" className="btn btn-accent justify-center min-h-12 mt-8 inline-flex">
              Book a free audit call
              <ArrowUpRight size={15} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
