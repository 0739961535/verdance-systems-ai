import Link from "next/link";
import { ArrowUpRight, PackageSearch, RefreshCcw, Boxes } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/kit/PageHero";
import { CTABand } from "@/components/kit/CTABand";
import { DeltaRows } from "@/components/sections/v4/DeltaRows";
import { FAQControl } from "@/components/sections/v4/FAQControl";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { SlowChatDemo, type Demo } from "@/components/demos/SlowChatDemo";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { SITE_URL } from "@/data/site";
import { OrderFlow } from "./OrderFlow";

/**
 * /industries/ecommerce-product-businesses - the page for our number one
 * buyer: owner-led online stores and product brands drowning in
 * "where's my order?" messages.
 *
 * Truth rule: our live e-commerce client runs the all-channel assistant
 * today; order lookup is their NEXT phase. So order answers are written as
 * what we build, never as something running for that client. The chat below
 * is a made-up store, labelled Sample.
 */

export const ECOM_SLUG = "ecommerce-product-businesses";
export const ECOM_META = {
  title: "AI for E-commerce Brands: Order Questions Answered | Verdance",
  description:
    "Order, returns and wholesale questions answered on WhatsApp and email within 60 seconds, from your own store. For online brands in SA and the UK.",
};

const DEMO: Demo = {
  business: "Fynbos Home Co.",
  channel: "WhatsApp · 20:31",
  messages: [
    { from: "them", text: "Hi, where's my order? It's #4821", time: "20:31" },
    { from: "us", text: "Hi Thandi. Order #4821 left us yesterday. It's with the courier and due on Thursday.", time: "20:31" },
    { from: "card", title: "Tracking link sent", lines: ["Order #4821 · with the courier"], tone: "info" },
    { from: "them", text: "Thanks. Can I swap the medium for a large?", time: "20:33" },
    { from: "us", text: "Yes. I've started the swap. Lerato will confirm the large in the morning.", time: "20:33" },
    { from: "card", title: "Handed to Lerato", lines: ["Swap · order details attached"], tone: "info" },
  ],
};

const PAINS = [
  {
    icon: PackageSearch,
    title: "Order questions all day",
    body: "“Where's my order?” comes in on WhatsApp, email and Instagram. Someone looks up each one by hand.",
  },
  {
    icon: RefreshCcw,
    title: "Returns and swaps by hand",
    body: "Every return means the same questions and the same steps, typed out again.",
  },
  {
    icon: Boxes,
    title: "Wholesale reorders waiting on a reply",
    body: "Your trade customers want to reorder now. Their message waits in the inbox with everything else.",
  },
];

const DELTAS = [
  { label: "“Where's my order?”", before: "when someone gets to it", after: "answered in 60 seconds" },
  { label: "Returns and swaps", before: "typed out by hand", after: "started for you, a person confirms" },
  { label: "Wholesale reorders", before: "wait in the inbox", after: "sent to your sales lead, with the order" },
  { label: "Evenings and weekends", before: "wait for Monday", after: "answered the same night" },
];

const FAQS = [
  {
    q: "Does it work with Shopify or WooCommerce?",
    a: "Yes. It reads the order from your store, so the answer is always current. Another platform? We check it on the Operations Map, before you commit to anything.",
  },
  {
    q: "What if a customer is upset, or the order is big?",
    a: "It hands over to a named person on your team, with the order details already there. Nobody has to ask the customer twice.",
  },
  {
    q: "Do we approve what it says?",
    a: "You choose. Approve every reply before it goes out, or let routine answers go straight away and keep the important ones for you.",
  },
  {
    q: "What happens on the Operations Map call?",
    a: "A 30-minute video call with Daniel. We look at where enquiries come from, how fast you answer and what that costs. If it fits, a 7-day check sets your starting numbers. If not, we say so.",
  },
];

