"use client";

import { useReducedMotion } from "motion/react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import SpotlightField from "@/components/SpotlightField";
import SystemRadar from "@/components/SystemRadar";
import { useLang } from "@/components/LanguageProvider";

export default function GrowthSystem() {
  const { t } = useLang();
  const s = t.system;
  const reduce = useReducedMotion();

  // Static bento grid: the baseline, and the fallback for mobile/tablet and for
  // reduced-motion. The animated SystemFlow set-piece replaces it on large
  // screens when motion is allowed.
  const bento = (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
      {s.pillars.map((pillar, i) => {
        const flagship = i === 0;
        return (
          <Reveal
            key={i}
            delay={(i % 3) * 0.06}
            className={flagship ? "md:col-span-2 lg:col-span-4" : "lg:col-span-2"}
          >
            <div
              className={`h-full rounded-2xl border p-7 transition duration-300 hover:-translate-y-1 ${
                flagship
                  ? "border-gold/25 bg-gradient-to-br from-white/[0.06] to-white/[0.02] hover:border-gold/50"
                  : "border-white/10 bg-white/[0.03] hover:border-gold/40"
              }`}
            >
              <span className="font-mono text-sm font-bold text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className={`mt-3 font-display font-bold ${
                  flagship ? "text-2xl" : "text-xl"
                }`}
              >
                {pillar.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-white/65">
                {pillar.body}
              </p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );

  return (
    <section id="system" className="bg-night px-6 py-24 text-white sm:py-36">
      <SpotlightField className="mx-auto max-w-5xl">
        <div className="relative z-10">
          <Reveal className="mb-14 max-w-2xl">
            <SectionLabel index="04" tone="dark" className="mb-6">
              {s.label}
            </SectionLabel>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(30px, 4.5vw, 52px)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.12,
              }}
            >
              {s.headline}
            </h2>
            <p
              className="mt-5 text-lg"
              style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}
            >
              {s.sub}
            </p>
          </Reveal>

          {/* Mobile and tablet always get the bento. */}
          <div className="lg:hidden">{bento}</div>
          {/* Desktop gets the animated set-piece, unless motion is reduced. */}
          <div className="hidden lg:block">
            {reduce ? (
              bento
            ) : (
              <SystemRadar pillars={s.pillars} coreLabel={s.label} />
            )}
          </div>

          <Reveal className="mt-10 text-center">
            <p className="text-lg font-medium text-gold">{s.footer}</p>
          </Reveal>
        </div>
      </SpotlightField>
    </section>
  );
}
