import Reveal from "@/components/Reveal";

export default function Reframe() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            You don&apos;t need more marketing. You need to become the obvious
            choice.
          </h2>
        </Reveal>
        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-6 text-lg leading-relaxed text-ink-soft">
          <Reveal delay={0.05}>
            <p>
              Most marketing throws traffic at a business that was never built to
              convert it. More clicks, more spend, more noise, same result.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              I work in the opposite order. First I make you the business that
              looks most credible the second someone finds you. Then I put
              qualified attention in front of it. Visibility, then trust, then the
              call.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-medium text-ink">
              That is the difference between renting attention and owning your
              market.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
