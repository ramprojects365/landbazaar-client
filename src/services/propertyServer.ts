import { cache } from "react";
import { API_BASE_URL } from "@/config/constants";
import { getCoverImageUrl } from "@/utils/propertyImages";
import {
  formatLandSize,
  parseTotalPrice,
  type ApiPropertyFields,
} from "@/utils/mapApiProperty";
import { formatTotalPriceDisplay } from "@/components/Utils/formatPrice";
import type { IRecentlyViewedItem } from "@/types/custom-interface";
import type { FeaturedSidebarProperty } from "@/types/propertySidebar";

export type { FeaturedSidebarProperty } from "@/types/propertySidebar";

const PROPERTY_REVALIDATE_SECONDS = 60;

function parsePropertyList(json: unknown): ApiPropertyFields[] {
  if (Array.isArray(json)) return json as ApiPropertyFields[];
  if (
    json &&
    typeof json === "object" &&
    Array.isArray((json as { data?: unknown }).data)
  ) {
    return (json as { data: ApiPropertyFields[] }).data;
  }
  return [];
}

export const getPropertyByIdCached = cache(async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
    next: { revalidate: PROPERTY_REVALIDATE_SECONDS },
  });
  if (!res.ok) return null;

  const json = await res.json();
  const item = json?.data ?? json;
  if (!item || typeof item !== "object") return null;
  return item as ApiPropertyFields;
});

export const getFeaturedSidebarPropertyCached = cache(
  async (): Promise<FeaturedSidebarProperty | null> => {
    const res = await fetch(
      `${API_BASE_URL}/properties?limit=1&sort=createdAt&order=desc`,
      { next: { revalidate: PROPERTY_REVALIDATE_SECONDS } },
    );
    if (!res.ok) return null;

    const json = await res.json();
    const item = parsePropertyList(json)[0];
    if (!item?.id) return null;

    return {
      id: String(item.id),
      title: item.propertyName || item.title || "Land listing",
      listingType: item.listingType || "sale",
      price: parseTotalPrice(item.totalPrice, item.price),
      landSize: formatLandSize(item.landSize, item.areaUnit),
      propertyType: item.propertyType || "Land",
      imageUrl: getCoverImageUrl(item.images),
    };
  },
);

export const getRecentSidebarPropertiesCached = cache(
  async (limit = 3): Promise<IRecentlyViewedItem[]> => {
    const res = await fetch(
      `${API_BASE_URL}/properties?limit=${limit}&sort=createdAt&order=desc`,
      { next: { revalidate: PROPERTY_REVALIDATE_SECONDS } },
    );
    if (!res.ok) return [];

    const json = await res.json();

    return parsePropertyList(json)
      .slice(0, limit)
      .map((property) => {
        const title =
          property.propertyName || property.title || "Land listing";
        const priceNum = parseTotalPrice(property.totalPrice, property.price);

        return {
          image:
            getCoverImageUrl(property.images) ||
            "/assets/img/rent/property/recent-1.jpg",
          link: `/property-details/${property.id}`,
          title,
          price: formatTotalPriceDisplay(priceNum),
        };
      });
  },
);
