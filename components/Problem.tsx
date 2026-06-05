import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import SpotlightField from "@/components/SpotlightField";
import SeenWord from "@/components/SeenWord";

export default function Problem() {
  return (
    <section className="bg-night px-6 py-24 text-white sm:py-36">
      <SpotlightField className="mx-auto max-w-3xl">
        <div className="relative z-10">
          <Reveal>
            <SectionLabel index="01" tone="dark" className="mb-8">
              The cost of being invisible
            </SectionLabel>
          </Reveal>
          <Reveal>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(30px, 4.5vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
              }}
            >
              Your competitors aren&apos;t better than you. They&apos;re just
              better at being <SeenWord>seen.</SeenWord>
            </h2>
          </Reveal>
          <div
            className="mt-10 flex flex-col gap-6"
            style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}
          >
            <Reveal delay={0.05}>
              <p>
                You know your work is better. The customers who actually hire you
                know it too.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                But most people never get that far. They search, they compare, and
                they decide in seconds, before they ever call. They don&apos;t pick
                the best business. They pick the one that looks safest to trust.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                So a newer, weaker shop with a sharper website and a stronger
                Google presence takes the call that should have been yours. Not
                because they earned it. Because they showed up and you didn&apos;t.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ color: "#ffffff", fontWeight: 500 }}>
                Every month you stay hard to find, that keeps happening. Quietly.
                You never see the customers you lost, because they never knew you
                existed.
              </p>
            </Reveal>
          </div>
        </div>
      </SpotlightField>
    </section>
  );
}
