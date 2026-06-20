"use client";

import clsx from "clsx";
import LogoBar from "@/components/work/LogoBar";
import Reveal from "@/components/Reveal";
import WordReveal from "@/components/WordReveal";
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
        {/* Headline + subheadline */}
        <div>
          <div className="mx-auto flex min-h-[220px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-5 px-2 py-14 sm:min-h-[288px] sm:px-10 lg:px-24">
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

        {/* CTAs — primary gold pill scrolls to the audit form; the ghost
            secondary scrolls to the client results. */}
        <div className="flex flex-col items-center justify-center gap-4 px-5 py-8 sm:px-24">
          <Reveal delay={0.55}>
            <div className="w-full flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <a
                href="#audit"
                className={clsx(
                  "cta-shine flex items-center justify-center rounded-full px-9 py-4 text-base font-bold text-night",
                  "transition-[transform,filter] duration-200 hover:scale-[1.01] hover:brightness-[1.04]",
                )}
                style={{ backgroundColor: "#D4A853" }}
              >
                {hero.ctaPrimary}
              </a>
              <a
                href="#work"
                className="flex items-center justify-center rounded-full border border-[#F5F0E8]/25 px-7 py-3.5 text-sm font-semibold text-[#F5F0E8]/90 transition-colors hover:border-[#D4A853]/60 hover:text-[#D4A853]"
              >
                {hero.ctaSecondary}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Client logo bar */}
        <div className="mx-auto w-full max-w-7xl">
          <p className="px-4 pt-8 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F5F0E8]/50">
            {hero.logosLabel}
          </p>
          <div className="w-full px-4 pt-5 pb-10 md:px-8">
            <LogoBar />
          </div>
        </div>
      </div>

    </section>
  );
};

export default FUIHeroWithBorders;
