"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "@/components/LanguageProvider";

const GOLD = "#D4A853";

// Position of the "I ran Google Ads before and lost money" question, which
// carries the "Most common objection" badge. Keep in sync with the FAQ order
// in content/dictionary.ts (cost and speed sit above it by design).
const MOST_COMMON_INDEX = 2;

export default function FAQ() {
  const { t } = useLang();
  const faq = t.faq;
  // Cost is the highest-intent question, so it opens by default.
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => setOpenIndex((cur) => (cur === i ? -1 : i));

  return (
    <section
      id="faq"
      style={{ backgroundColor: "#0D0B09", color: "#ffffff" }}
      className="px-6 py-24 sm:py-32"
    >
      <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
        <p
          className="mb-4 text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color: GOLD }}
        >
          {faq.label}
        </p>
        <h2
          className="mx-auto max-w-xl font-display text-white"
          style={{
            fontSize: "clamp(34px, 4.5vw, 52px)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
          }}
        >
          {faq.headline}
        </h2>
        <p
          className="mx-auto mt-5 max-w-lg"
          style={{ fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}
        >
          {faq.sub}
        </p>
      </div>

      <ul role="list" className="mx-auto flex max-w-2xl flex-col gap-3">
        {faq.items.map((item, i) => {
          const featured = i === MOST_COMMON_INDEX;
          const isOpen = openIndex === i;
          const answerId = `faq-answer-${i}`;
          const borderClass = isOpen
            ? "border border-[rgba(212,168,83,0.45)]"
            : featured
              ? "border border-[rgba(212,168,83,0.35)]"
              : "border border-[rgba(255,255,255,0.07)] hover:border-[rgba(212,168,83,0.25)]";
          const paragraphs = item.answer.split("\n\n");

          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
              className={`overflow-hidden rounded-xl transition-all duration-200 ${borderClass}`}
              style={{
                backgroundColor: isOpen
                  ? "rgba(255,255,255,0.035)"
                  : "rgba(255,255,255,0.02)",
                borderLeftWidth: isOpen ? 3 : undefined,
                borderLeftColor: isOpen ? GOLD : undefined,
                boxShadow: isOpen ? "0 4px 24px rgba(212,168,83,0.07)" : undefined,
              }}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
              >
                <span className="flex flex-col gap-2">
                  {featured && !isOpen && (
                    <span
                      className="inline-flex w-fit items-center rounded-md"
                      style={{
                        backgroundColor: "rgba(212,168,83,0.12)",
                        border: "1px solid rgba(212,168,83,0.3)",
                        color: GOLD,
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        padding: "2px 8px",
                      }}
                    >
                      {faq.mostCommon}
                    </span>
                  )}
                  <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4, color: "#fff" }}>
                    {item.question}
                  </span>
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 300ms",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  <path
                    d="M5 7.5l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={answerId}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-5 pb-5 md:px-6 md:pb-6">
                      <div
                        style={{
                          height: 1,
                          backgroundColor: "rgba(255,255,255,0.07)",
                          marginBottom: 16,
                        }}
                      />
                      {paragraphs.map((p, pi) => (
                        <p
                          key={pi}
                          style={{
                            fontSize: 15,
                            fontWeight: 400,
                            lineHeight: 1.7,
                            opacity: 0.72,
                            marginBottom: pi === paragraphs.length - 1 ? 0 : 12,
                          }}
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>

      <div className="mx-auto mt-14 max-w-2xl text-center sm:mt-16">
        <p className="mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
          {faq.footerNote}
        </p>
        <a
          href="#audit"
          className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03]"
          style={{ backgroundColor: GOLD, color: "#0D0B09" }}
        >
          {faq.footerCta}
        </a>
      </div>
    </section>
  );
}
