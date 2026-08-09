"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { StaticImageData } from "next/image";
import PropertySingleCard from "@/components/Common/PropertySingleCard";
import { propertyData } from "@/data/propertyData";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import {
  mapApiPropertyToCard,
  type ApiPropertyFields,
} from "@/utils/mapApiProperty";
import { API_BASE_URL } from "@/config/constants";
import { formatFilterPriceLabel } from "@/components/Utils/formatPrice";
import { parseIndianPriceValue } from "@/utils/priceParsing";

type Property = IFeaturedPropertyDT;

const localImagePool: StaticImageData[] = propertyData
  .filter((p) => p.image)
  .map((p) => p.image as StaticImageData)
  .slice(0, 20);

type ApiProperty = ApiPropertyFields;

function mapApiProperty(item: ApiProperty, index: number): Property {
  return mapApiPropertyToCard(
    item,
    localImagePool[index % localImagePool.length],
  );
}

/** Convert "100k" / "1M" / "500000" price strings into a plain number, or undefined. */
function parsePriceParam(price: string): number | undefined {
  if (!price || price === "Any") return undefined;
  if (price.toLowerCase().includes("k")) return parseFloat(price) * 1_000;
  if (price.toLowerCase().includes("m")) return parseFloat(price) * 1_000_000;
  const indianValue = parseIndianPriceValue(price);
  if (indianValue !== null) return indianValue;
  const n = parseFloat(price);
  return isNaN(n) ? undefined : n;
}

export default function PropertyListing() {
  const searchParams = useSearchParams();

  // ── Search bar params (SearchRefineBar) ─────────────────────────
  const q = searchParams.get("q") || "";
  const rawType = (searchParams.get("type") || "").trim().toLowerCase();
  // Supported listing types: sale | lease. Legacy "rent" maps to lease.
  const type =
    !rawType || rawType === "all"
      ? ""
      : rawType === "rent"
        ? "lease"
        : rawType;
  const city = searchParams.get("city") || "";
  const queryPropertyType =
    searchParams.get("propertyType") || searchParams.get("landType") || "";
  const propertyName = searchParams.get("propertyName") || "";
  // Homepage sends "address" — treat it as keyword fallback
  const address = searchParams.get("address") || "";
  // Direct keyword parameter from neighborhood clicks
  const keywordParam = searchParams.get("keyword") || "";
  const keyword = keywordParam || q || address;

  // ── Sidebar filter params (PropertyFilterWidget) ─────────────────
  const propertyType = queryPropertyType || "All";
  const minPriceStr = searchParams.get("minPrice") || "Any";
  const maxPriceStr = searchParams.get("maxPrice") || "Any";

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resultCount, setResultCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError("");
      setResultCount(null);

      try {
        let url: string;

        if (keyword.trim()) {
          // ── Text search: /api/properties/search ─────────────────
          // Accepts: q, type (listingType), city, propertyName, propertyType
          const params = new URLSearchParams();
          params.set("q", keyword.trim());
          if (type) params.set("type", type);
          if (city.trim()) params.set("city", city.trim());
          if (propertyType.trim() && propertyType !== "All") {
            params.set("propertyType", propertyType.trim());
          }
          if (propertyName.trim())
            params.set("propertyName", propertyName.trim());
          url = `${API_BASE_URL}/properties/search?${params}`;
        } else {
          // ── Filter-only: /api/properties ────────────────────────
          // Accepts: listingType, propertyType, cityName, minPrice, maxPrice
          const params = new URLSearchParams();
          if (type) params.set("listingType", type);
          if (city.trim()) params.set("cityName", city.trim());
          if (propertyType && propertyType !== "All") {
            params.set("propertyType", propertyType);
          }
          const minP = parsePriceParam(minPriceStr);
          const maxP = parsePriceParam(maxPriceStr);
          if (minP !== undefined) params.set("minPrice", String(minP));
          if (maxP !== undefined) params.set("maxPrice", String(maxP));
          url = `${API_BASE_URL}/properties?${params}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();
        let results: ApiProperty[] = data?.data || data || [];

        // Client-side size post-filter (only needed for text search,
        // since the filter endpoint handles minArea server-side)
        const minSize = 0;
        const maxSize = Number.POSITIVE_INFINITY;
        if (keyword.trim() && (minSize > 0 || maxSize < Number.POSITIVE_INFINITY)) {
          results = results.filter((item) => {
            const area = parseFloat(String(item.landSize ?? 0));
            if (area <= 0) return true;
            return area >= minSize && area <= maxSize;
          });
        }

        const mapped = results.map((item, idx) => mapApiProperty(item, idx));
        setProperties(mapped);
        setResultCount(mapped.length);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("We couldn’t load properties right now. Please try again shortly.");
        setProperties([]);
        setResultCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [
    keyword,
    type,
    city,
    propertyName,
    propertyType,
    minPriceStr,
    maxPriceStr,
  ]);

  const activeFilters: { label: string; value: string }[] = [];
  if (city) activeFilters.push({ label: "City", value: city });
  if (propertyType !== "All")
    activeFilters.push({ label: "Land Type", value: propertyType });
  if (minPriceStr !== "Any")
    activeFilters.push({ label: "Min Price", value: formatFilterPriceLabel(minPriceStr) });
  if (maxPriceStr !== "Any")
    activeFilters.push({ label: "Max Price", value: formatFilterPriceLabel(maxPriceStr) });

  return (
    <div className="tab-content" id="myTabContent">
      <div
        className="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        {activeFilters.length > 0 && (
          <div
            className="hide-mobile"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            {activeFilters.map((f) => (
              <span
                key={f.label}
                style={{
                  background: "#003B5C",
                  color: "#fff",
                  borderRadius: "20px",
                  padding: "4px 14px",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {f.label}: {f.value}
              </span>
            ))}
          </div>
        )}

        {loading && (
          <div className="text-center py-5">
            <div
              className="spinner-border"
              role="status"
              style={{ color: "#003B5C" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Searching properties…</p>
          </div>
        )}

        {!loading && error && (
          <div
            style={{
              background: "#fff0f0",
              border: "1px solid #fca5a5",
              color: "#b91c1c",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        {!loading && resultCount !== null && resultCount > 0 && (
          <div className="search-results-summary">
            <p>
              <span>{resultCount}</span>{" "}
              {resultCount === 1 ? "property" : "properties"} found
              {keyword && (
                <>
                  {" "}
                  for{" "}
                  <strong>&quot;{keyword}&quot;</strong>
                </>
              )}
              {type && (
                <>
                  {" "}
                  <em>Type: {type}</em>
                </>
              )}
              {city && (
                <>
                  {" "}
                  <em>City: {city}</em>
                </>
              )}
            </p>
          </div>
        )}

        {!loading && !error && resultCount === 0 && (
          <div
            className="text-center py-5"
            style={{ border: "1px dashed #d6dbe1", borderRadius: "10px" }}
          >
            <p style={{ fontSize: "16px", color: "#555" }}>
              No properties found matching your search.
            </p>
            <p style={{ color: "#888" }}>
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}

        {!loading && properties.length > 0 && (
          <div className="row list-img-sec search-results-list">
            {properties.map((item) => (
              <div
                className="col-xl-12 col-sm-12"
                key={item.id}
                style={{ marginBottom: "15px" }}
              >
                <PropertySingleCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
