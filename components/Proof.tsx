import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Magnetic from "@/components/Magnetic";
import SectionLabel from "@/components/SectionLabel";
import WorkGrid from "@/components/work/WorkGrid";
import TestimonialCard from "@/components/work/TestimonialCard";
import { testimonialFor } from "@/content/work";

type Stat = {
  end?: number;
  prefix?: string;
  suffix?: string;
  staticValue?: string;
  label: string;
};

// 46x, $41,085, and 90 count up on scroll; "#1" stays a literal rank
// (counting "#0 -> #1" would look wrong). Labels are unchanged.
const STATS: Stat[] = [
  { end: 46, suffix: "x", label: "Return on ad spend" },
  { end: 41085, prefix: "$", label: "In 30 days · Triple W" },
  { end: 90, label: "Clients in 90 days · Elite" },
  { staticValue: "#1", label: "Impression share · Texas" },
];

export default function Proof() {
  const afterStats = testimonialFor("afterStats");
  const inWork = testimonialFor("inWork");

  return (
    <section
      id="work"
      className="scroll-mt-24 px-6 py-24 sm:py-32"
      style={{ backgroundColor: "#ECE6DB" }}
    >
      {/* Back-compat anchor so old /#results links still land here */}
      <span id="results" aria-hidden="true" className="block scroll-mt-24" />
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 sm:mb-16">
          <SectionLabel index="01" className="mb-6">
            Work
          </SectionLabel>
          <h2
            className="max-w-3xl font-display"
            style={{
              fontSize: "clamp(30px, 4.5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            I would rather show you than tell you.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">
            Real clients, real numbers, and the system behind each one.
          </p>
        </Reveal>

        <div className="mb-14 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-ink/10 py-10 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="text-center">
              <div
                className="flex items-center justify-center font-display font-extrabold tabular-nums"
                style={{
                  fontSize: "clamp(34px, 4.4vw, 54px)",
                  color: "#B8893B",
                  lineHeight: 1.1,
                  minHeight: "1.2em",
                }}
              >
                {stat.staticValue ?? (
                  <CountUp end={stat.end!} prefix={stat.prefix} suffix={stat.suffix} />
                )}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.12em] text-ink-soft">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>

        {afterStats && (
          <Reveal className="mx-auto mb-12 flex max-w-xl justify-center">
            <TestimonialCard testimonial={afterStats} />
          </Reveal>
        )}

        <WorkGrid />

        {inWork && (
          <Reveal className="mx-auto mt-12 flex max-w-xl justify-center">
            <TestimonialCard testimonial={inWork} />
          </Reveal>
        )}

        <Reveal className="mt-14 text-center">
          <Magnetic>
            <a
              href="#audit"
              className="cta-shine inline-block rounded-full px-7 py-3.5 text-sm font-semibold text-night transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: "#D4A853" }}
            >
              Get results like these → Free Visibility Audit
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
