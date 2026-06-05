import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import SpotlightField from "@/components/SpotlightField";

const PILLARS = [
  {
    n: "01",
    title: "Conversion website",
    body: "A premium site built around one job: turning visitors into booked calls.",
  },
  {
    n: "02",
    title: "Local SEO and GEO",
    body: "You show up first on Google, and inside AI answers when people ask for the best in your area.",
  },
  {
    n: "03",
    title: "Google Ads",
    body: "Qualified buyers in front of you the day we go live. The same system that returned 46x for Triple W.",
  },
  {
    n: "04",
    title: "AI follow-up and receptionist",
    body: "Every lead answered in seconds, day or night. You stop losing customers to a missed call.",
  },
  {
    n: "05",
    title: "Lead capture and tracking",
    body: "Every call, cost, and source on one dashboard. You always know what is working.",
  },
];

export default function GrowthSystem() {
  return (
    <section id="system" className="bg-night px-6 py-24 text-white sm:py-36">
      <SpotlightField className="mx-auto max-w-5xl">
        <div className="relative z-10">
          <Reveal className="mb-14 max-w-2xl">
            <SectionLabel index="04" tone="dark" className="mb-6">
              The system
            </SectionLabel>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(30px, 4.5vw, 52px)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.12,
              }}
            >
              One system. Built to make you unignorable.
            </h2>
            <p
              className="mt-5 text-lg"
              style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}
            >
              Most businesses buy these one at a time, from different people, and the
              pieces never talk to each other. I build them as one machine, so each
              part makes the next one stronger.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
            {PILLARS.map((p, i) => {
              const flagship = i === 0;
              return (
                <Reveal
                  key={p.n}
                  delay={(i % 3) * 0.06}
                  className={
                    flagship ? "md:col-span-2 lg:col-span-4" : "lg:col-span-2"
                  }
                >
                  <div
                    className={`h-full rounded-2xl border p-7 transition duration-300 hover:-translate-y-1 ${
                      flagship
                        ? "border-gold/25 bg-gradient-to-br from-white/[0.06] to-white/[0.02] hover:border-gold/50"
                        : "border-white/10 bg-white/[0.03] hover:border-gold/40"
                    }`}
                  >
                    <span className="font-mono text-sm font-bold text-gold">
                      {p.n}
                    </span>
                    <h3
                      className={`mt-3 font-display font-bold ${
                        flagship ? "text-2xl" : "text-xl"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-white/65">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-10 text-center">
            <p className="text-lg font-medium text-gold">
              Built once. Improved every month. The last marketing system you will
              need to think about.
            </p>
          </Reveal>
        </div>
      </SpotlightField>
    </section>
  );
}
