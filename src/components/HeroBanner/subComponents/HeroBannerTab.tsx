"use client";
import { useState, useEffect, useRef, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { ITabContentProps } from "@/types/banner-d-t";
import { LAND_CITIES, LAND_TYPES } from "@/config/landOptions";

type SearchItem = {
  id: string;
  displayText: string;
  displayType: string;
  displayDescription: string;
  cityName?: string;
};

const placeholderExamples = [
  "Search by land name",
  "Try farm lands in Hyderabad",
  "Try agriculture lands",
  "Try plots in Visakhapatnam",
];

const CITIES = [
  "All",
  "Hyderabad",
  "Visakhapatnam",
  "Vijayawada",
  "Amaravati",
  "Kakinada",
];
const LAND_TYPES = [
  "All",
  "Farm Lands",
  "Agriculture Lands",
  "Plots",
  "Commercial Lands",
];

const MOCK_SUGGESTIONS: SearchItem[] = [
  {
    id: "1",
    displayText: "Green Valley Farm",
    displayType: "Farm Lands",
    displayDescription: "Shamirpet, Hyderabad",
    cityName: "Hyderabad",
  },
  {
    id: "2",
    displayText: "Sunrise Agriculture Plot",
    displayType: "Agriculture Lands",
    displayDescription: "Gachibowli, Hyderabad",
    cityName: "Hyderabad",
  },
  {
    id: "3",
    displayText: "Coastal Farm Estate",
    displayType: "Farm Lands",
    displayDescription: "Bheemunipatnam, Visakhapatnam",
    cityName: "Visakhapatnam",
  },
  {
    id: "4",
    displayText: "Hillside Agriculture Land",
    displayType: "Agriculture Lands",
    displayDescription: "Anandapuram, Visakhapatnam",
    cityName: "Visakhapatnam",
  },
  {
    id: "5",
    displayText: "Orchard Meadows",
    displayType: "Farm Lands",
    displayDescription: "Medchal, Hyderabad",
    cityName: "Hyderabad",
  },
  {
    id: "6",
    displayText: "Riverbank Plot",
    displayType: "Agriculture Lands",
    displayDescription: "Madhurawada, Visakhapatnam",
    cityName: "Visakhapatnam",
  },
];

export default function HeroBannerTabContent({ id }: ITabContentProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All");
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

  // Live suggestions from mock data (replace with API later)
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setOpen(false);
      setSearched(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    setSearched(false);
    const timer = setTimeout(() => {
      const normalizedQuery = query.trim().toLowerCase();
      const items = MOCK_SUGGESTIONS.filter((item) => {
        const matchesQuery =
          item.displayText.toLowerCase().includes(normalizedQuery) ||
          item.displayDescription.toLowerCase().includes(normalizedQuery) ||
          item.displayType.toLowerCase().includes(normalizedQuery);
        const matchesCity =
          city === "All" || item.cityName?.toLowerCase() === city.toLowerCase();
        const matchesLandType =
          landType === "All" ||
          item.displayType.toLowerCase() === landType.toLowerCase();
        return matchesQuery && matchesCity && matchesLandType;
      });
      setSuggestions(items);
      setOpen(true);
      setSearched(true);
      setLoading(false);
    }, 250);

    return () => clearTimeout(timer);
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
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "stretch",
          gap: "10px",
          width: "100%",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            height: "52px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "0 14px",
            background: "#fff",
            minWidth: 0,
          }}
        >
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
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={typedPlaceholder}
            style={{
              flex: 1,
              height: "100%",
              border: "none",
              outline: "none",
              fontSize: "15px",
              background: "transparent",
              minWidth: 0,
              color: "#222",
              paddingLeft: "0px",
            }}
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          style={{
            flexShrink: 0,
            height: "52px",
            minWidth: "120px",
            padding: "0 22px",
            background: "#003B5C",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: "0 4px 15px rgba(0, 59, 92, 0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.background = "#0056b3";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 59, 92, 0.4)";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.background = "#003B5C";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 59, 92, 0.3)";
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="2" />
            <path
              d="M20 20L16.5 16.5"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Search
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
