/**
 * Booking links. Tiny on purpose: safe to import from client components.
 *
 * Every "Book a call" link goes to the site's own booking page (/book), or
 * on the home page scrolls to the #book section. The CRM calendar is still
 * the diary of record behind it (src/lib/booking-server.ts), but no
 * CRM-hosted page is ever shown.
 *
 * BOOK_BASE stays exported for older call sites that build
 * `${BOOK_BASE}/book/audit`; next.config redirects /book/<anything> to /book.
 */
export const BOOK_BASE = "/book";
export const GENERIC_BOOK_URL = "/book";
/** A booking link that remembers which offer sent the visitor (?for=venues). */
export const bookUrl = (bookSlug: string) => (bookSlug && bookSlug !== "audit" ? `/book?for=${encodeURIComponent(bookSlug)}` : "/book");
