"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

type Pillar = { title: string; body: string };

// Desktop-only signature set-piece for the Growth System section: the pillars
// sit around a central "system" hub in a symmetric star, the spokes draw
// themselves straight out of the hub and connect onto each card's edge, and gold
// energy flows along them. It visualizes the core argument (one system, every
// part feeding the next). Rendered only on large screens with motion allowed;
// everywhere else the section falls back to the static bento grid (parent).
//
// Geometry is deterministic. An SVG with a fixed viewBox draws the spokes; an
// overlay places the HTML cards at the same coordinates as percentages. Cards
// are evenly spaced on a circle (a point-up pentagon) and each spoke stops
// exactly on the card's edge facing the hub, with a small node where they meet.

const VB_W = 1000;
const VB_H = 720;
const HUB = { x: 500, y: 382 };
const RADIUS = 260;
// Point-up star: one card on top, then evenly every 72 degrees.
const ANGLES_DEG = [-90, -18, 54, 126, 198];

// Card box, used to terminate each spoke right on the card edge. Width is exact
// (Tailwind w-52); height is the min-height the cards are pinned to, so the math
// matches what renders. CONTAINER is the fixed max-w-4xl width on lg+ screens.
const CARD_W = 208;
const CARD_H = 210;
const CONTAINER = 896;
const K = VB_W / CONTAINER; // px -> viewBox units
const HW = (CARD_W / 2) * K;
const HH = (CARD_H / 2) * K;

const rad = (deg: number) => (deg * Math.PI) / 180;
const pct = (v: number, total: number) => `${(v / total) * 100}%`;

// Where the hub->node line crosses the card's rectangular edge.
function edgePoint(n: { x: number; y: number }) {
  const dx = HUB.x - n.x;
  const dy = HUB.y - n.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const s = Math.min(HW / (Math.abs(ux) || 1e-6), HH / (Math.abs(uy) || 1e-6));
  return { x: n.x + ux * s, y: n.y + uy * s };
}

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
  const edges = nodes.map(edgePoint);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl">
      {/* Layer 1: spokes + hub */}
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="h-auto w-full overflow-visible"
        aria-hidden="true"
      >
        {edges.map((e, i) => (
          <g key={`spoke-${i}`}>
            {/* faint base track */}
            <line
              x1={HUB.x}
              y1={HUB.y}
              x2={e.x}
              y2={e.y}
              stroke="rgba(212,168,83,0.16)"
              strokeWidth={1.5}
            />
            {/* gold line that draws itself in */}
            <motion.line
              x1={HUB.x}
              y1={HUB.y}
              x2={e.x}
              y2={e.y}
              stroke="#D4A853"
              strokeWidth={1.75}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.85 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            {/* flowing energy drifting from hub onto the card */}
            <line
              x1={HUB.x}
              y1={HUB.y}
              x2={e.x}
              y2={e.y}
              stroke="#F3E3AD"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray="2 16"
              className="system-flow-line"
              style={{
                opacity: inView ? 0.9 : 0,
                transition: "opacity 0.6s ease",
                transitionDelay: `${0.6 + i * 0.1}s`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
            {/* connection node where the spoke meets the card */}
            <motion.circle
              cx={e.x}
              cy={e.y}
              r={5}
              fill="#D4A853"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.85 + i * 0.1 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          </g>
        ))}

        {/* Hub: soft inner glow + breathing ring (label sits inside, no core dot
            so it stays readable). */}
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
          fill="rgba(212,168,83,0.05)"
          stroke="rgba(212,168,83,0.6)"
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
              className={`absolute flex w-52 min-h-[210px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border p-5 backdrop-blur-sm ${
                flagship
                  ? "border-gold/40 bg-gradient-to-br from-white/[0.07] to-white/[0.02]"
                  : "border-white/10 bg-night-raised/80"
              }`}
              style={{ left: pct(n.x, VB_W), top: pct(n.y, VB_H) }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.1,
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
