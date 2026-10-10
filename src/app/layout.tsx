import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Bay Area Remodeling & Custom Builds Since 1980`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: [
    "general contractor Bay Area",
    "home remodeling Sonoma County",
    "kitchen remodel Woodside",
    "bathroom remodel Bay Area",
    "home addition contractor",
    "foundation contractor",
    "seismic retrofit",
    "custom home builder Northern California",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Bay Area Remodeling & Custom Builds`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Bay Area Remodeling & Custom Builds`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  other: { "geo.region": "US-CA", "geo.placename": "Woodside" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ea" },
    { media: "(prefers-color-scheme: dark)", color: "#16130e" },
  ],
  width: "device-width",
  initialScale: 1,
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  alternateName: "Brady Remodel",
  url: SITE.url,
  email: SITE.email,
  description: SITE.description,
  foundingDate: "1980",
  slogan: SITE.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.zip,
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 37.4299, longitude: -122.2538 },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "license",
    name: `California Contractor License #${SITE.license}`,
  },
  areaServed: [
    "San Francisco Bay Area",
    "Sonoma County",
    "Marin County",
    "Napa County",
    "San Mateo County",
    "Northern California",
  ].map((n) => ({ "@type": "AdministrativeArea", name: n })),
  knowsAbout: [
    "home remodeling",
    "kitchen remodeling",
    "bathroom remodeling",
    "home additions",
    "foundation repair",
    "seismic retrofitting",
    "custom home construction",
    "historic restoration",
    "basement construction",
    "concrete work",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        <JsonLd data={businessJsonLd} />
        {children}
      </body>
    </html>
  );
}
