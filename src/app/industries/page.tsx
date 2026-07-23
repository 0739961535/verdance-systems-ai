import { IndustryCard } from "@/components/industries/IndustryCard";
import { industries } from "@/data/industries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries | Verdance Systems AI",
    description: "Automation systems built for your specific industry — legal, real estate, medical, automotive, fitness, and more.",
    url: "https://verdancesystemsai.com/industries",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries | Verdance Systems AI",
    description: "Automation systems built for your specific industry — legal, real estate, medical, automotive, fitness, and more.",
  },
  title: "Industries | Verdance Systems AI",
  description:
    "Automation systems built for your specific industry — legal, real estate, medical, automotive, fitness, and more.",
};

export default function IndustriesPage() {
  return (
    <main className="bg-canvas min-h-screen">
      <section className="section-padding pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(var(--accent-rgb),0.08),transparent)] pointer-events-none" />
        <div className="container-wide relative z-10">
          <div className="max-w-2xl mb-14">
            <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold bg-[rgba(var(--accent-rgb),0.10)] border border-[color:rgba(var(--accent-rgb),0.22)] text-[color:var(--color-accent)] mb-5">
              Industries
            </span>
            <h1 className="font-display font-bold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-[color:var(--color-ink)] mb-4">
              Built for your industry.
            </h1>
            <p className="text-[color:var(--color-ink-muted)] text-lg leading-relaxed">
              Every industry has different workflows, different lead types, and different bottlenecks.
              We build automation systems that understand those specifics.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {industries.map((industry, i) => (
              <IndustryCard key={industry.slug} industry={industry} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
