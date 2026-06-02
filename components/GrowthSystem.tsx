import Reveal from "@/components/Reveal";

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
    <section
      id="system"
      style={{ backgroundColor: "#0D0B09", color: "#ffffff" }}
      className="px-6 py-24 sm:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 max-w-2xl">
          <p
            className="mb-4 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "#D4A853" }}
          >
            The Growth Architecture
          </p>
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal
              key={i}
              delay={(i % 3) * 0.06}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <div
                className="h-full rounded-2xl border border-[rgba(255,255,255,0.08)] p-7 transition-colors duration-200 hover:border-[rgba(212,168,83,0.4)]"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <span
                  className="font-display text-sm font-bold"
                  style={{ color: "#D4A853" }}
                >
                  {p.n}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold">{p.title}</h3>
                <p
                  className="mt-2 text-base"
                  style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}
                >
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <p className="text-lg font-medium" style={{ color: "#D4A853" }}>
            Built once. Improved every month. The last marketing system you will
            need to think about.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
