"use client";
import { useState, useEffect, useRef, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { ITabContentProps } from "@/types/banner-d-t";
import { LAND_CITIES } from "@/config/landOptions";
import { API_BASE_URL } from "@/config/constants";
import "./hero-banner-tab.css";

/** Hero search land-type labels (kept separate from form LAND_TYPES). */
const HERO_LAND_TYPE_OPTIONS = [
  "Agriculture Lands",
  "Commercial Lands",
  "Farm Lands",
  "Plots",
].sort((a, b) => a.localeCompare(b));

function SearchIcon({ stroke = "#fff" }: { stroke?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" stroke={stroke} strokeWidth="2" />
      <path
        d="M20 20L16.5 16.5"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type SearchItem = {
  id: string;
  displayText: string;
  displayType: string;
  displayDescription: string;
  cityName?: string;
};

type ApiSuggestionProperty = {
  id?: string | number;
  title?: string;
  propertyName?: string;
  propertyType?: string;
  cityName?: string;
  streetName?: string;
  location?: string;
};

const placeholderExamples = [
  "Search by land name",
  "Try farm lands in Hyderabad",
  "Try agriculture lands",
  "Try plots in Visakhapatnam",
];

const CITIES = ["All", ...LAND_CITIES];
const LAND_TYPES = ["All", ...HERO_LAND_TYPE_OPTIONS];

export default function HeroBannerTabContent({}: ITabContentProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Hyderabad");
  const [landType, setLandType] = useState("All");
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typedPlaceholder, setTypedPlaceholder] = useState(
    placeholderExamples[0],
  );
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [landTypeDropdownOpen, setLandTypeDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const landTypeDropdownRef = useRef<HTMLDivElement>(null);

  const runSearch = (value: string) => {
    const params = new URLSearchParams();
    if (value.trim()) {
      params.set("q", value.trim());
    }
    if (city?.trim() && city !== "All") {
      params.set("city", city.trim());
    }
    if (landType?.trim() && landType !== "All") {
      params.set("landType", landType.trim());
    }
    const queryString = params.toString();
    router.push(queryString ? `/search?${queryString}` : "/search");
  };

  const handleSearch = () => {
    runSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  // Live suggestions from API
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setOpen(false);
      setSearched(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setSearched(false);
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        params.set("q", query.trim());
        if (city?.trim() && city !== "All") {
          params.set("city", city.trim());
        }
        if (landType?.trim() && landType !== "All") {
          params.set("propertyType", landType.trim());
        }

        const res = await fetch(`${API_BASE_URL}/properties/search?${params.toString()}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Suggestion API error: ${res.status}`);
        }

        const json = await res.json();
        const rawItems: ApiSuggestionProperty[] = Array.isArray(json?.data)
          ? json.data
          : Array.isArray(json)
            ? json
            : [];

        const mapped: SearchItem[] = rawItems.slice(0, 8).map((item, index) => {
          const displayText = item.propertyName || item.title || "Property";
          const displayType = item.propertyType || "Land";
          const displayDescription =
            [item.streetName, item.cityName].filter(Boolean).join(", ") ||
            item.location ||
            "Location not specified";

          return {
            id: String(item.id ?? `${displayText}-${index}`),
            displayText,
            displayType,
            displayDescription,
            cityName: item.cityName,
          };
        });

        setSuggestions(mapped);
      } catch (error: any) {
        if (error?.name !== "AbortError") {
          console.error("Hero suggestions failed:", error);
          setSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setOpen(true);
          setSearched(true);
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query, city, landType]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setOpen(false);
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(e.target as Node)
      )
        setCityDropdownOpen(false);
      if (
        landTypeDropdownRef.current &&
        !landTypeDropdownRef.current.contains(e.target as Node)
      )
        setLandTypeDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    let exampleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const example = placeholderExamples[exampleIndex];
      const nextText = example.slice(0, charIndex);
      setTypedPlaceholder(nextText || " ");

      if (!deleting && charIndex < example.length) {
        charIndex += 1;
        timer = setTimeout(tick, 65);
        return;
      }

      if (!deleting) {
        deleting = true;
        timer = setTimeout(tick, 1400);
        return;
      }

      if (deleting && charIndex > 0) {
        charIndex -= 1;
        timer = setTimeout(tick, 32);
        return;
      }

      deleting = false;
      exampleIndex = (exampleIndex + 1) % placeholderExamples.length;
      timer = setTimeout(tick, 350);
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []);

  const dropdownTriggerStyle: CSSProperties = {
    background: "transparent",
    color: "#333",
    border: "none",
    padding: "4px 0",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  };

  const dropdownMenuStyle: CSSProperties = {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    minWidth: "180px",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    zIndex: 1000,
    maxHeight: "220px",
    overflowY: "auto",
  };

  const dropdownOptionStyle: CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    border: "none",
    background: "#fff",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "14px",
    color: "#333",
  };

  return (
    <div
      className="tp-hero-tab-box"
      style={{
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Top row: City + Land Type */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div ref={cityDropdownRef} style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => {
              setCityDropdownOpen(!cityDropdownOpen);
              setLandTypeDropdownOpen(false);
            }}
            style={dropdownTriggerStyle}
            aria-expanded={cityDropdownOpen}
            aria-label="Select city"
          >
            <span>{city === "All" ? "City" : city}</span>
            <i
              className="far fa-chevron-down"
              style={{
                fontSize: "12px",
                color: "#333",
                transition: "transform 0.2s ease",
                transform: cityDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                display: "inline-block",
              }}
            />
          </button>
          {cityDropdownOpen && (
            <div style={dropdownMenuStyle}>
              {CITIES.map((cityOption) => (
                <button
                  key={cityOption}
                  type="button"
                  onClick={() => {
                    setCity(cityOption);
                    setCityDropdownOpen(false);
                  }}
                  style={{
                    ...dropdownOptionStyle,
                    background:
                      city === cityOption ? "rgba(0, 59, 92, 0.08)" : "#fff",
                    fontWeight: city === cityOption ? 600 : 400,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0, 59, 92, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      city === cityOption ? "rgba(0, 59, 92, 0.08)" : "#fff";
                  }}
                >
                  {cityOption === "All" ? "All Cities" : cityOption}
                </button>
              ))}
            </div>
          )}
        </div>

        <div ref={landTypeDropdownRef} style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => {
              setLandTypeDropdownOpen(!landTypeDropdownOpen);
              setCityDropdownOpen(false);
            }}
            style={dropdownTriggerStyle}
            aria-expanded={landTypeDropdownOpen}
            aria-label="Select land type"
          >
            <span>{landType === "All" ? "Land Type" : landType}</span>
            <i
              className="far fa-chevron-down"
              style={{
                fontSize: "12px",
                color: "#333",
                transition: "transform 0.2s ease",
                transform: landTypeDropdownOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                display: "inline-block",
              }}
            />
          </button>
          {landTypeDropdownOpen && (
            <div style={dropdownMenuStyle}>
              {LAND_TYPES.map((typeOption) => (
                <button
                  key={typeOption}
                  type="button"
                  onClick={() => {
                    setLandType(typeOption);
                    setLandTypeDropdownOpen(false);
                  }}
                  style={{
                    ...dropdownOptionStyle,
                    background:
                      landType === typeOption
                        ? "rgba(0, 59, 92, 0.08)"
                        : "#fff",
                    fontWeight: landType === typeOption ? 600 : 400,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0, 59, 92, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      landType === typeOption
                        ? "rgba(0, 59, 92, 0.08)"
                        : "#fff";
                  }}
                >
                  {typeOption === "All" ? "All Land Types" : typeOption}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom row: search icon + field + button */}
      <div ref={wrapperRef} className="hero-search-row">
        <div className="hero-search-input-wrap">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="7" stroke="#9ca3af" strokeWidth="2" />
            <path
              d="M20 20L16.5 16.5"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            className="hero-search-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={typedPlaceholder}
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="hero-search-btn hero-search-btn--desktop"
          aria-label="Search properties"
        >
          <SearchIcon />
          Search
        </button>

        <button
          type="button"
          onClick={handleSearch}
          className="hero-search-btn hero-search-btn--mobile"
          aria-label="Search properties"
        >
          <SearchIcon />
        </button>

        {/* Suggestions Dropdown */}
        {open &&
          query.trim() &&
          (loading || searched || suggestions.length > 0) && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                width: "100%",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                zIndex: 9999,
                maxHeight: "320px",
                overflowY: "auto",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  padding: "8px 16px",
                  borderBottom: "1px solid #f0f0f0",
                  fontSize: "12px",
                  color: "#888",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                {loading
                  ? "Searching…"
                  : suggestions.length === 0
                    ? "No results found"
                    : `${suggestions.length} result${suggestions.length !== 1 ? "s" : ""} found`}
              </div>
              {!loading && suggestions.length === 0 && (
                <div
                  style={{
                    padding: "12px 16px",
                    fontSize: "13px",
                    color: "#666",
                  }}
                >
                  Try searching with a different keyword.
                </div>
              )}
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setQuery(item.displayText);
                    setOpen(false);
                    runSearch(item.displayText);
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: "12px 16px",
                    border: "none",
                    borderBottom: "1px solid #f5f5f5",
                    background: "#fff",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "12px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f5f6ff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "#222",
                      }}
                    >
                      {item.displayText}
                    </div>
                    {item.displayDescription && (
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#888",
                          marginTop: "2px",
                        }}
                      >
                        {item.displayDescription}
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      background: "#eef0ff",
                      color: "#003B5C",
                      borderRadius: "20px",
                      padding: "3px 10px",
                      fontSize: "11px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.displayType}
                  </span>
                </button>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
