"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

type Pillar = { title: string; body: string };
type Edge = "top" | "bottom" | "left" | "right";

// Desktop-only signature set-piece for the Growth System section: the pillars
// sit around a central "system" hub in a symmetric star, and a spoke runs from
// the hub to the middle of each card's hub-facing edge, where a node marks the
// connection. Gold energy flows along each spoke. It visualizes the core
// argument (one system, every part feeding the next). Rendered only on large
// screens with motion allowed; everywhere else the section falls back to the
// static bento grid (handled by the parent).
//
// The cards are a fixed size, so each edge midpoint is known exactly and every
// spoke lands precisely on its card. Each card's connection edge is the one
// facing the hub: bottom for the top card, top for the bottom cards, and the
// inner side for the side cards.

const VB_W = 1000;
const VB_H = 900;
const HUB = { x: 500, y: 450 };
const RADIUS = 315; // point-up pentagon
const ANGLES_DEG = [-90, -18, 54, 126, 198];
// Which edge of each card faces the hub (same order as ANGLES_DEG).
const EDGES: Edge[] = ["bottom", "left", "top", "top", "right"];

const CARD_W = 224; // px (Tailwind w-56)
const CARD_H = 230; // px (fixed, comfortably fits the longest pillar)
const CONTAINER = 896; // px, the fixed max-w-4xl width on lg+ screens
const K = VB_W / CONTAINER; // px -> viewBox units
const HW = (CARD_W / 2) * K;
const HH = (CARD_H / 2) * K;

const rad = (deg: number) => (deg * Math.PI) / 180;
const pct = (v: number, total: number) => `${(v / total) * 100}%`;

function edgeMidpoint(n: { x: number; y: number }, edge: Edge) {
  switch (edge) {
    case "bottom":
      return { x: n.x, y: n.y + HH };
    case "top":
      return { x: n.x, y: n.y - HH };
    case "left":
      return { x: n.x - HW, y: n.y };
    case "right":
      return { x: n.x + HW, y: n.y };
  }
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

  const spokes = ANGLES_DEG.slice(0, pillars.length).map((deg, i) => {
    const node = {
      x: HUB.x + RADIUS * Math.cos(rad(deg)),
      y: HUB.y + RADIUS * Math.sin(rad(deg)),
    };
    const edge = EDGES[i];
    const point = edgeMidpoint(node, edge);
    // End the drawn line a touch inside the card so it never leaves a gap; the
    // opaque card hides the overshoot and the node sits on the exact edge.
    const dx = node.x - point.x;
    const dy = node.y - point.y;
    const len = Math.hypot(dx, dy) || 1;
    const end = { x: point.x + (dx / len) * 6, y: point.y + (dy / len) * 6 };
    return { node, point, end };
  });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl">
      {/* Layer 1: spokes + hub (behind the cards) */}
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="h-auto w-full overflow-visible"
        aria-hidden="true"
      >
        {spokes.map((s, i) => (
          <g key={`spoke-${i}`}>
            {/* faint base track */}
            <line
              x1={HUB.x}
              y1={HUB.y}
              x2={s.end.x}
              y2={s.end.y}
              stroke="rgba(212,168,83,0.16)"
              strokeWidth={1.5}
            />
            {/* gold line that draws itself in */}
            <motion.line
              x1={HUB.x}
              y1={HUB.y}
              x2={s.end.x}
              y2={s.end.y}
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
            {/* flowing energy drifting from hub onto the card */}
            <line
              x1={HUB.x}
              y1={HUB.y}
              x2={s.end.x}
              y2={s.end.y}
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
            {/* connection node at the exact middle of the card's hub-facing edge */}
            <motion.circle
              cx={s.point.x}
              cy={s.point.y}
              r={5.5}
              fill="#D4A853"
              stroke="#0D0B09"
              strokeWidth={2}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          </g>
        ))}

        {/* Hub: solid core + breathing ring + glow (label sits inside) */}
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

      {/* Layer 2: opaque cards + hub label, aligned to the same coordinates */}
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

        {spokes.map((s, i) => {
          const pillar = pillars[i];
          const flagship = i === 0;
          return (
            <motion.div
              key={`card-${i}`}
              className={`absolute flex h-[230px] w-56 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border bg-night-raised p-5 ${
                flagship
                  ? "border-gold/45 shadow-[0_0_34px_rgba(212,168,83,0.14)]"
                  : "border-white/10"
              }`}
              style={{ left: pct(s.node.x, VB_W), top: pct(s.node.y, VB_H) }}
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
