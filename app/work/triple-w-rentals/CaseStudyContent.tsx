"use client";

import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Magnetic from "@/components/Magnetic";
import SectionLabel from "@/components/SectionLabel";
import SpotlightField from "@/components/SpotlightField";
import VideoModal from "@/components/work/VideoModal";
import { tripleW, isTodo } from "@/content/work";
import { useLang } from "@/components/LanguageProvider";

export default function CaseStudyContent() {
  const { t } = useLang();
  const c = t.caseStudy;

  const hasQuote = !isTodo(tripleW.quote);
  const hasName = !isTodo(tripleW.quoteName);
  const hasLoom = !isTodo(tripleW.loom);
  const showWords = hasQuote || hasLoom;
  const showBeforeAfter =
    !isTodo(tripleW.beforeShot) || !isTodo(tripleW.afterShot);

  const resultStats: {
    end: number;
    prefix?: string;
    suffix?: string;
  }[] = [
    { end: 41085, prefix: "$" },
    { end: 46, suffix: "x" },
    { end: 33, prefix: "$" },
  ];

  return (
    <main className="min-h-screen">
      <Nav />

      {/* Intro */}
      <section
        className="scroll-mt-24 px-6 pb-20 pt-16 sm:pb-24 sm:pt-20"
        style={{ backgroundColor: "#0D0B09", color: "#F5F0E8" }}
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Link
              href="/#work"
              className="text-sm font-semibold text-[#A69D8D] underline-offset-4 transition-colors hover:text-[#F5F0E8]"
            >
              {c.back}
            </Link>
            <p
              className="mt-8 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "#D4A853" }}
            >
              {c.eyebrow}
            </p>
            <h1
              className="mt-4 font-display font-extrabold leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(36px, 6vw, 68px)" }}
            >
              {c.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#F5F0E8]/75">
              {c.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 1. The problem */}
      <section className="px-6 py-20 sm:py-28" style={{ backgroundColor: "#ECE6DB" }}>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionLabel index="01" className="mb-6">
              {c.problemLabel}
            </SectionLabel>
            <h2
              className="font-display text-ink"
              style={{
                fontSize: "clamp(28px, 4.2vw, 46px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.12,
              }}
            >
              {c.problemHeadline}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
            {c.problemParagraphs.map((para, i) => (
              <Reveal key={i} delay={0.06 + i * 0.06}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2. What I built */}
      <section
        className="px-6 py-20 sm:py-28"
        style={{ backgroundColor: "#0D0B09", color: "#F5F0E8" }}
      >
        <SpotlightField className="mx-auto max-w-4xl">
          <div className="relative z-10">
            <Reveal className="max-w-2xl">
              <SectionLabel index="02" tone="dark" className="mb-6">
                {c.builtLabel}
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
                {c.builtHeadline}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#F5F0E8]/70">
                {c.builtSub}
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {c.built.map((piece, i) => (
                <Reveal key={i} delay={(i % 2) * 0.08}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-gold/40">
                    <span className="font-mono text-sm font-bold text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-bold">
                      {piece.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-[#F5F0E8]/65">
                      {piece.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8">
              <p className="max-w-2xl text-lg leading-relaxed text-[#F5F0E8]/70">
                {c.builtClosing}
              </p>
            </Reveal>
          </div>
        </SpotlightField>
      </section>

      {/* 3. The result */}
      <section className="px-6 py-20 sm:py-28" style={{ backgroundColor: "#ECE6DB" }}>
        <div className="mx-auto max-w-5xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-gold-deep">
                03
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
                {c.resultLabel}
              </span>
            </div>
            <h2
              className="font-display text-ink"
              style={{
                fontSize: "clamp(28px, 4.5vw, 50px)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
              }}
            >
              {c.resultHeadline}
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 border-y border-ink/10 py-10 sm:grid-cols-3">
              {resultStats.map((s, i) => (
                <div key={i} className="text-center">
                  <div
                    className="flex items-center justify-center font-display font-extrabold tabular-nums"
                    style={{
                      fontSize: "clamp(34px, 4.4vw, 54px)",
                      color: "#B8893B",
                      lineHeight: 1.1,
                      minHeight: "1.2em",
                    }}
                  >
                    <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.12em] text-ink-soft">
                    {c.resultStats[i]}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-base font-medium text-ink-soft">
              {c.resultNote}
            </p>
          </Reveal>

          {/* Before / after */}
          {showBeforeAfter && (
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { label: c.before, shot: tripleW.beforeShot },
                { label: c.after, shot: tripleW.afterShot },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <figure
                    className="overflow-hidden rounded-xl bg-white"
                    style={{ border: "1px solid rgba(20,17,13,0.12)" }}
                  >
                    <figcaption
                      className="border-b px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-ink-soft"
                      style={{ borderColor: "rgba(20,17,13,0.08)" }}
                    >
                      {item.label}
                    </figcaption>
                    <div
                      className="relative aspect-[16/10] w-full"
                      style={{ backgroundColor: "#0D0B09" }}
                    >
                      {isTodo(item.shot) ? (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-[10px] uppercase tracking-[0.18em] text-[#756D63]">
                            {t.work.screenshotComing}
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={item.shot}
                          alt={`Triple W Rentals, ${item.label.toLowerCase()}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover object-top"
                        />
                      )}
                    </div>
                  </figure>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. In his words */}
      {showWords && (
        <section
          className="px-6 py-20 sm:py-28"
          style={{ backgroundColor: "#14110D", color: "#F5F0E8" }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p
                className="mb-6 text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#D4A853" }}
              >
                {c.wordsLabel}
              </p>
              {hasQuote && (
                <>
                  <blockquote>
                    <p
                      className="font-display font-bold leading-snug text-[#F5F0E8]"
                      style={{ fontSize: "clamp(22px, 3.2vw, 34px)" }}
                    >
                      {tripleW.quote}
                    </p>
                  </blockquote>
                  <p className="mt-6 text-sm font-semibold text-[#F5F0E8]">
                    {hasName ? tripleW.quoteName : c.owner}
                    <span className="text-[#F5F0E8]/55"> · Triple W Rentals</span>
                  </p>
                </>
              )}
            </Reveal>
            {hasLoom && (
              <Reveal delay={0.1} className="mt-8 flex justify-center">
                <VideoModal
                  src={tripleW.loom}
                  title={`Triple W Rentals, ${t.testimonial.inTheirWords}`}
                />
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* 5. CTA */}
      <section
        className="px-6 py-20 sm:py-28"
        style={{
          backgroundColor: "#0D0B09",
          color: "#F5F0E8",
          borderTop: "1px solid #2A2318",
        }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(30px, 4.5vw, 50px)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.12,
              }}
            >
              {c.ctaHeadline}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#F5F0E8]/70">
              {c.ctaSub}
            </p>
            <Magnetic className="mt-8 inline-block">
              <Link
                href="/#audit"
                className="cta-shine inline-block rounded-full px-7 py-3.5 text-sm font-semibold text-night transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: "#D4A853" }}
              >
                {c.cta}
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
