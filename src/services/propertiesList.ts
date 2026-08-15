import { API_BASE_URL } from "@/config/constants";
import { getCoverImageUrl } from "@/utils/propertyImages";
import type { ApiPropertyFields } from "@/utils/mapApiProperty";

function parsePropertyList(json: unknown): ApiPropertyFields[] {
  if (Array.isArray(json)) return json as ApiPropertyFields[];
  if (json && typeof json === "object" && Array.isArray((json as { data?: unknown }).data)) {
    return (json as { data: ApiPropertyFields[] }).data;
  }
  return [];
}

/** Keep card/city fields only. Drops HTML descriptions and documents from memory. */
export function slimPropertyForList(item: ApiPropertyFields): ApiPropertyFields {
  const cover = getCoverImageUrl(item.images);

  return {
    id: item.id,
    title: item.title,
    propertyName: item.propertyName,
    listingType: item.listingType,
    propertyType: item.propertyType,
    streetName: item.streetName,
    cityName: item.cityName,
    state: item.state,
    price: item.price,
    landSize: item.landSize,
    areaUnit: item.areaUnit,
    pricePerUnit: item.pricePerUnit,
    totalPrice: item.totalPrice,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    images: cover ? [{ url: cover, isCover: true }] : undefined,
    user: item.user,
  };
}

let inflightList: Promise<ApiPropertyFields[]> | null = null;

/**
 * One in-flight GET /properties shared by home featured, city cards, and sidebar.
 * No TTL cache — later navigations still fetch fresh data.
 */
export function fetchPropertiesList(): Promise<ApiPropertyFields[]> {
  if (inflightList) return inflightList;

  inflightList = (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/properties`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) return [];
      const json = await res.json();
      return parsePropertyList(json).map(slimPropertyForList);
    } catch {
      return [];
    } finally {
      inflightList = null;
    }
  })();

  return inflightList;
}
