import {
  PUBLIC_LAND_TYPE_OPTIONS,
  landTypeSearchHref,
} from "@/config/landOptions";

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

export type SeoRelatedGroup =
  | "hyderabad"
  | "telangana"
  | "andhra"
  | "visakhapatnam"
  | "approval";

export type SeoListingMatch = {
  slug: string;
  area: string;
  heading: string;
  /** Browser tab / meta title when it should differ from the on-page heading. */
  metaTitle?: string;
  propertyType?: string;
  /**
   * True when `area` is a city the API stores in `cityName`. Mandal/area names
   * such as Narayankhed only appear in the street/description text, so they
   * have to be matched through the keyword search instead.
   */
  isCity?: boolean;
  /** Search `q` value when it should differ from `area` (states, approvals, aliases). */
  keyword?: string;
  description?: string;
  relatedGroup?: SeoRelatedGroup;
  extraContent?: "best-places-hyderabad";
  /** Include in footer / homepage popular-search links. */
  isPriorityKeyword?: boolean;
};

export const PRIORITY_SEO_LISTINGS: SeoListingMatch[] = [
  {
    slug: "plots-for-sale-in-andhra-pradesh",
    area: "Andhra Pradesh",
    heading: "Plots for sale in Andhra Pradesh",
    keyword: "Andhra Pradesh",
    relatedGroup: "andhra",
    isPriorityKeyword: true,
    description:
      "Browse plots for sale in Andhra Pradesh on Dekho Land. Compare verified residential, open, and gated community plots across Visakhapatnam, Vijayawada, Amaravati, Guntur, Kakinada, and Tirupati.",
  },
  {
    slug: "plots-for-sale-in-telangana",
    area: "Telangana",
    heading: "Plots for sale in Telangana",
    keyword: "Telangana",
    relatedGroup: "telangana",
    isPriorityKeyword: true,
    description:
      "Find plots for sale in Telangana, including Hyderabad, Warangal, and nearby growth corridors. Filter verified HMDA, DTCP, and gated community plot listings on Dekho Land.",
  },
  {
    slug: "land-for-sale-in-andhra-pradesh",
    area: "Andhra Pradesh",
    heading: "Land for sale in Andhra Pradesh",
    keyword: "Andhra Pradesh",
    relatedGroup: "andhra",
    isPriorityKeyword: true,
    description:
      "Explore land for sale in Andhra Pradesh — residential plots, agricultural land, and farm land in Visakhapatnam, Vijayawada, Amaravati, and other AP cities.",
  },
  {
    slug: "land-for-sale-in-telangana",
    area: "Telangana",
    heading: "Land for sale in Telangana",
    keyword: "Telangana",
    relatedGroup: "telangana",
    isPriorityKeyword: true,
    description:
      "See land for sale in Telangana, from Hyderabad plots to agricultural land and farm land across the state. Connect with verified sellers on Dekho Land.",
  },
  {
    slug: "plots-for-sale-in-hyderabad",
    area: "Hyderabad",
    heading: "Plots for sale in Hyderabad",
    isCity: true,
    relatedGroup: "hyderabad",
    isPriorityKeyword: true,
    description:
      "Browse plots for sale in Hyderabad, including residential plots, open plots, and gated community layouts. Compare verified listings near Hyderabad on Dekho Land.",
  },
  {
    slug: "land-for-sale-in-hyderabad",
    area: "Hyderabad",
    heading: "Land for sale in Hyderabad",
    isCity: true,
    relatedGroup: "hyderabad",
    isPriorityKeyword: true,
    description:
      "Find land for sale in Hyderabad — plots, farm land, and agricultural parcels in and around the city. Use Dekho Land to compare prices and connect with sellers.",
  },
  {
    slug: "open-plots-in-hyderabad",
    area: "Hyderabad",
    heading: "Open plots in Hyderabad",
    metaTitle: "Open plots for sale in Hyderabad",
    propertyType: "Open plot",
    isCity: true,
    relatedGroup: "hyderabad",
    isPriorityKeyword: true,
    description:
      "Search open plots for sale in Hyderabad. View verified open plot listings in Hyderabad and nearby areas, with location, size, and seller details on Dekho Land.",
  },
  {
    slug: "residential-plots-hyderabad",
    area: "Hyderabad",
    heading: "Residential plots Hyderabad",
    metaTitle: "Residential plots for sale in Hyderabad",
    propertyType: "Residential Plot",
    isCity: true,
    relatedGroup: "hyderabad",
    isPriorityKeyword: true,
    description:
      "Discover residential plots for sale in Hyderabad. Compare HMDA, DTCP, and gated community residential plot listings with verified land records on Dekho Land.",
  },
  {
    slug: "plots-for-sale-in-visakhapatnam",
    area: "Visakhapatnam",
    heading: "Plots for sale in Visakhapatnam",
    isCity: true,
    relatedGroup: "visakhapatnam",
    isPriorityKeyword: true,
    description:
      "Browse plots for sale in Visakhapatnam (Vizag). Find VMRDA and residential plot listings along the Vizag growth corridor on Dekho Land.",
  },
  {
    slug: "plots-for-sale-in-vizag",
    area: "Visakhapatnam",
    heading: "Plots for sale in Vizag",
    isCity: true,
    relatedGroup: "visakhapatnam",
    isPriorityKeyword: true,
    description:
      "Find plots for sale in Vizag, also listed as Visakhapatnam. Compare verified residential and open plots in Vizag and the surrounding VMRDA region.",
  },
  {
    slug: "land-for-sale-in-visakhapatnam",
    area: "Visakhapatnam",
    heading: "Land for sale in Visakhapatnam",
    isCity: true,
    relatedGroup: "visakhapatnam",
    isPriorityKeyword: true,
    description:
      "Explore land for sale in Visakhapatnam, including plots, agricultural land, and farm land around Vizag. Connect with verified sellers on Dekho Land.",
  },
  {
    slug: "plots-for-sale-in-vijayawada",
    area: "Vijayawada",
    heading: "Plots for sale in Vijayawada",
    isCity: true,
    relatedGroup: "andhra",
    isPriorityKeyword: true,
    description:
      "Browse plots for sale in Vijayawada and nearby Amaravati. Compare residential and APCRDA plot listings on Dekho Land.",
  },
  {
    slug: "land-for-sale-in-vijayawada",
    area: "Vijayawada",
    heading: "Land for sale in Vijayawada",
    isCity: true,
    relatedGroup: "andhra",
    isPriorityKeyword: true,
    description:
      "See land for sale in Vijayawada, from residential plots to agricultural land close to the Amaravati capital region.",
  },
  {
    slug: "plots-for-sale-in-amaravati",
    area: "Amaravati",
    heading: "Plots for sale in Amaravati",
    keyword: "Amaravati",
    relatedGroup: "andhra",
    isPriorityKeyword: true,
    description:
      "Find plots for sale in Amaravati, including APCRDA and residential plot options near Vijayawada and Guntur.",
  },
  {
    slug: "land-for-sale-in-amaravati",
    area: "Amaravati",
    heading: "Land for sale in Amaravati",
    keyword: "Amaravati",
    relatedGroup: "andhra",
    isPriorityKeyword: true,
    description:
      "Explore land for sale in Amaravati — plots and agricultural land in the Andhra Pradesh capital region, near Vijayawada and Guntur.",
  },
  {
    slug: "plots-for-sale-in-guntur",
    area: "Guntur",
    heading: "Plots for sale in Guntur",
    isCity: true,
    relatedGroup: "andhra",
    isPriorityKeyword: true,
    description:
      "Browse plots for sale in Guntur, close to Amaravati and Vijayawada. Compare verified residential plot listings on Dekho Land.",
  },
  {
    slug: "plots-for-sale-in-kakinada",
    area: "Kakinada",
    heading: "Plots for sale in Kakinada",
    isCity: true,
    relatedGroup: "andhra",
    isPriorityKeyword: true,
    description:
      "Find plots for sale in Kakinada, Andhra Pradesh. View verified residential and open plot listings along the East Godavari coast.",
  },
  {
    slug: "plots-for-sale-in-tirupati",
    area: "Tirupati",
    heading: "Plots for sale in Tirupati",
    isCity: true,
    relatedGroup: "andhra",
    isPriorityKeyword: true,
    description:
      "Search plots for sale in Tirupati. Compare residential plot listings in and around Tirupati on Dekho Land.",
  },
  {
    slug: "plots-for-sale-in-warangal",
    area: "Warangal",
    heading: "Plots for sale in Warangal",
    isCity: true,
    relatedGroup: "telangana",
    isPriorityKeyword: true,
    description:
      "Browse plots for sale in Warangal, Telangana. Find verified residential and open plot listings on Dekho Land.",
  },
  {
    slug: "plots-for-sale-near-hyderabad",
    area: "Hyderabad",
    heading: "Plots for sale near Hyderabad",
    keyword: "Hyderabad",
    relatedGroup: "hyderabad",
    isPriorityKeyword: true,
    description:
      "Discover plots for sale near Hyderabad in surrounding areas such as Shankarpally, Sangareddy, Shadnagar, and Maheshwaram.",
  },
  {
    slug: "farm-land-near-hyderabad",
    area: "Hyderabad",
    heading: "Farm land near Hyderabad",
    metaTitle: "Farm land for sale near Hyderabad",
    propertyType: "Farm Land",
    isCity: true,
    relatedGroup: "hyderabad",
    isPriorityKeyword: true,
    description:
      "Find farm land for sale near Hyderabad. Compare verified farm land listings around Hyderabad and west-side growth corridors.",
  },
  {
    slug: "agricultural-land-near-hyderabad",
    area: "Hyderabad",
    heading: "Agricultural land near Hyderabad",
    propertyType: "Agricultural Land",
    isCity: true,
    relatedGroup: "hyderabad",
    description:
      "Browse agricultural land near Hyderabad on Dekho Land. Compare verified farmland and agricultural parcels around the city.",
  },
  {
    slug: "agricultural-land-for-sale-in-telangana",
    area: "Telangana",
    heading: "Agricultural land for sale in Telangana",
    propertyType: "Agricultural Land",
    keyword: "Telangana",
    relatedGroup: "telangana",
    isPriorityKeyword: true,
    description:
      "Search agricultural land for sale in Telangana, including farmland near Hyderabad and other districts. Verify listings with Dekho Land.",
  },
  {
    slug: "agricultural-land-for-sale-in-andhra-pradesh",
    area: "Andhra Pradesh",
    heading: "Agricultural land for sale in Andhra Pradesh",
    propertyType: "Agricultural Land",
    keyword: "Andhra Pradesh",
    relatedGroup: "andhra",
    isPriorityKeyword: true,
    description:
      "Find agricultural land for sale in Andhra Pradesh across Visakhapatnam, Vijayawada, Guntur, and other AP districts.",
  },
  {
    slug: "hmda-plots-for-sale",
    area: "Hyderabad",
    heading: "HMDA plots for sale",
    propertyType: "HMDA Approved Plot",
    keyword: "",
    relatedGroup: "approval",
    isPriorityKeyword: true,
    description:
      "Browse HMDA plots for sale in and around Hyderabad. Compare HMDA approved plot listings with location, size, and seller details.",
  },
  {
    slug: "dtcp-plots-for-sale",
    area: "Telangana",
    heading: "DTCP plots for sale",
    propertyType: "DTCP Approved Plot",
    keyword: "",
    relatedGroup: "approval",
    isPriorityKeyword: true,
    description:
      "Find DTCP plots for sale across Telangana and Andhra Pradesh. View DTCP approved plot listings verified on Dekho Land.",
  },
  {
    slug: "rera-approved-plots-for-sale",
    area: "India",
    heading: "RERA approved plots for sale",
    keyword: "RERA",
    relatedGroup: "approval",
    isPriorityKeyword: true,
    description:
      "Search RERA approved plots for sale. Compare RERA plot listings in Hyderabad, Telangana, and Andhra Pradesh on Dekho Land.",
  },
  {
    slug: "vmrda-plots-for-sale",
    area: "Visakhapatnam",
    heading: "VMRDA plots for sale",
    keyword: "VMRDA",
    relatedGroup: "approval",
    isPriorityKeyword: true,
    description:
      "Browse VMRDA plots for sale in Visakhapatnam (Vizag). Find VMRDA layout and residential plot listings on Dekho Land.",
  },
  {
    slug: "apcrda-plots-for-sale",
    area: "Amaravati",
    heading: "APCRDA plots for sale",
    keyword: "APCRDA",
    relatedGroup: "approval",
    isPriorityKeyword: true,
    description:
      "Find APCRDA plots for sale in Amaravati and Vijayawada. Compare APCRDA layout listings with verified seller details.",
  },
  {
    slug: "gated-community-plots-for-sale",
    area: "India",
    heading: "Gated community plots for sale",
    propertyType: "Gated Community Plot",
    keyword: "",
    relatedGroup: "approval",
    isPriorityKeyword: true,
    description:
      "Explore gated community plots for sale in Hyderabad, Telangana, and Andhra Pradesh. Compare gated community plot listings on Dekho Land.",
  },
  {
    slug: "best-places-to-buy-land-in-hyderabad",
    area: "Hyderabad",
    heading: "Best places to buy land in Hyderabad",
    isCity: true,
    relatedGroup: "hyderabad",
    isPriorityKeyword: true,
    extraContent: "best-places-hyderabad",
    description:
      "See the best places to buy land in Hyderabad, including Shankarpally, Sangareddy, Shadnagar, Maheshwaram, and other west and south corridors.",
  },
];

