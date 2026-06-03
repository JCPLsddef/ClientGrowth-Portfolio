import clsx from "clsx";

// Client Growth proof clients (mirrors the homepage LogoMarquee).
const CLIENTS = [
  "Triple W Rentals",
  "Elite Barbershop",
  "Culture Barbershop",
  "Absolute Painting",
  "Nancy · TX Real Estate",
  "Centre Dentaire Saint-Élzéar",
];

const FUIHeroWithBorders = () => {
  return (
    <section
      id="top"
      className="relative min-h-[calc(100vh-50px)] overflow-hidden bg-[linear-gradient(to_bottom,#0D0B09,#14110D_40%,#4A371A_74%,#D4A853_88%)]"
    >
      {/* Glowing orb — charcoal core, champagne-gold rim */}
      <div className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)] h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[100%] -translate-x-1/2 rounded-[100%] border-[#D4A853] bg-night bg-[radial-gradient(closest-side,#0D0B09_82%,#D4A853)]" />

      {/* Vertical guide lines */}
      <div className="absolute left-0 top-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b border-white/10">
        <div className="col-span-1 flex h-full items-center justify-center" />
        <div className="col-span-1 flex h-full items-center justify-center border-x border-white/10" />
        <div className="col-span-1 flex h-full items-center justify-center" />
      </div>

      {/* Soft gold glow figures */}
      <figure className="pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full bg-[#D4A853]/30 blur-[200px]" />
      <figure className="pointer-events-none absolute left-[4vw] top-[64px] z-20 hidden aspect-square w-[32vw] rounded-full bg-[#F5F0E8]/10 opacity-60 blur-[100px] md:block" />
      <figure className="pointer-events-none absolute bottom-[-50px] right-[7vw] z-20 hidden aspect-square w-[30vw] rounded-full bg-[#D4A853]/15 opacity-60 blur-[100px] md:block" />

      <div className="relative z-10 flex flex-col divide-y divide-white/10 pt-[35px]">
        {/* Eyebrow */}
        <div className="flex flex-col items-center justify-end">
          <div className="flex max-w-[88vw] items-center gap-2 !border !border-b-0 border-white/10 px-4 py-2">
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4A853] sm:text-xs">
              Growth systems for local service businesses
            </p>
          </div>
        </div>

        {/* Headline + subheadline */}
        <div>
          <div className="mx-auto flex min-h-[288px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-5 px-2 py-10 sm:px-10 lg:px-24">
            <h1
              className="font-display text-pretty text-center font-extrabold leading-[0.98] tracking-tight text-[#F5F0E8] md:max-w-screen-lg"
              style={{ fontSize: "clamp(40px, 7vw, 84px)" }}
            >
              Become the <span className="shiny-gold">obvious</span>{" "}
              <span className="shiny-gold">choice</span> in your market.
            </h1>
            <h2 className="max-w-2xl text-pretty text-center text-base leading-relaxed text-[#F5F0E8]/75 md:text-lg">
              You built a business worth choosing. Online, a weaker competitor
              still looks easier to trust. I fix that. I build the website, the
              Google visibility, and the follow-up that make the right customers
              find you first and call you already sold.
            </h2>
          </div>
        </div>

        {/* CTAs — solid-gold pill + text link (brand) */}
        <div className="flex items-center justify-center px-8 py-8 sm:px-24">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#audit"
              className={clsx(
                "cta-shine rounded-full px-7 py-3.5 text-sm font-semibold text-night",
                "transition-transform hover:scale-[1.03]",
              )}
              style={{ backgroundColor: "#D4A853" }}
            >
              Get your free Visibility Audit
            </a>
            <a
              href="#apply"
              className="text-sm font-semibold text-[#F5F0E8] underline-offset-4 hover:underline"
            >
              Apply to be a Partner →
            </a>
          </div>
        </div>

        {/* Client marquee + proof line */}
        <div className="mx-auto w-full max-w-7xl">
          <AnimatedClientCloud />
          <p className="pb-10 text-center text-sm text-[#D4A853]">
            $41,085 in 30 days, from $900 in ad spend.{" "}
            <strong className="font-semibold">46x return.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FUIHeroWithBorders;

const AnimatedClientCloud = () => {
  return (
    <div className="w-full pt-10">
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group relative flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 animate-x-slider flex-row items-center justify-around gap-6"
              >
                {CLIENTS.map((name, key) => (
                  <span
                    key={key}
                    className="flex-none whitespace-nowrap px-2 font-display text-base font-semibold tracking-tight text-[#F5F0E8]/55"
                  >
                    {name}
                  </span>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
