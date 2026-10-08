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
      className="card-x group flex h-full flex-col p-6 md:p-7"
    >
      <div className="flex h-full flex-col">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
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

        <div className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-accent)]">
          See how
          <ArrowRight size={14} className="nudge" />
        </div>
      </div>
    </Link>
  );
}
