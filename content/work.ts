// ============================================================
// Single source of truth for the proof layer: the Work grid,
// the inline testimonials, and the Triple W case study.
//
// HOW TO FILL THIS IN (Client Growth):
//   1. Replace every value tagged TODO_* with the real asset.
//   2. Drop image files in /public/work (see each field's note).
//   3. That is it. While a field still equals its TODO_* sentinel,
//      the UI shows a neutral, on-brand placeholder instead of a
//      broken image or a dead link. Fill it once here and every
//      section updates.
// ============================================================

export const TODO_IMG = "TODO_IMG" as const; // image not supplied yet (logo / screenshot / photo)
export const TODO_URL = "TODO_URL" as const; // live site URL not supplied yet
export const TODO_LOOM = "TODO_LOOM" as const; // Loom embed URL not supplied yet
export const TODO_TEXT = "TODO_TEXT" as const; // copy I must not invent (real name / quote)

/** True while a field still holds an unfilled TODO sentinel (or is empty). */
export function isTodo(value: string | null | undefined): boolean {
  return !value || value.startsWith("TODO_");
}

export type WorkClient = {
  slug: string;
  /** Business name. Shown as a monochrome wordmark until a real logo lands. */
  name: string;
  /** TODO_IMG -> monochrome logo SVG/PNG at /public/work/<slug>-logo.svg */
  logo: string;
  /** One line of result, brand voice. Written from facts already on this site. */
  result: string;
  /** French translation of `result`. */
  resultFr: string;
  /** TODO_URL -> the live client website (opens in a new tab) */
  liveUrl: string;
  /** TODO_IMG -> desktop screenshot at /public/work/<slug>.webp */
  shot: string;
  /** Drives the Phase D bento layout. */
  span?: "feature" | "wide" | "default";
  /** Set only for clients that have a full case study page. */
  caseStudyHref?: string;
};

export type TestimonialPlacement =
  | "hero"
  | "afterStats"
  | "inWork"
  | "nearPricing"
  | "finalCta";

export type Testimonial = {
  /** TODO_TEXT -> real full name. Do not invent. */
  name: string;
  /** Real client business (already public on this site). */
  business: string;
  /** TODO_TEXT -> real one-line quote, in the client's words. Do not invent. */
  quote: string;
  /** TODO_IMG -> circular client photo at /public/work/<slug>-photo.webp */
  photo: string;
  /** TODO_LOOM -> 30s Loom embed URL (optional). */
  loom?: string;
  placement: TestimonialPlacement;
};

export const clients: WorkClient[] = [
  {
    slug: "triple-w-rentals",
    name: "Triple W Rentals",
    logo: TODO_IMG,
    result:
      "$41,085 in 30 days from $900 in ad spend. 46x return, around $33 per qualified call.",
    resultFr:
      "41 085 $ en 30 jours à partir de 900 $ en publicité. Rendement de 46x, environ 33 $ par appel qualifié.",
    liveUrl: TODO_URL,
    shot: TODO_IMG,
    span: "feature",
    caseStudyHref: "/work/triple-w-rentals",
  },
  {
    slug: "texas-real-estate",
    name: "Texas Real Estate",
    logo: TODO_IMG,
    result: "From invisible to #1 in Google impression share in his market.",
    resultFr: "D'invisible à no 1 en part d'impressions Google dans son marché.",
    liveUrl: TODO_URL,
    shot: TODO_IMG,
    span: "wide",
  },
  {
    slug: "elite-barbershop",
    name: "Elite Barbershop",
    logo: TODO_IMG,
    result: "90 new clients in 90 days. Site, ads, and SEO compounding together.",
    resultFr:
      "90 nouveaux clients en 90 jours. Site, publicités et SEO qui s'additionnent.",
    liveUrl: TODO_URL,
    shot: TODO_IMG,
  },
  {
    slug: "culture-barbershop",
    name: "Culture Barbershop",
    logo: TODO_IMG,
    result: "A fully custom site that finally matches the quality of the cuts.",
    resultFr:
      "Un site entièrement sur mesure, enfin à la hauteur de la qualité des coupes.",
    liveUrl: TODO_URL,
    shot: TODO_IMG,
  },
  {
    slug: "absolute-painting",
    name: "Absolute Painting",
    logo: TODO_IMG,
    result: "Website and Google Ads in a crowded Texas market.",
    resultFr: "Site web et Google Ads dans un marché texan saturé.",
    liveUrl: TODO_URL,
    shot: TODO_IMG,
  },
  {
    slug: "centre-dentaire-saint-elzear",
    name: "Centre Dentaire Saint-Élzéar",
    logo: TODO_IMG,
    result: "A clinic site built to book appointments, not just sit there.",
    resultFr:
      "Un site de clinique conçu pour prendre des rendez-vous, pas juste exister.",
    liveUrl: TODO_URL,
    shot: TODO_IMG,
  },
];

// One testimonial per point of doubt. Business names are real clients; the
// quote, name, photo, and Loom are left as TODOs to fill, never invented.
export const testimonials: Testimonial[] = [
  {
    name: TODO_TEXT,
    business: "Triple W Rentals",
    quote: TODO_TEXT,
    photo: TODO_IMG,
    loom: TODO_LOOM,
    placement: "hero",
  },
  {
    name: TODO_TEXT,
    business: "Elite Barbershop",
    quote: TODO_TEXT,
    photo: TODO_IMG,
    loom: TODO_LOOM,
    placement: "afterStats",
  },
  {
    name: TODO_TEXT,
    business: "Texas Real Estate",
    quote: TODO_TEXT,
    photo: TODO_IMG,
    loom: TODO_LOOM,
    placement: "inWork",
  },
  {
    name: TODO_TEXT,
    business: "Absolute Painting",
    quote: TODO_TEXT,
    photo: TODO_IMG,
    loom: TODO_LOOM,
    placement: "nearPricing",
  },
  {
    name: TODO_TEXT,
    business: "Triple W Rentals",
    quote: TODO_TEXT,
    photo: TODO_IMG,
    loom: TODO_LOOM,
    placement: "finalCta",
  },
];

// Only surface a testimonial once it has a real quote. While the quote is a
// TODO placeholder, every placement renders nothing instead of a stub.
export function testimonialFor(
  placement: TestimonialPlacement,
): Testimonial | undefined {
  const t = testimonials.find((x) => x.placement === placement);
  return t && !isTodo(t.quote) ? t : undefined;
}

// Triple W Rentals case study (/work/triple-w-rentals). The narrative prose
// lives in the route; these are the assets I will not invent until supplied.
export const tripleW = {
  quote: TODO_TEXT, // the owner's quote, in his words
  quoteName: TODO_TEXT, // the owner's full name
  loom: TODO_LOOM, // 30s Loom embed URL (https://www.loom.com/embed/<id>)
  beforeShot: TODO_IMG, // /public/work/triple-w-before.webp
  afterShot: TODO_IMG, // /public/work/triple-w-after.webp
};
