"use client";

// Clean founder photo with subtle warm gold vignette border.
// Removed glitch effect (Unicorn Studio) in favor of professional presentation.

export default function UnicornScene({
  className = "",
  alt = "Juan-Carlos Portillo-Laflamme, founder of Client Growth",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Static photo with subtle gold vignette */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/juan.jpg"
        alt={alt}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      {/* Subtle warm gold vignette border matching brand */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle, transparent 40%, rgba(212,168,83,0.15) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
