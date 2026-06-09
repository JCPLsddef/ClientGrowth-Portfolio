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
      <ul className="animate-marquee flex w-max items-center gap-4 pr-4 sm:gap-6 sm:pr-6">
        {doubled.map((client, i) => (
          <li
            key={`${client.name}-${i}`}
            aria-hidden={i >= logoStrip.length}
            className="flex h-16 w-[148px] flex-none items-center justify-center overflow-hidden rounded-xl px-4 sm:w-[164px]"
            style={{ backgroundColor: "#F5F0E8" }}
          >
            <Image
              src={client.logo}
              alt={`${client.name} logo`}
              width={160}
              height={44}
              className="h-auto w-auto object-contain"
              style={{
                maxHeight: 34,
                maxWidth: 116,
                transform: `scale(${client.scale ?? 1})`,
                filter: "grayscale(1)",
                opacity: 0.85,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
