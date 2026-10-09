import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHead } from "@/components/kit/SectionHead";
import { CTABand } from "@/components/kit/CTABand";
import { LocationMap } from "@/components/visuals/hero/LocationMap";
import { DeltaRows } from "@/components/sections/v4/DeltaRows";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { LOCATIONS, getLocation } from "@/data/locations";
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

  const title = `AI Agency in ${loc.name} | Answering, Booking and Follow Up | Verdance Systems AI`;
  const description = `We build the thing that answers your phone, replies to your messages and books ${loc.name} customers into your calendar, day or night. ${loc.commonLoss} Free 30-minute pre-audit.`;
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
              text: `Yes. We work remotely, so there is nothing to install and nobody has to come to your premises. Everything is set up on a video call and runs on your own accounts. This tends to fit ${loc.industries.slice(0, 3).join(", ").toLowerCase()} best, though the same systems work for most businesses that take enquiries by phone or message.`,
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow={`${loc.name} · ${loc.region}`}
        title={
          <>
            Every {loc.name} enquiry answered, <span className="italic-accent">day or night.</span>
          </>
        }
        lead={`We build the thing that answers your phone, replies to your messages and books ${loc.name} customers into your calendar. ${loc.angle}`}
        crumbs={[{ href: "/ai-agency", label: "Where we work" }, { label: loc.name }]}
        visual={<LocationMap active={loc.slug} />}
        secondary={{ href: `tel:${phone.replace(/\s/g, "")}`, label: `Call ${phone}` }}
        note="Remote first · fixed quote after your free pre-audit"
      />

      <section className="section-pad bg-canvas-2" aria-labelledby="pattern-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHead
            id="pattern-title"
            eyebrow="The local pattern"
            title={
              <>
                What we see in <span className="italic-accent">{loc.name}.</span>
              </>
            }
          />
          <Reveal delay={0.08}>
            <div className="card-x p-7 md:p-9">
              <p className="text-[1.05rem] leading-[1.65] text-[color:var(--color-ink)]">{loc.localContext}</p>
              <p className="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">Built for</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {loc.industries.map((industry) => (
                  <li key={industry} className="rounded-full px-3 py-1.5 text-[0.8rem] text-[color:var(--color-ink-soft)]" style={{ border: "1px solid var(--hairline-2)" }}>
                    {industry}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <DeltaRows
        eyebrow="What changes"
        title={
          <>
            The same enquiries, <span className="italic-accent">answered first.</span>
          </>
        }
        intro={loc.commonLoss}
      />

      <CTABand
        title={
          <>
            Thirty minutes, <span className="italic-accent">and the plan is yours either way.</span>
          </>
        }
      />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Get your free Operations Map" />
    </>
  );
}
