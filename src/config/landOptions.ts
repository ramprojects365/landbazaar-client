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
