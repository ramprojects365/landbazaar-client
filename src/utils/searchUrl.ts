import {
  LAND_CITIES,
  LAND_DISTRICTS,
  LAND_STATES,
  toUrlPropertyType,
} from "@/config/landOptions";
import { FOOTER_LOCATION_AREAS } from "@/data/footerLinks";

/** Browser-facing query values use hyphens instead of spaces. */
export function toUrlTextValue(value: string): string {
  return value.trim().replace(/\s+/g, "-");
}

const KNOWN_LOCATIONS = (() => {
  const map = new Map<string, string>();
  const add = (value: string) => {
    const canonical = value.trim();
    if (!canonical) return;
    map.set(canonical.toLowerCase(), canonical);
    map.set(canonical.toLowerCase().replace(/\s+/g, "-"), canonical);
    map.set(canonical.toLowerCase().replace(/-/g, " "), canonical);
  };

  [...LAND_CITIES, ...LAND_DISTRICTS, ...LAND_STATES, ...FOOTER_LOCATION_AREAS, "India"].forEach(
    add,
  );
  return map;
})();

/**
 * Restore a public query value for UI / API use.
 * Known locations keep their canonical spelling (including existing hyphens).
 */
export function fromUrlTextValue(value?: string | null): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";

  const lower = trimmed.toLowerCase();
  const known =
    KNOWN_LOCATIONS.get(lower) ||
    KNOWN_LOCATIONS.get(lower.replace(/-/g, " ")) ||
    KNOWN_LOCATIONS.get(lower.replace(/\s+/g, "-"));
  if (known) return known;

  return trimmed.replace(/-/g, " ");
}

export type SearchHrefInput = {
  q?: string | null;
  keyword?: string | null;
  city?: string | null;
  propertyType?: string | null;
  type?: string | null;
  propertyName?: string | null;
  address?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
};

function setTextParam(
  params: URLSearchParams,
  key: string,
  value?: string | null,
) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed.toLowerCase() === "all") return;
  params.set(key, toUrlTextValue(trimmed));
}

export function buildSearchHref(input: SearchHrefInput = {}): string {
  const params = new URLSearchParams();

  setTextParam(params, "q", input.q);
  setTextParam(params, "keyword", input.keyword);
  setTextParam(params, "city", input.city);
  setTextParam(params, "propertyName", input.propertyName);
  setTextParam(params, "address", input.address);

  const propertyType = toUrlPropertyType(input.propertyType);
  if (propertyType) params.set("propertyType", propertyType);

  const listingType = input.type?.trim();
  if (listingType && listingType.toLowerCase() !== "all") {
    params.set("type", listingType);
  }

  if (input.minPrice && input.minPrice !== "Any") {
    params.set("minPrice", input.minPrice);
  }
  if (input.maxPrice && input.maxPrice !== "Any") {
    params.set("maxPrice", input.maxPrice);
  }

  const query = params.toString();
  return query ? `/search?${query}` : "/search";
}

export function buildSearchHrefFromParams(
  searchParams: Pick<URLSearchParams, "get">,
): string {
  return buildSearchHref({
    q: fromUrlTextValue(searchParams.get("q") || searchParams.get("address")),
    keyword: fromUrlTextValue(searchParams.get("keyword")),
    city: fromUrlTextValue(searchParams.get("city")),
    propertyType: searchParams.get("propertyType") || searchParams.get("landType"),
    type: searchParams.get("type"),
    propertyName: fromUrlTextValue(searchParams.get("propertyName")),
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
  });
}
