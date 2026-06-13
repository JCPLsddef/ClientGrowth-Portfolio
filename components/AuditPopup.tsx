"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/components/LanguageProvider";

// Modal pitch for the free Visibility Audit, opened by the hero's primary
// CTA. The copy sells the audit (small problems, big impact);
// the button hands off to the form section (#audit) and closes the popup.
export default function AuditPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLang();
  const p = t.auditPopup;

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center px-5 py-8"
          role="dialog"
          aria-modal="true"
          aria-label={p.title}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label={p.close}
            onClick={onClose}
            className="absolute inset-0 cursor-default"
            style={{
              backgroundColor: "rgba(13,11,9,0.8)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl p-7 sm:p-10"
            style={{
              backgroundColor: "#0D0B09",
              border: "1px solid rgba(212,168,83,0.45)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
            }}
          >
            {/* Soft gold glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-56 w-72 -translate-x-1/2 rounded-full"
              style={{ backgroundColor: "rgba(212,168,83,0.18)", filter: "blur(70px)" }}
            />

            <button
              type="button"
              onClick={onClose}
              aria-label={p.close}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:text-white"
              style={{
                color: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.25)",
                backgroundColor: "rgba(255,255,255,0.06)",
              }}
            >
              ×
            </button>

            <h3
              className="font-display pr-8 font-extrabold leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(28px, 5vw, 36px)", color: "#D4A853" }}
            >
              {p.title}
            </h3>

            <div className="mt-6 flex flex-col gap-3.5">
              {p.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-[15px] leading-[1.65]"
                  style={{
                    color:
                      i === 0
                        ? "#F5F0E8" // First para: bright white, high contrast
                        : "rgba(245,240,232,0.85)",
                    fontWeight: i === 0 ? "600" : "400",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            <a
              href="#audit"
              onClick={onClose}
              className="cta-shine mt-8 flex w-full items-center justify-center rounded-full px-7 py-4 text-center text-base font-bold text-night transition-all hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]"
              style={{
                backgroundColor: "#D4A853",
                boxShadow: "0 12px 30px rgba(212,168,83,0.35)",
              }}
            >
              {p.cta}
            </a>

            <p
              className="mt-5 text-center text-xs font-medium"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {p.note}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
