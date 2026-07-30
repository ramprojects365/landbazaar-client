import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NiceSelect from "@/components/UI/NiceSelect";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

export default function PropertyFilterWidget() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sizeRange, setSizeRange] = useState<[number, number]>([100, 3000]);
  const [propertyType, setPropertyType] = useState("All");
  const [minPrice, setMinPrice] = useState("Any");
  const [maxPrice, setMaxPrice] = useState("Any");
  const [bedrooms, setBedrooms] = useState("All");
  const [propertyStatus, setPropertyStatus] = useState("All");

  const handleSizeChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      if (values.length === 2) {
        setSizeRange([values[0], values[1]]);
      }
    } else {
      setSizeRange([values, values]);
    }
  };

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
    if (existingCity) filterParams.set("city", existingCity);
    if (existingPropertyName)
      filterParams.set("propertyName", existingPropertyName);

    // Sidebar filter params
    if (propertyType && propertyType !== "All")
      filterParams.set("propertyType", propertyType);
    if (minPrice !== "Any") filterParams.set("minPrice", minPrice);
    if (maxPrice !== "Any") filterParams.set("maxPrice", maxPrice);
    if (bedrooms !== "All") filterParams.set("bedrooms", bedrooms);
    if (propertyStatus !== "All") filterParams.set("status", propertyStatus);
    filterParams.set("minSize", String(sizeRange[0]));
    filterParams.set("maxSize", String(sizeRange[1]));

    router.push(`/search?${filterParams.toString()}`);
  };
  return (
    <div className="tp-property-widget mb-40">
      <div className="tp-property-filter-wrap" style={{ borderRadius: "8px" }}>
        <h4 className="tp-team-details-item-title">Applied Filters</h4>
        <div className="tp-team-contact-select tp-select">
          <NiceSelect
            options={[
              { value: "All", label: "All Residential" },
              { value: "Apartment", label: "Apartment" },
              { value: "Bungalow", label: "Bungalow" },
              { value: "Condominium", label: "Condominium" },
              { value: "Landed House", label: "Landed House" },
              { value: "Office", label: "Office" },
              { value: "Serviced Residence", label: "Serviced Residence" },
              { value: "Factory", label: "Factory" },
              { value: "Warehouse", label: "Warehouse" },
              { value: "Land", label: "Land" },
              { value: "Shop Lot", label: "Shop Lot" },
            ]}
            defaultCurrent={0}
            onChange={(option) => setPropertyType(option.value as string)}
            name="Sorting"
            cls="select wide"
          />
        </div>
        <div className="tp-team-contact-select tp-select">
          <NiceSelect
            options={[
              { value: "Any", label: "Min Price (RM)" },
              { value: "100k", label: "100k" },
              { value: "200k", label: "200k" },
              { value: "300k", label: "300k" },
              { value: "400k", label: "400k" },
              { value: "500k", label: "500k" },
              { value: "600k", label: "600k" },
            ]}
            defaultCurrent={0}
            onChange={(option) => setMinPrice(option.value as string)}
            name="Sorting"
            cls="select wide"
          />
        </div>
        <div className="tp-team-contact-select tp-select">
          <NiceSelect
            options={[
              { value: "Any", label: "Max Price (RM)" },
              { value: "700k", label: "700k" },
              { value: "800k", label: "800k" },
              { value: "900k", label: "900k" },
              { value: "1M", label: "1M" },
              { value: "2M", label: "2M" },
              { value: "3M", label: "3M" },
            ]}
            defaultCurrent={0}
            onChange={(option) => setMaxPrice(option.value as string)}
            name="Sorting"
            cls="select wide"
          />
        </div>
        <div className="tp-team-contact-select tp-select">
          <NiceSelect
            options={[
              { value: "All", label: "Bed rooms" },
              { value: "Studio", label: "Studio" },
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "5", label: "5" },
            ]}
            defaultCurrent={0}
            onChange={(option) => setBedrooms(option.value as string)}
            name="Sorting"
            cls="select wide"
          />
        </div>
        <div className="tp-team-contact-select tp-select">
          <NiceSelect
            options={[
              { value: "All", label: "Show Properties" },
              { value: "Subsale", label: "Subsale" },
              { value: "New Launch", label: "New Launch" },
              { value: "Auction", label: "Auction" },
            ]}
            defaultCurrent={0}
            onChange={(option) => setPropertyStatus(option.value as string)}
            name="Sorting"
            cls="select wide"
          />
        </div>
        <div className="tp-from-range-box">
          <div className="row">
            <div className="col-lg-12">
              <div className="tp-from-range">
                <div className="tp-property-filter-item-2">
                  <div className="tp-property-widget-filter p-relative">
                    <span className="tp-property-widget-filter-title">
                      Built-up Size
                    </span>
                    <span className="input-range">
                      <input
                        type="text"
                        value={`${sizeRange[0]} - ${sizeRange[1]} sq ft`}
                        readOnly
                      />
                    </span>
                    <Slider
                      className="custom-slider"
                      range
                      min={0}
                      max={1000}
                      value={sizeRange}
                      onChange={handleSizeChange}
                      step={1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* slider range */}
        {/* <RangeFilter /> */}
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
