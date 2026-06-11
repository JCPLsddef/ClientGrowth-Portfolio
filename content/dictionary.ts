// ============================================================
// Bilingual copy for the whole site (English + French).
//
// This is the single source of truth for every user-facing string.
// `en` defines the shape; `fr` is typed as `typeof en`, so the
// compiler refuses to build if a French key is missing or misshaped.
//
// Voice rules (kept from the brand): first person, confident, no
// em dashes, no "we/our". French is written for a Quebec audience.
// ============================================================

export type Lang = "en" | "fr";

/** Cookie that persists the visitor's language choice (read on the server). */
export const LANG_COOKIE = "cg-lang";

export const en = {
  nav: {
    links: [
      { href: "#work", label: "Work" },
      { href: "#system", label: "System" },
      { href: "#how-i-think", label: "For hiring teams" },
    ],
    ctaShort: "Free Audit",
    ctaLong: "Free Visibility Audit",
    langAria: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    eyebrow: "Growth systems for local service businesses",
    headline: "Become the obvious choice in your market.",
    highlight: ["obvious", "choice"],
    subhead:
      "You built a business worth choosing. Online, a weaker competitor still looks easier to trust. I fix that.",
    ctaPrimary: "Get your free Visibility Audit",
    ctaSecondary: "Apply to be a Partner →",
    mechanism:
      "The website, the Google visibility, and the AI follow-up. Built and shipped as one system.",
    mechanism2:
      "Most owners cannot say where they lose customers. After this, you can.",
    proofPrefix: "$41,085 in 30 days, from $900 in ad spend. ",
    proofStrong: "46x return.",
    logosLabel:
      "Selected work across local services, real estate, and dental care",
  },

  socialProof: {
    label: "What my clients say",
  },

  problem: {
    label: "The cost of being invisible",
    headlinePrefix:
      "Your competitors aren't better than you. They're just better at being ",
    headlineSeen: "seen.",
    paragraphs: [
      "You know your work is better. The customers who actually hire you know it too.",
      "But most people never get that far. They search, they compare, and they decide in seconds, before they ever call. They don't pick the best business. They pick the one that looks safest to trust.",
      "So a newer, weaker shop with a sharper website and a stronger Google presence takes the call that should have been yours. Not because they earned it. Because they showed up and you didn't.",
      "Every month you stay hard to find, that keeps happening. Quietly. You never see the customers you lost, because they never knew you existed.",
    ],
  },

  reframe: {
    headline:
      "You don't need more marketing. You need to become the obvious choice.",
    highlight: ["obvious", "choice"],
    paragraphs: [
      "Most marketing throws traffic at a business that was never built to convert it. More clicks, more spend, more noise, same result.",
      "I work in the opposite order. First I make you the business that looks most credible the second someone finds you. Then I put qualified attention in front of it. Visibility, then trust, then the call.",
      "That is the difference between renting attention and owning your market.",
    ],
  },

  proof: {
    label: "Work",
    headline: "I would rather show you than tell you.",
    sub: "Real clients, real numbers, and the system behind each one.",
    statLabels: [
      "Return on ad spend",
      "In 30 days · Triple W",
      "Clients in 90 days · Elite",
      "Impression share · Texas",
    ],
    cta: "Get results like these → Free Visibility Audit",
  },

  howIThink: {
    label: "For hiring teams",
    headline: "How I think.",
    sub: "Hiring me, or hiring my system. Either way, this is how I work.",
    steps: [
      {
        title: "Research",
        body: "I start by finding where customers slip to competitors, and what it costs. No build begins before I know the gap.",
      },
      {
        title: "Build",
        body: "I build the whole system, not a piece of it. Site, visibility, ads, and follow-up, made to work as one.",
      },
      {
        title: "Prove",
        body: "I measure one number: qualified calls on the calendar. Every call, cost, and source sits on one dashboard.",
      },
      {
        title: "Optimize",
        body: "I improve it every month. The system gets sharper the longer it runs.",
      },
    ],
    link: "See a full build, start to finish →",
  },

  system: {
    label: "The system",
    headline: "One system. Built to make you unignorable.",
    sub: "Most businesses buy these one at a time, from different people, and the pieces never talk to each other. I build them as one machine, so each part makes the next one stronger.",
    pillars: [
      {
        title: "Conversion website",
        body: "A premium site built around one job: turning visitors into booked calls.",
      },
      {
        title: "Local SEO and AI Search",
        body: "You show up first on Google, and inside AI answers when people ask for the best in your area.",
      },
      {
        title: "Google Ads",
        body: "Qualified buyers in front of you the day we go live. The same system that returned 46x for Triple W.",
      },
      {
        title: "AI follow-up and receptionist",
        body: "Every lead answered in seconds, day or night. You stop losing customers to a missed call.",
      },
      {
        title: "Lead capture and tracking",
        body: "Every call, cost, and source on one dashboard. You always know what is working.",
      },
    ],
    footer:
      "Built once. Improved every month. The last marketing system you will need to think about.",
  },

  howItWorks: {
    label: "How it works",
    headline: "Three steps. I do the work.",
    steps: [
      {
        title: "Free Visibility Audit",
        body: "I show you exactly where customers are slipping to competitors, and what it is costing you. No charge, no obligation.",
      },
      {
        title: "I build your system",
        body: "Website, visibility, ads, and follow-up, built as one system and live in weeks.",
      },
      {
        title: "You become the obvious choice",
        body: "Qualified calls come in. You focus on the work. I keep optimizing every month.",
      },
    ],
    footer:
      "You keep full control of your business. I run the machine that feeds it.",
  },

  founder: {
    label: "Who you're working with",
    name1: "Juan-Carlos",
    name2: "Portillo-Laflamme",
    paragraphs: [
      "I run Client Growth myself, from Laval, Quebec. The person who designs your system is the same one who builds it, optimizes it, and answers when you call. No sales rep who vanishes after you sign. No junior learning on your account. No queue of bigger clients ahead of you.",
      "I take on three clients at a time — maximum. That is not a marketing line; it is how I stay close enough to every account to make the system genuinely perform.",
      "I hold myself to a single number: qualified calls on your calendar. If it is not climbing, I am not done. Your growth is the only scoreboard I keep.",
    ],
    photoAlt: "Juan-Carlos Portillo-Laflamme, founder of Client Growth",
  },

  pricing: {
    label: "Pricing",
    headline: "Premium presence. Without agency prices.",
    sub: "Two ways to work with me.",
    card1Title: "Conversion Website",
    card1Price: "from $600",
    card1Body:
      "A custom, premium website built to convert, not just to look good. Yours to keep.",
    card2Title: "Growth Partnership",
    card2Badge: "Flagship",
    card2Price: "from $2,500",
    card2PriceSuffix: "/mo",
    card2Body:
      "The full Growth Architecture: conversion website, local SEO and AI Search, Google Ads, AI follow-up, and weekly optimization. 90-day initial term, then month to month. No hidden fees.",
    trustLine: "Ad spend goes straight to Google, never to me.",
    scarcity:
      "I run a maximum of three Partnership clients at a time. When the seats are full, the waitlist opens.",
    cta: "See if your business qualifies → Apply to be a Partner",
    fallbackPrefix: "Not ready to apply. ",
    fallbackLink: "See what this looks like first.",
  },

  riskReversal: {
    headline: "The risk is mine, not yours.",
    badge: "90-day guarantee",
    guaranteeGold:
      "If I do not produce a measurable result in your first 90 days, you stop paying.",
    guaranteeRest:
      " I keep working until I do. You keep every asset I have built for you, and you can ask for improvements anytime, free.",
    guaranteeP2:
      "I can promise that because I do not take clients I do not believe I can help. I review your business before I agree to work with you, not after you have paid. That is what the application is for.",
    objections: [
      {
        q: "“I have tried marketing before.”",
        a: "You tried pieces. This is a system. The clicks were real. The thing that was supposed to convert them was never built.",
      },
      {
        q: "“I know someone cheaper.”",
        a: "Cheaper builds you a thing. I build you a result, and I back it with the guarantee above.",
      },
      {
        q: "“Will I lose control?”",
        a: "No. You own every asset. I run the machine. You run the business.",
      },
    ],
  },

  faq: {
    label: "Questions",
    headline: "Questions Serious Buyers Ask.",
    sub: "I would rather answer the hard ones here than waste your time on a call.",
    mostCommon: "Most common objection",
    items: [
      {
        question:
          "I ran Google Ads before and lost money. Why would this be different?",
        answer:
          "Because ads without a conversion system are just expensive traffic. You got clicks. The website that received them was not built to close. The targeting was not built around purchase intent. The landing page was probably your home page.\n\nI have seen this exact story more times than I can count. A business owner spends $500 to $1,000, gets clicks, gets zero calls, and concludes ads do not work in their industry.\n\nThe clicks were real. Everything behind them was not built. I build it first. Then the ads run. When the funnel exists before the traffic, the calls come. The difference between losing money on ads and 46x return on ad spend is the infrastructure that receives the traffic.",
      },
      {
        question: "What exactly is the Growth Architecture?",
        answer:
          "It's a complete acquisition system. Not just a website, not just ads. All of it, built together so each part makes the others stronger. Positioning, conversion website, Google Ads, AI automation, lead qualification, monthly optimization. Built once. Improved every month. It's the last marketing system you will need to think about.",
      },
      {
        question: "How fast will I see results?",
        answer:
          "Fast build from signed agreement to live system. That includes the diagnostic audit, full website build, and campaign setup. Most clients see their first inbound call within weeks of going live. The full system reaches peak efficiency at 60 to 90 days as the SEO compounds and the ad campaigns optimize. The tracking dashboard shows you every call, every cost, and every source from day one.",
      },
      {
        question: "What happens if I already have a website?",
        answer:
          "If it converts, I keep it. If it does not, I rebuild it around one goal: booking calls.",
      },
      {
        question: "What is the minimum I need to invest in ads?",
        answer:
          "I recommend starting at $500 per month. At $33 per qualified call, that is roughly 15 calls. One closed job usually covers the entire system cost.",
      },
      {
        question: "How is this different from hiring a regular agency?",
        answer:
          "An agency delivers a project and moves to the next client. I measure my success by one number: qualified calls on your calendar. If that number is not growing every month, I have not done my job. I own the full system, which means nothing falls through the gaps between vendors. And I have never sent a report full of impressions as a substitute for actual results.",
      },
      {
        question: "What if it does not work?",
        answer:
          "If I do not produce a measurable result in the first 90 days, you stop paying and I keep working until I do. You keep every asset I have built for you, and you can ask for improvements anytime, free.\n\nI do not take clients I do not believe I can help. That is why there is an application. I review your business before agreeing to work with you, not after you have paid.",
      },
      {
        question: "What does this cost?",
        answer:
          "Two ways in. Individual builds start at $600 for a conversion website. The full Growth Partnership starts at $2,500/month and covers the complete acquisition system: conversion website, local SEO, Google Ads, and weekly optimization. Ad spend goes directly to Google, not to me. The initial term is 90 days, then month-to-month. No hidden fees.",
      },
      {
        question: "Who is NOT a good fit?",
        answer:
          "Businesses under $5K per month in revenue. Businesses wanting a logo, a brochure site, or a one-off project. Anyone not ready to commit to a 90-day initial run. Anyone who wants to test the waters with no real system behind it.",
      },
      {
        question: "Who is this built for?",
        answer:
          "Service businesses generating $5K or more per month that rely too heavily on referrals and want a predictable, scalable way to get new clients from the internet. Painters, barbershops, RV rental companies, dental clinics, and any local service where the phone needs to ring with qualified buyers.",
      },
    ],
    footerNote: "Still have a question I did not answer? Let us talk.",
    footerCta: "Apply to be a Partner →",
  },

  finalCta: {
    headlinePrefix: "Stop being your market's ",
    headlineGold: "best-kept secret.",
    headlineSuffix: "",
    sub: "Tell me about your business. I will send back a free Visibility Audit. You will see exactly where you are losing customers right now, and the fastest path to becoming the obvious choice.",
    contact:
      "Prefer to talk? +1 (438) 522-0907 · juan@clientgrowth.ca · Three client seats. Founder-led. Quebec.",
  },

  auditForm: {
    name: "Your name",
    business: "Business name",
    email: "Email",
    phone: "Phone (optional)",
    website: "Your website (optional)",
    revenueLabel: "Monthly revenue (optional)",
    revenuePlaceholder:
      "Roughly what does your business do per month? (optional)",
    revenueOptions: [
      "Under $5K / month",
      "$5K – $15K / month",
      "$15K – $50K / month",
      "$50K+ / month",
    ],
    message: "What do you want to fix? (optional)",
    submit: "Get my free Visibility Audit",
    sending: "Sending...",
    disclaimer: "No cost, no obligation. I review every business personally.",
    successTitle: "Request received.",
    successBody:
      "Got it. I'll review your business myself and get back to you personally. Talk soon.",
    errorMessage:
      "Something went wrong sending your request. Please try again, or email juan@clientgrowth.ca directly and I'll get right back to you.",
  },

  footer: {
    tagline: "Growth infrastructure for local service businesses.",
    navHeading: "Navigation",
    navLinks: [
      { label: "How it works", href: "/#system" },
      { label: "Work", href: "/#work" },
      { label: "For hiring teams", href: "/#how-i-think" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Apply", href: "/#apply" },
    ],
    legalHeading: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    operated:
      "Operated from Quebec, Canada. Founder-led. Juan@clientgrowth.ca",
    rights: "All rights reserved.",
  },

  mobileCta: {
    label: "Free Visibility Audit",
  },

  work: {
    signatureResult: "Signature result",
    viewLive: "View live site →",
    seeBuild: "See the build →",
    screenshotComing: "Screenshot coming",
  },

  testimonial: {
    placeholderQuote: "A verified client quote will appear here.",
    verifiedClient: "Verified client",
    watchClip: "Watch the 30s clip",
    inTheirWords: "in their words",
  },

  videoModal: {
    defaultLabel: "Watch the 30 second clip",
    close: "Close video",
    placeholder:
      "A 30 second clip from the owner lands here once recorded.",
  },

  caseStudy: {
    back: "← Back to the work",
    eyebrow: "Case study",
    title: "Triple W Rentals",
    intro:
      "$900 in ad spend became $41,085 in 30 days. A 46x return, at around $33 per qualified call. Here is exactly how I built it.",
    problemLabel: "The problem",
    problemHeadline: "Good business. Invisible at the moment that mattered.",
    problemParagraphs: [
      "Triple W had the inventory, the service, and the reviews to win. Online, none of that showed up when it counted.",
      "Customers searched, compared in seconds, and called whoever looked safest to trust. That was rarely the best option. It was the most visible one.",
      "Money spent on ads leaked straight through a site that was never built to convert. Clicks came in. Calls did not.",
    ],
    builtLabel: "What I built",
    builtHeadline: "One system, built in the right order.",
    builtSub:
      "I did not run ads into a weak site and hope. I built the machine first, then turned on the traffic.",
    built: [
      {
        title: "A conversion website",
        body: "A premium site built around one job: turning visitors into booked calls.",
      },
      {
        title: "Local visibility",
        body: "Search and map presence so Triple W showed up first when people looked for what it offered.",
      },
      {
        title: "Google Ads",
        body: "Qualified buyers in front of the business the day it went live, with spend pointed only at real purchase intent.",
      },
      {
        title: "Tracking on every call",
        body: "Every call, cost, and source on one dashboard, so I always knew what was working.",
      },
    ],
    builtClosing:
      "Each piece made the next one stronger. The ads converted because the site was built to close. The spend stayed efficient because the tracking showed exactly where every dollar went.",
    resultLabel: "The result",
    resultHeadline: "$900 in. $41,085 out. In 30 days.",
    resultStats: [
      "Revenue in 30 days",
      "Return on ad spend",
      "Per qualified call",
    ],
    resultNote:
      "From $900 in ad spend. Same business, same owner, a system that finally matched how good the work already was.",
    before: "Before",
    after: "After",
    wordsLabel: "In his words",
    owner: "Owner",
    ctaHeadline: "You want the same system.",
    ctaSub:
      "I build it once, then improve it every month. If your business is good and invisible, that is the exact gap I close.",
    cta: "Get your free Visibility Audit",
  },
};

/** The full set of translatable strings. `en` defines the shape `fr` must match. */
export type Dictionary = typeof en;

export const fr: Dictionary = {
  nav: {
    links: [
      { href: "#work", label: "Réalisations" },
      { href: "#system", label: "Système" },
      { href: "#how-i-think", label: "Pour les recruteurs" },
    ],
    ctaShort: "Audit gratuit",
    ctaLong: "Audit de visibilité gratuit",
    langAria: "Langue",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },

  hero: {
    eyebrow: "Systèmes de croissance pour entreprises de services locales",
    headline: "Devenez le choix évident dans votre marché.",
    highlight: ["choix", "évident"],
    subhead:
      "Vous avez bâti une entreprise qui mérite d'être choisie. En ligne, un concurrent plus faible a pourtant l'air plus facile à choisir. Je corrige ça.",
    ctaPrimary: "Obtenez votre audit de visibilité gratuit",
    ctaSecondary: "Postulez comme Partenaire →",
    mechanism:
      "Le site web, la visibilité Google et le suivi par IA. Conçus et livrés comme un seul système.",
    mechanism2:
      "La plupart des propriétaires ignorent où ils perdent des clients. Après ça, vous le saurez.",
    proofPrefix: "41 085 $ en 30 jours, à partir de 900 $ en publicité. ",
    proofStrong: "Rendement de 46x.",
    logosLabel:
      "Réalisations choisies : services locaux, immobilier et soins dentaires",
  },

  socialProof: {
    label: "Ce que disent mes clients",
  },

  problem: {
    label: "Le coût de l'invisibilité",
    headlinePrefix:
      "Vos concurrents ne sont pas meilleurs que vous. Ils sont juste meilleurs pour se faire ",
    headlineSeen: "voir.",
    paragraphs: [
      "Vous savez que votre travail est meilleur. Les clients qui vous engagent vraiment le savent aussi.",
      "Mais la plupart des gens ne se rendent jamais là. Ils cherchent, comparent et décident en quelques secondes, avant même d'appeler. Ils ne choisissent pas la meilleure entreprise. Ils choisissent celle qui semble la plus rassurante.",
      "Alors un commerce plus récent et plus faible, avec un meilleur site et une plus forte présence sur Google, reçoit l'appel qui aurait dû être le vôtre. Pas parce qu'il l'a mérité. Parce qu'il était visible et pas vous.",
      "Chaque mois où vous restez difficile à trouver, ça continue. En silence. Vous ne voyez jamais les clients perdus, parce qu'ils n'ont jamais su que vous existiez.",
    ],
  },

  reframe: {
    headline:
      "Vous n'avez pas besoin de plus de marketing. Vous devez devenir le choix évident.",
    highlight: ["choix", "évident"],
    paragraphs: [
      "La plupart du marketing envoie du trafic vers une entreprise qui n'a jamais été conçue pour le convertir. Plus de clics, plus de dépenses, plus de bruit, même résultat.",
      "Je travaille dans l'ordre inverse. D'abord, je fais de vous l'entreprise qui paraît la plus crédible dès qu'on vous trouve. Ensuite, je place de l'attention qualifiée devant elle. La visibilité, puis la confiance, puis l'appel.",
      "C'est la différence entre louer de l'attention et posséder votre marché.",
    ],
  },

  proof: {
    label: "Réalisations",
    headline: "Je préfère vous montrer plutôt que vous le dire.",
    sub: "De vrais clients, de vrais chiffres, et le système derrière chacun.",
    statLabels: [
      "Rendement publicitaire",
      "En 30 jours · Triple W",
      "Clients en 90 jours · Elite",
      "Part d'impressions · Texas",
    ],
    cta: "Obtenez des résultats comme ceux-ci → Audit de visibilité gratuit",
  },

  howIThink: {
    label: "Pour les recruteurs",
    headline: "Comment je pense.",
    sub: "Que vous m'engagiez, moi ou mon système. Dans les deux cas, voici comment je travaille.",
    steps: [
      {
        title: "Recherche",
        body: "Je commence par trouver où les clients glissent vers la concurrence, et ce que ça coûte. Aucun build ne commence avant que je connaisse l'écart.",
      },
      {
        title: "Construction",
        body: "Je construis le système au complet, pas un morceau. Site, visibilité, publicités et suivi, faits pour fonctionner comme un seul.",
      },
      {
        title: "Preuve",
        body: "Je mesure un seul chiffre : les appels qualifiés au calendrier. Chaque appel, coût et source sur un seul tableau de bord.",
      },
      {
        title: "Optimisation",
        body: "Je l'améliore chaque mois. Le système s'affine au fil du temps.",
      },
    ],
    link: "Voir un build complet, du début à la fin →",
  },

  system: {
    label: "Le système",
    headline: "Un seul système. Conçu pour vous rendre incontournable.",
    sub: "La plupart des entreprises achètent ces éléments un à un, de personnes différentes, et les morceaux ne se parlent jamais. Je les construis comme une seule machine, pour que chaque partie renforce la suivante.",
    pillars: [
      {
        title: "Site de conversion",
        body: "Un site haut de gamme bâti autour d'un seul but : transformer les visiteurs en appels réservés.",
      },
      {
        title: "SEO local et AI Search",
        body: "Vous apparaissez en premier sur Google, et dans les réponses des IA quand on cherche le meilleur dans votre région.",
      },
      {
        title: "Google Ads",
        body: "Des acheteurs qualifiés devant vous dès la mise en ligne. Le même système qui a rapporté 46x à Triple W.",
      },
      {
        title: "Suivi et réceptionniste IA",
        body: "Chaque prospect répondu en quelques secondes, jour et nuit. Vous arrêtez de perdre des clients à cause d'un appel manqué.",
      },
      {
        title: "Capture et suivi des prospects",
        body: "Chaque appel, coût et source sur un seul tableau de bord. Vous savez toujours ce qui fonctionne.",
      },
    ],
    footer:
      "Construit une fois. Amélioré chaque mois. Le dernier système marketing auquel vous aurez à penser.",
  },

  howItWorks: {
    label: "Comment ça marche",
    headline: "Trois étapes. Je fais le travail.",
    steps: [
      {
        title: "Audit de visibilité gratuit",
        body: "Je vous montre exactement où les clients glissent vers la concurrence, et ce que ça vous coûte. Sans frais, sans obligation.",
      },
      {
        title: "Je construis votre système",
        body: "Site, visibilité, publicités et suivi, bâtis comme un seul système et en ligne en quelques semaines.",
      },
      {
        title: "Vous devenez le choix évident",
        body: "Les appels qualifiés entrent. Vous vous concentrez sur votre métier. Je continue d'optimiser chaque mois.",
      },
    ],
    footer:
      "Vous gardez le contrôle total de votre entreprise. Je fais rouler la machine qui l'alimente.",
  },

  founder: {
    label: "Avec qui vous travaillez",
    name1: "Juan-Carlos",
    name2: "Portillo-Laflamme",
    paragraphs: [
      "Je dirige Client Growth moi-même, depuis Laval, au Québec. La personne qui conçoit votre système est la même qui le bâtit, l'optimise et vous répond quand vous appelez. Pas un vendeur qui disparaît après la signature. Pas un junior qui apprend sur votre compte. Pas une file de plus gros clients devant vous.",
      "Je prends trois clients à la fois — maximum. Ce n'est pas une phrase marketing : c'est comme ça que je reste assez proche de chaque compte pour que le système performe vraiment.",
      "Je me tiens à un seul chiffre : les appels qualifiés à votre calendrier. S'il n'augmente pas, je n'ai pas fini. Votre croissance, c'est le seul résultat qui compte pour moi.",
    ],
    photoAlt: "Juan-Carlos Portillo-Laflamme, fondateur de Client Growth",
  },

  pricing: {
    label: "Tarifs",
    headline: "Une présence haut de gamme. Sans les prix d'agence.",
    sub: "Deux façons de travailler avec moi.",
    card1Title: "Site de conversion",
    card1Price: "à partir de 600 $",
    card1Body:
      "Un site sur mesure, haut de gamme, conçu pour convertir, pas seulement pour bien paraître. Il est à vous.",
    card2Title: "Partenariat de croissance",
    card2Badge: "Phare",
    card2Price: "à partir de 2 500 $",
    card2PriceSuffix: "/mois",
    card2Body:
      "L'Architecture de croissance complète : site de conversion, SEO local et AI Search, Google Ads, suivi par IA et optimisation hebdomadaire. Engagement initial de 90 jours, puis de mois en mois. Aucuns frais cachés.",
    trustLine: "Le budget publicitaire va directement à Google, jamais à moi.",
    scarcity:
      "Je gère un maximum de trois clients en Partenariat à la fois. Quand les places sont prises, la liste d'attente ouvre.",
    cta: "Voyez si votre entreprise se qualifie → Postulez comme Partenaire",
    fallbackPrefix: "Pas prêt à postuler. ",
    fallbackLink: "Voyez d'abord à quoi ça ressemble.",
  },

  riskReversal: {
    headline: "Le risque est pour moi, pas pour vous.",
    badge: "Garantie 90 jours",
    guaranteeGold:
      "Si je ne produis pas un résultat mesurable durant vos 90 premiers jours, vous arrêtez de payer.",
    guaranteeRest:
      " Je continue de travailler jusqu'à ce que j'y arrive. Vous gardez tous les actifs que j'ai bâtis pour vous, et vous pouvez demander des améliorations en tout temps, gratuitement.",
    guaranteeP2:
      "Je peux le promettre parce que je ne prends pas de clients que je ne crois pas pouvoir aider. J'évalue votre entreprise avant d'accepter de travailler avec vous, pas après que vous ayez payé. C'est à ça que sert la candidature.",
    objections: [
      {
        q: "« J'ai déjà essayé le marketing. »",
        a: "Vous avez essayé des morceaux. Ici, c'est un système. Les clics étaient réels. Ce qui devait les convertir n'a jamais été construit.",
      },
      {
        q: "« Je connais quelqu'un de moins cher. »",
        a: "Moins cher vous construit une chose. Moi, je vous construis un résultat, et je l'appuie avec la garantie ci-dessus.",
      },
      {
        q: "« Vais-je perdre le contrôle ? »",
        a: "Non. Vous possédez chaque actif. Je fais rouler la machine. Vous dirigez l'entreprise.",
      },
    ],
  },

  faq: {
    label: "Questions",
    headline: "Les questions que posent les acheteurs sérieux.",
    sub: "Je préfère répondre aux plus difficiles ici plutôt que de gaspiller votre temps au téléphone.",
    mostCommon: "Objection la plus fréquente",
    items: [
      {
        question:
          "J'ai déjà fait des Google Ads et j'ai perdu de l'argent. Pourquoi ce serait différent ?",
        answer:
          "Parce que des publicités sans système de conversion, ce n'est que du trafic coûteux. Vous avez eu des clics. Le site qui les recevait n'était pas bâti pour conclure. Le ciblage n'était pas construit autour de l'intention d'achat. La page d'arrivée était probablement votre page d'accueil.\n\nJ'ai vu cette histoire exacte plus de fois que je peux compter. Un propriétaire dépense 500 $ à 1 000 $, obtient des clics, zéro appel, et conclut que la publicité ne fonctionne pas dans son domaine.\n\nLes clics étaient réels. Tout ce qu'il y avait derrière n'avait pas été construit. Moi, je le construis d'abord. Ensuite, les publicités roulent. Quand l'entonnoir existe avant le trafic, les appels arrivent. La différence entre perdre de l'argent en publicité et un rendement de 46x, c'est l'infrastructure qui reçoit le trafic.",
      },
      {
        question: "C'est quoi exactement l'Architecture de croissance ?",
        answer:
          "C'est un système d'acquisition complet. Pas juste un site, pas juste des publicités. Tout, construit ensemble pour que chaque partie renforce les autres. Positionnement, site de conversion, Google Ads, automatisation par IA, qualification des prospects, optimisation mensuelle. Construit une fois. Amélioré chaque mois. C'est le dernier système marketing auquel vous aurez à penser.",
      },
      {
        question: "À quelle vitesse vais-je voir des résultats ?",
        answer:
          "Un build rapide, de la signature jusqu'au système en ligne. Ça inclut l'audit diagnostic, la construction complète du site et la configuration des campagnes. La plupart des clients reçoivent leur premier appel entrant quelques semaines après la mise en ligne. Le système complet atteint son efficacité maximale entre 60 et 90 jours, à mesure que le SEO s'accumule et que les campagnes s'optimisent. Le tableau de bord vous montre chaque appel, chaque coût et chaque source dès le premier jour.",
      },
      {
        question: "Que se passe-t-il si j'ai déjà un site web ?",
        answer:
          "S'il convertit, je le garde. Sinon, je le reconstruis autour d'un seul objectif : réserver des appels.",
      },
      {
        question: "Quel est le minimum à investir en publicité ?",
        answer:
          "Je recommande de commencer à 500 $ par mois. À 33 $ par appel qualifié, ça fait environ 15 appels. Un seul contrat conclu couvre généralement le coût complet du système.",
      },
      {
        question: "En quoi est-ce différent d'engager une agence ordinaire ?",
        answer:
          "Une agence livre un projet et passe au client suivant. Moi, je mesure mon succès par un seul chiffre : les appels qualifiés à votre calendrier. Si ce chiffre n'augmente pas chaque mois, je n'ai pas fait mon travail. Je possède le système au complet, donc rien ne tombe entre les craques de plusieurs fournisseurs. Et je n'ai jamais envoyé un rapport plein d'impressions pour remplacer de vrais résultats.",
      },
      {
        question: "Et si ça ne fonctionne pas ?",
        answer:
          "Si je ne produis pas un résultat mesurable durant les 90 premiers jours, vous arrêtez de payer et je continue de travailler jusqu'à ce que j'y arrive. Vous gardez tous les actifs que j'ai bâtis pour vous, et vous pouvez demander des améliorations en tout temps, gratuitement.\n\nJe ne prends pas de clients que je ne crois pas pouvoir aider. C'est pour ça qu'il y a une candidature. J'évalue votre entreprise avant d'accepter de travailler avec vous, pas après que vous ayez payé.",
      },
      {
        question: "Combien ça coûte ?",
        answer:
          "Deux portes d'entrée. Les builds individuels commencent à 600 $ pour un site de conversion. Le Partenariat de croissance complet commence à 2 500 $/mois et couvre tout le système d'acquisition : site de conversion, SEO local, Google Ads et optimisation hebdomadaire. Le budget publicitaire va directement à Google, pas à moi. L'engagement initial est de 90 jours, puis de mois en mois. Aucuns frais cachés.",
      },
      {
        question: "Pour qui ce n'est PAS un bon match ?",
        answer:
          "Les entreprises avec moins de 5 000 $ de revenus par mois. Celles qui veulent un logo, un site vitrine ou un projet ponctuel. Quiconque n'est pas prêt à s'engager pour une période initiale de 90 jours. Quiconque veut juste tâter le terrain sans vrai système derrière.",
      },
      {
        question: "Pour qui est-ce conçu ?",
        answer:
          "Les entreprises de services qui génèrent 5 000 $ ou plus par mois, qui dépendent trop du bouche-à-oreille et qui veulent une façon prévisible et évolutive d'attirer de nouveaux clients par Internet. Peintres, barbiers, compagnies de location de VR, cliniques dentaires, et tout service local où le téléphone doit sonner avec des acheteurs qualifiés.",
      },
    ],
    footerNote: "Une question sans réponse ? Parlons-en.",
    footerCta: "Postulez comme Partenaire →",
  },

  finalCta: {
    headlinePrefix: "Cessez d'être ",
    headlineGold: "le secret le mieux gardé",
    headlineSuffix: " de votre marché.",
    sub: "Parlez-moi de votre entreprise. Je vous renvoie un audit de visibilité gratuit. Vous verrez exactement où vous perdez des clients en ce moment, et le chemin le plus rapide pour devenir le choix évident.",
    contact:
      "Vous préférez parler ? +1 (438) 522-0907 · juan@clientgrowth.ca · Trois places clients. Dirigé par son fondateur. Québec.",
  },

  auditForm: {
    name: "Votre nom",
    business: "Nom de l'entreprise",
    email: "Courriel",
    phone: "Téléphone (optionnel)",
    website: "Votre site web (optionnel)",
    revenueLabel: "Revenus mensuels (optionnel)",
    revenuePlaceholder:
      "Environ combien votre entreprise génère-t-elle par mois ? (optionnel)",
    revenueOptions: [
      "Moins de 5 000 $ / mois",
      "5 000 $ – 15 000 $ / mois",
      "15 000 $ – 50 000 $ / mois",
      "50 000 $+ / mois",
    ],
    message: "Qu'aimeriez-vous corriger ? (optionnel)",
    submit: "Obtenir mon audit de visibilité gratuit",
    sending: "Envoi...",
    disclaimer:
      "Sans frais, sans obligation. J'évalue chaque entreprise personnellement.",
    successTitle: "Demande reçue.",
    successBody:
      "C'est noté. Je vais évaluer votre entreprise moi-même et vous revenir personnellement. À bientôt.",
    errorMessage:
      "Un problème est survenu lors de l'envoi. Réessayez, ou écrivez-moi directement à juan@clientgrowth.ca et je vous reviens tout de suite.",
  },

  footer: {
    tagline: "Infrastructure de croissance pour entreprises de services locales.",
    navHeading: "Navigation",
    navLinks: [
      { label: "Comment ça marche", href: "/#system" },
      { label: "Réalisations", href: "/#work" },
      { label: "Pour les recruteurs", href: "/#how-i-think" },
      { label: "Tarifs", href: "/#pricing" },
      { label: "Postuler", href: "/#apply" },
    ],
    legalHeading: "Légal",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    operated:
      "Exploité depuis le Québec, Canada. Dirigé par son fondateur. Juan@clientgrowth.ca",
    rights: "Tous droits réservés.",
  },

  mobileCta: {
    label: "Audit de visibilité gratuit",
  },

  work: {
    signatureResult: "Résultat phare",
    viewLive: "Voir le site en ligne →",
    seeBuild: "Voir le build →",
    screenshotComing: "Capture à venir",
  },

  testimonial: {
    placeholderQuote: "Une citation client vérifiée apparaîtra ici.",
    verifiedClient: "Client vérifié",
    watchClip: "Regarder le clip de 30 s",
    inTheirWords: "en ses mots",
  },

  videoModal: {
    defaultLabel: "Regarder le clip de 30 secondes",
    close: "Fermer la vidéo",
    placeholder:
      "Un clip de 30 secondes du propriétaire apparaîtra ici une fois enregistré.",
  },

  caseStudy: {
    back: "← Retour aux réalisations",
    eyebrow: "Étude de cas",
    title: "Triple W Rentals",
    intro:
      "900 $ en publicité sont devenus 41 085 $ en 30 jours. Un rendement de 46x, à environ 33 $ par appel qualifié. Voici exactement comment je l'ai bâti.",
    problemLabel: "Le problème",
    problemHeadline: "Bonne entreprise. Invisible au moment qui comptait.",
    problemParagraphs: [
      "Triple W avait l'inventaire, le service et les avis pour gagner. En ligne, rien de tout ça n'apparaissait au moment crucial.",
      "Les clients cherchaient, comparaient en quelques secondes et appelaient celui qui semblait le plus rassurant. C'était rarement la meilleure option. C'était la plus visible.",
      "L'argent dépensé en publicité fuyait directement à travers un site qui n'a jamais été conçu pour convertir. Les clics entraient. Pas les appels.",
    ],
    builtLabel: "Ce que j'ai construit",
    builtHeadline: "Un seul système, construit dans le bon ordre.",
    builtSub:
      "Je n'ai pas lancé des publicités vers un site faible en espérant. J'ai d'abord construit la machine, puis j'ai ouvert le trafic.",
    built: [
      {
        title: "Un site de conversion",
        body: "Un site haut de gamme bâti autour d'un seul but : transformer les visiteurs en appels réservés.",
      },
      {
        title: "Visibilité locale",
        body: "Présence dans la recherche et les cartes pour que Triple W apparaisse en premier quand on cherchait ce qu'il offrait.",
      },
      {
        title: "Google Ads",
        body: "Des acheteurs qualifiés devant l'entreprise dès la mise en ligne, avec un budget pointé uniquement vers une réelle intention d'achat.",
      },
      {
        title: "Suivi de chaque appel",
        body: "Chaque appel, coût et source sur un seul tableau de bord, pour toujours savoir ce qui fonctionnait.",
      },
    ],
    builtClosing:
      "Chaque morceau renforçait le suivant. Les publicités convertissaient parce que le site était bâti pour conclure. Le budget restait efficace parce que le suivi montrait exactement où allait chaque dollar.",
    resultLabel: "Le résultat",
    resultHeadline: "900 $ investis. 41 085 $ générés. En 30 jours.",
    resultStats: [
      "Revenus en 30 jours",
      "Rendement publicitaire",
      "Par appel qualifié",
    ],
    resultNote:
      "À partir de 900 $ en publicité. Même entreprise, même propriétaire, un système enfin à la hauteur de la qualité du travail.",
    before: "Avant",
    after: "Après",
    wordsLabel: "En ses mots",
    owner: "Propriétaire",
    ctaHeadline: "Vous voulez le même système.",
    ctaSub:
      "Je le construis une fois, puis je l'améliore chaque mois. Si votre entreprise est bonne et invisible, c'est exactement l'écart que je comble.",
    cta: "Obtenez votre audit de visibilité gratuit",
  },
};

export const dictionary: Record<Lang, Dictionary> = { en, fr };