const HYDERABAD_SEO_SLUGS = [
  "plots-for-sale-in-hyderabad",
  "open-plots-in-hyderabad",
  "farm-land-near-hyderabad",
  "agricultural-land-near-hyderabad",
  "residential-plots-hyderabad",
] as const;

export const HYDERABAD_SEO_LISTINGS: SeoListingMatch[] =
  HYDERABAD_SEO_SLUGS.map((slug) => {
    const listing = PRIORITY_SEO_LISTINGS.find((item) => item.slug === slug);
    if (!listing) {
      throw new Error(`Missing Hyderabad SEO listing: ${slug}`);
    }
    return listing;
  });

export const popularSeoLinks = PRIORITY_SEO_LISTINGS.filter(
  (item) => item.isPriorityKeyword,
).map((item) => ({
  label: item.heading,
  href: `/${item.slug}`,
}));

export function getSeoListingPresets(listing: SeoListingMatch) {
  return {
    presetCity: listing.isCity ? listing.area : undefined,
    presetKeyword:
      listing.keyword ?? (listing.isCity ? undefined : listing.area),
    presetPropertyType: listing.propertyType,
  };
}

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
  const priorityListing = PRIORITY_SEO_LISTINGS.find((item) => item.slug === slug);
  if (priorityListing) return priorityListing;

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

  return [
    ...new Set([
      ...PRIORITY_SEO_LISTINGS.map((item) => item.slug),
      ...areaSlugs,
    ]),
  ];
}

export function getRelatedSeoLinks(listing: SeoListingMatch) {
  if (listing.relatedGroup) {
    return PRIORITY_SEO_LISTINGS.filter(
      (item) =>
        item.relatedGroup === listing.relatedGroup && item.slug !== listing.slug,
    )
      .slice(0, 8)
      .map((item) => ({
        href: `/${item.slug}`,
        label: item.heading,
      }));
  }

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

export const landTypeLinks = PUBLIC_LAND_TYPE_OPTIONS.map((item) => ({
  label: item.label,
  href: landTypeSearchHref(item.value),
}));
