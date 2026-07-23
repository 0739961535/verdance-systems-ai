import { ProductGrid } from "@/components/products/ProductGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products | Verdance Systems AI",
    description: "12 automation products designed to capture leads, convert enquiries, retain clients, and scale your business — built to work together.",
    url: "https://verdancesystemsai.com/products",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | Verdance Systems AI",
    description: "12 automation products designed to capture leads, convert enquiries, retain clients, and scale your business — built to work together.",
  },
  title: "Products | Verdance Systems AI",
  description:
    "12 automation products designed to capture leads, convert enquiries, retain clients, and scale your business — built to work together.",
};

export default function ProductsPage() {
  return (
    <main className="bg-canvas min-h-screen">
      {/* Hero */}
      <section className="section-padding pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(var(--accent-rgb),0.10),transparent)] pointer-events-none" />
        <div className="container-wide relative z-10">
          <div className="max-w-2xl mb-14">
            <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold bg-[rgba(var(--accent-rgb),0.10)] border border-[color:rgba(var(--accent-rgb),0.22)] text-[color:var(--color-accent)] mb-5">
              Our Products
            </span>
            <h1 className="font-display font-bold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-[color:var(--color-ink)] mb-4">
              The complete automation stack.
            </h1>
            <p className="text-[color:var(--color-ink-muted)] text-lg leading-relaxed">
              12 products built to cover every touchpoint — from first visit to repeat booking.
              Use them individually or deploy the full growth system.
            </p>
          </div>

          <ProductGrid />
        </div>
      </section>
    </main>
  );
}
