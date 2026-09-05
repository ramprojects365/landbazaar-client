/** Canonical `propertyType` values stored in the API / add-property form. */
export const LAND_TYPES = [
  "Agricultural Land",
  "Commercial Plot",
  "DTCP Approved Plot",
  "Farm Land",
  "Gated Community Plot",
  "HMDA Approved Plot",
  "Open plot",
  "Residential Plot",
].sort((a, b) => a.localeCompare(b));

export type LandTypeOption = { label: string; value: string };

/**
 * Public labels (footer + homepage search) mapped to API `propertyType` values.
 * Always send `value` in query strings, never the label.
 */
export const PUBLIC_LAND_TYPE_OPTIONS: LandTypeOption[] = [
  { label: "Agricultural Lands", value: "Agricultural Land" },
  { label: "Commercial Lands", value: "Commercial Plot" },
  { label: "Farm Lands", value: "Farm Land" },
  { label: "Gated Community Lands", value: "Gated Community Plot" },
  { label: "Residential Plots", value: "Residential Plot" },
].sort((a, b) => a.label.localeCompare(b.label));

const LAND_TYPE_ALIASES: Record<string, string> = {
  "agricultural land": "Agricultural Land",
  "agricultural lands": "Agricultural Land",
  "agriculture lands": "Agricultural Land",
  agricultural: "Agricultural Land",
  "commercial plot": "Commercial Plot",
  "commercial lands": "Commercial Plot",
  "commercial land": "Commercial Plot",
  "farm land": "Farm Land",
  "farm lands": "Farm Land",
  farmlands: "Farm Land",
  farmland: "Farm Land",
  farmhouses: "Farm Land",
  "farm house": "Farm Land",
  "gated community plot": "Gated Community Plot",
  "gated community lands": "Gated Community Plot",
  "residential plot": "Residential Plot",
  "residential plots": "Residential Plot",
  plots: "Residential Plot",
  "open plot": "Open plot",
  "open plots": "Open plot",
  "hmda approved plot": "HMDA Approved Plot",
  "hmda layouts": "HMDA Approved Plot",
  "hmda layout": "HMDA Approved Plot",
  "dtcp approved plot": "DTCP Approved Plot",
  "dtcp / ytda layouts": "DTCP Approved Plot",
  "dtcp layout": "DTCP Approved Plot",
  "rera ventures": "Residential Plot",
  "rera plot": "Residential Plot",
  "villa plots": "Residential Plot",
  "villa plot": "Residential Plot",
  "main road": "Commercial Plot",
  industrial: "Commercial Plot",
  "industrial plot": "Commercial Plot",
  highway: "Commercial Plot",
  "highway plot": "Commercial Plot",
  "weekend eco-plots": "Farm Land",
  "eco plot": "Farm Land",
};

function normalizeLandTypeLookup(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_/]+/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ");
}

export function toApiPropertyType(
  value?: string | null,
): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === "all") return undefined;
  if (LAND_TYPES.includes(trimmed)) return trimmed;

  const lower = trimmed.toLowerCase();
  if (LAND_TYPE_ALIASES[lower]) return LAND_TYPE_ALIASES[lower];

  const spaced = normalizeLandTypeLookup(trimmed);
  if (LAND_TYPE_ALIASES[spaced]) return LAND_TYPE_ALIASES[spaced];

  return LAND_TYPES.find((type) => type.toLowerCase() === spaced);
}

/** Public search URLs use hyphens so values stay readable (`Farm-Land`). */
export function toUrlPropertyType(value?: string | null): string | undefined {
  return toApiPropertyType(value)?.replace(/\s+/g, "-");
}

export function landTypeSearchHref(label: string) {
  const propertyType = toUrlPropertyType(label);
  return propertyType ? `/search?propertyType=${propertyType}` : "/search";
}

export const LISTING_TYPES = ["sale", "lease"] as const;

export const AREA_UNITS = ["Square Yard", "Acre", "Gunta", "Cent"];

export const LAND_FACING_DIRECTIONS = [
  "North",
  "South",
  "East",
  "West",
  "North-East",
  "North-West",
  "South-East",
  "South-West",
];

export const ROAD_WIDTH_OPTIONS = ["15 ft", "30 ft", "40 ft", "100 ft"];

export const APPROVAL_TYPES = [
  "HMDA",
  "DTCP",
  "RERA",
  "Gram Panchayat",
  "Municipality",
  "Municipal Corporation",
  "CRDA",
  "VMRDA",
  "HUDA",
  "BMRDA",
  "CIDCO",
  "None",
];

export const SOIL_TYPES = [
  "Red Soil",
  "Black Soil",
  "Sandy Soil",
  "Clay Soil",
  "Mixed Soil",
  "Rocky Soil",
];

export const LAND_STATES = ["Andhra Pradesh", "Telangana"].sort((a, b) =>
  a.localeCompare(b),
);

export const LAND_DISTRICTS = [
  "Hyderabad",
  "Karimnagar",
  "Medchal-Malkajgiri",
  "Nalgonda",
  "Nizamabad",
  "Rangareddy",
  "Sangareddy",
  "Yadadri",
].sort((a, b) => a.localeCompare(b));

export const LAND_CITIES = [
  "Amaravati",
  "Guntur",
  "Hyderabad",
  "Kakinada",
  "Kurnool",
  "Rajahmundry",
  "Tirupati",
  "Vijayawada",
  "Visakhapatnam",
  "Warangal",
].sort((a, b) => a.localeCompare(b));

export const OTHER_FACILITIES = [
  "CC Road",
  "Street Lights",
  "Underground Drainage",
  "Water Connection",
  "Electricity Connection",
  "Compound Wall",
  "Fencing",
  "Gated Community",
  "Security",
  "Children's Park",
  "Club House",
  "Avenue Plantation",
  "Rain Water Harvesting",
  "Overhead Water Tank",
  "Sewage Line",
  "Internet / Fiber",
  "Near Highway",
  "Near Outer Ring Road (ORR)",
];
