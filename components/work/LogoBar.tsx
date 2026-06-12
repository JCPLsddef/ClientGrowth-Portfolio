import Image from "next/image";
import { logoStrip } from "@/content/work";

// Client logo strip (marquee). Reuses the global `.animate-marquee`
// keyframe (translateX 0 -> -50%), so the set is duplicated once for a
// seamless loop; reduced-motion users get a static masked row instead
// (handled in globals.css).
//
// Every logo sits in an identical fixed-size cream tile and is fit with
// `object-contain` into the same inner box (capped on BOTH height and
// width), so no wide wordmark can dominate. A per-logo `scale` then
// corrects the transparent padding baked into each source file so they
// all read at the same visual weight. Grayscale unifies the colours to
// the brand. Fixed tile height keeps cumulative layout shift at zero.
export default function LogoBar() {
  const doubled = [...logoStrip, ...logoStrip];
  const fade =
    "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)";

  return (
    <div
      className="marquee-pause relative overflow-hidden"
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <ul className="animate-marquee flex w-max items-center gap-6 pr-6 sm:gap-8 sm:pr-8">
        {doubled.map((client, i) => (
          <li
            key={`${client.name}-${i}`}
            aria-hidden={i >= logoStrip.length}
            className="flex h-24 w-[156px] flex-none flex-col items-center justify-center gap-1.5 overflow-hidden px-3 sm:h-28 sm:w-[176px] sm:px-4"
          >
            <span className="flex h-14 items-center justify-center">
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={160}
                height={44}
                className="h-auto w-auto object-contain"
                style={{
                  maxHeight: 48,
                  maxWidth: 132,
                  transform: `scale(${client.scale ?? 1})`,
                }}
              />
            </span>
            <span className="max-w-full truncate text-center text-[9px] font-semibold uppercase tracking-[0.14em] text-[#F5F0E8]/45">
              {client.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
