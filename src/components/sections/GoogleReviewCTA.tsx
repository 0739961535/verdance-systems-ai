"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

export function GoogleReviewCTA() {
  return (
    <section className="relative bg-canvas overflow-hidden border-t border-b border-[rgba(11,24,18,0.06)]">
      <div className="container-narrow section-padding-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:grid-cols-[1fr_auto] gap-10 items-center"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-6 h-px bg-[#1B4D3E]" />
              <span className="eyebrow">A word, if you would</span>
            </div>
            <h2 className="headline-display mb-5" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)" }}>
              If we have served you well,{" "}
              <span className="italic-serif text-gradient-brand" style={{ fontWeight: 400 }}>
                tell others quietly.
              </span>
            </h2>
            <p className="text-[#5A6660] text-base leading-[1.65] max-w-lg">
              A short review is the most generous thing a client can offer - it allows the next business owner to find us with confidence.
            </p>
            <div className="flex items-center gap-2 mt-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#B89464" className="text-[#B89464]" />
              ))}
              <span className="font-mono text-[0.62rem] tracking-[0.22em] text-[#8B958F] uppercase ml-2">
                Google Reviews
              </span>
            </div>
          </div>
          <a
            href="https://g.page/r/verdancesystemsai/review"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group shrink-0"
          >
            Leave a review
            <ExternalLink size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
