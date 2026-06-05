"use client";

import { useEffect, useState } from "react";

// Mobile-only sticky audit CTA. Appears once the visitor scrolls past the hero
// and hides itself near the audit form and the footer, so it never sits on top
// of the content it points to.
export default function MobileStickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const audit = document.getElementById("audit");
    let pastHero = false;
    let auditVisible = false;

    const nearBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 120;

    const update = () => setShow(pastHero && !auditVisible && !nearBottom());

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.6;
      update();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let observer: IntersectionObserver | undefined;
    if (audit) {
      observer = new IntersectionObserver(
        ([entry]) => {
          auditVisible = entry.isIntersecting;
          update();
        },
        { rootMargin: "0px 0px -40% 0px" },
      );
      observer.observe(audit);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
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
        Free Visibility Audit
      </a>
    </div>
  );
}
