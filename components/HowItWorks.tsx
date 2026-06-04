import Reveal from "@/components/Reveal";

const STEPS = [
  {
    n: "1",
    title: "Free Visibility Audit",
    body: "I show you exactly where customers are slipping to competitors, and what it is costing you. No charge, no obligation.",
  },
  {
    n: "2",
    title: "I build your system",
    body: "Website, visibility, ads, and follow-up, built as one system and live in weeks.",
  },
  {
    n: "3",
    title: "You become the obvious choice",
    body: "Qualified calls come in. You focus on the work. I keep optimizing every month.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 text-center">
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(30px, 4.5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
            }}
          >
            Three steps. I do the work.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="text-center md:text-left">
                <span
                  className="font-display text-5xl font-extrabold"
                  style={{ color: "#D4A853" }}
                >
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <p className="text-lg font-medium text-ink">
            You keep full control of your business. I run the machine that feeds
            it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
