import { LAND_CITIES } from "@/config/landOptions";

export const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/search" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const locationLinks = LAND_CITIES.map((city) => ({
  label: city,
  href: `/search?city=${encodeURIComponent(city)}`,
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
