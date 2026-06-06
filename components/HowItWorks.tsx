"use client";

import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { useLang } from "@/components/LanguageProvider";

export default function HowItWorks() {
  const { t } = useLang();
  const h = t.howItWorks;
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 max-w-2xl">
          <SectionLabel index="05" className="mb-6">
            {h.label}
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
            {h.headline}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {h.steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="h-px flex-1 bg-ink/15" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <p className="text-lg font-medium text-ink">{h.footer}</p>
        </Reveal>
      </div>
    </section>
  );
}
