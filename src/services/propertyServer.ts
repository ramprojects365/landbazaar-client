import { cache } from "react";
import { API_BASE_URL } from "@/config/constants";
import { getCoverImageUrl } from "@/utils/propertyImages";
import {
  formatLandSize,
  parseTotalPrice,
  type ApiPropertyFields,
} from "@/utils/mapApiProperty";
import { formatTotalPriceDisplay } from "@/components/Utils/formatPrice";
import {
  getPropertyDetailsPath,
  isPropertyUuid,
  propertyMatchesSlug,
} from "@/utils/propertySlug";
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

async function findPropertyBySlug(slug: string): Promise<ApiPropertyFields | null> {
  const decodedSlug = decodeURIComponent(slug).trim();
  const searchQuery = decodedSlug.replace(/-/g, " ").trim();

  const endpoints = [
    `${API_BASE_URL}/properties/search?q=${encodeURIComponent(searchQuery)}&limit=50`,
    `${API_BASE_URL}/properties?limit=100&sort=createdAt&order=desc`,
  ];

  for (const endpoint of endpoints) {
    const res = await fetch(endpoint, {
      next: { revalidate: PROPERTY_REVALIDATE_SECONDS },
    });
    if (!res.ok) continue;

    const matches = parsePropertyList(await res.json()).filter((property) =>
      propertyMatchesSlug(property, decodedSlug),
    );

    if (matches.length === 0) continue;

    const bestMatch = matches.sort((a, b) => {
      const aTime = new Date(a.createdAt || a.updatedAt || 0).getTime();
      const bTime = new Date(b.createdAt || b.updatedAt || 0).getTime();
      return bTime - aTime;
    })[0];

    return getPropertyByIdCached(String(bestMatch.id));
  }

  return null;
}

export const getPropertyByParamCached = cache(async (param: string) => {
  const decoded = decodeURIComponent(param).trim();
  if (!decoded) return null;

  if (isPropertyUuid(decoded)) {
    return getPropertyByIdCached(decoded);
  }

  return findPropertyBySlug(decoded);
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
          link: getPropertyDetailsPath(property),
          title,
          price: formatTotalPriceDisplay(priceNum),
        };
      });
  },
);
