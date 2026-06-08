"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import * as THREE from "three";

type Pillar = { title: string; body: string };
type Edge = "top" | "bottom" | "left" | "right";

// Desktop-only signature set-piece for the Growth System section. A live WebGL
// radar sits where the hub used to be (a gold-on-charcoal port of the React
// Bits "Radar" shader), and the five pillars orbit it in a point-up pentagon.
// A single rAF drives BOTH the shader sweep and a synced "ping" on each pillar:
// because the cards sit on the pentagon, the rotating beam lights them one after
// another, evenly spaced. The card geometry reuses the validated SystemFlow
// layout (one SVG coordinate system via <foreignObject>) so nodes always sit
// exactly on the card edges. Rendered only on large screens with motion allowed;
// the parent falls back to the static bento everywhere else.

const VB_W = 1000;
const VB_H = 900;
const HUB = { x: 500, y: 450 };
const RADIUS = 315;
const CORE_R = 142; // radar disc radius in viewBox units; connectors start here
const ANGLES_DEG = [-90, -18, 54, 126, 198]; // point-up pentagon
const EDGES: Edge[] = ["bottom", "left", "top", "top", "right"];

const CARD_W = 250;
const CARD_H = 256;
const HW = CARD_W / 2;
const HH = CARD_H / 2;

// Shader sweep tuning. The DOM "ping" math below must use the SAME constants so
// each pillar lights exactly when the visible beam points at it.
const SPEED = 0.6; // overall shader time multiplier
const SWEEP_SPEED = 1.0; // beam rotation multiplier
const GLOW_EXP = 2.4; // tightness of each pillar ping as the beam passes
const CANVAS_PCT = 41; // radar canvas width as % of the wrapper (square)
const GOLD: [number, number, number] = [0xd4 / 255, 0xa8 / 255, 0x53 / 255];

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

