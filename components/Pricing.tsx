import Reveal from "@/components/Reveal";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="px-6 py-24 sm:py-32"
      style={{ backgroundColor: "#ECE6DB" }}
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 text-center">
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(30px, 4.5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
            }}
          >
            Premium presence. Without agency prices.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">Two ways to work with me.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <div
              className="flex h-full flex-col rounded-2xl bg-white p-8"
              style={{ border: "1px solid rgba(20,17,13,0.08)" }}
            >
              <h3 className="font-display text-xl font-bold text-ink">
                Conversion Website
              </h3>
              <p className="mt-3 font-display text-3xl font-extrabold text-ink">
                from $600
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                A custom, premium website built to convert, not just to look good.
                Yours to keep.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div
              className="flex h-full flex-col rounded-2xl bg-white p-8"
              style={{
                border: "1px solid rgba(212,168,83,0.5)",
                boxShadow: "0 12px 44px rgba(212,168,83,0.14)",
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-ink">
                  Growth Partnership
                </h3>
                <span
                  className="rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                  style={{ backgroundColor: "rgba(212,168,83,0.16)", color: "#B8893B" }}
                >
                  Flagship
                </span>
              </div>
              <p className="mt-3 font-display text-3xl font-extrabold text-ink">
                from $2,500
                <span className="text-lg font-bold">/mo</span>
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                The full Growth Architecture: conversion website, local SEO and
                GEO, Google Ads, AI follow-up, and weekly optimization. Ad spend
                goes straight to Google, never to me. 90-day initial term, then
                month to month. No hidden fees.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-10 text-center">
          <p className="text-base font-medium text-ink">
            I run a maximum of three Partnership clients at a time. When the seats
            are full, the waitlist opens.
          </p>
          <a
            href="#apply"
            className="cta-shine mt-6 inline-block rounded-full px-7 py-3.5 text-sm font-semibold text-night transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: "#D4A853" }}
          >
            See if your business qualifies → Apply to be a Partner
          </a>
        </Reveal>
      </div>
    </section>
  );
}
