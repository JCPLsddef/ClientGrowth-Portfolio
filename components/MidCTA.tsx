"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

// Compact mid-page lead capture, placed between the System section and How It
// Works. Catches warm visitors at peak interest instead of making everyone
// scroll to the bottom form. Same Formspree inbox as the main audit form; the
// hidden `form` field tells the two apart in the lead email.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mykajvqj";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-[rgba(212,168,83,0.5)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[15px] text-white placeholder:text-[rgba(255,255,255,0.4)] transition-colors hover:border-[rgba(212,168,83,0.75)] focus:border-[#D4A853] focus:outline-none";

export default function MidCTA() {
  const { t, lang } = useLang();
  const m = t.midCta;
  const f = t.auditForm;
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const pending = status === "submitting";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;

    const data = new FormData(e.currentTarget);

    // Honeypot: same trick as the main form, bots get a silent success.
    if (((data.get("_gotcha") as string) || "").trim()) {
      setStatus("success");
      return;
    }

    data.set(
      "_subject",
      `New Visibility Audit request (mid-page) — ${(data.get("name") as string) || "?"}`
    );

    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        throw new Error(`Formspree responded with ${res.status}`);
      }
      setStatus("success");
    } catch (err) {
      console.error("[lead] mid-page delivery failed:", err);
      setStatus("error");
    }
  }

  return (
    <section
      id="mid-audit"
      className="scroll-mt-24 px-6 py-20 sm:py-24"
      style={{ backgroundColor: "#ECE6DB" }}
    >
      <Reveal className="mx-auto max-w-3xl">
        <div
          className="relative overflow-hidden rounded-2xl p-7 sm:p-10"
          style={{
            backgroundColor: "#0D0B09",
            border: "1px solid rgba(212,168,83,0.35)",
            boxShadow: "0 24px 60px rgba(20,17,13,0.18)",
          }}
        >
          {/* Soft gold glow, echoing the audit popup */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/2 h-56 w-80 -translate-x-1/2 rounded-full"
            style={{ backgroundColor: "rgba(212,168,83,0.16)", filter: "blur(70px)" }}
          />

          <div className="relative">
            <h2
              className="font-display font-extrabold tracking-tight text-[#F5F0E8]"
              style={{ fontSize: "clamp(24px, 3.4vw, 36px)", lineHeight: 1.15 }}
            >
              {m.headline}
            </h2>
            <p
              className="mt-3 max-w-xl text-[15px] sm:text-base"
              style={{ color: "rgba(245,240,232,0.7)", lineHeight: 1.7 }}
            >
              {m.sub}
            </p>

            {status === "success" ? (
              <div
                className="mt-8 rounded-xl p-6 text-center"
                style={{
                  border: "1px solid rgba(212,168,83,0.4)",
                  backgroundColor: "rgba(212,168,83,0.06)",
                }}
                role="status"
                aria-live="polite"
              >
                <p className="font-display text-lg font-bold" style={{ color: "#D4A853" }}>
                  {f.successTitle}
                </p>
                <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {f.successBody}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8">
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />
                <input type="hidden" name="lang" value={lang} />
                <input type="hidden" name="page" value={pathname ?? "/"} />
                <input type="hidden" name="form" value="visibility-audit-mid-page" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="mf-name" className="sr-only">
                      {m.name}
                    </label>
                    <input
                      id="mf-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder={m.name}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="mf-email" className="sr-only">
                      {m.email}
                    </label>
                    <input
                      id="mf-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder={m.email}
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="mf-website" className="sr-only">
                      {m.website}
                    </label>
                    <input
                      id="mf-website"
                      name="website"
                      type="url"
                      inputMode="url"
                      placeholder={m.website}
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="mf-challenge" className="sr-only">
                      {m.challenge}
                    </label>
                    <textarea
                      id="mf-challenge"
                      name="challenge"
                      rows={2}
                      placeholder={m.challenge}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                {status === "error" && (
                  <p
                    className="mt-4 text-sm"
                    style={{ color: "#E5A3A3" }}
                    role="alert"
                    aria-live="assertive"
                  >
                    {f.errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="cta-shine mt-6 w-full rounded-full px-7 py-4 text-sm font-semibold text-night transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  style={{ backgroundColor: "#D4A853" }}
                >
                  {pending ? f.sending : m.submit}
                </button>

                <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {m.note}
                </p>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
