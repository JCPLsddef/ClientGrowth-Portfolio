"use client";

import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import SectionLabel from "@/components/SectionLabel";
import TestimonialCard from "@/components/work/TestimonialCard";
import { testimonialFor } from "@/content/work";
import { useLang } from "@/components/LanguageProvider";

export default function Pricing() {
  const { t } = useLang();
  const p = t.pricing;
  const nearPricing = testimonialFor("nearPricing");

  return (
    <section
      id="pricing"
      className="px-6 py-24 sm:py-32"
      style={{ backgroundColor: "#ECE6DB" }}
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 max-w-2xl">
          <SectionLabel index="07" className="mb-6">
            {p.label}
          </SectionLabel>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(30px, 4.5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            {p.headline}
          </h2>
          <p className="mt-4 text-lg text-ink-soft">{p.sub}</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <div
              className="flex h-full flex-col rounded-2xl bg-white p-8 transition duration-300 hover:-translate-y-1"
              style={{ border: "1px solid rgba(20,17,13,0.08)" }}
            >
              <h3 className="font-display text-xl font-bold text-ink">
                {p.card1Title}
              </h3>
              <p className="mt-3 font-display text-3xl font-extrabold text-ink">
                {p.card1Price}
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                {p.card1Body}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div
              className="flex h-full flex-col rounded-2xl bg-white p-8 transition duration-300 hover:-translate-y-1"
              style={{
                border: "1px solid rgba(212,168,83,0.5)",
                boxShadow: "0 12px 44px rgba(212,168,83,0.14)",
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-ink">
                  {p.card2Title}
                </h3>
                <span
                  className="rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                  style={{ backgroundColor: "rgba(212,168,83,0.16)", color: "#B8893B" }}
                >
                  {p.card2Badge}
                </span>
              </div>
              <p className="mt-3 font-display text-3xl font-extrabold text-ink">
                {p.card2Price}
                <span className="text-lg font-bold">{p.card2PriceSuffix}</span>
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                {p.card2Body}
              </p>
              {/* The honest-money trust line, pulled out and given the cool accent. */}
              <div className="mt-auto flex items-start gap-2.5 border-t border-ink/10 pt-5">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-azure"
                />
                <p className="text-sm font-semibold text-azure-deep">
                  {p.trustLine}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
        {nearPricing && (
          <Reveal className="mx-auto mt-12 flex max-w-xl justify-center">
            <TestimonialCard testimonial={nearPricing} />
          </Reveal>
        )}

        <Reveal className="mt-10 text-center">
          <p className="text-base font-medium text-ink">{p.scarcity}</p>
          <Magnetic className="mt-6 inline-block">
            <a
              href="#apply"
              className="cta-shine inline-block rounded-full px-7 py-3.5 text-sm font-semibold text-night transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: "#D4A853" }}
            >
              {p.cta}
            </a>
          </Magnetic>
          <p className="mt-5 text-sm text-ink-soft">
            {p.fallbackPrefix}
            <a
              href="#audit"
              className="font-semibold text-ink underline underline-offset-4 transition-colors hover:text-ink-soft"
            >
              {p.fallbackLink}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
