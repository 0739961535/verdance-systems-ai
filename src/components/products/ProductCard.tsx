"use client";

import Link from "next/link";
import { ArrowRight, Globe, MessageCircle, Phone, UserCheck, RefreshCw, Calendar, Mail, Star, BarChart2, ClipboardList, Bell, Zap } from "lucide-react";
import type { Product } from "@/data/products";

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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const Icon = iconMap[product.icon] ?? Zap;
  const colors = categoryColors[product.category] ?? categoryColors.Presence;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col h-full rounded-2xl p-5 transition-all duration-300"
      style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shrink-0"
        style={{ background: `${colors.color}20`, border: `1px solid ${colors.color}30` }}
      >
        <Icon size={18} style={{ color: colors.color }} />
      </div>

      <span
        className="text-[0.6rem] font-bold tracking-[0.12em] uppercase mb-2 block"
        style={{ color: colors.color }}
      >
        {product.category}
      </span>

      <h3 className="font-display font-bold text-base text-[color:var(--color-ink)] mb-1.5 leading-snug">
        {product.name}
      </h3>
      <p className="text-[color:var(--color-ink-muted)] text-xs leading-relaxed flex-1">{product.tagline}</p>

      <div
        className="flex items-center gap-1.5 mt-4 text-xs font-semibold transition-opacity duration-200 group-hover:opacity-100 opacity-60"
        style={{ color: colors.color }}
      >
        Learn more <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
      </div>

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${colors.color}40, 0 8px 32px ${colors.color}10` }}
      />
    </Link>
  );
}
