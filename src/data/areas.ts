export type Area = {
  slug: string;
  name: string;
  blurb: string;
  cities: string[];
};

export const AREAS: Area[] = [
  {
    slug: "sonoma-county",
    name: "Sonoma County",
    blurb:
      "Wine Country homes, country classics and estate projects — including Patrick's open floor plan designs at 18337 1st Avenue and 125 Fetters Avenue in Sonoma.",
    cities: [
      "Sonoma", "Santa Rosa", "Healdsburg", "Sebastopol", "Petaluma",
      "Kenwood", "Glen Ellen", "Windsor", "Rohnert Park", "Cloverdale",
    ],
  },
  {
    slug: "woodside-peninsula",
    name: "Woodside & The Peninsula",
    blurb:
      "Our home base on Cedar Lane — estate builds, carriage barns, equestrian properties and large-scale remodels across the Peninsula's most distinctive lots.",
    cities: [
      "Woodside", "Atherton", "Portola Valley", "Menlo Park", "Redwood City",
      "San Mateo", "Hillsborough", "Burlingame", "Los Altos Hills",
    ],
  },
  {
    slug: "marin-county",
    name: "Marin County",
    blurb:
      "Hillside foundations, view-lot remodels and seismic upgrades from Sausalito to West Marin — terrain we know deeply.",
    cities: [
      "San Rafael", "Mill Valley", "Tiburon", "Sausalito", "Novato",
      "Larkspur", "Corte Madera", "Fairfax", "San Anselmo", "Ross",
    ],
  },
  {
    slug: "napa-county",
    name: "Napa County",
    blurb:
      "Vineyard estates, wine cellars, guest houses and farmhouse remodels throughout the valley.",
    cities: [
      "Napa", "Yountville", "St. Helena", "Calistoga", "American Canyon",
    ],
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    blurb:
      "Forty years of San Francisco building — Victorian and Edwardian remodels, soft-story and seismic work, foundation retrofits on the city's famous hills.",
    cities: [
      "Pacific Heights", "Noe Valley", "Richmond District", "Sunset",
      "Marina", "Bernal Heights", "Glen Park",
    ],
  },
  {
    slug: "east-bay-north-bay",
    name: "East Bay & North Coast",
    blurb:
      "From Berkeley hillsides to Mendocino and Lake County — we travel for the right project and the right client.",
    cities: [
      "Berkeley", "Oakland", "Walnut Creek", "Orinda", "Lafayette",
      "Alameda", "Mendocino", "Lake County",
    ],
  },
];

export function areaBySlug(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}
