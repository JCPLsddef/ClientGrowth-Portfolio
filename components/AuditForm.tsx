"use client";

import { useActionState } from "react";
import { submitLead, type LeadState } from "@/app/actions/submitLead";

const initialState: LeadState = { status: "idle" };

const inputClass =
  "w-full rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[15px] text-white placeholder:text-[rgba(255,255,255,0.4)] transition-colors focus:border-[#D4A853] focus:outline-none";

export default function AuditForm() {
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
          Request received.
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lf-name" className="sr-only">
            Your name
          </label>
          <input
            id="lf-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lf-business" className="sr-only">
            Business name
          </label>
          <input
            id="lf-business"
            name="business"
            required
            autoComplete="organization"
            placeholder="Business name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lf-email" className="sr-only">
            Email
          </label>
          <input
            id="lf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lf-phone" className="sr-only">
            Phone (optional)
          </label>
          <input
            id="lf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone (optional)"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lf-website" className="sr-only">
            Website (optional)
          </label>
          <input
            id="lf-website"
            name="website"
            type="url"
            inputMode="url"
            placeholder="Your website (optional)"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lf-revenue" className="sr-only">
            Monthly revenue (optional)
          </label>
          <select
            id="lf-revenue"
            name="revenue"
            defaultValue=""
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>
              Roughly what does your business do per month? (optional)
            </option>
            <option value="Under $5K/mo">Under $5K / month</option>
            <option value="$5K-$15K/mo">$5K – $15K / month</option>
            <option value="$15K-$50K/mo">$15K – $50K / month</option>
            <option value="$50K+/mo">$50K+ / month</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lf-message" className="sr-only">
            What do you want to fix? (optional)
          </label>
          <textarea
            id="lf-message"
            name="message"
            rows={3}
            placeholder="What do you want to fix? (optional)"
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
        {pending ? "Sending..." : "Get my free Visibility Audit"}
      </button>

      <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
        No cost, no obligation. I review every business personally.
      </p>
    </form>
  );
}
