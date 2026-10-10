import { SITE } from "@/lib/site";

export const HOME_FAQS = [
  {
    q: "How much does a home remodel cost in the Bay Area?",
    a: "Costs vary by scope: most full bathroom remodels run $35,000–$90,000, kitchens $60,000–$150,000+, and major remodels or additions $150,000 and up. The best starting point is knowing your budget range — tell us your number and we'll show you honestly what it can build.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Brady Construction Company is a California licensed general contractor, License #479385, continuously since 1980 — fully insured for every project we take on.",
  },
  {
    q: "Do we need architectural plans before calling you?",
    a: "No. Bring your ideas and your budget — we work with architects and building designers regularly, can help shape the plan, and can also build from plans you already have. Owner-builders and DIY homeowners are welcome too.",
  },
  {
    q: "How disruptive is a remodel? Do we have to move out?",
    a: "Most projects don't require moving out. We plan staging carefully, keep sites clean and sealed, and for basement additions the work happens entirely below and around the house. We'll tell you honestly what to expect before we start.",
  },
  {
    q: "Do you handle permits and engineering?",
    a: "Yes — full permit handling, engineered drawings coordination, and inspections on every project. Structural work like moment frames and seismic retrofits is engineered and inspected end-to-end.",
  },
  {
    q: "What kinds of clients do you work with?",
    a: `Homeowners, architects, fellow contractors, realtors, owner-builders and investors. We've spent ${SITE.yearsInBusiness} years being the crew other builders call for the challenging jobs — hillside foundations, seismic work, wall removals and historic restoration.`,
  },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "The Conversation",
    text: "Tell us your ideas and your budget — honestly, that's the best start. We listen, walk the site, and give you a straight read on what's possible.",
  },
  {
    n: "02",
    title: "The Plan",
    text: "Design ideas, scope and a real number. We coordinate architects, engineers and permits — including structural and seismic engineering where the project calls for it.",
  },
  {
    n: "03",
    title: "The Build",
    text: "A clean, organized, well-run site. Four decades of trade knowledge means fewer surprises, smarter methods, and a project that saves you time and money.",
  },
  {
    n: "04",
    title: "The Reveal",
    text: "Walkthrough, punch list, done right. You end up with a space that feels like it was always meant to be there — and a builder you can call for life.",
  },
];

export const PROJECT_SPOTLIGHTS = [
  {
    title: "The Woodside Carriage Barn",
    location: "Woodside, CA",
    year: "1990",
    description:
      "Historic-style barn, carriage house and 7-car garage with a game room above — one of three buildings designed and built around a centered pool: the main house, guest house, and Patrick's favorite, the barn.",
    image: "/images/hero/exterior-007.webp",
    tag: "Estate Build",
  },
  {
    title: "Sonoma Open Floor Plan",
    location: "Sonoma, CA",
    description:
      "A little country classic designed and built by Patrick — light, open living in the heart of Wine Country. See it at 18337 1st Avenue and 125 Fetters Avenue, Sonoma.",
    image: "/images/hero/exterior-064.webp",
    tag: "Custom Home",
  },
  {
    title: "The Great Room Transformation",
    location: "San Francisco Bay Area",
    description:
      "Walls out, light in — an engineered moment frame opens the kitchen to a true great room. Our signature 'Wow transformation.'",
    image: "/images/hero/interior-060.webp",
    tag: "Whole-Home Remodel",
  },
];

export const TRUST_CHIPS = [
  "CA License #479385",
  "Family owned since 1980",
  `${SITE.yearsInBusiness}+ years in the Bay Area`,
  "Insured & bonded",
  "Meetings by appointment",
];

export const CATEGORY_LABELS: Record<string, string> = {
  kitchen: "Kitchens",
  bathroom: "Bathrooms",
  basement: "Basements",
  addition: "Additions",
  foundation: "Foundations",
  concrete: "Concrete & Flatwork",
  structural: "Structural & Framing",
  exterior: "Exteriors & Estates",
  interior: "Interiors",
  outdoor: "Outdoor Living",
  historic: "Historic",
  people: "Our Team",
  other: "More Work",
};

export const BLOG_CATEGORIES = [
  "Cost Guides",
  "Remodeling Guides",
  "Structural & Foundations",
  "Bay Area Living",
  "Planning",
] as const;
