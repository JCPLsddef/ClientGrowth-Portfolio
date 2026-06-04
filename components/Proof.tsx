import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import WorkGrid from "@/components/work/WorkGrid";

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
  return (
    <section
      id="work"
      className="scroll-mt-24 px-6 py-24 sm:py-32"
      style={{ backgroundColor: "#ECE6DB" }}
    >
      {/* Back-compat anchor so old /#results links still land here */}
      <span id="results" aria-hidden="true" className="block scroll-mt-24" />
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 text-center sm:mb-16">
          <p
            className="mb-4 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "#B8893B" }}
          >
            Work
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(30px, 4.5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
            }}
          >
            I would rather show you than tell you.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            No theory. This is what happens when the system is built right.
          </p>
        </Reveal>

        <div className="mx-auto mb-14 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
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

        <WorkGrid />
        <Reveal className="mt-12 text-center">
          <a
            href="#audit"
            className="cta-shine inline-block rounded-full px-7 py-3.5 text-sm font-semibold text-night transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: "#D4A853" }}
          >
            Get results like these → Free Visibility Audit
          </a>
        </Reveal>
      </div>
    </section>
  );
}
