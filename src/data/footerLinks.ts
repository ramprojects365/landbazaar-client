export const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/search" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LOCATION_AREAS = [
  "Shankarpally",
  "Sangareddy",
  "Sadasivpet",
  "Narayankhed",
  "Shadnagar",
  "Kadthal",
  "Yacharam",
  "Maheshwaram",
  "Vikarabad",
  "Choutuppal",
] as const;

export type FooterLocationArea = (typeof FOOTER_LOCATION_AREAS)[number];

export const toAreaSlug = (area: string) =>
  area.toLowerCase().replace(/\s+/g, "-");

export type SeoListingMatch = {
  slug: string;
  area: string;
  heading: string;
  propertyType?: string;
  /**
   * True when `area` is a city the API stores in `cityName`. Mandal/area names
   * such as Narayankhed only appear in the street/description text, so they
   * have to be matched through the keyword search instead.
   */
  isCity?: boolean;
};

export const HYDERABAD_SEO_LISTINGS: SeoListingMatch[] = [
  {
    slug: "plots-for-sale-in-hyderabad",
    area: "Hyderabad",
    heading: "Plots for sale in Hyderabad",
    isCity: true,
  },
  {
    slug: "open-plots-in-hyderabad",
    area: "Hyderabad",
    heading: "Open plots in Hyderabad",
    propertyType: "Open plot",
    isCity: true,
  },
  {
    slug: "farm-land-near-hyderabad",
    area: "Hyderabad",
    heading: "Farm land near Hyderabad",
    propertyType: "Farm Land",
    isCity: true,
  },
  {
    slug: "agricultural-land-near-hyderabad",
    area: "Hyderabad",
    heading: "Agricultural land near Hyderabad",
    propertyType: "Agricultural Land",
    isCity: true,
  },
  {
    slug: "residential-plots-hyderabad",
    area: "Hyderabad",
    heading: "Residential plots Hyderabad",
    propertyType: "Residential Plot",
    isCity: true,
  },
];

const areaBySlug = Object.fromEntries(
  FOOTER_LOCATION_AREAS.map((area) => [toAreaSlug(area), area]),
) as Record<string, FooterLocationArea>;

type SeoListingPattern = {
  prefix: string;
  heading: (area: string) => string;
  propertyType?: string;
};

const SEO_LISTING_PATTERNS: SeoListingPattern[] = [
  {
    prefix: "plots-for-sale-in-",
    heading: (area) => `Plots for Sale in ${area}`,
  },
  {
    prefix: "farmlands-for-sale-in-",
    heading: (area) => `Farmlands for Sale in ${area}`,
    propertyType: "Farm Land",
  },
  {
    prefix: "residential-plots-for-sale-in-",
    heading: (area) => `Residential Plots for Sale in ${area}`,
    propertyType: "Residential Plot",
  },
];

export function getSeoListingFromSlug(slug: string): SeoListingMatch | null {
  const cityListing = HYDERABAD_SEO_LISTINGS.find((item) => item.slug === slug);
  if (cityListing) return cityListing;

  for (const pattern of SEO_LISTING_PATTERNS) {
    if (!slug.startsWith(pattern.prefix)) continue;
    const area = areaBySlug[slug.slice(pattern.prefix.length)];
    if (!area) return null;
    return {
      slug,
      area,
      heading: pattern.heading(area),
      propertyType: pattern.propertyType,
    };
  }
  return null;
}

export function getSeoListingSlugs() {
  const areaSlugs = FOOTER_LOCATION_AREAS.flatMap((area) => {
    const areaSlug = toAreaSlug(area);
    return SEO_LISTING_PATTERNS.map((pattern) => `${pattern.prefix}${areaSlug}`);
  });

  return [...HYDERABAD_SEO_LISTINGS.map((item) => item.slug), ...areaSlugs];
}

export function getRelatedSeoLinks(listing: SeoListingMatch) {
  if (listing.area === "Hyderabad") {
    return HYDERABAD_SEO_LISTINGS.filter((item) => item.slug !== listing.slug).map(
      (item) => ({
        href: `/${item.slug}`,
        label: item.heading,
      }),
    );
  }

  const areaSlug = toAreaSlug(listing.area);
  return [
    {
      href: `/plots-for-sale-in-${areaSlug}`,
      label: `Plots for sale in ${listing.area}`,
    },
    {
      href: `/farmlands-for-sale-in-${areaSlug}`,
      label: `Farmlands for sale in ${listing.area}`,
    },
    {
      href: `/residential-plots-for-sale-in-${areaSlug}`,
      label: `Residential plots for sale in ${listing.area}`,
    },
  ];
}

export const farmlandLinks = FOOTER_LOCATION_AREAS.slice(0, 5).map((area) => ({
  label: area,
  href: `/farmlands-for-sale-in-${toAreaSlug(area)}`,
}));

export const plotLinks = FOOTER_LOCATION_AREAS.slice(5).map((area) => ({
  label: area,
  href: `/plots-for-sale-in-${toAreaSlug(area)}`,
}));

const landTypeSearchHref = (label: string) => {
  const propertyType = {
    "Agricultural Lands": "Agricultural Land",
    "Commercial Lands": "Commercial Plot",
    "Farm Lands": "Farm Land",
    "Gated Community Lands": "Gated Community Plot",
    "Residential Plots": "Residential Plot",
  }[label];

  return propertyType
    ? `/search?propertyType=${encodeURIComponent(propertyType)}`
    : "/search";
};

export const landTypeLinks = [
  { label: "Agricultural Lands", href: landTypeSearchHref("Agricultural Lands") },
  { label: "Commercial Lands", href: landTypeSearchHref("Commercial Lands") },
  { label: "Farm Lands", href: landTypeSearchHref("Farm Lands") },
  { label: "Gated Community Lands", href: landTypeSearchHref("Gated Community Lands") },
  { label: "Residential Plots", href: landTypeSearchHref("Residential Plots") },
].sort((a, b) => a.label.localeCompare(b.label));
