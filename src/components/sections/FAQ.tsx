"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "Which industries do you build for?",
    answer:
      "Legal, professional services, real estate, medical and wellness, automotive, home services, fitness, beauty, hospitality, education and eCommerce. If your business turns on leads, bookings or client communication, our work applies.",
  },
  {
    question: "How long until a system is in operation?",
    answer:
      "Most engagements are commissioned within two to four weeks of the initial strategy call. Foundation engagements (presence + WhatsApp AI + scheduling) typically go live in ten to fourteen days; Scale engagements take three to five weeks.",
  },
  {
    question: "Do I need technical knowledge to operate it?",
    answer:
      "No. Everything is built, configured and rehearsed by us before handover. You receive a guided walkthrough and ongoing stewardship - you only need to know what the system does for your business, not how.",
  },
  {
    question: "How is Verdance priced?",
    answer:
      "We do not publish prices. Every system is scoped privately against your business, your industry and your goals. A clear, itemised proposal follows the strategy call.",
  },
  {
    question: "What happens after the system is delivered?",
    answer:
      "All engagements include ongoing stewardship - monitoring, refinements and quiet evolutions as your business changes. We treat your automation as a living instrument.",
  },
  {
    question: "Which countries do you work with?",
    answer:
      "All of them. Verdance is remote-first and operates with clients across the United Kingdom, the United States, Europe, the Middle East, Australia and beyond - in any time zone.",
  },
  {
    question: "How do I begin?",
    answer:
      "Book a private strategy call. We spend thirty to forty-five minutes reading your business and where automation will return the most, then propose a system - without commitment.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-canvas relative overflow-hidden border-t border-[rgba(11,24,18,0.06)]">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-6 h-px bg-[#1B4D3E]" />
            <span className="eyebrow">Considered questions</span>
          </div>
          <h2 className="headline-display" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)" }}>
            The conversations<br />
            we <span className="italic-serif text-gradient-brand" style={{ fontWeight: 400 }}>usually have first</span>.
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className="border-b border-[rgba(11,24,18,0.08)]"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                >
                  <div className="flex items-baseline gap-5 flex-1">
                    <span className="font-mono text-[0.62rem] tracking-[0.22em] text-[#8B958F] uppercase shrink-0 mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`font-display text-[1.1rem] md:text-[1.2rem] leading-snug transition-colors duration-300 ${
                      isOpen ? "text-[#0B1812]" : "text-[#0B1812] group-hover:text-[#1B4D3E]"
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  <Plus
                    size={16}
                    className={`shrink-0 transition-all duration-500 mt-1.5 ${
                      isOpen ? "rotate-45 text-[#1B4D3E]" : "text-[#5A6660] group-hover:text-[#1B4D3E]"
                    }`}
                    strokeWidth={1.5}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-[60px] pr-12 pb-7 -mt-1">
                        <p className="text-[#5A6660] text-[0.96rem] leading-[1.75] max-w-2xl">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
