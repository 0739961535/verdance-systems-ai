"use client";

import { ReactNode } from "react";

type Props = {
  items: string[];
  separator?: ReactNode;
  speedSec?: number;
  className?: string;
  itemClassName?: string;
};

export function Marquee({
  items,
  separator,
  speedSec = 60,
  className = "",
  itemClassName = "",
}: Props) {
  const sep =
    separator ?? (
      <span
        className="mx-10 inline-block h-1 w-1 rounded-full"
        style={{ background: "rgba(var(--accent-rgb),0.5)" }}
      />
    );

  const list = (
    <ul className="flex shrink-0 items-center gap-0 whitespace-nowrap">
      {items.map((it, i) => (
        <li key={i} className="flex items-center">
          <span className={itemClassName}>{it}</span>
          {sep}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div
        className="flex animate-marquee will-change-transform"
        style={{ animationDuration: `${speedSec}s` }}
      >
        {list}
        {list}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[rgba(var(--bg-rgb),1)] via-[rgba(var(--bg-rgb),0.8)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[rgba(var(--bg-rgb),1)] via-[rgba(var(--bg-rgb),0.8)] to-transparent" />
    </div>
  );
}
