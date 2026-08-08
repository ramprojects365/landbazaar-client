import { LAND_CITIES } from "@/config/landOptions";

export const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/search" },
  { label: "Agents", href: "/agent-details" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const locationLinks = LAND_CITIES.map((city) => ({
  label: city,
  href: `/search?city=${encodeURIComponent(city)}`,
}));

/** Footer land-type links (display labels; search stays on /search). */
export const landTypeLinks = [
  { label: "Agricultural Lands", href: "/search" },
  { label: "Commercial Lands", href: "/search" },
  { label: "Farm Lands", href: "/search" },
  { label: "Gated Community Lands", href: "/search" },
  { label: "Residential Plots", href: "/search" },
].sort((a, b) => a.label.localeCompare(b.label));
