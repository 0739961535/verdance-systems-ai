import { Wine, Trees, Stethoscope, House, Wrench } from "lucide-react";
import type { Niche } from "@/data/niches";

const ICONS = {
  venue: Wine,
  lodge: Trees,
  clinic: Stethoscope,
  estate: House,
  trades: Wrench,
} as const;

export function NicheIcon({ icon, size = 18, className }: { icon: Niche["icon"]; size?: number; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon size={size} strokeWidth={1.5} aria-hidden className={className} />;
}
