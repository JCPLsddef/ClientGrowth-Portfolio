"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionLabel from "@/components/SectionLabel";
import UnicornScene from "@/components/UnicornScene";

export default function Founder() {
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
      style={{ position: "relative", height: "230vh", backgroundColor: "var(--marble)" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
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
                Who you&apos;re working with
              </SectionLabel>
              <h2
                className="font-display font-extrabold leading-[1.05] tracking-tight text-ink"
                style={{ fontSize: "clamp(30px, 4.2vw, 50px)" }}
              >
                Juan-Carlos
                <br />
                Portillo-Laflamme
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
                <p>
                  I run Client Growth myself, out of Laval, Quebec. When you hire
                  me, you get me. Not a sales rep who vanishes after you sign. Not
                  a junior learning on your account. Not a queue of other clients
                  ahead of you.
                </p>
                <p>
                  I take a maximum of three clients at a time. That is not a
                  marketing line. It is how I make sure every system I build
                  actually performs.
                </p>
                <p className="font-medium text-ink">
                  I measure one number: qualified calls on your calendar. If that
                  number is not growing, I have not done my job yet.
                </p>
              </div>
            </div>

            {/* Founder image — Unicorn Studio interactive scene (his photo + blur/distortion effect) */}
            <div
              className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl"
              style={{ border: "1px solid rgba(212,168,83,0.4)" }}
            >
              <UnicornScene className="h-full w-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
