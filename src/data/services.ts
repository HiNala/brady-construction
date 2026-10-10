export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  keywords: string[];
  faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "kitchen-remodeling",
    title: "Kitchen Remodeling & Open-Concept Conversions",
    shortTitle: "Kitchens",
    tagline: "Open the walls. Open the possibilities.",
    description:
      "From wall removals with engineered moment frames to full custom kitchens, we transform closed-off rooms into bright, open great rooms designed around how your family actually lives.",
    bullets: [
      "Load-bearing wall removal with Simpson Strong-Tie moment frames",
      "Custom islands, cabinetry coordination & finish carpentry",
      "Open-concept great room conversions",
      "Full permit handling and engineered drawings",
    ],
    image: "/images/hero/kitchen-048.webp",
    imageAlt: "Spacious remodeled kitchen with large island, pendant lighting and open sightlines",
    keywords: [
      "kitchen remodel",
      "kitchen remodeling contractor",
      "open concept kitchen",
      "load bearing wall removal",
    ],
    faqs: [
      {
        q: "Can you remove a load-bearing wall to open my kitchen?",
        a: "Yes — it's one of our specialties. We design and install engineered steel moment frames (including Simpson Strong-Tie systems) so walls come out safely and the space opens up completely, with all seismic and permit requirements handled.",
      },
      {
        q: "How long does a full kitchen remodel take?",
        a: "Most full kitchen remodels run 8–14 weeks of construction depending on scope, structural work, and material lead times. We give you a realistic schedule up front and keep the site clean and livable throughout.",
      },
    ],
  },
  {
    slug: "bathroom-remodeling",
    title: "Bathroom Remodeling",
    shortTitle: "Bathrooms",
    tagline: "Built right from the studs out.",
    description:
      "We rebuild bathrooms from scratch — removing and treating the dry rot and mold that older Bay Area homes hide — then finish with tile, glass, stone and fixtures chosen to last.",
    bullets: [
      "Full gut renovations with dry rot & mold remediation",
      "Walk-in showers, soaking tubs, curbless entries",
      "Custom vanities, tile & stonework",
      "Ventilation, waterproofing & plumbing done to code",
    ],
    image: "/images/hero/bathroom-010.webp",
    imageAlt: "Remodeled bathroom vanity with double sinks, framed mirror and brass sconces",
    keywords: [
      "bathroom remodel",
      "bathroom remodeling contractor",
      "walk in shower",
      "bathroom renovation",
    ],
    faqs: [
      {
        q: "Do you handle mold and dry rot in bathrooms?",
        a: "Every bathroom we rebuild starts with a full assessment. We remove and treat dry rot and mold at the source, rebuild the structure properly, then waterproof correctly so it doesn't come back.",
      },
      {
        q: "What does a bathroom remodel cost in the Bay Area?",
        a: "Most full bathroom remodels in the Bay Area run $35,000–$90,000+ depending on size, finishes, and whether plumbing moves. We work to your budget and show you where the money goes before we start.",
      },
    ],
  },
  {
    slug: "home-additions",
    title: "Home Additions & Second Stories",
    shortTitle: "Additions",
    tagline: "More home, same address.",
    description:
      "Bedroom suites, family rooms, second stories and seamless expansions — we design and build additions that look like they were always part of the house, in every county around the Bay.",
    bullets: [
      "Primary suites, family rooms & in-law units",
      "Second-story additions and dormers",
      "Foundation, framing, roofing — full scope in-house",
      "Architect & owner-builder collaboration welcomed",
    ],
    image: "/images/hero/exterior-051.webp",
    imageAlt: "Home addition under construction showing new framing and roofline",
    keywords: [
      "home addition contractor",
      "room addition",
      "second story addition",
      "house expansion",
    ],
    faqs: [
      {
        q: "Is it cheaper to add on or move?",
        a: "In the Bay Area, adding on is usually the better financial decision — you skip realtor fees, transfer taxes, and a new mortgage rate, and a well-built addition typically adds more value than it costs.",
      },
      {
        q: "Do you build second-story additions?",
        a: "Yes. We've built additions and second stories across the Bay Area for over four decades, including engineered foundations and seismic upgrades to support the new load.",
      },
    ],
  },
  {
    slug: "basements",
    title: "Basement Construction & Conversions",
    shortTitle: "Basements",
    tagline: "The perfect green addition — no move-out required.",
    description:
      "New basements, dig-downs and conversions that add a bedroom suite, gym, family room or wine cellar — while staying cool, private and quiet. The smartest square footage in the house.",
    bullets: [
      "New basement additions under existing homes",
      "Bedroom suites, gyms, family rooms & wine cellars",
      "Waterproofing, drainage & engineered retaining",
      "Minimal disruption — most families stay in the home",
    ],
    image: "/images/gallery/basement-024.webp",
    imageAlt: "Basement under construction with support posts and concrete work",
    keywords: [
      "basement remodel",
      "basement addition",
      "basement conversion",
      "wine cellar construction",
    ],
    faqs: [
      {
        q: "Can you add a basement under an existing house?",
        a: "Yes — it's complex engineered work and exactly the kind of project we specialize in. We handle shoring, excavation, drainage, waterproofing and the new foundation, all permitted and inspected.",
      },
      {
        q: "Do we have to move out during a basement project?",
        a: "Usually not. Basements are the 'perfect green addition' — the work happens underneath and around the house, so most families stay home through the project.",
      },
    ],
  },
  {
    slug: "foundations-seismic",
    title: "Foundations, Seismic Retrofitting & Structural",
    shortTitle: "Foundations & Seismic",
    tagline: "The part of the house you never see — done right.",
    description:
      "New, retrofit and corrective foundation work on flat lots and extreme hillside sites. Engineered seismic upgrades, moment frames, caissons and drainage — the heavy work other contractors call us for.",
    bullets: [
      "New, retrofit & corrective foundation work",
      "Hillside and engineered caisson foundations",
      "Seismic retrofitting, bolting & shear walls",
      "Welded & Simpson Strong-Tie moment frames",
    ],
    image: "/images/gallery/foundation-006.webp",
    imageAlt: "Concrete foundation wall and formwork on a hillside build site",
    keywords: [
      "foundation repair",
      "seismic retrofit contractor",
      "foundation contractor",
      "hillside foundation",
    ],
    faqs: [
      {
        q: "What is a moment frame and when do I need one?",
        a: "A moment frame is an engineered steel frame that carries loads without a shear wall — it's how we safely remove walls to open up floor plans while meeting California's seismic code. We design and install both Simpson Strong-Tie and fully welded moment frames.",
      },
      {
        q: "Do you work on hillside homes?",
        a: "Hillside and engineered work is a specialty — extreme slopes, caissons, retaining, drainage and seismic jobs are welcome. Forty-plus years of Bay Area terrain means very few sites surprise us.",
      },
    ],
  },
  {
    slug: "concrete-exterior",
    title: "Concrete, Flatwork & Outdoor Living",
    shortTitle: "Concrete & Outdoor",
    tagline: "Steps, drives and terraces that last decades.",
    description:
      "Driveways, steps, retaining walls, patios and engineered concrete work — poured, finished and jointed properly so it still looks great decades later.",
    bullets: [
      "Driveways, walkways & concrete steps",
      "Retaining walls and drainage solutions",
      "Patios, terraces & outdoor living spaces",
      "Structural concrete and flatwork",
    ],
    image: "/images/gallery/concrete-049.webp",
    imageAlt: "Freshly poured concrete steps beside a retaining wall",
    keywords: [
      "concrete contractor",
      "concrete driveway",
      "retaining wall",
      "patio construction",
    ],
    faqs: [
      {
        q: "Do you pour concrete steps and retaining walls?",
        a: "Yes — steps, driveways, retaining walls and structural flatwork are core parts of our work, often as part of larger remodels and hillside projects.",
      },
    ],
  },
  {
    slug: "custom-builds",
    title: "Custom Homes, Estates & Historic Restoration",
    shortTitle: "Custom Builds",
    tagline: "From carriage barns to country classics.",
    description:
      "Ground-up homes, guest houses, barns and historic restorations — like the Woodside carriage barn and the Sonoma country classics at 18337 1st Avenue and 125 Fetters Avenue. We also joint-venture with investors and buy fixer properties.",
    bullets: [
      "Ground-up custom homes & estates",
      "Guest houses, barns, ADUs & carriage houses",
      "Historic renovation and restoration",
      "Investor joint ventures & distressed property",
    ],
    image: "/images/hero/exterior-064.webp",
    imageAlt: "Custom estate exterior with covered porch and timber columns",
    keywords: [
      "custom home builder",
      "historic home restoration",
      "guest house builder",
      "adu builder",
    ],
    faqs: [
      {
        q: "Do you build new custom homes?",
        a: "Yes — we've built custom homes, guest houses, barns and estates across Northern California since 1980, from open floor plan Sonoma country houses to historic-style carriage barns.",
      },
      {
        q: "Do you work with investors or on distressed properties?",
        a: "We joint-venture with investors on property development and we buy fixer and distressed properties — bring us the situation and let's talk.",
      },
    ],
  },
  {
    slug: "owner-builder",
    title: "Owner-Builder & Rough-In Support",
    shortTitle: "Owner-Builder Support",
    tagline: "We do the rough stuff. You enjoy the finish.",
    description:
      "For owner-builders, new contractors and DIY homeowners: we build the hard part — foundation, frame, rough plumbing, electrical, windows and roof — then hand you a solid shell to finish your way.",
    bullets: [
      "Foundation, framing & rough-in packages",
      "Rough plumbing, electrical, windows & roofing",
      "Permit guidance and code compliance",
      "A seasoned GC in your corner, start to finish",
    ],
    image: "/images/gallery/addition-031.webp",
    imageAlt: "Framed room addition with open studs ready for finish work",
    keywords: [
      "owner builder contractor",
      "rough in contractor",
      "framing contractor",
      "shell construction",
    ],
    faqs: [
      {
        q: "Can you build just the shell and let me finish it?",
        a: "Absolutely — that's our owner-builder program. We do the foundation, frame, rough plumbing, electrical, windows and roof, then you take over the finish work and enjoy it.",
      },
      {
        q: "I'm a new contractor — can we work together?",
        a: "New contractors, owner-builders and DIY homeowners are all welcome. After four decades we know the tricks of the trade that save you real time and money.",
      },
    ],
  },
];

export function serviceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
