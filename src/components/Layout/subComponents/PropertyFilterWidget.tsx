import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NiceSelect from "@/components/UI/NiceSelect";
import { LAND_CITIES, LAND_TYPES } from "@/config/landOptions";

export default function PropertyFilterWidget() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [propertyType, setPropertyType] = useState(
    searchParams.get("propertyType") || searchParams.get("landType") || "All",
  );
  const [city, setCity] = useState(searchParams.get("city") || "Hyderabad");
  const [minPrice, setMinPrice] = useState("Any");
  const [maxPrice, setMaxPrice] = useState("Any");

  const cityOptions = LAND_CITIES.map((item) => ({
    value: item,
    label: item,
  }));
  const cityDefaultIndex = (() => {
    const idx = LAND_CITIES.indexOf(city);
    // Keep previous behavior: fall back to Hyderabad when city is unknown/empty
    if (idx >= 0) return idx;
    const hyderabadIdx = LAND_CITIES.indexOf("Hyderabad");
    return hyderabadIdx >= 0 ? hyderabadIdx : 0;
  })();
  const landTypeOptions = [
    { value: "All", label: "All" },
    ...LAND_TYPES.map((item) => ({ value: item, label: item })),
  ];
  const landTypeDefaultIndex = Math.max(
    landTypeOptions.findIndex((option) => option.value === propertyType),
    0,
  );

  const handleUpdateList = () => {
    // Preserve keyword and listing-type from the current URL
    const existingQ =
      searchParams.get("q") || searchParams.get("address") || "";
    const existingType = searchParams.get("type") || "";
    const existingCity = searchParams.get("city") || "";
    const existingPropertyName = searchParams.get("propertyName") || "";

    const filterParams = new URLSearchParams();

    // Carry over search-bar params unchanged
    if (existingQ) filterParams.set("q", existingQ);
    if (existingType) filterParams.set("type", existingType);
    if (city.trim()) {
      filterParams.set("city", city.trim());
    } else if (existingCity) {
      filterParams.set("city", existingCity);
    }
    if (existingPropertyName)
      filterParams.set("propertyName", existingPropertyName);

    // Sidebar filter params
    if (propertyType && propertyType !== "All")
      filterParams.set("propertyType", propertyType);
    if (minPrice !== "Any") filterParams.set("minPrice", minPrice);
    if (maxPrice !== "Any") filterParams.set("maxPrice", maxPrice);

    router.push(`/search?${filterParams.toString()}`);
  };
  return (
    <div className="tp-property-widget mb-40">
      <div className="tp-property-filter-wrap" style={{ borderRadius: "8px" }}>
        <h4 className="tp-team-details-item-title">Applied Filters</h4>
        <div className="tp-team-contact-select tp-select">
          <NiceSelect
            options={cityOptions}
            defaultCurrent={cityDefaultIndex}
            onChange={(option) => setCity(option.value as string)}
            name="City"
            cls="select wide"
          />
        </div>
        <div className="tp-team-contact-select tp-select">
          <NiceSelect
            options={landTypeOptions}
            defaultCurrent={landTypeDefaultIndex}
            onChange={(option) => setPropertyType(option.value as string)}
            name="Land Type"
            cls="select wide"
          />
        </div>
        <div className="tp-team-contact-select tp-select">
          <NiceSelect
            options={[
              { value: "Any", label: "Min Price (INR)" },
              { value: "100k", label: "INR 100k" },
              { value: "200k", label: "INR 200k" },
              { value: "300k", label: "INR 300k" },
              { value: "400k", label: "INR 400k" },
              { value: "500k", label: "INR 500k" },
              { value: "600k", label: "INR 600k" },
            ]}
            defaultCurrent={0}
            onChange={(option) => setMinPrice(option.value as string)}
            name="Min Price"
            cls="select wide"
          />
        </div>
        <div className="tp-team-contact-select tp-select">
          <NiceSelect
            options={[
              { value: "Any", label: "Max Price (INR)" },
              { value: "700k", label: "INR 700k" },
              { value: "800k", label: "INR 800k" },
              { value: "900k", label: "INR 900k" },
              { value: "1M", label: "INR 1M" },
              { value: "2M", label: "INR 2M" },
              { value: "3M", label: "INR 3M" },
            ]}
            defaultCurrent={0}
            onChange={(option) => setMaxPrice(option.value as string)}
            name="Max Price"
            cls="select wide"
          />
        </div>
        <div className="tp-property-filter-item-btn text-center">
          <button
            className="tp-btn w-100"
            onClick={handleUpdateList}
            type="button"
          >
            <span className="btn-wrap">
              <b className="text-1">Update List</b>
              <b className="text-2">Update List</b>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
