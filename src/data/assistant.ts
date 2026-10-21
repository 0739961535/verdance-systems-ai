/**
 * The live AI assistant on WhatsApp, and the UK phone line.
 * TODO(Daniel): set the numbers (international format, e.g. "+27 ..."). While a
 * value is null, every place that uses it stays hidden: nothing ships as a
 * placeholder.
 */
export const AI_WHATSAPP: string | null = null;
export const UK_LINE: string | null = null;

const digits = (n: string) => n.replace(/\D/g, "");
export const waLink = (n: string, text?: string) => `https://wa.me/${digits(n)}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const telLink = (n: string) => `tel:+${digits(n)}`;
