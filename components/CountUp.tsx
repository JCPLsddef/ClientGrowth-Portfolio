"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

type CountUpProps = {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

export default function CountUp({
  end,
  duration = 1.8,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }
    let raf = 0;
    let startTime = 0;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      setValue(end * easeOutCubic(progress));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setValue(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
