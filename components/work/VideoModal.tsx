"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { isTodo } from "@/content/work";
import { useLang } from "@/components/LanguageProvider";

type VideoModalProps = {
  src: string | null; // Loom embed URL; a TODO sentinel shows a "coming soon" panel
  title: string; // used for the dialog label and heading
  label?: string; // trigger button text (defaults to the localized label)
  className?: string; // optional trigger button class override
};

// Self-contained trigger + accessible dialog for a Loom clip. Hand-built to
// avoid pulling in Radix: portal to body, focus trap, Escape to close, scroll
// lock, focus return, and a lazily-mounted iframe (Loom only loads on open).
export default function VideoModal({
  src,
  title,
  label,
  className,
}: VideoModalProps) {
  const { t } = useLang();
  const resolvedLabel = label ?? t.videoModal.defaultLabel;
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const hasVideo = !isTodo(src);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = triggerRef.current;
    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
      opener?.focus();
    };
  }, [open]);

  const stop = (e: ReactMouseEvent) => e.stopPropagation();
  const duration = reduce ? 0 : 0.2;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "inline-flex items-center gap-2 rounded-full border border-[rgba(212,168,83,0.4)] px-5 py-2.5 text-sm font-semibold text-[#D4A853] transition-colors hover:bg-[rgba(212,168,83,0.1)]"
        }
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
        {resolvedLabel}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                style={{ backgroundColor: "rgba(5,4,3,0.82)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  ref={panelRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  tabIndex={-1}
                  className="relative w-full max-w-3xl rounded-2xl border border-[rgba(212,168,83,0.3)] bg-[#0D0B09] p-3 outline-none"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
                  onClick={stop}
                >
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <h2
                      id={titleId}
                      className="font-display text-sm font-bold text-[#F5F0E8]"
                    >
                      {title}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label={t.videoModal.close}
                      className="rounded-full p-1.5 text-[#A69D8D] transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F5F0E8]"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M6 6l12 12M18 6L6 18"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {hasVideo ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                      <iframe
                        src={src ?? undefined}
                        title={title}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  ) : (
                    <div
                      className="flex aspect-video w-full items-center justify-center rounded-lg text-center"
                      style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    >
                      {/* TODO: Loom embed URL (content/work.ts) */}
                      <span className="px-6 text-sm text-[#A69D8D]">
                        {t.videoModal.placeholder}
                      </span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
