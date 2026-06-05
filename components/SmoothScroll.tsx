"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";

// Smooth-scroll spine. Adds eased wheel momentum (the single biggest premium
// feel win, borrowed from juanmora.co / Locomotive) on top of native scroll,
// and routes in-page anchor clicks through Lenis so the CTAs glide instead of
// jumping. Disabled entirely under prefers-reduced-motion, where native scroll
// and the existing scroll-behavior: smooth take over.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // In-page anchor links (#audit, #system, ...) scroll through Lenis so the
    // motion matches the wheel feel. Offset clears the sticky nav.
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -56 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
