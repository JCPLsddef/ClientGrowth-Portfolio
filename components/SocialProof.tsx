"use client";

import Reveal from "@/components/Reveal";
import TestimonialCard from "@/components/work/TestimonialCard";
import { testimonialFor } from "@/content/work";
import { useLang } from "@/components/LanguageProvider";

// Social proof band directly under the hero: the first trust hit. One client
// testimonial sitting right below the hero logo bar. The dark testimonial card
// reads cleanly against this warm cream band (and matches the cream sections it
// is reused on later: after the stats and near pricing).
export default function SocialProof() {
  const { t } = useLang();
  const heroTestimonial = testimonialFor("hero");
  if (!heroTestimonial) return null;

  return (
    <section
      aria-label="Client testimonial"
      className="px-6 py-16 sm:py-20"
      style={{ backgroundColor: "#ECE6DB" }}
    >
      <div className="mx-auto max-w-xl">
        <Reveal className="mb-6 text-center">
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "#B8893B" }}
          >
            {t.socialProof.label}
          </p>
        </Reveal>
        <Reveal delay={0.06} className="flex justify-center">
          <TestimonialCard testimonial={heroTestimonial} />
        </Reveal>
      </div>
    </section>
  );
}
