"use client";

import { motion, useReducedMotion } from "framer-motion";

const WA_HREF =
  "https://wa.me/27739961535?text=Hi%20Daniel%2C%20I%27d%20like%20to%20know%20more%20about%20Verdance%20Systems%20AI.";

export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Verdance on WhatsApp"
      className="fab-wa"
      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.4, ease: [0.19, 1, 0.22, 1] }}
    >
      <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
        <path d="M19.11 17.43c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15s-.78.98-.96 1.18c-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.48s1.08 2.88 1.23 3.08c.15.2 2.13 3.25 5.16 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35z M16.04 4.5C9.71 4.5 4.58 9.63 4.58 15.96c0 2.03.53 4 1.53 5.74L4.5 27.5l5.96-1.56c1.68.92 3.58 1.4 5.58 1.4 6.32 0 11.46-5.13 11.46-11.46 0-3.06-1.19-5.95-3.36-8.12A11.4 11.4 0 0 0 16.04 4.5z M16.04 25.4c-1.79 0-3.55-.48-5.08-1.4l-.36-.21-3.78.99 1.01-3.68-.24-.38a9.47 9.47 0 0 1-1.46-5.08c0-5.25 4.27-9.52 9.52-9.52 2.54 0 4.93.99 6.73 2.79a9.46 9.46 0 0 1 2.79 6.73c0 5.26-4.27 9.53-9.53 9.53z" />
      </svg>
    </motion.a>
  );
}
