"use client";

import dynamic from "next/dynamic";

/**
 * The inbox demo is decorative and sits below the hero, so its JavaScript and
 * CSS load after the page is interactive. The placeholder holds the same
 * height so nothing shifts when it arrives.
 */
const UnifiedInbox = dynamic(() => import("./UnifiedInbox").then((m) => m.UnifiedInbox), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="h-[828px] rounded-[24px] md:h-[610px] lg:h-[502px]"
      style={{ background: "var(--bg-3)", border: "1px solid var(--hairline-2)" }}
    />
  ),
});

export function LazyUnifiedInbox() {
  return <UnifiedInbox />;
}
