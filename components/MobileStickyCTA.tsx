"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/LanguageProvider";

// Mobile-only sticky audit CTA. Appears once the visitor scrolls past the hero
// and hides itself near the audit form and the footer, so it never sits on top
// of the content it points to.
export default function MobileStickyCTA() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const audit = document.getElementById("audit");
    const intro = document.getElementById("founder-intro");
    let pastHero = false;
    let auditVisible = false;
    let introVisible = false;

    const nearBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 120;

    const update = () =>
      setShow(pastHero && !auditVisible && !introVisible && !nearBottom());

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.6;
      update();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observers: IntersectionObserver[] = [];
    if (audit) {
      const o = new IntersectionObserver(
        ([entry]) => {
          auditVisible = entry.isIntersecting;
          update();
        },
        { rootMargin: "0px 0px -40% 0px" },
      );
      o.observe(audit);
      observers.push(o);
    }
    // While the mobile founder-quote intro fills the screen, keep the bar
    // hidden so it never sits over the quote as the section transitions in.
    if (intro) {
      const o = new IntersectionObserver(
        ([entry]) => {
          introVisible = entry.intersectionRatio > 0.35;
          update();
        },
        { threshold: [0, 0.35, 0.7, 1] },
      );
      o.observe(intro);
      observers.push(o);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-all duration-300 motion-reduce:transition-none md:hidden ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
      style={{
        backgroundColor: "rgba(13,11,9,0.92)",
        borderTop: "1px solid #2A2318",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <a
        href="#audit"
        tabIndex={show ? 0 : -1}
        className="block w-full rounded-full px-6 py-3.5 text-center text-sm font-semibold text-night transition-[filter] hover:brightness-105 active:brightness-95"
        style={{ backgroundColor: "#D4A853" }}
      >
        {t.mobileCta.label}
      </a>
    </div>
  );
}
