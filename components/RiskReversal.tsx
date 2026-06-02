import Reveal from "@/components/Reveal";

const OBJECTIONS = [
  {
    q: "“I have tried marketing before.”",
    a: "You tried pieces. This is a system. The clicks were real. The thing that was supposed to convert them was never built.",
  },
  {
    q: "“I know someone cheaper.”",
    a: "Cheaper builds you a thing. I build you a result, and I back it with the guarantee above.",
  },
  {
    q: "“Will I lose control?”",
    a: "No. You own every asset. I run the machine. You run the business.",
  },
];

export default function RiskReversal() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(30px, 4.5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
            }}
          >
            The risk is mine, not yours.
          </h2>
          <div
            className="mt-8 rounded-2xl p-8"
            style={{ backgroundColor: "#0D0B09", color: "#ffffff" }}
          >
            <div
              className="flex flex-col gap-4 text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              <p>
                <span style={{ color: "#D4A853", fontWeight: 600 }}>
                  If I do not produce a measurable result in your first 90 days,
                  you stop paying.
                </span>{" "}
                I keep working until I do. You keep every asset I have built for
                you, and you can ask for improvements anytime, free.
              </p>
              <p>
                I can promise that because I do not take clients I do not believe I
                can help. I review your business before I agree to work with you,
                not after you have paid. That is what the application is for.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="mt-10 flex flex-col gap-6">
          {OBJECTIONS.map((o, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div>
                <p className="font-display text-lg font-bold text-ink">{o.q}</p>
                <p className="mt-1 text-base leading-relaxed text-ink-soft">{o.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
