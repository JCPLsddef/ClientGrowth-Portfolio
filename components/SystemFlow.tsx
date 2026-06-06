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
// Layout is deterministic: an SVG with a fixed viewBox draws the hub and spokes,
// and an absolutely-positioned overlay places the HTML cards at the same
// coordinates expressed as percentages, so the two layers always align. The
// node positions are tuned so cards never collide with the hub or each other and
// never overflow into the footer below.

const VB_W = 1100;
const VB_H = 820;
const HUB = { x: 550, y: 400 };

// Node centers in viewBox units (index 0 is the flagship): two on top, two at
// hub height on the sides, one centered below.
const NODES = [
  { x: 265, y: 175 },
  { x: 835, y: 175 },
  { x: 190, y: 410 },
  { x: 910, y: 410 },
  { x: 550, y: 645 },
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

        {/* Hub: soft inner glow + breathing ring (no solid core dot, so the
            label sits cleanly inside it). */}
        <motion.circle
          cx={HUB.x}
          cy={HUB.y}
          r={32}
          fill="rgba(212,168,83,0.12)"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <motion.circle
          cx={HUB.x}
          cy={HUB.y}
          r={54}
          className="system-hub-pulse"
          fill="rgba(212,168,83,0.05)"
          stroke="rgba(212,168,83,0.55)"
          strokeWidth={1.5}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      </svg>

      {/* Layer 2: HTML cards + hub label, aligned to the same coordinates */}
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
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-5 backdrop-blur-sm ${
                flagship ? "w-56" : "w-52"
              } ${
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
