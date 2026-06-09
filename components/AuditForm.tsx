"use client";

import { useActionState } from "react";
import { submitLead, type LeadState } from "@/app/actions/submitLead";
import { useLang } from "@/components/LanguageProvider";

const initialState: LeadState = { status: "idle" };

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
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  if (state.status === "success") {
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
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mx-auto max-w-xl text-left">
      {/* Honeypot: hidden from users, catches bots. */}
      <input
        type="text"
        name="company_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      {/* Tells the server action which language to reply in. */}
      <input type="hidden" name="lang" value={lang} />

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
            <option value="" disabled>
              {f.revenuePlaceholder}
            </option>
            {REVENUE_VALUES.map((value, i) => (
              <option key={value} value={value}>
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

      {state.status === "error" && (
        <p
          className="mt-4 text-sm"
          style={{ color: "#E5A3A3" }}
          role="alert"
          aria-live="assertive"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="cta-shine mt-6 w-full rounded-full px-7 py-4 text-sm font-semibold text-night transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        style={{ backgroundColor: "#D4A853" }}
      >
        {pending ? f.sending : f.submit}
      </button>

      <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
        {f.disclaimer}
      </p>
    </form>
  );
}
