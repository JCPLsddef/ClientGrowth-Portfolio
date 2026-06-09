import Image from "next/image";
import { logoStrip } from "@/content/work";

// Client logo strip (marquee). Reuses the global `.animate-marquee`
// keyframe (translateX 0 -> -50%), so the set is duplicated once for a
// seamless loop; reduced-motion users get a static masked row instead
// (handled in globals.css). Each logo sits on a small cream tile with a
// grayscale filter so different logo styles (including opaque
// backgrounds) read as one unified, premium set on the dark hero. The
// fixed tile height keeps cumulative layout shift at zero.
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
            className="flex h-14 flex-none items-center overflow-hidden rounded-xl px-6"
            style={{ backgroundColor: "#F5F0E8" }}
          >
            <Image
              src={client.logo}
              alt={`${client.name} logo`}
              width={160}
              height={40}
              className="h-9 w-auto max-w-[150px] object-contain"
              style={{ filter: "grayscale(1)", opacity: 0.85 }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
