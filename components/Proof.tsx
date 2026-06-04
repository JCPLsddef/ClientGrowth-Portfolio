import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

type Result = { client: string; result: string; featured?: boolean };

const RESULTS: Result[] = [
  {
    client: "Real estate broker · Texas",
    result: "From invisible to #1 in Google impression share in his market.",
    featured: true,
  },
  {
    client: "Triple W Rentals",
    result:
      "$41,085 in 30 days from $900 in ad spend. 46x return, around $33 per qualified call.",
  },
  {
    client: "Elite Barbershop",
    result: "90 new clients in 90 days. Site, ads, and SEO compounding together.",
  },
  {
    client: "Culture Barbershop",
    result: "A fully custom site that finally matches the quality of the cuts.",
  },
  {
    client: "Absolute Painting · Dallas-Fort Worth",
    result: "Website and Google Ads in a crowded Texas market.",
  },
  {
    client: "Centre Dentaire Saint-Élzéar",
    result: "A clinic site built to book appointments, not just sit there.",
  },
];

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
      id="results"
      className="px-6 py-24 sm:py-32"
      style={{ backgroundColor: "#ECE6DB" }}
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 text-center sm:mb-16">
          <p
            className="mb-4 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "#B8893B" }}
          >
            Results
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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {RESULTS.map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <div
                className="h-full rounded-2xl bg-white p-7"
                style={{
                  border: r.featured
                    ? "1px solid rgba(212,168,83,0.5)"
                    : "1px solid rgba(20,17,13,0.07)",
                  boxShadow: r.featured
                    ? "0 10px 40px rgba(212,168,83,0.12)"
                    : "0 4px 20px rgba(20,17,13,0.04)",
                }}
              >
                {r.featured && (
                  <span
                    className="mb-3 inline-flex rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                    style={{ backgroundColor: "rgba(212,168,83,0.14)", color: "#B8893B" }}
                  >
                    Signature result
                  </span>
                )}
                <p className="font-display text-xl font-bold leading-snug text-ink">
                  {r.result}
                </p>
                <p className="mt-4 text-sm font-medium text-ink-soft">{r.client}</p>
              </div>
            </Reveal>
          ))}
        </div>
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
