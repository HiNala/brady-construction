export const SITE = {
  name: "Brady Construction Company",
  shortName: "Brady Construction",
  legalName: "Brady Construction Company",
  tagline: "Large Remodels & Wow Transformations",
  description:
    "Family-owned California general contractor since 1980. Kitchen & bathroom remodels, home additions, foundations, seismic retrofitting, and custom builds across the San Francisco Bay Area and Wine Country. License #479385.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bradyremodel.com",
  email: "atbbrady@yahoo.com",
  phone: "", // no public phone on record — email + quote form primary
  address: {
    street: "8 Cedar Lane",
    city: "Woodside",
    state: "CA",
    zip: "94062",
  },
  license: "479385",
  founded: 1980,
  // Hardcoded — new Date() throws during prerender under cacheComponents.
  // Bump on yearly site refresh (founded 1980).
  yearsInBusiness: 46,
  serviceArea:
    "San Francisco Bay Area, Sonoma County, Marin County, Napa County, San Mateo County, and Northern California",
  hours: "Meetings by appointment",
  socials: {
    linkedin: "https://www.linkedin.com/company/brady-construction-company",
    bbb: "https://www.bbb.org/us/ca/sonoma/profile/building-contractors/bradyremodelcom-1116-375509",
  },
} as const;

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/areas", label: "Service Areas" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;

export const TRACK_EVENTS = {
  pageview: "pageview",
  ctaClick: "cta_click",
  formStart: "form_start",
  formSubmit: "form_submit",
  lead: "lead",
  share: "share",
  phoneClick: "phone_click",
  emailClick: "email_click",
  galleryView: "gallery_view",
  outboundClick: "outbound_click",
} as const;

export function absoluteUrl(path = ""): string {
  const base = SITE.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
