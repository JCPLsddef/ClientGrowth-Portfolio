type LogoMarqueeProps = {
  items: string[];
};

export default function LogoMarquee({ items }: LogoMarqueeProps) {
  // Duplicated once so the -50% translate loops seamlessly.
  const doubled = [...items, ...items];
  const fade =
    "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)";

  return (
    <div
      className="marquee-pause relative overflow-hidden"
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <div className="animate-marquee flex w-max items-center gap-12 pr-12">
        {doubled.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="whitespace-nowrap text-sm font-medium tracking-wide text-ink-soft"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
