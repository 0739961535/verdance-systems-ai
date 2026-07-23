"use client";

import Link from "next/link";
import { ArrowRight, Scale, Building2, Heart, Car, Hammer, Dumbbell, Sparkles, UtensilsCrossed, BookOpen, ShoppingBag } from "lucide-react";
import type { Industry } from "@/data/industries";

const iconMap: Record<string, React.ElementType> = {
  Scale, Building2, Heart, Car, Hammer, Dumbbell, Sparkles, UtensilsCrossed, BookOpen, ShoppingBag,
};

interface IndustryCardProps {
  industry: Industry;
  index?: number;
}

export function IndustryCard({ industry, index = 0 }: IndustryCardProps) {
  const Icon = iconMap[industry.icon] ?? Scale;
  const isBlue = index % 2 === 0;
  const color = isBlue ? "var(--color-accent)" : "var(--color-accent)";
  const bg = isBlue ? "rgba(var(--accent-rgb),0.06)" : "rgba(var(--accent-rgb),0.06)";
  const border = isBlue ? "rgba(var(--accent-rgb),0.18)" : "rgba(var(--accent-rgb),0.18)";

  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300 h-full"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
        style={{ background: `${color}20`, border: `1px solid ${color}30` }}
      >
        <Icon size={20} style={{ color }} />
      </div>

      <div className="flex-1">
        <h3 className="font-display font-bold text-base text-[color:var(--color-ink)] mb-1.5 leading-snug">{industry.name}</h3>
        <p className="text-[color:var(--color-ink-muted)] text-xs leading-relaxed">{industry.headline}</p>
      </div>

      <div
        className="flex items-center gap-1.5 text-xs font-semibold opacity-60 group-hover:opacity-100 transition-opacity duration-200"
        style={{ color }}
      >
        See how <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </Link>
  );
}
