"use client";

import Reveal from "@/components/Reveal";
import AuditForm from "@/components/AuditForm";
import TestimonialCard from "@/components/work/TestimonialCard";
import { testimonialFor } from "@/content/work";
import { useLang } from "@/components/LanguageProvider";

export default function FinalCTA() {
  const { t } = useLang();
  const c = t.finalCta;
  const finalCta = testimonialFor("finalCta");

  return (
    <section
      id="audit"
      style={{ backgroundColor: "#0D0B09", color: "#ffffff" }}
      className="relative overflow-hidden px-6 py-28 sm:py-36"
    >
      {/* Calm static backdrop: a single soft gold glow rising from the base.
          No motion here — this is the conversion moment, the form is the
          only thing competing for attention. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 100%, rgba(212,168,83,0.14), rgba(13,11,9,0) 70%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <Reveal>
          <h2
            className="font-display font-extrabold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(32px, 4.8vw, 58px)" }}
          >
            {c.headlinePrefix}
            <span style={{ color: "#D4A853" }}>{c.headlineGold}</span>
            {c.headlineSuffix}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p
            className="mx-auto mt-6 max-w-xl text-lg"
            style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}
          >
            {c.sub}
          </p>
        </Reveal>

        {/* Last word before the form is a client's, not mine. Gated: renders
            nothing until a real quote is supplied in content/work.ts. */}
        {finalCta && (
          <Reveal delay={0.12} className="mx-auto mt-10 flex max-w-xl justify-center">
            <TestimonialCard testimonial={finalCta} />
          </Reveal>
        )}

        <Reveal delay={0.14}>
          <div id="apply" className="mt-10 scroll-mt-24">
            <AuditForm />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            {c.contact}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
