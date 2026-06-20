"use client";

import Reveal from "@/components/Reveal";
import WordReveal from "@/components/WordReveal";
import { useLang } from "@/components/LanguageProvider";

// Manifesto beat. Left-aligned to match the editorial chapters around it, so
// the page reads as one consistent column rather than alternating axes. The
// headline still rises in word by word for rhythm.
export default function Reframe() {
  const { t } = useLang();
  const r = t.reframe;
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(28px, 4.2vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.14,
            letterSpacing: "-0.02em",
          }}
        >
          <WordReveal text={r.headline} highlight={r.highlight} />
        </h2>
        <div className="mt-8 flex max-w-2xl flex-col gap-6 text-lg leading-relaxed text-ink-soft">
          {r.paragraphs.map((para, i) => (
            <Reveal key={i} delay={0.05 + i * 0.05}>
              <p className={i === r.paragraphs.length - 1 ? "font-medium text-ink" : undefined}>
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
