"use client";

import { useEffect, useState } from "react";
import KnightLogo from "@/components/KnightLogo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(246,242,235,0.92)" : "rgba(246,242,235,0)",
        borderBottom: scrolled
          ? "1px solid rgba(20,17,13,0.07)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:py-5">
        <a href="#top" className="flex items-center gap-3 sm:gap-3.5">
          <KnightLogo size={46} spinInterval={8000} />
          <span className="whitespace-nowrap font-display text-lg font-extrabold tracking-tight sm:text-xl">
            CLIENT GROWTH
          </span>
        </a>
        <nav className="flex items-center gap-5 text-sm sm:gap-6">
          <a
            href="#work"
            className="hidden font-semibold text-ink-soft transition-colors hover:text-ink md:inline"
          >
            For hiring teams
          </a>
          <div className="hidden items-center gap-1 sm:flex">
            <button className="font-semibold text-ink">EN</button>
            <span className="opacity-30">/</span>
            <button className="text-ink-soft opacity-60 transition-opacity hover:opacity-100">
              FR
            </button>
          </div>
          <a
            href="#audit"
            className="cta-shine whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold text-night transition-transform hover:scale-[1.03] sm:px-5 sm:py-2.5 sm:text-sm"
            style={{ backgroundColor: "#D4A853" }}
          >
            <span className="sm:hidden">Free Audit</span>
            <span className="hidden sm:inline">Free Visibility Audit</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
