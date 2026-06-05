import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Magnetic from "@/components/Magnetic";
import SectionLabel from "@/components/SectionLabel";
import SpotlightField from "@/components/SpotlightField";
import VideoModal from "@/components/work/VideoModal";
import { tripleW, isTodo } from "@/content/work";

export const metadata: Metadata = {
  title: "Triple W Rentals, 46x return on ad spend | Client Growth",
  description:
    "How I took Triple W Rentals from $900 in ad spend to $41,085 in 30 days. A 46x return, at around $33 per qualified call.",
};

const BUILT = [
  {
    title: "A conversion website",
    body: "A premium site built around one job: turning visitors into booked calls.",
  },
  {
    title: "Local visibility",
    body: "Search and map presence so Triple W showed up first when people looked for what it offered.",
  },
  {
    title: "Google Ads",
    body: "Qualified buyers in front of the business the day it went live, with spend pointed only at real purchase intent.",
  },
  {
    title: "Tracking on every call",
    body: "Every call, cost, and source on one dashboard, so I always knew what was working.",
  },
];

export default function TripleWCaseStudy() {
  const hasQuote = !isTodo(tripleW.quote);
  const hasName = !isTodo(tripleW.quoteName);
  const hasLoom = !isTodo(tripleW.loom);
  const showWords = hasQuote || hasLoom;
  const showBeforeAfter =
    !isTodo(tripleW.beforeShot) || !isTodo(tripleW.afterShot);

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
              ← Back to the work
            </Link>
            <p
              className="mt-8 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "#D4A853" }}
            >
              Case study
            </p>
            <h1
              className="mt-4 font-display font-extrabold leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(36px, 6vw, 68px)" }}
            >
              Triple W Rentals
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#F5F0E8]/75">
              $900 in ad spend became $41,085 in 30 days. A 46x return, at around
              $33 per qualified call. Here is exactly how I built it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 1. The problem */}
      <section className="px-6 py-20 sm:py-28" style={{ backgroundColor: "#ECE6DB" }}>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionLabel index="01" className="mb-6">
              The problem
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
              Good business. Invisible at the moment that mattered.
            </h2>
          </Reveal>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
            <Reveal delay={0.06}>
              <p>
                Triple W had the inventory, the service, and the reviews to win.
                Online, none of that showed up when it counted.{" "}
                {/* TODO: 1 to 2 specific lines about Triple W's before state (what they rent, where, what it was costing them) */}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>
                Customers searched, compared in seconds, and called whoever looked
                safest to trust. That was rarely the best option. It was the most
                visible one.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                Money spent on ads leaked straight through a site that was never
                built to convert. Clicks came in. Calls did not.
              </p>
            </Reveal>
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
                What I built
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
                One system, built in the right order.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#F5F0E8]/70">
                I did not run ads into a weak site and hope. I built the machine
                first, then turned on the traffic.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {BUILT.map((piece, i) => (
                <Reveal key={piece.title} delay={(i % 2) * 0.08}>
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
                Each piece made the next one stronger. The ads converted because the
                site was built to close. The spend stayed efficient because the
                tracking showed exactly where every dollar went.
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
                The result
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
              $900 in. $41,085 out. In 30 days.
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 border-y border-ink/10 py-10 sm:grid-cols-3">
              {(
                [
                  { end: 41085, prefix: "$", label: "Revenue in 30 days" },
                  { end: 46, suffix: "x", label: "Return on ad spend" },
                  { end: 33, prefix: "$", label: "Per qualified call" },
                ] as { end: number; prefix?: string; suffix?: string; label: string }[]
              ).map((s) => (
                <div key={s.label} className="text-center">
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
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-base font-medium text-ink-soft">
              From $900 in ad spend. Same business, same owner, a system that
              finally matched how good the work already was.
            </p>
          </Reveal>

          {/* Before / after */}
          {showBeforeAfter && (
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { label: "Before", shot: tripleW.beforeShot },
                { label: "After", shot: tripleW.afterShot },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 0.08}>
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
                            Screenshot coming
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
                In his words
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
                    {hasName ? tripleW.quoteName : "Owner"}
                    <span className="text-[#F5F0E8]/55"> · Triple W Rentals</span>
                  </p>
                </>
              )}
            </Reveal>
            {hasLoom && (
              <Reveal delay={0.1} className="mt-8 flex justify-center">
                <VideoModal
                  src={tripleW.loom}
                  title="Triple W Rentals, in his words"
                  label="Watch the 30 second clip"
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
              You want the same system.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#F5F0E8]/70">
              I build it once, then improve it every month. If your business is
              good and invisible, that is the exact gap I close.
            </p>
            <Magnetic className="mt-8 inline-block">
              <Link
                href="/#audit"
                className="cta-shine inline-block rounded-full px-7 py-3.5 text-sm font-semibold text-night transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: "#D4A853" }}
              >
                Get your free Visibility Audit
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
