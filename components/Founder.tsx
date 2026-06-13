"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import SectionLabel from "@/components/SectionLabel";
import UnicornScene from "@/components/UnicornScene";
import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

type FounderCopy = {
  label: string;
  name1: string;
  name2: string;
  paragraphs: readonly string[];
  photoAlt: string;
  transitionQuote: string;
  transitionAttribution: string;
};

// Cinematic founder pull-quote: the trust transition into the bio. Replaces
// the old "JCPL" initials interstitial, which read as a private monogram to
// anyone who did not already know the founder.
function FounderQuote({ f }: { f: FounderCopy }) {
  return (
    <blockquote className="mx-auto max-w-3xl px-2 text-center">
      <p
        className="font-serif"
        style={{
          fontSize: "clamp(26px, 4.6vw, 52px)",
          lineHeight: 1.3,
          color: "var(--ink)",
        }}
      >
        <span aria-hidden="true" style={{ color: "#B8893B" }}>
          &ldquo;
        </span>
        {f.transitionQuote}
        <span aria-hidden="true" style={{ color: "#B8893B" }}>
          &rdquo;
        </span>
      </p>
      <footer className="mt-7 flex items-center justify-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-gold-deep/60" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
          {f.transitionAttribution}
        </span>
        <span aria-hidden="true" className="h-px w-8 bg-gold-deep/60" />
      </footer>
    </blockquote>
  );
}

// The founder card (name, story, photo). Shared by every layout, so the heavy
// UnicornScene only ever mounts once: exactly one layout is rendered at a time.
function FounderCard({ f }: { f: FounderCopy }) {
  return (
    <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-2">
      <div>
        <SectionLabel index="06" className="mb-4">
          {f.label}
        </SectionLabel>
        <h2
          className="font-display font-extrabold leading-[1.05] tracking-tight text-ink"
          style={{ fontSize: "clamp(28px, 4.2vw, 50px)" }}
        >
          {f.name1}
          <br />
          {f.name2}
        </h2>
        <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
          {f.paragraphs.map((para, i) => (
            <p
              key={i}
              className={
                i === f.paragraphs.length - 1 ? "font-medium text-ink" : undefined
              }
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      <div
        className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-2xl sm:max-w-sm"
        style={{ border: "1px solid rgba(212,168,83,0.4)" }}
      >
        <UnicornScene className="h-full w-full" alt={f.photoAlt} />
      </div>
    </div>
  );
}

// Reduced-motion: a normal, fully-scrollable section with no animation at all.
function FounderStatic({ f }: { f: FounderCopy }) {
  return (
    <section id="founder" className="relative bg-marble px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-5xl">
        <FounderCard f={f} />
      </Reveal>
    </section>
  );
}

// Mobile: the founder quote as a self-contained first screen that lifts and
// fades as you scroll past it — then the full card follows in normal flow, so
// the full name is always visible and nothing is ever clipped.
function FounderMobile({ f }: { f: FounderCopy }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const monoRef = useRef<HTMLDivElement>(null);

  // Drive the pinned quote straight from layout: each frame (while the track
  // is on screen) we read its real position and map it to shrink/lift/fade.
  // This does not depend on framer's useScroll, which was not updating
  // under Lenis on touch — so the animation now plays reliably on mobile.
  useEffect(() => {
    const track = trackRef.current;
    const mono = monoRef.current;
    if (!track || !mono) return;

    let raf = 0;
    let running = false;

    const ease = (a: number, b: number, x: number) => {
      const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
      return t * t * (3 - 2 * t); // smoothstep
    };

    const apply = () => {
      const rect = track.getBoundingClientRect();
      const sticky = mono.parentElement;
      // Use the sticky child's real height for the pin distance so progress is
      // correct even as the mobile address bar shows/hides.
      const childH = sticky
        ? sticky.getBoundingClientRect().height
        : window.innerHeight || 1;
      const distance = rect.height - childH;
      const p =
        distance > 0 ? Math.min(Math.max(-rect.top / distance, 0), 1) : 0;

      // Cinematic: holds briefly, then the quote lifts, shrinks slightly and
      // fades, finishing right as the pin ends so the card slides in.
      const scale = 1 - 0.12 * ease(0.12, 0.95, p);
      const ty = -10 * ease(0.12, 0.95, p); // vh, gentle lift
      const opacity = 1 - ease(0.5, 1, p);

      mono.style.transform = `translateY(${ty}vh) scale(${scale})`;
      mono.style.opacity = `${opacity}`;
    };

    const loop = () => {
      if (!running) return;
      apply();
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(track);
    apply(); // correct first paint even before the loop starts

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <section id="founder" className="relative bg-marble">
      {/* Act 1 — founder quote: pinned while it lifts and fades out. */}
      <div ref={trackRef} style={{ position: "relative", height: "190svh" }}>
        <div
          id="founder-intro"
          className="sticky top-0 flex items-center justify-center overflow-hidden px-6"
          style={{ height: "100svh" }}
        >
          <div ref={monoRef} style={{ willChange: "transform, opacity" }}>
            <FounderQuote f={f} />
          </div>
        </div>
      </div>

      {/* Act 2 — the full card, in flow: never clipped, full name visible.
          Pulled up so the text starts a bit higher as it slides in (the quote
          has faded to ~0 by then, so there is no visual overlap). */}
      <div className="px-6 pb-24" style={{ marginTop: "-10vh" }}>
        <Reveal className="mx-auto max-w-5xl">
          <FounderCard f={f} />
        </Reveal>
      </div>
    </section>
  );
}

// Desktop: the founder quote lifts away as the founder card rises in,
// both inside one pinned viewport (there is room for the full card here).
function FounderDesktop({ f }: { f: FounderCopy }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const monoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const monoY = useTransform(scrollYProgress, [0, 0.5], ["0vh", "-22vh"]);
  const monoOpacity = useTransform(scrollYProgress, [0, 0.32, 0.5], [1, 1, 0]);
  const revealOpacity = useTransform(scrollYProgress, [0.42, 0.66], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.42, 0.72], [48, 0]);

  return (
    <section
      id="founder"
      ref={ref}
      className="relative bg-marble"
      style={{ height: "230vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layer 1: founder pull quote */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ scale: monoScale, y: monoY, opacity: monoOpacity }}
        >
          <FounderQuote f={f} />
        </motion.div>

        {/* Layer 2: reveal */}
        <motion.div
          style={{ opacity: revealOpacity, y: revealY }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <FounderCard f={f} />
        </motion.div>
      </div>
    </section>
  );
}

export default function Founder() {
  const { t } = useLang();
  const f = t.founder;
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  // Pick the layout in JS by width so exactly one renders and UnicornScene
  // mounts once. The swap happens on mount, long before section 06 scrolls
  // into view, so there is no visible flash.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduce) return <FounderStatic f={f} />;
  if (isDesktop) return <FounderDesktop f={f} />;
  return <FounderMobile f={f} />;
}
