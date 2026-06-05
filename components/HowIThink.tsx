import Link from "next/link";
import Reveal from "@/components/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Research",
    body: "I start by finding where customers slip to competitors, and what it costs. No build begins before I know the gap.",
  },
  {
    n: "02",
    title: "Build",
    body: "I build the whole system, not a piece of it. Site, visibility, ads, and follow-up, made to work as one.",
  },
  {
    n: "03",
    title: "Prove",
    body: "I measure one number: qualified calls on the calendar. Every call, cost, and source sits on one dashboard.",
  },
  {
    n: "04",
    title: "Optimize",
    body: "I improve it every month. The system gets sharper the longer it runs.",
  },
];

// Recruiter path: a short, first-person read on how I work, placed right after
// the Work. Serves a hiring manager without diluting the sales page.
export default function HowIThink() {
  return (
    <section
      id="how-i-think"
      className="scroll-mt-24 px-6 py-24 sm:py-32"
      style={{
        backgroundColor: "#0D0B09",
        color: "#F5F0E8",
        borderBottom: "1px solid #2A2318",
      }}
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 max-w-2xl">
          <p
            className="mb-4 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "#D4A853" }}
          >
            For hiring teams
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(28px, 4.2vw, 46px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
            }}
          >
            How I think.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#F5F0E8]/70">
            Hiring me, or hiring my system. Either way, this is how I work.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={(i % 4) * 0.06}>
              <div
                className="h-full rounded-2xl border p-6"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
              >
                <span
                  className="font-display text-sm font-bold"
                  style={{ color: "#D4A853" }}
                >
                  {step.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#F5F0E8]/65">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link
            href="/work/triple-w-rentals"
            className="text-sm font-semibold text-[#D4A853] underline-offset-4 hover:underline"
          >
            See a full build, start to finish →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
