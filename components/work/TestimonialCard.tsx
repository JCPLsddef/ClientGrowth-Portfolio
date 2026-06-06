"use client";

import Image from "next/image";
import VideoModal from "@/components/work/VideoModal";
import { isTodo, type Testimonial } from "@/content/work";
import { useLang } from "@/components/LanguageProvider";

type TestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

// Premium dark testimonial card: circular photo, full name, business,
// one-line quote. Works on both charcoal and cream sections. While the
// real quote / name / photo are still TODO in content/work.ts, it renders
// a tasteful, honest placeholder rather than inventing a testimonial.
export default function TestimonialCard({
  testimonial,
  className = "",
}: TestimonialCardProps) {
  const { t } = useLang();
  const { name, business, quote, photo } = testimonial;
  const hasQuote = !isTodo(quote);
  const hasName = !isTodo(name);
  const hasPhoto = !isTodo(photo);

  return (
    <figure
      className={`w-full rounded-2xl border border-[rgba(212,168,83,0.22)] bg-[rgba(13,11,9,0.6)] p-6 backdrop-blur-sm sm:p-7 ${className}`}
    >
      {/* TODO (content/work.ts -> testimonials[]): real one-line quote, full name, and circular photo. */}
      <span
        aria-hidden="true"
        className="font-serif text-4xl leading-[0] text-[#D4A853]"
      >
        &ldquo;
      </span>

      <blockquote className="mt-2">
        <p
          className={`text-[15px] leading-relaxed sm:text-base ${
            hasQuote ? "text-[#F5F0E8]/85" : "text-[#F5F0E8]/40"
          }`}
        >
          {hasQuote ? quote : t.testimonial.placeholderQuote}
        </p>
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3.5">
        <span className="relative inline-flex h-11 w-11 flex-none items-center justify-center overflow-hidden rounded-full border border-[rgba(212,168,83,0.35)] bg-[rgba(212,168,83,0.08)]">
          {hasPhoto ? (
            <Image
              src={photo}
              alt={hasName ? name : business}
              width={44}
              height={44}
              className="h-11 w-11 object-cover"
            />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 12.5a4 4 0 100-8 4 4 0 000 8zM5.5 20a6.5 6.5 0 0113 0"
                stroke="#D4A853"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
        <span className="min-w-0">
          <span className="block font-display text-sm font-bold text-[#F5F0E8]">
            {hasName ? name : t.testimonial.verifiedClient}
          </span>
          <span className="block text-xs text-[#F5F0E8]/55">{business}</span>
        </span>
      </figcaption>

      {testimonial.loom !== undefined && (
        <div className="mt-5">
          {/* TODO: 30s Loom embed URL (content/work.ts -> testimonials[].loom) */}
          <VideoModal
            src={testimonial.loom}
            title={`${business}, ${t.testimonial.inTheirWords}`}
            label={t.testimonial.watchClip}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4A853] underline-offset-4 transition-colors hover:underline"
          />
        </div>
      )}
    </figure>
  );
}
