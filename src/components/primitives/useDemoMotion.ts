"use client";

/**
 * useDemoMotion — motion gate for the live product demos.
 *
 * The demos (WhatsApp thread, calendar auto-fill, pipeline flow, review engine,
 * etc.) are functional demonstrations of the product — the core of the pitch,
 * closer to an autoplaying explainer than to decorative page motion. Owner
 * decision (2026-07): they animate for everyone, including visitors who have the
 * OS "reduce motion" preference on.
 *
 * Decorative, page-level motion (hero orbs, gradient mesh, section reveals,
 * marquees, magnetic buttons) intentionally still calls framer-motion's
 * useReducedMotion and stays calm for those users.
 *
 * Returns the value demos read as `reduce`: always false here (never reduced),
 * so every `reduce ? static : animated` branch in a demo takes the animated path.
 */
export function useDemoMotion(): boolean {
  return false;
}