export function EcomPage() {
  const url = `${SITE_URL}/industries/${ECOM_SLUG}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "Operations Team for e-commerce brands",
        serviceType: "Customer question answering and order support",
        description: ECOM_META.description,
        url,
        areaServed: [
          { "@type": "Country", name: "South Africa" },
          { "@type": "Country", name: "United Kingdom" },
        ],
        provider: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
          { "@type": "ListItem", position: 3, name: "E-commerce and product brands", item: url },
        ],
      },
    ],
  };

  return (
    <>
      <style>{CSS}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow="E-commerce and product brands"
        title={
          <>
            Every ‘where’s my order?’ <span className="italic-accent">answered in 60 seconds.</span>
          </>
        }
        lead="Order, returns and wholesale questions answered on WhatsApp and email, from your own store. Your team gets its hours back."
        crumbs={[{ href: "/", label: "Home" }, { href: "/industries", label: "Industries" }, { label: "E-commerce" }]}
        visual={
          <div className="ec-demo">
            <SlowChatDemo demo={DEMO} />
          </div>
        }
        note="Shopify and WooCommerce · SA and UK"
      />

      <section className="section-pad bg-canvas-2" aria-labelledby="ec-pain-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">Sound familiar?</p>
            <h2 id="ec-pain-title" className="h2 mt-5 max-w-[20ch]">
              Your team answers the same <span className="italic-accent">three questions.</span>
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
            {PAINS.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="card-x ix-card h-full p-6 md:p-7">
                    <p.icon size={22} strokeWidth={1.5} aria-hidden className="text-[color:var(--color-accent)]" />
                    <h3 className="mt-5 font-display text-[1.3rem] leading-tight text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[0.98rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{p.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band-night chapter-pad" aria-labelledby="ec-flow-title">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 id="ec-flow-title" className="h2 mt-4 max-w-[18ch]">
              The question never <span className="italic-accent">waits for a person.</span>
            </h2>
            <p className="lead mt-5 max-w-[36rem]">
              It reads the question, looks up the order in your store and replies. Anything unusual goes to someone on your team, by name.
            </p>
          </Reveal>
          <div className="ec-flow mt-10 md:mt-14">
            <OrderFlow />
          </div>
          <p className="ec-choose">
            <span className="ec-k">You choose</span>
            Approve every reply first, or let routine answers go out and keep the important ones for you.
          </p>
        </div>
      </section>

      <DeltaRows
        eyebrow="What changes"
        title={
          <>
            Same questions. <span className="italic-accent">Answered first.</span>
          </>
        }
        intro="What happens today, and what happens once it is live."
        deltas={DELTAS}
        footnote="Order answers come from your store. A person confirms anything that changes an order."
      />

      <section className="section-pad-sm bg-canvas" aria-labelledby="ec-proof-title">
        <div className="container-narrow">
          <Reveal>
            <Link href="/portfolio#ecom" className="card-x ix-card group ec-proof">
              <span className="ec-live">
                <span className="ec-dot" aria-hidden />
                Live today
              </span>
              <h2 id="ec-proof-title" className="mt-4 font-display text-[color:var(--color-ink)]" style={{ fontSize: "clamp(1.35rem, 1vw + 1.1rem, 1.75rem)", lineHeight: 1.2, letterSpacing: "-0.025em" }}>
                A South African e&#8209;commerce brand
              </h2>
              <p className="mt-3 text-[1rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
                Customer questions answered on WhatsApp, Facebook, Instagram, email and web chat, in the brand&apos;s voice, day and night. Order lookups are their next phase.
              </p>
              <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-medium text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent)]">
                See the build
                <ArrowUpRight size={16} aria-hidden />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <FAQControl faqs={FAQS} />

      <CTABand
        title={
          <>
            Find out how many hours your <span className="italic-accent">order questions take.</span>
          </>
        }
        points={["How many order questions you get, and when", "How long customers wait for an answer", "A written plan: what to fix first"]}
      />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Book a free 30-minute call" />
    </>
  );
}

const CSS = `
.ec-demo {
  max-width: 460px; margin-left: auto; margin-right: auto; padding: 16px 12px 6px; border-radius: 24px;
  background: radial-gradient(120% 70% at 85% 0%, rgba(77,124,255,0.16), transparent 60%), #0A1226;
  border: 1px solid rgba(143,176,255,0.16); box-shadow: 0 40px 100px -50px rgba(37,84,212,0.55);
}
.ec-flow { padding: 20px 8px; border-radius: 24px; border: 1px solid rgba(143,176,255,0.12); background: radial-gradient(90% 80% at 30% 40%, rgba(37,84,212,0.12), transparent 70%), #060B1A; }
@media (min-width: 900px) { .ec-flow { padding: 32px 24px; } }
.ec-choose { margin-top: 24px; max-width: 44rem; font-size: 1rem; line-height: 1.55; color: #C9D3E6; }
.ec-k {
  display: inline-block; margin-right: 10px; padding: 1px 9px; border-radius: 999px; vertical-align: 1px;
  font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.06em; text-transform: uppercase;
  color: #C9D8FF; background: rgba(77,124,255,0.14); border: 1px solid rgba(143,176,255,0.24);
}
.ec-proof { display: block; padding: 28px; }
@media (min-width: 768px) { .ec-proof { padding: 36px 40px; } }
.ec-live { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-ink-muted); }
.ec-dot { width: 8px; height: 8px; border-radius: 999px; background: #2FA36B; box-shadow: 0 0 0 4px rgba(47,163,107,0.16); }
`;
