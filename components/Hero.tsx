import Reveal from "@/components/Reveal";
import BlurText from "@/components/BlurText";
import LogoMarquee from "@/components/LogoMarquee";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(212,168,83,0.14), rgba(246,242,235,0) 70%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-20 text-center sm:pt-28">
        <Reveal>
          <p
            className="mb-6 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: "#B8893B" }}
          >
            Growth systems for local service businesses
          </p>
        </Reveal>
        <h1
          className="font-display font-extrabold leading-[0.98] tracking-tight"
          style={{ fontSize: "clamp(40px, 7vw, 84px)" }}
        >
          <BlurText
            text="Become the obvious choice in your market."
            highlightWords={["obvious", "choice"]}
            highlightClassName="shiny-gold"
          />
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
            You built a business worth choosing. Online, a weaker competitor
            still looks easier to trust. I fix that. I build the website, the
            Google visibility, and the follow-up that make the right customers
            find you first and call you already sold.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#audit"
              className="cta-shine rounded-full px-7 py-3.5 text-sm font-semibold text-night transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: "#D4A853" }}
            >
              Get your free Visibility Audit
            </a>
            <a
              href="#apply"
              className="text-sm font-semibold text-ink underline-offset-4 hover:underline"
            >
              Apply to be a Partner →
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-16">
            <LogoMarquee
              items={[
                "Triple W Rentals",
                "Elite Barbershop",
                "Culture Barbershop",
                "Absolute Painting",
                "Nancy · TX Real Estate",
                "Centre Dentaire Saint-Élzéar",
              ]}
            />
          </div>
          <p className="mt-6 text-sm" style={{ color: "#B8893B" }}>
            $41,085 in 30 days, from $900 in ad spend.{" "}
            <strong className="font-semibold">46x return.</strong>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
