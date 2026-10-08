import type { ReactNode } from "react";
import { Reveal } from "@/components/primitives/Reveal";

/** Section heading: eyebrow, h2 with the serif accent, optional intro on the right. */
export function SectionHead({ eyebrow, title, intro, id }: { eyebrow: string; title: ReactNode; intro?: ReactNode; id: string }) {
  return (
    <Reveal variant="wipe" className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
      <div className="max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="h2 mt-5">
          {title}
        </h2>
      </div>
      {intro && <div className="max-w-sm text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{intro}</div>}
    </Reveal>
  );
}
