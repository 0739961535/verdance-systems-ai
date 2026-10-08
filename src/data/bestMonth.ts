/**
 * "Best month yet" - one real, static snapshot from an anonymised client.
 *
 * Shown on the homepage client dashboard and the Ashford's Staff command
 * centre. Label: "a South African e-commerce brand". Do NOT name the client
 * anywhere until written permission is confirmed.
 *
 * TODO(Daniel): fill in the real figures. While ANY value is null the
 * snapshot is not rendered and the sections show without numbers.
 */
export interface BestMonth {
  /** Shown as the client label. Keep it anonymous. */
  client: string;
  /** e.g. "March 2026". */
  month: string | null;
  conversationsHandled: number | null;
  /** Median time to first reply, e.g. "41 sec". */
  medianFirstReply: string | null;
  afterHoursAnswered: number | null;
  orders: number | null;
  reviews: number | null;
  recoveredCarts: number | null;
}

export const BEST_MONTH: BestMonth = {
  client: "a South African e-commerce brand",
  month: null, // TODO
  conversationsHandled: null, // TODO
  medianFirstReply: null, // TODO
  afterHoursAnswered: null, // TODO
  orders: null, // TODO
  reviews: null, // TODO
  recoveredCarts: null, // TODO
};

export type BestMonthTile = { label: string; value: string };

/** The tiles to show, or null while any figure is still missing. */
export function bestMonthTiles(m: BestMonth = BEST_MONTH): BestMonthTile[] | null {
  const vals = [m.month, m.conversationsHandled, m.medianFirstReply, m.afterHoursAnswered, m.orders, m.reviews, m.recoveredCarts];
  if (vals.some((v) => v === null || v === undefined || v === "")) return null;
  const n = (v: number | null) => (v ?? 0).toLocaleString("en-ZA").replace(/[,  ]/g, " ");
  return [
    { label: "Conversations handled", value: n(m.conversationsHandled) },
    { label: "Median first reply", value: String(m.medianFirstReply) },
    { label: "After-hours enquiries answered", value: n(m.afterHoursAnswered) },
    { label: "Orders", value: n(m.orders) },
    { label: "Reviews", value: n(m.reviews) },
    { label: "Recovered carts", value: n(m.recoveredCarts) },
  ];
}
