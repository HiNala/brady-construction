export type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  coverAlt: string;
  category: string;
  tags: string[];
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  publishedAt: string; // ISO date
};

export const SEED_POSTS: SeedPost[] = [
  {
    slug: "bay-area-kitchen-remodel-cost-2026",
    title: "How Much Does a Kitchen Remodel Cost in the Bay Area? (2026 Guide)",
    excerpt:
      "Real Bay Area numbers for kitchen remodels — from a $40K refresh to a $200K+ open-concept transformation — plus the hidden costs most estimates leave out.",
    coverImage: "/images/hero/kitchen-048.webp",
    coverAlt: "Bright remodeled Bay Area kitchen with island and pendant lighting",
    category: "Cost Guides",
    tags: ["kitchen remodeling", "costs", "bay area"],
    keywords: ["kitchen remodel cost bay area", "kitchen renovation cost", "bay area kitchen remodel", "kitchen remodel cost per square foot", "open concept kitchen cost", "kitchen renovation contractor"],
    metaTitle: "Bay Area Kitchen Remodel Cost in 2026 — Real Numbers & Breakdown",
    metaDescription:
      "What a kitchen remodel really costs in the Bay Area in 2026: budget, mid-range and open-concept numbers, cost drivers, and how to get a straight estimate.",
    publishedAt: "2026-08-11",
    body: `If you're planning a kitchen remodel in the Bay Area, the honest answer to "how much?" is: it depends — but here are real numbers you can plan around.

## Bay Area kitchen remodel cost ranges (2026)

| Scope | Typical range | What you get |
|-------|---------------|--------------|
| Refresh | $30,000–$60,000 | Counters, backsplash, fixtures, paint, lighting — layout stays |
| Full remodel | $60,000–$140,000 | New cabinets, appliances, flooring, some layout changes |
| Open-concept transformation | $140,000–$250,000+ | Wall removal, moment frame, island, full finishes, adjacent spaces |

Bay Area pricing runs 20–40% above national averages for three reasons: labor rates, permit costs, and the fact that most of our housing stock is 40–100 years old — which brings us to the part most estimates leave out.

## The hidden cost drivers

**Structure.** Removing a wall between kitchen and living room is the single most requested change we see — and the one most underestimated. A load-bearing wall needs an [engineered steel moment frame](/services/kitchen-remodeling), calculations, a permit, and inspection. Done right, it's worth every dollar; done cheap, it's a liability.

**Old-house surprises.** Dry rot, mold, galvanized plumbing, knob-and-tube wiring, unlevel floors. A contractor who's opened Bay Area walls for decades budgets for these honestly instead of discovering them mid-job.

**Permits.** Every Bay Area city runs its own building department. Budget $2,000–$8,000 for permits and plan review depending on scope and city — Woodside, San Francisco and Sonoma all behave differently.

## How to get a real number

1. **Know your budget range before the first meeting.** Good contractors design to a number, not around it.
2. **Decide what's structural vs. cosmetic.** Wall removal changes everything — cost, timeline, and wow factor.
3. **Ask who's doing the work.** In-house crews and long-tenured subcontractors mean fewer change orders.
4. **Get a written scope, not a verbal ballpark.** Line items keep everyone honest.

## Is it worth it?

In the Bay Area, a well-executed kitchen remodel typically returns 70–110% of its cost in home value — and open-concept kitchens consistently outperform. Beyond resale, the kitchen is where the house actually gets lived in.

*Ready for a straight answer on your kitchen? [Tell us your budget and ideas](/contact) — we'll tell you what it can build.*`,
  },
  {
    slug: "bathroom-remodel-cost-sonoma-county",
    title: "Bathroom Remodel Costs in Sonoma County: A 2026 Homeowner's Guide",
    excerpt:
      "What Sonoma County homeowners actually pay for bathroom remodels — and why the smartest money goes where you'll never see it.",
    coverImage: "/images/hero/bathroom-010.webp",
    coverAlt: "Remodeled Sonoma County bathroom with double vanity and brass sconces",
    category: "Cost Guides",
    tags: ["bathroom remodeling", "costs", "sonoma county"],
    keywords: ["bathroom remodel cost sonoma", "bathroom renovation cost", "sonoma county contractor", "bathroom remodel cost california", "walk-in shower remodel", "bathroom contractor santa rosa"],
    metaTitle: "Bathroom Remodel Cost in Sonoma County, CA — 2026 Guide",
    metaDescription:
      "Bathroom remodel costs in Sonoma County explained: real budget ranges, dry rot & mold realities, permit notes for Santa Rosa, Sonoma and Healdsburg.",
    publishedAt: "2026-08-18",
    body: `A bathroom remodel is the second-highest-value project in most Sonoma County homes — and the one where hidden problems hide best. Here's what things actually cost, and why.

## The honest ranges (2026)

| Project | Typical range |
|---------|---------------|
| Hall bath refresh | $25,000–$45,000 |
| Full bathroom remodel | $45,000–$85,000 |
| Primary suite / spa bath | $85,000–$140,000+ |
| Curbless / accessibility remodel | $50,000–$95,000 |

## Why Sonoma bathrooms cost what they cost

**Dry rot and mold.** Older showers and tub surrounds in Sonoma County almost always have dry rot or mold behind them — years of small leaks add up. We start from scratch: remove, treat, rebuild, waterproof. It's the difference between a bathroom that lasts 25 years and one that needs opening again in five.

**Moving plumbing.** Moving a toilet or shower means opening the floor, rerouting drains and vents, sometimes sistering joists. Budget $3,000–$8,000 per fixture moved — or keep fixtures where they are and spend the difference on finishes.

**Ventilation.** Wine Country humidity and winter rain make proper venting non-negotiable. It's cheap insurance against mold.

## Where to splurge and where to save

- **Splurge:** waterproofing, shower pan, tile setting, plumbing fixtures with available parts
- **Save:** keeping the layout, stock vanities with custom tops, porcelain over natural stone

## Permits in Sonoma County

Santa Rosa, Sonoma, Healdsburg and [the county](/areas/sonoma-county) all require permits for remodels touching plumbing or electrical. Expect $800–$3,000 and 2–6 weeks of review. A licensed contractor handles the whole process — ask any bidder how they handle permits; the answer tells you a lot.

*Have a bathroom in mind? [Send us your project](/contact) — photos and a rough budget are all we need to start.*`,
  },
  {
    slug: "load-bearing-wall-removal-guide",
    title: "Removing a Load-Bearing Wall: The Complete Homeowner's Guide",
    excerpt:
      "The truth about opening up your floor plan — moment frames, engineering, permits, cost, and how walls come out without your house coming down.",
    coverImage: "/images/gallery/structural-020.webp",
    coverAlt: "Engineered steel moment frame installed during load-bearing wall removal",
    category: "Structural & Foundations",
    tags: ["open concept", "structural", "kitchen remodeling"],
    keywords: ["load bearing wall removal", "open concept floor plan", "moment frame", "wall removal contractor", "how to remove a wall in a house", "steel beam installation cost", "simpson strong-tie moment frame"],
    metaTitle: "Load-Bearing Wall Removal: Cost, Engineering & Moment Frames",
    metaDescription:
      "How load-bearing wall removal actually works — engineered moment frames, permits, timelines and costs — explained by a contractor who's opened hundreds of Bay Area homes.",
    publishedAt: "2026-08-25",
    body: `Everyone wants the open kitchen. Almost nobody wants to hear about the wall holding up their house. Here's the straight version of how load-bearing wall removal really works.

## First: is it actually load-bearing?

Not every wall carries load — and not every load-bearing wall is obvious. Clues: it runs perpendicular to floor joists, it's near the center of the house, there's a wall or beam directly above or below it. But the only reliable answer comes from looking — in the attic, the crawlspace, and sometimes inside the wall itself.

## How a wall safely comes out

1. **Engineering.** An engineer calculates loads and specifies the beam — these days often a **moment frame**: a steel frame that carries load while staying open, so you get a clear span instead of a dropped beam and posts.
2. **Temporary support.** The structure is shored before anything is cut.
3. **The frame goes in.** We install engineered systems like Simpson Strong-Tie moment frames, or fully welded steel frames for bigger spans — bolted, anchored, inspected. It's the core of our [open-concept kitchen work](/services/kitchen-remodeling).
4. **The wall comes out.** Only after the new structure carries the load.
5. **Inspection & finish.** Permitted, signed off, then made invisible.

## What it costs

| Scope | Typical range |
|-------|---------------|
| Non-structural wall removal | $2,000–$6,000 |
| Load-bearing, engineered beam | $8,000–$25,000 |
| Moment frame, wide opening | $20,000–$60,000+ |

Those numbers include engineering, permits, and finish work — the whole picture, not just the exciting demo photo.

## Why it's worth doing right

A properly engineered opening adds real value and transforms how a home lives. A shortcut shows up later as cracked tile, sagging floors, sticky doors — or worse. In earthquake country, the structure is the feature.

*Thinking about opening up your floor plan? [Ask us what's possible](/contact) — we've been doing moment frames since before they were trendy.*`,
  },
  {
    slug: "seismic-retrofitting-bay-area",
    title: "Seismic Retrofitting in the Bay Area: What Your Home Actually Needs",
    excerpt:
      "Bolting, shear walls, cripple walls and moment frames — a plain-English guide to keeping a Bay Area home standing when the ground moves.",
    coverImage: "/images/gallery/foundation-006.webp",
    coverAlt: "Foundation work in progress on a Bay Area hillside home",
    category: "Structural & Foundations",
    tags: ["seismic retrofit", "foundation", "safety"],
    keywords: ["seismic retrofit contractor", "foundation bolting", "earthquake retrofit bay area", "cripple wall bracing", "soft story retrofit", "house bolting cost", "earthquake strengthening"],
    metaTitle: "Seismic Retrofitting in the Bay Area — Contractor's Guide",
    metaDescription:
      "What a Bay Area seismic retrofit includes — foundation bolting, cripple wall bracing, soft-story fixes, costs — from a contractor doing it since 1980.",
    publishedAt: "2026-09-01",
    body: `The Bay Area has three near-certainties: fog, housing prices, and another big earthquake. Here's what seismic retrofitting actually involves — and what your home most likely needs.

## The four most common retrofits

**[Foundation bolting](/services/foundations-seismic).** Older homes often just *sit* on their foundations. Bolting anchors the mudsill to the concrete so the house can't slide off. This is the highest-value retrofit dollar most Bay Area homes can spend.

**Cripple wall bracing.** That short stud wall between foundation and floor — the crawl space perimeter — is the classic collapse point. Plywood shear panels turn it into a braced wall.

**Soft-story reinforcement.** Rooms over garages and open ground floors are the vulnerable configuration. Engineered solutions — shear walls or steel moment frames — stiffen the open level without closing it in.

**Foundation repair & replacement.** Settled, cracked or unreinforced concrete foundations get corrected or replaced first — retrofits only work on a sound base.

## What it costs

| Retrofit | Typical range |
|----------|---------------|
| Bolting only | $3,500–$8,000 |
| Bolting + cripple wall | $6,000–$15,000 |
| Soft-story / moment frame | $15,000–$50,000+ |
| Foundation repair/replace | $20,000–$100,000+ |

## How to know what your house needs

Crawl space inspection first — that's where the answers live. Homes built before ~1980, hillside homes, and homes with open ground floors deserve the closest look. An experienced contractor can usually tell you in one visit whether you need a $6,000 fix or a bigger conversation.

*After 46 years of Bay Area foundations — including plenty of hillside work — we've seen most of what the ground can do. [Get an assessment](/contact).*`,
  },
  {
    slug: "home-addition-vs-moving-bay-area",
    title: "Home Addition vs. Moving: The Bay Area Math for 2026",
    excerpt:
      "When does adding on beat selling and moving? The real numbers on additions, moving costs, and what square footage is worth around the Bay.",
    coverImage: "/images/hero/exterior-051.webp",
    coverAlt: "Home addition under construction showing new framing",
    category: "Planning",
    tags: ["additions", "planning", "costs"],
    keywords: ["home addition cost", "addition vs moving", "home addition contractor bay area", "room addition cost", "should i add on or move", "second story addition cost", "addition cost per square foot"],
    metaTitle: "Home Addition vs. Moving in the Bay Area — 2026 Cost Math",
    metaDescription:
      "Should you build an addition or move? Real Bay Area math: addition costs per square foot, moving costs, and when each option wins.",
    publishedAt: "2026-09-08",
    body: `In most of the country, "we need more space" means "start browsing listings." In the Bay Area, it usually should mean "call a contractor." Here's why — with the actual math.

## The true cost of moving

- **Transaction costs:** ~5–6% agent commissions plus transfer tax and closing costs. On a $1.8M Bay Area home, that's roughly $100,000–$130,000 gone — before you've bought a single square foot.
- **The price gap:** moving to a house with the extra bedroom or the open kitchen usually costs far more than [building it](/services/home-additions).
- **The rate hit:** trading a 3% mortgage for a current-rate one can add thousands per month for decades.

## The true cost of adding on

| Addition | Typical cost | Ballpark $/sq ft |
|----------|--------------|------------------|
| Bedroom / family room bump-out | $90,000–$200,000 | $400–$700 |
| Primary suite | $150,000–$350,000 | $450–$800 |
| Second story | $300,000–$600,000+ | $400–$650 |
| New basement | $200,000–$500,000+ | varies wildly |

Bay Area finished square footage commonly appraises at $700–$1,200+ per square foot — additions often create more value than they cost.

## When adding wins

- You like your neighborhood, schools, commute
- Your lot has room (or below-grade potential — basements are the stealth addition)
- The house needs other work anyway — bundle it

## When moving wins

- The lot, zoning, or septic genuinely can't support more space
- The house has deeper problems than space
- You actually want a different life, not just a bigger kitchen

## The third option nobody mentions

The **owner-builder hybrid**: we build the foundation, frame, rough plumbing, electrical, windows and roof — and you finish it. It's how a lot of smart Bay Area homeowners stretch a budget 30–40%.

*Wondering which side of the math your house lands on? [Send us the situation](/contact) — we'll give you an honest read.*`,
  },
  {
    slug: "basement-addition-california-guide",
    title: "The Basement Addition: California's Smartest Hidden Square Footage",
    excerpt:
      "Why digging down is the most underrated addition in California — new basements, dig-outs, cost reality, and why you don't have to move out.",
    coverImage: "/images/gallery/basement-024.webp",
    coverAlt: "Basement addition under construction with supports and concrete",
    category: "Remodeling Guides",
    tags: ["basements", "additions", "wine cellar"],
    keywords: ["basement addition", "basement dig out", "basement contractor california", "wine cellar construction", "basement conversion cost", "add square footage without addition", "basement under existing house"],
    metaTitle: "Basement Additions in California — The Stealth Square Footage",
    metaDescription:
      "Adding a basement under an existing California home: feasibility, engineering, cost, and why most families never have to move out.",
    publishedAt: "2026-09-15",
    body: `No room on the lot. Setbacks maxed out. Views you can't touch. In the Bay Area, the biggest available addition is often *underneath* the house. We call it the perfect green addition — here's why.

## Why basements win in California

- **No move-out.** The work happens below and around you — most families live at home through the entire project.
- **Cool and private.** Below grade means naturally temperature-stable — ideal for a wine cellar, gym, media room, or guest suite that never overheats.
- **Invisible to the street.** No changed roofline, no lost yard, no neighbor drama over second stories.
- **It fixes the foundation along the way.** A new basement *is* a new [engineered foundation](/services/foundations-seismic) — the seismic upgrade comes built in.

## What a basement addition actually involves

1. **Engineering & soils.** A soils report and engineered drawings come first — depth, drainage, shoring.
2. **Shoring & excavation.** The house is supported while soil comes out in stages. This is where experience matters most.
3. **Drainage & waterproofing.** Perimeter drains, membranes, sump — the dry-basement details that separate a 50-year space from a 5-year problem.
4. **New foundation & slab.** Engineered concrete, inspected at every stage.
5. **Finish.** Bedroom suite, family room, wine cellar — build it like any other great room.

## Honest cost reality

Basement additions typically run **$400–$900+ per square foot** all-in, depending on access, depth, soils and finish level. It's not the cheapest space you'll ever build — but in neighborhoods where finished square footage is worth $800–$1,500, the math often works beautifully.

## Who it's right for

- Tight lots and strict setbacks
- Homes already needing foundation work (bundle it — the economics get strong)
- Homeowners who want a suite, gym, or cellar that feels *separate* from the house

*Curious whether your house can grow down? [Send us the address and your idea](/contact) — a crawl-space look tells us most of what we need.*`,
  },
  {
    slug: "adu-vs-home-addition-wine-country",
    title: "ADU vs. Home Addition in Wine Country: Which Builds More Value?",
    excerpt:
      "Sonoma and Napa homeowners face a real choice: attached addition or detached ADU? The costs, rules, rental math and lifestyle trade-offs.",
    coverImage: "/images/gallery/exterior-039.webp",
    coverAlt: "Two-story home with attached garage beneath mature oak trees",
    category: "Planning",
    tags: ["adu", "additions", "wine country"],
    keywords: ["adu vs addition", "adu builder sonoma county", "guest house cost", "adu cost napa", "accessory dwelling unit sonoma", "detached adu cost", "backyard cottage bay area"],
    metaTitle: "ADU vs. Home Addition in Sonoma & Napa — Which Is Smarter?",
    metaDescription:
      "ADU or attached addition? Costs, permits, rental income potential and resale value for Sonoma and Napa County properties — explained plainly.",
    publishedAt: "2026-09-22",
    body: `Wine Country properties have a luxury most of the Bay Area doesn't: land. That makes "should we add on?" a fork in the road — [attached addition](/services/home-additions) or [detached ADU](/services/custom-builds)? Here's how to think about it.

## The quick comparison

| | Attached addition | Detached ADU |
|---|---|---|
| Typical cost | $400–$700/sq ft | $450–$800/sq ft (all-in) |
| Feels like | Part of the home | Its own cottage |
| Rental income | Rarely | Yes — strong Wine Country demand |
| Guests/family | Shares your roof | True privacy |
| Permits | Standard | ADU rules, but state law helps |
| Best for | Everyday living space | Flexibility, income, multigenerational |

## The case for the ADU

California's ADU laws are the friendliest they've ever been: ministerial approval, reduced setbacks, no owner-occupancy requirement in most cases. On a Sonoma or Napa parcel, a detached guest house adds a rental stream (long-term demand is real), a place for family, and — done well — serious resale appeal. Our own work includes guest houses and carriage barns built exactly this way.

## The case for the addition

If what you actually want is a bigger kitchen, a real primary suite, or a family room that opens to the patio — build the addition. You get a cohesive house, simpler utilities, and no second structure to maintain. Attached square footage also typically appraises more cleanly.

## The Wine Country wrinkles

- **Septic:** many parcels run on septic — a second unit may trigger a capacity review. Check first.
- **Well water:** same question for wells.
- **Fire zone (WUI):** most of Sonoma and Napa is Wildland-Urban Interface — fire-hardened materials and defensible space are required, not optional. Build accordingly.
- **Ag / vineyard parcels:** accessory structures often make sense — we've built barns, guest houses and carriage houses for exactly these lots.

## The bottom line

Build the **addition** when the goal is how you live every day. Build the **ADU** when flexibility, income, or multigenerational living is the point. And if you're not sure — the lot and the septic report usually answer it for you.

*Own a Wine Country property and weighing the options? [Bring us the parcel](/contact) — we build both.*`,
  },
  {
    slug: "how-to-choose-general-contractor-bay-area",
    title: "How to Choose a General Contractor in the Bay Area (Without Getting Burned)",
    excerpt:
      "The license check, the bid red flags, the questions that reveal everything — a 46-year contractor's guide to hiring a contractor.",
    coverImage: "/images/gallery/people-062.webp",
    coverAlt: "Contractor standing at a front door holding rolled plans",
    category: "Planning",
    tags: ["hiring", "contractors", "planning"],
    keywords: ["how to choose a general contractor", "licensed contractor california", "contractor red flags", "check contractor license", "contractor interview questions", "cslb license lookup", "hiring a remodeler"],
    metaTitle: "How to Choose a General Contractor — Bay Area Hiring Guide",
    metaDescription:
      "Hire a Bay Area general contractor without regret: CSLB license checks, insurance, bid red flags, and the questions that separate pros from problems.",
    publishedAt: "2026-09-29",
    body: `After 46 years in this trade — including decades of being the guy called in to fix other people's work — here's the honest playbook for hiring a Bay Area general contractor.

## Step 1: The license check (two minutes)

Every legitimate California contractor has a CSLB license number. Go to [cslb.ca.gov](https://www.cslb.ca.gov), search the number, and confirm three things: **active status**, **classification B** (general building) for remodels, and **workers' comp insurance** if they have employees. [Ours is #479385](/about) — check it; every real contractor wants you to.

## Step 2: Read the bid like a pro

- **Detailed scope beats low total.** A $90K bid with line items is safer than a $70K "kitchen remodel" on one line.
- **Allowances tell the truth.** If the cabinet allowance is $8,000 in a Bay Area kitchen, the bid is a fantasy that becomes change orders.
- **Who's actually working?** Ask which trades are in-house and which are subcontracted — and how long those subs have worked with them.

## Step 3: The red flags

- Big deposit demands (California law caps it at **$1,000 or 10%, whichever is less**)
- "Permits not needed" for structural work
- No physical address, no license on the contract, no references you can call
- Pressure to start "this week" on a six-figure job

## Step 4: The questions that reveal everything

1. *"What projects are you most proud of?"* — watch whether they light up about craft or about money.
2. *"What usually goes wrong on jobs like mine, and how do you handle it?"* — a veteran answers instantly; a salesman pivots.
3. *"Who will be on my site every day?"*
4. *"How do you handle changes and surprises?"*
5. *"Can I see a job in progress?"* — the state of an active site is the truest reference there is.

## The underrated factor: fit

A remodel means this person is in your life for months. The best contract is still a relationship — pick someone who tells you the truth, including "that's a bad idea" and "that's too cheap to be real."

*Want a straight bid from a contractor who's been licensed since 1980? [Start the conversation](/contact).*`,
  },
  {
    slug: "hillside-building-bay-area-foundations",
    title: "Building on a Hillside in the Bay Area: Foundations, Drainage & Reality",
    excerpt:
      "Those view lots come with physics. Caissons, retaining, drainage and engineered foundations — what hillside building actually demands.",
    coverImage: "/images/gallery/foundation-009.webp",
    coverAlt: "Engineered foundation work on a steep Bay Area hillside site",
    category: "Structural & Foundations",
    tags: ["hillside", "foundations", "engineering"],
    keywords: ["hillside construction bay area", "caisson foundation", "hillside foundation contractor", "retaining wall", "hillside home foundation", "pier and grade beam", "slope construction"],
    metaTitle: "Hillside Building in the Bay Area — Foundation Guide",
    metaDescription:
      "What hillside construction requires in the Bay Area: caissons, retaining, drainage, engineered foundations and real costs — from a hillside specialist.",
    publishedAt: "2026-10-02",
    body: `Marin ridgelines, Woodside lots, Sonoma slopes, Berkeley hills — the Bay Area's best views come attached to its hardest building sites. We've done foundation work on flat lots and extreme hillsides for four decades. Here's what hillside building actually demands.

## The physics of a slope

A flat lot holds a house. A hillside lot has to be *negotiated with*. Three forces run the show:

- **Gravity loads** — the house still weighs the same, but it sits at an angle
- **Lateral loads** — soil pressure, seismic forces, and the slope itself pushing back
- **Water** — the real enemy. Every hillside is a drainage system waiting to be managed

## The foundation toolbox

**[Caissons / drilled piers](/services/foundations-seismic).** Deep concrete columns drilled to competent soil or bedrock, connected by grade beams. This is how you put a house on a slope that laughs at conventional footings.

**Retaining structures.** Engineered walls that hold the slope — with drainage behind them, always. A retaining wall without drainage is a dam with a deadline.

**Stepped & daylight foundations.** Following the slope instead of fighting it — often smarter and cheaper than flattening.

**Underpinning & shoring.** For existing hillside homes showing movement, the fix is engineered: new piers, walls, drainage, or a full corrective foundation.

## Water management is half the job

Every hillside failure story is secretly a water story. Subdrains, surface drainage, waterproofing, and controlled discharge are engineered parts of the foundation — not extras.

## What it costs — honestly

Hillside foundation work runs wide: corrective work might start around **$30,000–$60,000**; new engineered caisson systems for major builds or remodels run **$100,000–$300,000+** depending on the slope, access, and soils. The soils report and engineer's drawing come first — they're the map to the real number.

## Why experience matters double up here

Hillside work has no room for learning on the job: shoring fails fast, water finds every mistake, and inspections are strict. After four decades of Bay Area hillsides — flat lots and extreme ones — we've built the playbook.

*Looking at a hillside lot or a hillside home that needs help? [Tell us about the site](/contact) — the harder, the more at home we are.*`,
  },
  {
    slug: "owner-builder-rough-in-guide",
    title: "The Owner-Builder's Guide: When to Hire the Rough-In Pros",
    excerpt:
      "DIY dreams meet load-bearing reality — how owner-builders and new contractors can get the hard part built right and finish it themselves.",
    coverImage: "/images/gallery/addition-031.webp",
    coverAlt: "Framed addition with open studs — owner-builder rough-in complete",
    category: "Remodeling Guides",
    tags: ["owner builder", "diy", "rough in"],
    keywords: ["owner builder contractor", "rough in services", "shell construction", "owner builder california", "dry shell contractor", "rough carpentry contractor", "owner builder help"],
    metaTitle: "Owner-Builder Guide: Hiring a Contractor for Rough-In Work",
    metaDescription:
      "California owner-builders: how to hire a contractor for foundation, framing, rough plumbing, electrical, windows and roof — then finish it yourself.",
    publishedAt: "2026-10-06",
    body: `There's a smarter middle path between "hire a GC for everything" and "swing the hammer yourself": **[owner-builder with a professional rough-in](/services/owner-builder)**. We've welcomed owner-builders, new contractors and DIY homeowners for decades — here's how it works.

## The division of labor

**We build (the part that has to be right):**
- Foundation — new, retrofit, or engineered
- Framing — walls, floor systems, roof structure
- Rough plumbing and electrical
- Windows, roofing, exterior envelope

**You finish (the part that's forgiving):**
- Insulation and drywall coordination
- Cabinets, tile, flooring
- Paint, trim, fixtures — the fun part you actually see

## Why this works so well

The rough-in is where experience pays for itself. A foundation poured wrong or a frame built out-of-square haunts every finish that follows. Get the shell engineered, plumb, square, dry and code-passed — and everything you do afterward goes faster and looks better.

## The honest savings

Finishing your own project can save **25–40%** of total cost — real money on a $200K addition. The catch: your time has a price too, and finish work takes longer than HGTV suggests. Owner-builder is a great deal if your evenings and weekends are genuinely available.

## Rules of the road in California

- **You still need permits.** As the owner-builder, you're the responsible party — we help you navigate it.
- **Owner-builder disclosure.** California requires you to acknowledge you're acting as your own contractor (CSLB form for larger projects).
- **Insurance matters.** Know what's covered; we carry ours, and you'll want to understand yours.
- **Resale disclosure.** Selling within a year of completion triggers owner-builder disclosure rules — worth knowing up front.

## What makes a good owner-builder partnership

Clear scope, honest schedule, and a contractor who treats your project like theirs. We scope the rough-in precisely, hand off a clean, complete shell, and stay reachable when you're mid-finish and have a question.

*Planning an owner-builder project? [Tell us what you're building](/contact) — we do the rough stuff, you enjoy the finish.*`,
  },
  {
    slug: "open-concept-kitchen-design-ideas",
    title: "10 Open-Concept Kitchen Ideas That Transform a Bay Area Home",
    excerpt:
      "From the moment-frame wall removal to the island that seats six — design moves that turn a closed-off kitchen into the room everyone lives in.",
    coverImage: "/images/hero/kitchen-055.webp",
    coverAlt: "Open-concept kitchen with island flowing into living space",
    category: "Remodeling Guides",
    tags: ["kitchen", "open concept", "design"],
    keywords: ["open concept kitchen ideas", "kitchen island ideas", "great room remodel", "kitchen wall removal", "open floor plan kitchen", "kitchen island design", "modern farmhouse kitchen bay area"],
    metaTitle: "10 Open-Concept Kitchen Ideas for Bay Area Homes",
    metaDescription:
      "Open-concept kitchen ideas that work in real Bay Area homes: wall removal, islands, sightlines, lighting and the structural moves behind the magic.",
    publishedAt: "2026-10-09",
    body: `The "Wow transformation" is real: take the wall out, and a Bay Area ranch or craftsman suddenly lives like a new house. Here are ten moves that make open-concept kitchens actually work.

## 1. Remove the wall properly

The biggest single transformation. A load-bearing wall comes out with an [engineered moment frame](/services/kitchen-remodeling) or beam — invisible structure, visible magic. Flush beams keep the ceiling plane clean.

## 2. Let the island anchor everything

Size it for the room, not the magazine: 36–42 inches of walkway all around, seating on the living side, and — if it works — the range or a prep sink where the action is.

## 3. Keep one long sightline

The luxury of open-concept is depth. Aim for a sightline from kitchen through dining to the garden or view — it's what makes a modest home feel like an estate.

## 4. Zone with ceiling and floor, not walls

Dropped soffits over kitchens are out; ceiling detail changes (beam, paneling, lighting canopy) and a subtle floor transition mark the kitchen territory without a wall.

## 5. Design the "working wall"

Put tall storage, ovens and the fridge on one full-height wall — it swallows visual clutter so the open side stays serene.

## 6. Get the light right, three ways

Daylight (bigger openings or a skylight), task light over work surfaces, and warm ambient light in the evening zone. Open plans live or die on lighting.

## 7. Ventilation that actually vents

Open means the whole living room shares your garlic. A real hood, vented outside, quiet enough to talk over — non-negotiable.

## 8. Hide the utility zone

Pantry, mudroom entry, charging drawers — the stuff that would otherwise live on your counters needs a designed home.

## 9. Match the era, not the trend

A 1950s Sonoma ranch wants a different open plan than a Woodside estate. The best open kitchens look inevitable — like the house was always meant to live this way.

## 10. Plan the mess honestly

Open kitchens show everything. Deep drawers, a scullery corner or a hardworking island base keeps the performance beautiful on a Tuesday night.

*Want your own Wow transformation? [Show us the wall](/contact) — we'll show you the open plan inside it.*`,
  },
];
