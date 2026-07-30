"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ITabContentProps } from "@/types/banner-d-t";

type SearchItem = {
  id: string;
  displayText: string;
  displayType: string;
  displayDescription: string;
  cityName?: string;
};

const placeholderExamples = [
  "Search by property name",
  "Try Blue Wave Apartments",
  "Try condo in Selangor",
  "Try Kuala Lumpur",
];

export default function HeroBannerTabContent({
  id,
  isActive,
}: ITabContentProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typedPlaceholder, setTypedPlaceholder] = useState(placeholderExamples[0]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const runSearch = (value: string, city?: string) => {
    if (!value.trim()) return;
    const params = new URLSearchParams({
      q: value.trim(),
      type: id || "rent",
    });
    if (city?.trim()) {
      params.append("city", city.trim());
    }
    router.push(`/search?${params}`);
  };

  // Search button handler
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
    setLoading(true);
    setSearched(false);
    const timer = setTimeout(async () => {
      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_BASE ?? "http://159.223.92.101:3008";
        const res = await fetch(
          `${API_BASE}/api/properties/search?q=${encodeURIComponent(query)}&type=${id || "rent"}`,
        );
        if (!res.ok) {
          setSuggestions([]);
          setOpen(true);
          setSearched(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        const items: SearchItem[] = (data?.data || []).map(
          (p: {
            id?: string;
            title?: string;
            propertyName?: string;
            propertyType?: string;
            cityName?: string;
            streetName?: string;
          }) => ({
            id: p.id || "",
            displayText: p.propertyName || p.title || "",
            displayType: p.propertyType || "Property",
            displayDescription: [p.streetName, p.cityName]
              .filter(Boolean)
              .join(", "),
            cityName: p.cityName,
          }),
        );
        setSuggestions(items);
        setOpen(true);
        setSearched(true);
        setLoading(false);
      } catch {
        setSuggestions([]);
        setOpen(true);
        setSearched(true);
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query, id]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setOpen(false);
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

  return (
    <div
      className={`tab-pane fade${isActive ? " show active" : ""}`}
      id={id}
      role="tabpanel"
    >
      <div className="tp-hero-tab-box">
        <div
          className="row g-0 align-items-stretch"
          ref={wrapperRef}
          style={{
            position: "relative",
            width: "100%",
            marginLeft: 0,
            marginRight: 0,
            boxSizing: "border-box",
          }}
        >
          {/* Search Input */}
          <div className="col-9 col-sm-10">
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
                width: "100%",
                height: "52px",
                border: "none",
                borderRadius: "8px 0 0 8px",
                padding: "0 16px",
                fontSize: "15px",
                outline: "none",
                background: "#fff",
              }}
            />
          </div>

          {/* Search Button */}
          <div className="col-3 col-sm-2">
            <button
              type="button"
              onClick={handleSearch}
              style={{
                width: "100%",
                height: "52px",
                background: "#003B5C",
                color: "#fff",
                border: "none",
                borderRadius: "8px 8px 8px 8px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
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
              Search
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {open &&
            query.trim() &&
            (loading || searched || suggestions.length > 0) && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 20px)",
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
                      runSearch(item.displayText, item.cityName);
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
    </div>
  );
}
