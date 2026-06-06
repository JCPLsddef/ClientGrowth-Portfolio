"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import SpotlightField from "@/components/SpotlightField";
import { useLang } from "@/components/LanguageProvider";

// Recruiter path: a short, first-person read on how I work, placed right after
// the Work. Serves a hiring manager without diluting the sales page.
export default function HowIThink() {
  const { t } = useLang();
  const h = t.howIThink;
  return (
    <section
      id="how-i-think"
      className="scroll-mt-24 border-b border-night-border bg-night px-6 py-24 text-gold-cream sm:py-32"
    >
      <SpotlightField className="mx-auto max-w-5xl">
        <div className="relative z-10">
          <Reveal className="mb-12 max-w-2xl">
            <SectionLabel index="03" tone="dark" className="mb-6">
              {h.label}
            </SectionLabel>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(28px, 4.2vw, 46px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.12,
              }}
            >
              {h.headline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gold-cream/70">
              {h.sub}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {h.steps.map((step, i) => (
              <Reveal key={i} delay={(i % 4) * 0.06}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/40">
                  <span className="font-mono text-sm font-bold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gold-cream/65">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <Link
              href="/work/triple-w-rentals"
              className="text-sm font-semibold text-gold underline-offset-4 hover:underline"
            >
              {h.link}
            </Link>
          </Reveal>
        </div>
      </SpotlightField>
    </section>
  );
}
