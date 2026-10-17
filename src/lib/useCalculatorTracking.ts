"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/**
 * Fires calculator_completed once per page view, after the visitor has
 * changed an input and then left it alone for 1.5 s (the result is on screen
 * the whole time, so "completed" means "used it", not "loaded it").
 *
 * `inputs` must change only on user input (typed values, not derived ones),
 * so a currency switch or the first render never counts.
 */
export function useCalculatorCompleted(inputs: unknown, currency: string): void {
  const key = JSON.stringify(inputs);
  const initial = useRef(key);
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current || key === initial.current) return;
    const t = setTimeout(() => {
      sent.current = true;
      track("calculator_completed", { currency });
    }, 1500);
    return () => clearTimeout(t);
  }, [key, currency]);
}
