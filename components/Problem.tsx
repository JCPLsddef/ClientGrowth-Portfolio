"use client";

import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import SpotlightField from "@/components/SpotlightField";
import SeenWord from "@/components/SeenWord";
import { useLang } from "@/components/LanguageProvider";

export default function Problem() {
  const { t } = useLang();
  const p = t.problem;
  return (
    <section className="bg-night px-6 py-24 text-white sm:py-36">
      <SpotlightField className="mx-auto max-w-3xl">
        <div className="relative z-10">
          <Reveal>
            <SectionLabel index="01" tone="dark" className="mb-8">
              {p.label}
            </SectionLabel>
          </Reveal>
          <Reveal>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(30px, 4.5vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
              }}
            >
              {p.headlinePrefix}
              <SeenWord>{p.headlineSeen}</SeenWord>
            </h2>
          </Reveal>
          <div
            className="mt-10 flex flex-col gap-6"
            style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}
          >
            {p.paragraphs.map((para, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <p
                  style={
                    i === p.paragraphs.length - 1
                      ? { color: "#ffffff", fontWeight: 500 }
                      : undefined
                  }
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </SpotlightField>
    </section>
  );
}
