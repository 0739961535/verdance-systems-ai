"use client";

import { useId, useState } from "react";

/**
 * The accordion for chapter 12. Buttons with aria-expanded, one panel open
 * at a time, the first open by default. Panels open on height with the
 * grid-template-rows 0fr to 1fr trick (300ms on the system curve); reduced
 * motion opens them instantly. Closed panels are inert, so their text is
 * skipped by keyboard and screen readers. Styles live in QuestionsChapter.
 */

export type QA = { q: string; a: string };

export function QuestionsAccordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className="qc-list">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <li key={item.q} className="qc-item" data-open={isOpen ? "" : undefined}>
            <h3 className="qc-h">
              <button
                id={btnId}
                type="button"
                className="qc-btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="qc-q">{item.q}</span>
                <span className="qc-glyph" aria-hidden />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="qc-panel" inert={!isOpen}>
              <div className="qc-panel-in">
                <p className="qc-a">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
