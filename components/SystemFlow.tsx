"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

type Pillar = { title: string; body: string };

// Desktop-only signature set-piece for the Growth System section: the pillars
// sit around a central "system" hub in a symmetric star, long spokes draw
// themselves straight out of the hub, and gold energy flows along them. It
// visualizes the core argument (one system, every part feeding the next).
// Rendered only on large screens with motion allowed; everywhere else the
// section falls back to the static bento grid (handled by the parent).
//
// Attachment is robust by construction: each spoke is drawn all the way to its
// card's center, and the cards are opaque, so every card cleanly occludes its
// spoke exactly at its own edge, no matter the card's rendered size. There is no
// fragile edge math, so spokes never float short of a card.

const VB_W = 1000;
const VB_H = 860;
const HUB = { x: 500, y: 430 };
const RADIUS = 315; // push cards out so the spokes read long
const ANGLES_DEG = [-90, -18, 54, 126, 198]; // point-up star, every 72 degrees

const rad = (deg: number) => (deg * Math.PI) / 180;
const pct = (v: number, total: number) => `${(v / total) * 100}%`;

export default function SystemFlow({
  pillars,
  coreLabel,
}: {
  pillars: readonly Pillar[];
  coreLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  const nodes = ANGLES_DEG.slice(0, pillars.length).map((deg) => ({
    x: HUB.x + RADIUS * Math.cos(rad(deg)),
    y: HUB.y + RADIUS * Math.sin(rad(deg)),
  }));

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl">
      {/* Layer 1: spokes + hub (drawn behind the cards, which occlude them) */}
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="h-auto w-full overflow-visible"
        aria-hidden="true"
      >
        {nodes.map((n, i) => (
          <g key={`spoke-${i}`}>
            {/* faint base track */}
            <line
              x1={HUB.x}
              y1={HUB.y}
              x2={n.x}
              y2={n.y}
              stroke="rgba(212,168,83,0.16)"
              strokeWidth={1.5}
            />
            {/* gold line that draws itself in */}
            <motion.line
              x1={HUB.x}
              y1={HUB.y}
              x2={n.x}
              y2={n.y}
              stroke="#D4A853"
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.9 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.15 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            {/* flowing energy drifting from the hub into the card */}
            <line
              x1={HUB.x}
              y1={HUB.y}
              x2={n.x}
              y2={n.y}
              stroke="#F3E3AD"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray="2 16"
              className="system-flow-line"
              style={{
                opacity: inView ? 0.9 : 0,
                transition: "opacity 0.6s ease",
                transitionDelay: `${0.7 + i * 0.1}s`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          </g>
        ))}

        {/* Hub: soft inner glow + breathing ring (label sits inside) */}
        <motion.circle
          cx={HUB.x}
          cy={HUB.y}
          r={34}
          fill="rgba(212,168,83,0.14)"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <motion.circle
          cx={HUB.x}
          cy={HUB.y}
          r={56}
          className="system-hub-pulse"
          fill="#0D0B09"
          stroke="rgba(212,168,83,0.6)"
          strokeWidth={1.5}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        {/* re-draw the glow on top of the solid ring fill for a lit core */}
        <motion.circle
          cx={HUB.x}
          cy={HUB.y}
          r={30}
          fill="rgba(212,168,83,0.16)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </svg>

      {/* Layer 2: opaque cards + hub label, aligned to the same coordinates.
          The opaque card background is what makes each spoke attach cleanly. */}
      <div className="absolute inset-0">
        {/* Hub label, centered inside the ring */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pct(HUB.x, VB_W), top: pct(HUB.y, VB_H) }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="block whitespace-nowrap text-center font-mono text-[10px] uppercase tracking-[0.12em] text-gold">
            {coreLabel}
          </span>
        </motion.div>

        {nodes.map((n, i) => {
          const pillar = pillars[i];
          const flagship = i === 0;
          return (
            <motion.div
              key={`card-${i}`}
              className={`absolute flex min-h-[188px] w-48 -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border bg-night-raised p-5 ${
                flagship
                  ? "border-gold/45 shadow-[0_0_34px_rgba(212,168,83,0.14)]"
                  : "border-white/10"
              }`}
              style={{ left: pct(n.x, VB_W), top: pct(n.y, VB_H) }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.55 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="font-mono text-xs font-bold text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-base font-bold leading-tight">
                {pillar.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">
                {pillar.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
