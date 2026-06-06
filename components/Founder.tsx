"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionLabel from "@/components/SectionLabel";
import UnicornScene from "@/components/UnicornScene";
import { useLang } from "@/components/LanguageProvider";

export default function Founder() {
  const { t } = useLang();
  const f = t.founder;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // "JCPL" monogram: spreads, shrinks, lifts, fades out.
  const monoSpacing = useTransform(scrollYProgress, [0, 0.5], ["0.02em", "0.28em"]);
  const monoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const monoY = useTransform(scrollYProgress, [0, 0.5], ["0vh", "-22vh"]);
  const monoOpacity = useTransform(scrollYProgress, [0, 0.32, 0.5], [1, 1, 0]);

  // Full name + photo + copy: rise and reveal.
  const revealOpacity = useTransform(scrollYProgress, [0.42, 0.66], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.42, 0.72], [48, 0]);

  return (
    <section
      id="founder"
      ref={ref}
      className="h-[180vh] sm:h-[230vh]"
      style={{ position: "relative", backgroundColor: "var(--marble)" }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden sm:h-screen">
        {/* Layer 1: JCPL monogram */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            aria-hidden="true"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-anton), Impact, 'Arial Narrow', sans-serif",
              fontSize: "clamp(72px, 15vw, 210px)",
              lineHeight: 1,
              color: "var(--ink)",
              letterSpacing: monoSpacing,
              scale: monoScale,
              y: monoY,
              opacity: monoOpacity,
            }}
          >
            JCPL
          </motion.span>
        </div>

        {/* Layer 2: reveal */}
        <motion.div
          style={{ opacity: revealOpacity, y: revealY }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <div className="grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <SectionLabel index="06" className="mb-4">
                {f.label}
              </SectionLabel>
              <h2
                className="font-display font-extrabold leading-[1.05] tracking-tight text-ink"
                style={{ fontSize: "clamp(30px, 4.2vw, 50px)" }}
              >
                {f.name1}
                <br />
                {f.name2}
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
                {f.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === f.paragraphs.length - 1 ? "font-medium text-ink" : undefined
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Founder image — Unicorn Studio interactive scene (his photo + blur/distortion effect) */}
            <div
              className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl"
              style={{ border: "1px solid rgba(212,168,83,0.4)" }}
            >
              <UnicornScene className="h-full w-full" alt={f.photoAlt} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
