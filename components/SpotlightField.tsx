"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

type SpotlightFieldProps = {
  children: ReactNode;
  className?: string;
  /** Glow color, default brand gold at low alpha. */
  color?: string;
  /** Glow radius in px. */
  size?: number;
};

// Section-level pointer spotlight (Brittany Chiang's live site). A soft glow
// follows the cursor across a dark section to add depth at near-zero cost.
// Shown only on fine pointers, hidden under reduced motion. Renders behind its
// content, so wrap a section's inner container with it.
export default function SpotlightField({
  children,
  className = "",
  color = "rgba(212,168,83,0.07)",
  size = 600,
}: SpotlightFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 [@media(pointer:fine)]:opacity-100 motion-reduce:hidden"
        style={{
          background: `radial-gradient(${size}px circle at var(--sx, 50%) var(--sy, 50%), ${color}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
