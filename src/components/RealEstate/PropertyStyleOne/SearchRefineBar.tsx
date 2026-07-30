"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LISTING_TYPES = ["", "rent", "buy", "new"];

export default function SearchRefineBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fall back to "address" param (sent by homepage search bar)
  const [keyword, setKeyword] = useState(
    searchParams.get("keyword") ||
      searchParams.get("q") ||
      searchParams.get("address") ||
      searchParams.get("keyWord") ||
      "",
  );
  const [type, setType] = useState(searchParams.get("type") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [propertyName, setPropertyName] = useState(
    searchParams.get("propertyName") ||
      searchParams.get("q") ||
      searchParams.get("address") ||
      "",
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (type) params.set("type", type);
    if (city.trim()) params.set("city", city.trim());
    if (propertyName.trim()) params.set("propertyName", propertyName.trim());
    router.push(`/search?${params.toString()}`);
  };

  const inputStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "9px 14px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    background: "#fff",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 600,
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <div
      className="property-search-refine"
      style={{
        background: "#f8f9ff",
        border: "1px solid #e8e8f0",
        borderRadius: "8px",
        padding: "20px 24px",
        marginBottom: "120px",
      }}
    >
      <form onSubmit={handleSearch}>
        <div className="row align-items-end property-search-refine__row">
          {/* Keyword / Property */}
          <div className="col-xl-3 col-lg-6 col-md-6 property-search-refine__field">
            <label style={labelStyle}>Keyword</label>
            <input
              type="text"
              style={inputStyle}
              placeholder="Ex. luxury, studio..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* Property Name */}
          <div className="col-xl-3 col-lg-6 col-md-6 property-search-refine__field">
            <label style={labelStyle}>Property Name</label>
            <input
              type="text"
              style={inputStyle}
              placeholder="Ex. Susana Sentral"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
            />
          </div>

          {/* City */}
          <div className="col-xl-2 col-lg-4 col-md-6 property-search-refine__field">
            <label style={labelStyle}>City</label>
            <input
              type="text"
              style={inputStyle}
              placeholder="Ex. Kuala Lumpur"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Type */}
          <div className="col-xl-2 col-lg-4 col-md-6 property-search-refine__field">
            <label style={labelStyle}>Listing Type</label>
            <div className="property-search-refine__select">
              <select
                style={inputStyle}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {LISTING_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t === ""
                      ? "All Types"
                      : t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="col-xl-2 col-lg-4 col-md-12 property-search-refine__action">
            <button
              type="submit"
              style={{
                width: "100%",
                background: "#003B5C",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                minHeight: "48px",
                letterSpacing: "0.3px",
              }}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