const vertexShader = `
precision highp float;
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Port of the React Bits "Radar" fragment shader, unchanged except for being
// driven by gold-on-transparent uniforms.
const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uRingCount;
uniform float uSpokeCount;
uniform float uRingThickness;
uniform float uSpokeThickness;
uniform float uSweepSpeed;
uniform float uSweepWidth;
uniform float uSweepLobes;
uniform vec3 uColor;
uniform vec3 uBgColor;
uniform float uFalloff;
uniform float uBrightness;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define TAU 6.28318530718
#define PI 3.14159265359

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  st = st * 2.0 - 1.0;
  st.x *= uResolution.x / uResolution.y;

  if (uEnableMouse) {
    vec2 mShift = (uMouse * 2.0 - 1.0);
    mShift.x *= uResolution.x / uResolution.y;
    st -= mShift * uMouseInfluence;
  }

  st *= uScale;

  float dist = length(st);
  float theta = atan(st.y, st.x);
  float t = uTime * uSpeed;

  float ringPhase = dist * uRingCount - t;
  float ringDist = abs(fract(ringPhase) - 0.5);
  float ringGlow = 1.0 - smoothstep(0.0, uRingThickness, ringDist);

  float spokeAngle = abs(fract(theta * uSpokeCount / TAU + 0.5) - 0.5) * TAU / uSpokeCount;
  float arcDist = spokeAngle * dist;
  float spokeGlow = (1.0 - smoothstep(0.0, uSpokeThickness, arcDist)) * smoothstep(0.0, 0.1, dist);

  float sweepPhase = t * uSweepSpeed;
  float sweepBeam = pow(max(0.5 * sin(uSweepLobes * theta + sweepPhase) + 0.5, 0.0), uSweepWidth);

  float fade = smoothstep(1.05, 0.85, dist) * pow(max(1.0 - dist, 0.0), uFalloff);

  float intensity = max((ringGlow + spokeGlow + sweepBeam) * fade * uBrightness, 0.0);
  vec3 col = uColor * intensity + uBgColor;

  float alpha = clamp(length(col), 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

export default function SystemRadar({
  pillars,
  coreLabel,
}: {
  pillars: readonly Pillar[];
  coreLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduce = useReducedMotion();

  const haloRefs = useRef<(SVGCircleElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const spokes = ANGLES_DEG.slice(0, pillars.length).map((deg, i) => {
    const dir = { x: Math.cos(rad(deg)), y: Math.sin(rad(deg)) };
    const node = { x: HUB.x + RADIUS * dir.x, y: HUB.y + RADIUS * dir.y };
    const point = edgeMidpoint(node, EDGES[i]);
    const start = { x: HUB.x + CORE_R * dir.x, y: HUB.y + CORE_R * dir.y };
    // Overshoot a touch past the edge so the opaque card hides the join; the
    // node sits on the exact edge.
    const dx = node.x - point.x;
    const dy = node.y - point.y;
    const len = Math.hypot(dx, dy) || 1;
    const end = { x: point.x + (dx / len) * 6, y: point.y + (dy / len) * 6 };
    return { node, point, start, end };
  });

  useEffect(() => {
    if (reduce) return;
    const wrap = canvasWrapRef.current;
    if (!wrap) return;

    // Pillar directions in the shader's coordinate space (y up). A card at DOM
    // angle a (x=cos a, y=sin a, y down) points at shader angle -a, so its ping
    // peaks exactly when the beam's bright lobe crosses that bearing.
    const thetas = ANGLES_DEG.slice(0, pillars.length).map((d) => -rad(d));

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      });
    } catch {
      return; // no WebGL: SVG cards still render, just without the live core
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    wrap.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([-1, -1, 3, -1, -1, 3]), 2)
    );
    geometry.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2)
    );

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector3(1, 1, 1) },
      uSpeed: { value: SPEED },
      uScale: { value: 0.6 },
      uRingCount: { value: 5.0 },
      uSpokeCount: { value: 12.0 },
      uRingThickness: { value: 0.055 },
      uSpokeThickness: { value: 0.012 },
      uSweepSpeed: { value: SWEEP_SPEED },
      uSweepWidth: { value: 5.0 },
      uSweepLobes: { value: 1.0 },
      uColor: { value: new THREE.Vector3(...GOLD) },
      uBgColor: { value: new THREE.Vector3(0, 0, 0) },
      uFalloff: { value: 1.7 },
      uBrightness: { value: 1.2 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseInfluence: { value: 0.08 },
      uEnableMouse: { value: true },
    };

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const resize = () => {
      const s = wrap.clientWidth || 1;
      renderer.setSize(s, s, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      const bw = renderer.domElement.width;
      const bh = renderer.domElement.height;
      uniforms.uResolution.value.set(bw, bh, bw / bh);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const targetMouse = [0.5, 0.5];
    const curMouse = [0.5, 0.5];
    const onMove = (e: PointerEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      if (!r.width || !r.height) return;
      targetMouse[0] = (e.clientX - r.left) / r.width;
      targetMouse[1] = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let running = false;
    let t0 = 0;

    const frame = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (!t0) t0 = now;
      const elapsed = (now - t0) / 1000;

      uniforms.uTime.value = elapsed;
      curMouse[0] += 0.05 * (targetMouse[0] - curMouse[0]);
      curMouse[1] += 0.05 * (targetMouse[1] - curMouse[1]);
      uniforms.uMouse.value.set(curMouse[0], curMouse[1]);
      renderer.render(scene, camera);

      // Synced pillar pings — identical phase to the shader's sweep.
      const phase = elapsed * SPEED * SWEEP_SPEED;
      for (let i = 0; i < thetas.length; i++) {
        const beam = Math.max(0.5 * Math.sin(thetas[i] + phase) + 0.5, 0);
        const g = Math.pow(beam, GLOW_EXP);
        const halo = haloRefs.current[i];
        if (halo) {
          halo.setAttribute("r", String(7 + 30 * g));
          halo.setAttribute("opacity", String(0.55 * g));
        }
        const card = cardRefs.current[i];
        if (card) {
          card.style.boxShadow = `0 0 ${18 + 46 * g}px rgba(212,168,83,${(
            0.1 +
            0.3 * g
          ).toFixed(3)})`;
          card.style.borderColor = `rgba(212,168,83,${(0.16 + 0.5 * g).toFixed(
            3
          )})`;
        }
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          t0 = 0;
          raf = requestAnimationFrame(frame);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.01 }
    );
    io.observe(wrap);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === wrap) {
        wrap.removeChild(renderer.domElement);
      }
    };
  }, [reduce, pillars.length]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl">
      {/* Radar core (WebGL), centered on the hub, behind the SVG overlay. */}
      <div
        ref={canvasWrapRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: `${CANVAS_PCT}%`,
          aspectRatio: "1 / 1",
          opacity: inView ? 1 : 0,
          transition: "opacity 1.2s ease 0.2s",
        }}
      />

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="relative h-auto w-full overflow-visible"
        role="presentation"
      >
        {/* Connectors: from the radar rim out to each card's hub-facing edge. */}
        {spokes.map((s, i) => (
          <g key={`spoke-${i}`}>
            <line
              x1={s.start.x}
              y1={s.start.y}
              x2={s.end.x}
              y2={s.end.y}
              stroke="rgba(212,168,83,0.16)"
              strokeWidth={1.5}
            />
            <motion.line
              x1={s.start.x}
              y1={s.start.y}
              x2={s.end.x}
              y2={s.end.y}
              stroke="#D4A853"
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.9 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.4 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <line
              x1={s.start.x}
              y1={s.start.y}
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
                transitionDelay: `${0.9 + i * 0.1}s`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          </g>
        ))}

        {/* Hub ring + label, drawn over the radar core. */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r={CORE_R}
            fill="none"
            stroke="rgba(212,168,83,0.28)"
            strokeWidth={1.2}
          />
          <text
            x={HUB.x}
            y={HUB.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#F3E3AD"
            fontSize={15}
            letterSpacing={2.4}
            style={{ fontFamily: "ui-monospace, monospace" }}
          >
            {coreLabel.toUpperCase()}
          </text>
        </motion.g>

        {/* Cards, in the same coordinate system via foreignObject. */}
        {spokes.map((s, i) => {
          const pillar = pillars[i];
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
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
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
                  border: "1px solid rgba(255,255,255,0.1)",
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

        {/* Beam-driven halos (under), then the solid connection nodes (over). */}
        {spokes.map((s, i) => (
          <circle
            key={`halo-${i}`}
            ref={(el) => {
              haloRefs.current[i] = el;
            }}
            cx={s.point.x}
            cy={s.point.y}
            r={7}
            fill="#D4A853"
            opacity={0}
          />
        ))}
        {spokes.map((s, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={s.point.x}
            cy={s.point.y}
            r={6}
            fill="#F3E3AD"
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
