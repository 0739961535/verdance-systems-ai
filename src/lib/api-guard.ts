/**
 * Small guards shared by the public form endpoints.
 *
 * The rate limiter is in memory, so on serverless it is per instance and
 * resets on a cold start: it blunts a single noisy client, it is not a
 * substitute for a Vercel WAF rate-limit rule (set one on /api/*).
 */

const hits = new Map<string, number[]>();

export function clientIp(req: Request): string {
  return (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}

/** True when this key has already made `limit` calls in the last `windowMs`. */
export function tooMany(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return false;
}

/** A trimmed, length-capped string, or "" for anything that is not a string. */
export function clip(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}
