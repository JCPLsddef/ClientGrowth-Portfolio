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
  /** Industry / location tag, e.g. "Barbershop" or "Painting · Texas". Only facts already public on this site. */
  tag: string;
  /** French translation of `tag`. */
  tagFr: string;
  /** Headline metric in gold, e.g. "46x return". Omit rather than invent: the card stays complete without it. */
  stat?: string;
  /** French translation of `stat`. */
  statFr?: string;
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
  /** TODO_TEXT -> real quote, in the client's words. Do not invent. "\n\n" splits paragraphs. */
  quote: string;
  /**
   * Faithful English translation of a French `quote` (optional). Shown to EN
   * visitors with a "Translated from French" note; FR visitors always get the
   * original.
   */
  quoteEn?: string;
  /** TODO_IMG -> circular client photo at /public/work/<slug>-photo.webp */
  photo: string;
  /** TODO_LOOM -> 30s Loom embed URL (optional). */
  loom?: string;
  placement: TestimonialPlacement;
};

// Client logos (Client Growth Wix media library). Referenced as remote
// images; static.wixstatic.com is whitelisted in next.config.mjs.
const LOGOS = {
  eliteBarbershop:
    "https://static.wixstatic.com/media/62f926_e18d05b0a0914e6fb4269bcd04246eb5~mv2.png",
  tripleWRentals:
    "https://static.wixstatic.com/media/62f926_cdac06309eba45679ea0ac08a402b45c~mv2.png",
  cultureBarbershop:
    "https://static.wixstatic.com/media/62f926_ca6524ec96fe4822a3da0d0481995989~mv2.png",
  centreDentaire:
    "https://static.wixstatic.com/media/62f926_46341a52a846490d8446c91d0fb56281~mv2.png",
  nancyMusselman:
    "https://static.wixstatic.com/media/62f926_a4e8d4b1911b4aa7a3b026a0052431e7~mv2.png",
  beamRealEstate:
    "https://static.wixstatic.com/media/62f926_9ad494fb59a64c3abe3ff5bd1941b69c~mv2.jpg",
  absolutePainting:
    "https://static.wixstatic.com/media/62f926_cbad727efe524758927405bae7ce8c84~mv2.png",
} as const;

/**
 * One entry in the hero trust strip (decoupled from the Work grid).
 * `scale` is an optical-balance multiplier: each source logo bakes in a
 * different amount of transparent padding, so at a single fixed tile size
 * some read huge (Beam) and some tiny (Culture). The tile constrains every
 * logo to the same box; `scale` then nudges each one so they all *look*
 * the same visual weight. 1 = no adjustment.
 */
export type StripLogo = { name: string; logo: string; scale?: number };

// The "selected work" strip under the hero. Order: strongest, most
// recognizable results first. `scale` values are tuned by eye against the
// rendered strip so every logo carries equal visual weight.
export const logoStrip: StripLogo[] = [
  { name: "Triple W Rentals", logo: LOGOS.tripleWRentals, scale: 1.08 },
  { name: "Elite Barbershop", logo: LOGOS.eliteBarbershop, scale: 1.08 },
  { name: "Nancy Musselman Real Estate", logo: LOGOS.nancyMusselman, scale: 1 },
  { name: "Centre Dentaire Saint-Élzéar", logo: LOGOS.centreDentaire, scale: 1.32 },
  { name: "Culture Barbershop", logo: LOGOS.cultureBarbershop, scale: 1.42 },
  { name: "Beam Real Estate LLC", logo: LOGOS.beamRealEstate, scale: 0.78 },
  { name: "Absolute Painting", logo: LOGOS.absolutePainting, scale: 1.05 },
];

export const clients: WorkClient[] = [
  {
    slug: "triple-w-rentals",
    name: "Triple W Rentals",
    logo: LOGOS.tripleWRentals,
    tag: "Rentals",
    tagFr: "Location",
    stat: "46x return on ad spend",
    statFr: "Rendement publicitaire de 46x",
    result:
      "$41,085 in 30 days from $900 in ad spend, at around $33 per qualified call.",
    resultFr:
      "41 085 $ en 30 jours à partir de 900 $ en publicité, environ 33 $ par appel qualifié.",
    liveUrl: TODO_URL,
    shot: TODO_IMG,
    span: "feature",
    caseStudyHref: "/work/triple-w-rentals",
  },
  {
    slug: "texas-real-estate",
    name: "Texas Real Estate",
    logo: TODO_IMG,
    tag: "Real estate · Texas",
    tagFr: "Immobilier · Texas",
    stat: "#1 Google impression share",
    statFr: "No 1 en part d'impressions Google",
    result: "From invisible to the top of Google in his market.",
    resultFr: "D'invisible au sommet de Google dans son marché.",
    liveUrl: TODO_URL,
    shot: TODO_IMG,
    span: "wide",
  },
  {
    slug: "elite-barbershop",
    name: "Elite Barbershop",
    logo: LOGOS.eliteBarbershop,
    tag: "Barbershop",
    tagFr: "Barbier",
    stat: "90 clients in 90 days",
    statFr: "90 clients en 90 jours",
    result: "Site, ads, and SEO compounding together.",
    resultFr: "Site, publicités et SEO qui s'additionnent.",
    liveUrl: TODO_URL,
    shot: TODO_IMG,
  },
  {
    slug: "culture-barbershop",
    name: "Culture Barbershop",
    logo: LOGOS.cultureBarbershop,
    tag: "Barbershop",
    tagFr: "Barbier",
    result: "A fully custom site that finally matches the quality of the cuts.",
    resultFr:
      "Un site entièrement sur mesure, enfin à la hauteur de la qualité des coupes.",
    liveUrl: TODO_URL,
    shot: TODO_IMG,
  },
  {
    slug: "absolute-painting",
    name: "Absolute Painting",
    logo: LOGOS.absolutePainting,
    tag: "Painting · Texas",
    tagFr: "Peinture · Texas",
    result: "Website and Google Ads in a crowded Texas market.",
    resultFr: "Site web et Google Ads dans un marché texan saturé.",
    liveUrl: TODO_URL,
    shot: TODO_IMG,
  },
  {
    slug: "centre-dentaire-saint-elzear",
    name: "Centre Dentaire Saint-Élzéar",
    logo: LOGOS.centreDentaire,
    tag: "Dental clinic · Quebec",
    tagFr: "Clinique dentaire · Québec",
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
    business: "Texas Real Estate",
    quote: TODO_TEXT,
    photo: TODO_IMG,
    loom: TODO_LOOM,
    placement: "afterStats",
  },
  // Real, verbatim quote from the founder of Elite Barbershop (in French).
  // `quoteEn` is a faithful translation, flagged as such in the UI.
  {
    name: "Hadi Sakr",
    business: "Fondateur, Elite Barbershop",
    quote:
      "J'ai eu une excellente expérience avec la création du site web de Elite Barbershop. Le service a été professionnel, rapide et toujours à l'écoute de mes besoins.\n\nLe résultat final reflète parfaitement mon image de marque et offre une expérience simple et moderne pour mes clients. La communication a été excellente tout au long du projet, et chaque détail a été pris en compte.\n\nJe recommande sans hésitation à toute entreprise qui cherche un site web professionnel et de qualité.",
    quoteEn:
      "I had an excellent experience with the creation of the Elite Barbershop website. The service was professional, fast, and always attentive to my needs.\n\nThe final result perfectly reflects my brand image and offers a simple, modern experience for my clients. Communication was excellent throughout the project, and every detail was taken care of.\n\nI recommend without hesitation to any business looking for a professional, high-quality website.",
    photo: TODO_IMG,
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
