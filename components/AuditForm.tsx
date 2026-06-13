"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/LanguageProvider";

// Leads are delivered by Formspree (https://formspree.io) straight to the
// Client Growth inbox. No server or env vars involved: the form posts from
// the browser with an `Accept: application/json` header so Formspree replies
// with JSON instead of redirecting.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mykajvqj";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-[rgba(212,168,83,0.5)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[15px] text-white placeholder:text-[rgba(255,255,255,0.4)] transition-colors hover:border-[rgba(212,168,83,0.75)] focus:border-[#D4A853] focus:outline-none";

// The revenue option values are kept in English so lead emails stay consistent
// regardless of the visitor's language; only the visible labels are translated.
const REVENUE_VALUES = [
  "Under $5K/mo",
  "$5K-$15K/mo",
  "$15K-$50K/mo",
  "$50K+/mo",
];

export default function AuditForm() {
  const { t, lang } = useLang();
  const f = t.auditForm;
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const pending = status === "submitting";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return; // guards against double submission

    const data = new FormData(e.currentTarget);

    // Honeypot: real users never fill this hidden field; bots do. Show the
    // success state without sending so bots learn nothing. Formspree also
    // discards any submission where `_gotcha` is filled.
    if (((data.get("_gotcha") as string) || "").trim()) {
      setStatus("success");
      return;
    }

    // Subject line of the notification email, set per submission.
    data.set(
      "_subject",
      `New Visibility Audit request — ${(data.get("business") as string) || "?"}`
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
      console.error("[lead] delivery failed:", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="mx-auto max-w-xl rounded-2xl p-8 text-center"
        style={{
          border: "1px solid rgba(212,168,83,0.4)",
          backgroundColor: "rgba(212,168,83,0.06)",
        }}
        role="status"
        aria-live="polite"
      >
        <p
          className="font-display text-xl font-bold"
          style={{ color: "#D4A853" }}
        >
          {f.successTitle}
        </p>
        <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
          {f.successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl text-left" noValidate={false}>
      {/* Honeypot: hidden from users, catches bots. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      {/* Lead metadata: visible in the Formspree email/dashboard. */}
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="page" value={pathname ?? "/"} />
      <input type="hidden" name="form" value="visibility-audit" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lf-name" className="sr-only">
            {f.name}
          </label>
          <input
            id="lf-name"
            name="name"
            required
            autoComplete="name"
            placeholder={f.name}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lf-business" className="sr-only">
            {f.business}
          </label>
          <input
            id="lf-business"
            name="business"
            required
            autoComplete="organization"
            placeholder={f.business}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lf-email" className="sr-only">
            {f.email}
          </label>
          <input
            id="lf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={f.email}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lf-phone" className="sr-only">
            {f.phone}
          </label>
          <input
            id="lf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={f.phone}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lf-website" className="sr-only">
            {f.website}
          </label>
          <input
            id="lf-website"
            name="website"
            type="url"
            inputMode="url"
            placeholder={f.website}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lf-revenue" className="sr-only">
            {f.revenueLabel}
          </label>
          <select
            id="lf-revenue"
            name="revenue"
            defaultValue=""
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled style={{ color: "#6B6354", backgroundColor: "#fff" }}>
              {f.revenuePlaceholder}
            </option>
            {REVENUE_VALUES.map((value, i) => (
              <option
                key={value}
                value={value}
                style={{ color: "#0D0B09", backgroundColor: "#fff", fontWeight: 600 }}
              >
                {f.revenueOptions[i]}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lf-message" className="sr-only">
            {f.message}
          </label>
          <textarea
            id="lf-message"
            name="message"
            rows={3}
            placeholder={f.message}
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

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={pending}
          className="cta-shine w-full rounded-full px-10 py-[18px] text-base font-bold text-night shadow-[0_12px_30px_rgba(212,168,83,0.35)] transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          style={{ backgroundColor: "#D4A853" }}
        >
          {pending ? f.sending : f.submit}
        </button>
      </div>

      <p className="mt-5 text-center text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
        {f.disclaimer}
      </p>
      <p className="mt-1.5 text-center text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
        {f.privacyNote}
      </p>
    </form>
  );
}
