export type Developer = {
  id: string;
  name: string;
  slug: string;
  logo: string;
  tagline: string;
  email: string;
  phone: string;
  website?: string;
  location: string;
  establishedYear?: number;
  projectsCount: number;
  reraNumber?: string;
  verified?: boolean;
  bio: string;
  specialties: string[];
};

export const developersData: Developer[] = [
  {
    id: "1",
    name: "CRR Infra",
    slug: "crr-infra",
    logo: "/assets/img/developers/crr-infra.svg",
    tagline: "Land & layout developer",
    email: "info@crrinfra.com",
    phone: "+919849967236",
    website: "https://www.dekholand.com",
    location: "Hyderabad, Telangana",
    establishedYear: 2012,
    projectsCount: 28,
    reraNumber: "P02400001234",
    verified: true,
    bio: "CRR Infra develops residential plots, open lands, and layout ventures across Hyderabad growth corridors. The team focuses on clear documentation, practical site access, and buyer-ready inventory for families and investors.",
    specialties: [
      "Residential plots",
      "HMDA / DTCP layouts",
      "Open plots",
      "Investment lands",
    ],
  },
  {
    id: "2",
    name: "Greenfield Estates",
    slug: "greenfield-estates",
    logo: "/assets/img/developers/greenfield-estates.svg",
    tagline: "Farm land & weekend plots",
    email: "hello@greenfieldestates.in",
    phone: "+919849967236",
    location: "Sangareddy, Telangana",
    establishedYear: 2016,
    projectsCount: 16,
    reraNumber: "P02400004567",
    verified: true,
    bio: "Greenfield Estates specializes in agricultural land parcels and managed farm-plot communities around West Hyderabad. Buyers get clear survey details, site visit support, and transparent pricing.",
    specialties: ["Farm land", "Agricultural plots", "Weekend farmhouses"],
  },
  {
    id: "3",
    name: "Aadhya Spaces",
    slug: "aadhya-spaces",
    logo: "/assets/img/developers/aadhya-spaces.svg",
    tagline: "Commercial & residential land",
    email: "contact@aadhyaspaces.in",
    phone: "+919849967236",
    location: "Visakhapatnam, Andhra Pradesh",
    establishedYear: 2014,
    projectsCount: 21,
    verified: true,
    bio: "Aadhya Spaces delivers commercial and residential land opportunities across Visakhapatnam and nearby corridors, with a focus on road-facing plots and long-term appreciation potential.",
    specialties: ["Commercial land", "Residential plots", "Highway-facing sites"],
  },
];

export function getDeveloperBySlug(slug: string): Developer | undefined {
  return developersData.find(
    (developer) => developer.slug.toLowerCase() === slug.toLowerCase(),
  );
}
