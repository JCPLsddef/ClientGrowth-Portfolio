"use server";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export type Lead = {
  name: string;
  business: string;
  email: string;
  website: string;
  phone: string;
  revenue: string;
  message: string;
  submittedAt: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function submitLead(
  _prev: LeadState,
  formData: FormData
): Promise<LeadState> {
  // Honeypot: real users never fill this hidden field; bots do.
  if (((formData.get("company_url") as string) || "").trim()) {
    return { status: "success", message: "Thanks." };
  }

  const name = ((formData.get("name") as string) || "").trim();
  const business = ((formData.get("business") as string) || "").trim();
  const email = ((formData.get("email") as string) || "").trim();
  const website = ((formData.get("website") as string) || "").trim();
  const phone = ((formData.get("phone") as string) || "").trim();
  const revenue = ((formData.get("revenue") as string) || "").trim();
  const message = ((formData.get("message") as string) || "").trim();

  if (!name || !business || !email) {
    return {
      status: "error",
      message: "Please add your name, business, and email so I can reach you.",
    };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "That email address does not look right." };
  }

  const lead: Lead = {
    name,
    business,
    email,
    website,
    phone,
    revenue,
    message,
    submittedAt: new Date().toISOString(),
  };

  try {
    await deliverLead(lead);
  } catch (err) {
    console.error("[lead] delivery failed:", err);
    return {
      status: "error",
      message:
        "Something went wrong on my end. Please email juan@clientgrowth.ca directly and I'll get right back to you.",
    };
  }

  return {
    status: "success",
    message:
      "Got it. I'll review your business myself and get back to you personally. Talk soon.",
  };
}

/**
 * Lead delivery — emails each submission to Client Growth via Resend.
 * Reply-to is set to the prospect so Juan can reply to them directly.
 * If RESEND_API_KEY is not set (e.g. local dev), the lead is logged instead
 * so nothing is lost and the form keeps working.
 */
async function deliverLead(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO || "juan@clientgrowth.ca";
  const from = process.env.LEAD_FROM || "Client Growth <onboarding@resend.dev>";

  if (!apiKey) {
    console.log("[lead] (set RESEND_API_KEY to email these)", JSON.stringify(lead));
    return;
  }

  const orDash = (v: string) => (v ? v : "—");
  const text = [
    "New Visibility Audit request",
    "",
    `Name: ${lead.name}`,
    `Business: ${lead.business}`,
    `Email: ${lead.email}`,
    `Phone: ${orDash(lead.phone)}`,
    `Website: ${orDash(lead.website)}`,
    `Monthly revenue: ${orDash(lead.revenue)}`,
    "",
    "What they want to fix:",
    orDash(lead.message),
    "",
    `Submitted: ${lead.submittedAt}`,
  ].join("\n");

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject: `New Visibility Audit request — ${lead.business}`,
    text,
  });

  if (error) {
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}
