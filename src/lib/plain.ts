/**
 * Older service copy uses " - " as a dash. House style is no dashes, so
 * soften them at render time: a trailing dash goes, an inline one becomes
 * a comma.
 */
export function plain(s: string): string {
  return s.replace(/\s+[-–—]\s*$/, "").replace(/\s+[-–—]\s+/g, ", ");
}
