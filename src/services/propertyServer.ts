import { cache } from "react";
import { API_BASE_URL } from "@/config/constants";
import type { ApiPropertyFields } from "@/utils/mapApiProperty";

/**
 * Dedupes /properties/:id within a single server request
 * (generateMetadata + page). no-store keeps edits visible immediately.
 */
export const getPropertyByIdCached = cache(async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;

  const json = await res.json();
  const item = json?.data ?? json;
  if (!item || typeof item !== "object") return null;
  return item as ApiPropertyFields;
});
