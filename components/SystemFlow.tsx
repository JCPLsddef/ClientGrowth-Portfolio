"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

type Pillar = { title: string; body: string };
type Edge = "top" | "bottom" | "left" | "right";

// Desktop-only signature set-piece for the Growth System section: the pillars
// sit around a central "system" hub in a symmetric star, and a spoke runs from
// the hub to the middle of each card's hub-facing edge, where a node marks the
// connection. Gold energy flows along each spoke.
//
// Everything (spokes, nodes, hub, AND the cards via <foreignObject>) lives in a
// SINGLE SVG coordinate system, so the connection nodes are guaranteed to sit
// exactly on the card edges at any screen size. Rendered only on large screens
// with motion allowed; the parent falls back to the static bento everywhere
// else.

const VB_W = 1000;
const VB_H = 900;
const HUB = { x: 500, y: 450 };
const RADIUS = 315;
const ANGLES_DEG = [-90, -18, 54, 126, 198]; // point-up pentagon
// Edge of each card that faces the hub (same order as ANGLES_DEG).
const EDGES: Edge[] = ["bottom", "left", "top", "top", "right"];

const CARD_W = 250; // viewBox units
const CARD_H = 256;
const HW = CARD_W / 2;
const HH = CARD_H / 2;

const rad = (deg: number) => (deg * Math.PI) / 180;

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
    const point = edgeMidpoint(node, EDGES[i]);
    // Nudge the drawn line a touch past the edge so it never leaves a gap; the
    // opaque card hides the overshoot, the node sits on the exact edge.
    const dx = node.x - point.x;
    const dy = node.y - point.y;
    const len = Math.hypot(dx, dy) || 1;
    const end = { x: point.x + (dx / len) * 6, y: point.y + (dy / len) * 6 };
    return { node, point, end };
  });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="h-auto w-full overflow-visible"
        role="presentation"
      >
        {/* Spokes */}
        {spokes.map((s, i) => (
          <g key={`spoke-${i}`}>
            <line
              x1={HUB.x}
              y1={HUB.y}
              x2={s.end.x}
              y2={s.end.y}
              stroke="rgba(212,168,83,0.16)"
              strokeWidth={1.5}
            />
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
          </g>
        ))}

        {/* Hub */}
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
        <text
          x={HUB.x}
          y={HUB.y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#D4A853"
          fontSize={13}
          letterSpacing={1.6}
          style={{ fontFamily: "ui-monospace, monospace" }}
        >
          {coreLabel.toUpperCase()}
        </text>

        {/* Cards, in the same coordinate system via foreignObject */}
        {spokes.map((s, i) => {
          const pillar = pillars[i];
          const flagship = i === 0;
          return (
            <foreignObject
              key={`card-${i}`}
              x={s.node.x - HW}
              y={s.node.y - HH}
              width={CARD_W}
              height={CARD_H}
              style={{ overflow: "visible" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.55 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  boxSizing: "border-box",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  padding: 22,
                  borderRadius: 18,
                  background: "#1B1610",
                  border: flagship
                    ? "1px solid rgba(212,168,83,0.45)"
                    : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: flagship
                    ? "0 0 36px rgba(212,168,83,0.14)"
                    : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#D4A853",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-archivo), sans-serif",
                    fontSize: 19,
                    fontWeight: 700,
                    lineHeight: 1.15,
                    marginTop: 9,
                    color: "#F5F0E8",
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.5,
                    marginTop: 7,
                    color: "rgba(255,255,255,0.66)",
                  }}
                >
                  {pillar.body}
                </p>
              </motion.div>
            </foreignObject>
          );
        })}

        {/* Connection nodes last, so they sit on top of the card edges */}
        {spokes.map((s, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={s.point.x}
            cy={s.point.y}
            r={6}
            fill="#D4A853"
            stroke="#0D0B09"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.95 + i * 0.1 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </svg>
    </div>
  );
}
