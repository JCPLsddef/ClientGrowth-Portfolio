"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

type Pillar = { title: string; body: string };

// Desktop-only signature set-piece for the Growth System section: the five
// pillars sit around a central "system" hub, the spokes draw themselves in on
// scroll, and gold energy flows outward along each one. It visualizes the core
// sales argument (one system, every part feeding the next). Rendered only on
// large screens with motion allowed; everywhere else the section falls back to
// the static bento grid (handled by the parent).
//
// Layout is deterministic: an SVG with a fixed 1200x760 viewBox draws the hub
// and spokes, and an absolutely-positioned overlay places the HTML cards at the
// same coordinates expressed as percentages, so the two layers always align.

const VB_W = 1200;
const VB_H = 760;
const HUB = { x: 600, y: 380 };

// Node centers in viewBox units (index 0 is the flagship). Kept clear of the hub
// and the edges so the cards never collide or clip.
const NODES = [
  { x: 300, y: 170 },
  { x: 900, y: 170 },
  { x: 190, y: 470 },
  { x: 1010, y: 470 },
  { x: 600, y: 650 },
];

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
  const nodes = NODES.slice(0, pillars.length);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl">
      {/* Layer 1: spokes + hub */}
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
              stroke="rgba(212,168,83,0.14)"
              strokeWidth={1.5}
            />
            {/* gold line that draws itself in */}
            <motion.line
              x1={HUB.x}
              y1={HUB.y}
              x2={n.x}
              y2={n.y}
              stroke="#D4A853"
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.7 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            {/* flowing energy: short dashes drifting from hub to node */}
            <line
              x1={HUB.x}
              y1={HUB.y}
              x2={n.x}
              y2={n.y}
              stroke="#F3E3AD"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="2 16"
              className="system-flow-line"
              style={{
                opacity: inView ? 0.9 : 0,
                transition: "opacity 0.6s ease",
                transitionDelay: `${0.6 + i * 0.12}s`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          </g>
        ))}

        {/* Hub */}
        <motion.circle
          cx={HUB.x}
          cy={HUB.y}
          r={54}
          className="system-hub-pulse"
          fill="rgba(212,168,83,0.08)"
          stroke="rgba(212,168,83,0.5)"
          strokeWidth={1.5}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <motion.circle
          cx={HUB.x}
          cy={HUB.y}
          r={8}
          fill="#D4A853"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      </svg>

      {/* Layer 2: HTML cards aligned to the same coordinates */}
      <div className="absolute inset-0">
        {/* Hub label */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: pct(HUB.x, VB_W), top: pct(HUB.y, VB_H) }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold/90">
            {coreLabel}
          </span>
        </div>

        {nodes.map((n, i) => {
          const pillar = pillars[i];
          const flagship = i === 0;
          return (
            <motion.div
              key={`card-${i}`}
              className={`absolute w-56 -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-5 backdrop-blur-sm xl:w-60 ${
                flagship
                  ? "border-gold/40 bg-gradient-to-br from-white/[0.07] to-white/[0.02]"
                  : "border-white/10 bg-night-raised/80"
              }`}
              style={{ left: pct(n.x, VB_W), top: pct(n.y, VB_H) }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="font-mono text-xs font-bold text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className={`mt-2 font-display font-bold leading-tight ${
                  flagship ? "text-lg" : "text-base"
                }`}
              >
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
