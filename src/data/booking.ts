/** Pre-audit booking links. Tiny on purpose: safe to import from client components. */
export const BOOK_BASE = "https://book.verdancesystemsai.com";
export const GENERIC_BOOK_URL = `${BOOK_BASE}/audit`;
export const bookUrl = (bookSlug: string) => `${BOOK_BASE}/${bookSlug}`;
