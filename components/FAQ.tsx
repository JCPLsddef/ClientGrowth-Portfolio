"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type FaqItem = { question: string; answer: string; featured?: boolean };

const GOLD = "#D4A853";

const FAQ_ITEMS: FaqItem[] = [
  {
    featured: true,
    question: "I ran Google Ads before and lost money. Why would this be different?",
    answer:
      "Because ads without a conversion system are just expensive traffic. You got clicks. The website that received them was not built to close. The targeting was not built around purchase intent. The landing page was probably your home page.\n\nI have seen this exact story more times than I can count. A business owner spends $500 to $1,000, gets clicks, gets zero calls, and concludes ads do not work in their industry.\n\nThe clicks were real. Everything behind them was not built. I build it first. Then the ads run. When the funnel exists before the traffic, the calls come. The difference between losing money on ads and 46x return on ad spend is the infrastructure that receives the traffic.",
  },
  {
    question: "What exactly is the Growth Architecture?",
    answer:
      "It's a complete acquisition system. Not just a website, not just ads. All of it, built together so each part makes the others stronger. Positioning, conversion website, Google Ads, AI automation, lead qualification, monthly optimization. Built once. Improved every month. It's the last marketing system you will need to think about.",
  },
  {
    question: "How fast will I see results?",
    answer:
      "Fast build from signed agreement to live system. That includes the diagnostic audit, full website build, and campaign setup. Most clients see their first inbound call within weeks of going live. The full system reaches peak efficiency at 60 to 90 days as the SEO compounds and the ad campaigns optimize. The tracking dashboard shows you every call, every cost, and every source from day one.",
  },
  {
    question: "What happens if I already have a website?",
    answer:
      "If it converts, I keep it. If it does not, I rebuild it around one goal: booking calls.",
  },
  {
    question: "What is the minimum I need to invest in ads?",
    answer:
      "I recommend starting at $500 per month. At $33 per qualified call, that is roughly 15 calls. One closed job usually covers the entire system cost.",
  },
  {
    question: "How is this different from hiring a regular agency?",
    answer:
      "An agency delivers a project and moves to the next client. I measure my success by one number: qualified calls on your calendar. If that number is not growing every month, I have not done my job. I own the full system, which means nothing falls through the gaps between vendors. And I have never sent a report full of impressions as a substitute for actual results.",
  },
  {
    question: "What if it does not work?",
    answer:
      "If I do not produce a measurable result in the first 90 days, you stop paying and I keep working until I do. You keep every asset I have built for you, and you can ask for improvements anytime, free.\n\nI do not take clients I do not believe I can help. That is why there is an application. I review your business before agreeing to work with you, not after you have paid.",
  },
  {
    question: "What does this cost?",
    answer:
      "Two ways in. Individual builds start at $600 for a conversion website. The full Growth Partnership starts at $2,500/month and covers the complete acquisition system: conversion website, local SEO, Google Ads, and weekly optimization. Ad spend goes directly to Google, not to me. The initial term is 90 days, then month-to-month. No hidden fees.",
  },
  {
    question: "Who is NOT a good fit?",
    answer:
      "Businesses under $5K per month in revenue. Businesses wanting a logo, a brochure site, or a one-off project. Anyone not ready to commit to a 90-day initial run. Anyone who wants to test the waters with no real system behind it.",
  },
  {
    question: "Who is this built for?",
    answer:
      "Service businesses generating $5K or more per month that rely too heavily on referrals and want a predictable, scalable way to get new clients from the internet. Painters, barbershops, RV rental companies, dental clinics, and any local service where the phone needs to ring with qualified buyers.",
  },
];

export default function FAQ() {
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
          Questions
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
          Questions Serious Buyers Ask.
        </h2>
        <p
          className="mx-auto mt-5 max-w-lg"
          style={{ fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}
        >
          I would rather answer the hard ones here than waste your time on a call.
        </p>
      </div>

      <ul role="list" className="mx-auto flex max-w-2xl flex-col gap-3">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          const answerId = `faq-answer-${i}`;
          const borderClass = isOpen
            ? "border border-[rgba(212,168,83,0.45)]"
            : item.featured
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
                  {item.featured && !isOpen && (
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
                      Most common objection
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
          Still have a question I did not answer? Let us talk.
        </p>
        <a
          href="#apply"
          className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03]"
          style={{ backgroundColor: GOLD, color: "#0D0B09" }}
        >
          Apply to be a Partner →
        </a>
      </div>
    </section>
  );
}
