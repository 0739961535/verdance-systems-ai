"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type FAQItem = { q: string; a: string };

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-[color:var(--color-hairline)] surface overflow-hidden">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg md:text-xl font-medium text-[color:var(--color-ink)]">
                {item.q}
              </span>
              <span
                aria-hidden
                className={`relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${
                  isOpen
                    ? "border-[color:var(--color-accent)] text-[color:var(--color-on-accent)]"
                    : "border-[color:var(--color-hairline-2)] text-[color:var(--color-ink)]"
                }`}
                style={{
                  background: isOpen ? "var(--color-accent)" : "transparent",
                }}
              >
                <motion.span
                  initial={false}
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                  className="text-xl leading-none"
                >
                  +
                </motion.span>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-[color:var(--color-ink-soft)] text-base md:text-lg leading-relaxed">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
