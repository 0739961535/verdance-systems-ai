/** Join class names, skipping empty values. (Vendored chart components expect `cn`.) */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
