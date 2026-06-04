import Image from "next/image";
import { clients, isTodo } from "@/content/work";

// Monochrome client logo bar. Reuses the global `.animate-marquee`
// keyframe (translateX 0 -> -50%), so the set is duplicated once for a
// seamless loop. Everything renders as a single ink tone on charcoal;
// until a real monochrome logo is supplied the business name shows as a
// wordmark. The fixed row height keeps cumulative layout shift at zero.
export default function LogoBar() {
  const doubled = [...clients, ...clients];
  const fade =
    "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)";

  return (
    <div
      className="marquee-pause relative overflow-hidden"
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <ul className="animate-marquee flex w-max items-center gap-12 pr-12 sm:gap-16 sm:pr-16">
        {doubled.map((client, i) => (
          <li
            key={`${client.slug}-${i}`}
            aria-hidden={i >= clients.length}
            className="flex h-10 flex-none items-center"
          >
            {isTodo(client.logo) ? (
              <span className="whitespace-nowrap font-display text-base font-semibold tracking-tight text-[#F5F0E8]/55 sm:text-lg">
                {client.name}
              </span>
            ) : (
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={28}
                className="h-7 w-auto opacity-60"
                style={{ filter: "brightness(0) invert(0.9)" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
