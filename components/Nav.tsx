"use client";

import { useEffect, useState } from "react";
import KnightLogo from "@/components/KnightLogo";
import { useLang } from "@/components/LanguageProvider";
import type { Lang } from "@/content/dictionary";

function LangToggle({
  lang,
  setLang,
  label,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-1 text-sm"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-1.5 py-1 ${
          lang === "en"
            ? "font-semibold text-ink"
            : "text-ink-soft opacity-60 transition-opacity hover:opacity-100"
        }`}
      >
        EN
      </button>
      <span aria-hidden="true" className="opacity-30">
        /
      </span>
      <button
        type="button"
        onClick={() => setLang("fr")}
        aria-pressed={lang === "fr"}
        className={`px-1.5 py-1 ${
          lang === "fr"
            ? "font-semibold text-ink"
            : "text-ink-soft opacity-60 transition-opacity hover:opacity-100"
        }`}
      >
        FR
      </button>
    </div>
  );
}

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const nav = t.nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the viewport grows to desktop or on Escape.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor:
          scrolled || menuOpen
            ? "rgba(246,242,235,0.92)"
            : "rgba(246,242,235,0)",
        borderBottom:
          scrolled || menuOpen
            ? "1px solid rgba(20,17,13,0.07)"
            : "1px solid transparent",
        backdropFilter: scrolled || menuOpen ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled || menuOpen ? "blur(10px)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <a
          href="#top"
          onClick={() => setMenuOpen(false)}
          className="flex flex-none items-center gap-2.5 sm:gap-3.5"
        >
          <KnightLogo size={42} spinInterval={8000} />
          <span className="whitespace-nowrap font-display text-base font-extrabold tracking-tight sm:text-xl">
            CLIENT GROWTH
          </span>
        </a>

        <nav className="flex items-center gap-4 text-sm sm:gap-6">
          <ul className="hidden items-center gap-6 lg:flex">
            {nav.links.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex items-center gap-1.5 font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  <span className="font-mono text-[10px] text-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <LangToggle lang={lang} setLang={setLang} label={nav.langAria} />

          <a
            href="#audit"
            className="cta-shine hidden whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold text-night transition-transform hover:scale-[1.03] lg:inline-block"
            style={{ backgroundColor: "#D4A853" }}
          >
            {nav.ctaLong}
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="-mr-1 flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-ink/5 lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile dropdown menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-brand lg:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-6xl px-4 pb-5 pt-1 sm:px-6">
          <ul className="flex flex-col gap-1 border-t border-ink/10 pt-3">
            {nav.links.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-3 font-medium text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <span className="font-mono text-[10px] text-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#audit"
            onClick={() => setMenuOpen(false)}
            className="cta-shine mt-3 block rounded-full px-5 py-3 text-center text-sm font-semibold text-night"
            style={{ backgroundColor: "#D4A853" }}
          >
            {nav.ctaLong}
          </a>
        </nav>
      </div>
    </header>
  );
}
