import { LAND_CITIES, LAND_TYPES } from "@/config/landOptions";

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

export const landTypeLinks = LAND_TYPES.map((type) => ({
  label: type,
  href: `/search?propertyType=${encodeURIComponent(type)}`,
}));
