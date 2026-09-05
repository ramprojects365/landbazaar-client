import { createCleanFromUrl } from "@/utils/urlEncoding";

export type PropertyLinkSource = {
  id?: string | number;
  title?: string;
  propertyName?: string;
};

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isPropertyUuid(value: string): boolean {
  return UUID_REGEX.test(value);
}

export function getPropertyTitle(property: PropertyLinkSource): string {
  return property.propertyName?.trim() || property.title?.trim() || "property";
}

/** e.g. "Kadambari township" → "Kadambari-township" */
export function createPropertySlug(name: string): string {
  return name
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getPropertySlug(property: PropertyLinkSource): string {
  return createPropertySlug(getPropertyTitle(property));
}

export function propertyMatchesSlug(
  property: PropertyLinkSource,
  slug: string,
): boolean {
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  return getPropertySlug(property).toLowerCase() === normalizedSlug;
}

export function getPropertyDetailsPath(
  property: PropertyLinkSource,
  options?: { from?: string | null },
): string {
  const slug = getPropertySlug(property);
  const base = `/property-details/${slug}`;

  if (options?.from) {
    return `${base}?from=${createCleanFromUrl(options.from)}`;
  }

  return base;
}
