"use client";

import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

export default function RiskReversal() {
  const { t } = useLang();
  const r = t.riskReversal;
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(30px, 4.5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
            }}
          >
            {r.headline}
          </h2>
          <div
            className="mt-8 rounded-2xl p-8"
            style={{ backgroundColor: "#0D0B09", color: "#ffffff" }}
          >
            <span className="mb-5 inline-flex w-fit items-center rounded-md bg-gold/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-gold">
              {r.badge}
            </span>
            <div
              className="flex flex-col gap-4 text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              <p>
                <span style={{ color: "#D4A853", fontWeight: 600 }}>
                  {r.guaranteeGold}
                </span>
                {r.guaranteeRest}
              </p>
              <p>{r.guaranteeP2}</p>
            </div>
          </div>
        </Reveal>
        <div className="mt-10 flex flex-col gap-5">
          {r.objections.map((o, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="border-t border-ink/10 pt-5">
                <p className="font-display text-lg font-bold text-ink">{o.q}</p>
                <p className="mt-1 text-base leading-relaxed text-ink-soft">{o.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
