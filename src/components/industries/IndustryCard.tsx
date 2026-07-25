"use client";

import type { ComponentType, CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
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
} from "lucide-react";
import type { Industry } from "@/data/industries";

type IconComponent = ComponentType<{ size?: number; className?: string; style?: CSSProperties }>;

const iconMap: Record<string, IconComponent> = {
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

interface IndustryCardProps {
  industry: Industry;
}

export function IndustryCard({ industry }: IndustryCardProps) {
  const Icon = iconMap[industry.icon] ?? Scale;

  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group block relative overflow-hidden surface surface-card-hover h-full"
    >
      <div className="p-7 flex flex-col h-full">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
          style={{
            background: "rgba(var(--accent-rgb),0.10)",
            border: "1px solid rgba(var(--accent-rgb),0.22)",
          }}
        >
          <Icon size={20} style={{ color: "var(--color-accent)" }} />
        </div>

        <h3 className="mt-6 font-display text-lg font-medium leading-tight text-[color:var(--color-ink)]">
          {industry.name}
        </h3>
        <p className="mt-2.5 text-[color:var(--color-ink-soft)] text-[13px] leading-relaxed flex-1">
          {industry.headline}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-ink)] group-hover:gap-3 group-hover:text-[color:var(--color-accent)] transition-all">
          See how
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}
