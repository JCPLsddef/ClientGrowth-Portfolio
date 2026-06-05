import type { ReactNode } from "react";

type SectionLabelProps = {
  /** Index shown in mono, e.g. "01". */
  index: string;
  children: ReactNode;
  className?: string;
  /** Divider tint: light for cream sections (default), dark for night sections. */
  tone?: "light" | "dark";
};

// Numbered editorial section label (Locomotive / Unseen / Chiang). A mono index,
// a tracked uppercase label in gold, and a thin rule that runs to the edge.
export default function SectionLabel({
  index,
  children,
  className = "",
  tone = "light",
}: SectionLabelProps) {
  const rule = tone === "dark" ? "bg-white/15" : "bg-ink/15";
  // Deep gold on light backgrounds (contrast on cream), bright gold on dark.
  const accent = tone === "dark" ? "text-gold" : "text-gold-deep";
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className={`font-mono text-xs font-semibold tracking-[0.2em] ${accent}`}>
        {index}
      </span>
      <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${accent}`}>
        {children}
      </span>
      <span aria-hidden="true" className={`h-px flex-1 ${rule}`} />
    </div>
  );
}
