"use client";

import clsx from "clsx";
import LogoBar from "@/components/work/LogoBar";
import Reveal from "@/components/Reveal";
import WordReveal from "@/components/WordReveal";
import Magnetic from "@/components/Magnetic";
import { useLang } from "@/components/LanguageProvider";

const FUIHeroWithBorders = () => {
  const { t } = useLang();
  const hero = t.hero;
  return (
    <section
      id="top"
      className="relative min-h-[calc(100svh-50px)] overflow-hidden bg-[linear-gradient(to_bottom,#0D0B09,#14110D_40%,#4A371A_74%,#D4A853_88%)] md:min-h-[calc(100vh-50px)]"
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
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4A853]" aria-hidden="true" />
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4A853] sm:text-xs">
              {hero.eyebrow}
            </p>
          </div>
        </div>

        {/* Headline + subheadline */}
        <div>
          <div className="mx-auto flex min-h-[220px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-5 px-2 py-10 sm:min-h-[288px] sm:px-10 lg:px-24">
            <h1
              className="font-display text-pretty text-center font-extrabold leading-[0.95] tracking-[-0.02em] text-[#F5F0E8] md:max-w-screen-lg"
              style={{ fontSize: "clamp(44px, 8vw, 92px)" }}
            >
              <WordReveal
                text={hero.headline}
                highlight={hero.highlight}
                highlightClassName="shiny-gold"
              />
            </h1>
            <Reveal delay={0.45}>
              <h2 className="max-w-2xl text-pretty text-center text-base leading-relaxed text-[#F5F0E8]/75 md:text-lg">
                {hero.subhead}
              </h2>
            </Reveal>
          </div>
        </div>

        {/* CTAs — magnetic solid-gold pill + text link (brand) */}
        <div className="flex flex-col items-center justify-center gap-4 px-8 py-8 sm:px-24">
          <Reveal delay={0.55}>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Magnetic>
                <a
                  href="#audit"
                  className={clsx(
                    "cta-shine block rounded-full px-7 py-3.5 text-sm font-semibold text-night",
                    "transition-transform hover:scale-[1.03]",
                  )}
                  style={{ backgroundColor: "#D4A853" }}
                >
                  {hero.ctaPrimary}
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="#apply"
                  className="block text-sm font-semibold text-[#F5F0E8] underline-offset-4 transition-colors hover:text-azure hover:underline"
                >
                  {hero.ctaSecondary}
                </a>
              </Magnetic>
            </div>
          </Reveal>
          <Reveal delay={0.65}>
            <div className="flex flex-col items-center gap-1.5 text-center">
              {/* Mechanism, in one line. Doubles as a craft signal for hiring teams. */}
              <p className="max-w-xl text-sm text-[#F5F0E8]/70">
                {hero.mechanism}
              </p>
              <p className="max-w-md text-sm text-[#F5F0E8]/55">
                {hero.mechanism2}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Client logo bar + proof line */}
        <div className="mx-auto w-full max-w-7xl">
          {/* TODO: swap the business-name wordmarks for real monochrome client logo SVGs (content/work.ts -> client.logo) */}
          <div className="w-full px-4 pt-10 md:px-8">
            <LogoBar />
          </div>
          <p className="pb-10 pt-8 text-center text-sm text-[#D4A853]">
            {hero.proofPrefix}
            <strong className="font-semibold">{hero.proofStrong}</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FUIHeroWithBorders;
