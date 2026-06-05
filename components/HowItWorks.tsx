import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

const STEPS = [
  {
    n: "01",
    title: "Free Visibility Audit",
    body: "I show you exactly where customers are slipping to competitors, and what it is costing you. No charge, no obligation.",
  },
  {
    n: "02",
    title: "I build your system",
    body: "Website, visibility, ads, and follow-up, built as one system and live in weeks.",
  },
  {
    n: "03",
    title: "You become the obvious choice",
    body: "Qualified calls come in. You focus on the work. I keep optimizing every month.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 max-w-2xl">
          <SectionLabel index="05" className="mb-6">
            How it works
          </SectionLabel>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(30px, 4.5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Three steps. I do the work.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-gold-deep">
                    {s.n}
                  </span>
                  <span aria-hidden="true" className="h-px flex-1 bg-ink/15" />
                </div>
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
