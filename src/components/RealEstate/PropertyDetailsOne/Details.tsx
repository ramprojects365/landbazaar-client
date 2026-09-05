"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Heart } from "lucide-react";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import {
  getSavedPropertyStatus,
  recordPropertyView,
  removeSavedProperty,
  saveProperty,
} from "@/services/propertyService";
import SocialShare from "@/components/UI/SocialShare";
import {
  formatPricePerUnit,
  getListingTypeBadgeStyle,
  getListingTypeLabel,
  isLeaseListingType,
  mapApiPropertyToCard,
  type ApiPropertyFields,
} from "@/utils/mapApiProperty";
import { formatTotalPriceDisplay } from "@/components/Utils/formatPrice";
import { API_BASE_URL } from "@/config/constants";
import { toDescriptionSnippet } from "@/utils/descriptionHtml";
import { getPropertyDetailsPath } from "@/utils/propertySlug";
import { fromUrlTextValue } from "@/utils/searchUrl";
import type { FeaturedSidebarProperty } from "@/types/propertySidebar";
import type { IRecentlyViewedItem } from "@/types/custom-interface";

const PropertyDetailsSlider = dynamic(
  () => import("./subComponents/PropertySlider"),
  {
    loading: () => (
      <div
        className="placeholder-glow rounded-3"
        style={{ height: "420px", background: "#f0f0f0" }}
      />
    ),
  },
);

const DetailsReusableArea = dynamic(
  () => import("./subComponents/DetailsReusableArea"),
  {
    loading: () => (
      <section className="tp-property-details-ptb pb-120">
        <div className="container">
          <div className="placeholder-glow">
            <span className="placeholder col-12 mb-2 d-block" />
            <span className="placeholder col-10 d-block" />
          </div>
        </div>
      </section>
    ),
  },
);

type ApiProperty = ApiPropertyFields;

type PropertyDetailsProps = {
  propertyId: string;
  initialProperty?: ApiProperty | null;
  featuredProperty?: FeaturedSidebarProperty | null;
  recentProperties?: IRecentlyViewedItem[];
};

function PropertyDetailsContent({
  propertyId,
  initialProperty = null,
  featuredProperty = null,
  recentProperties = [],
}: PropertyDetailsProps) {
  const searchParams = useSearchParams();
  const viewRecordedRef = useRef(false);
  const [apiProperty, setApiProperty] = useState<ApiProperty | null>(
    initialProperty,
  );
  const [display, setDisplay] = useState<IFeaturedPropertyDT | null>(() =>
    initialProperty ? mapApiPropertyToCard(initialProperty, "") : null,
  );
  const [loading, setLoading] = useState(!initialProperty);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const fromParam = searchParams.get("from");
  const listingHref = (() => {
    if (!fromParam) return "/search";
    try {
      return decodeURIComponent(fromParam);
    } catch {
      return "/search";
    }
  })();

  const listingLabel = (() => {
    try {
      const u = new URL(listingHref, "http://159.223.92.101");
      const sp = u.searchParams;
      return (
        fromUrlTextValue(sp.get("propertyName")) ||
        fromUrlTextValue(sp.get("q")) ||
        fromUrlTextValue(sp.get("address")) ||
        fromUrlTextValue(sp.get("city")) ||
        "Property Listing"
      );
    } catch {
      return "Property Listing";
    }
  })();

  useEffect(() => {
    if (!propertyId) return;

    const initialMatches =
      initialProperty && String(initialProperty.id) === String(propertyId);
    if (initialMatches) {
      setApiProperty(initialProperty);
      setDisplay(mapApiPropertyToCard(initialProperty, ""));
      setLoading(false);
      setError("");
      return;
    }

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/properties/${propertyId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const item: ApiProperty = json?.data ?? json;
        setApiProperty(item);
        setDisplay(mapApiPropertyToCard(item, ""));
      } catch {
        setError("Property not found.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [propertyId, initialProperty]);

  useEffect(() => {
    if (!propertyId || viewRecordedRef.current) return;
    viewRecordedRef.current = true;

    const record = () => {
      const visitorKeyStorageKey = "dekhoLandVisitorKey";
      let visitorKey = window.localStorage.getItem(visitorKeyStorageKey);
      if (!visitorKey) {
        visitorKey = crypto.randomUUID();
        window.localStorage.setItem(visitorKeyStorageKey, visitorKey);
      }

      recordPropertyView({
        propertyId,
        propertyUrl: window.location.href,
        visitorKey,
      }).catch(() => {
        viewRecordedRef.current = false;
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(record, { timeout: 3000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(record, 1500);
    return () => window.clearTimeout(timeoutId);
  }, [propertyId]);

  useEffect(() => {
    if (!propertyId || !localStorage.getItem("authToken")) return;
    getSavedPropertyStatus(propertyId)
      .then((response) => setIsSaved(Boolean(response?.data?.saved)))
      .catch(() => setIsSaved(false));
  }, [propertyId]);

  const handleSaveToggle = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = `/sign-in?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }

    setSaveLoading(true);
    try {
      if (isSaved) {
        await removeSavedProperty(propertyId);
        setIsSaved(false);
      } else {
        await saveProperty(propertyId, window.location.href);
        setIsSaved(true);
      }
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="tp-property-details-area pt-80 pb-130">
        <div className="container text-center py-5">
          <div
            className="spinner-border"
            role="status"
            style={{ color: "#003B5C" }}
          />
          <p className="mt-3 text-muted">Loading property details…</p>
        </div>
      </section>
    );
  }

  if (error || !display || !apiProperty) {
    return (
      <section className="tp-property-details-area pt-80 pb-130">
        <div className="container text-center py-5">
          <p className="text-danger">{error || "Property not found."}</p>
        </div>
      </section>
    );
  }

  const isLease = isLeaseListingType(apiProperty.listingType);
  const pricePerUnitLabel = formatPricePerUnit(
    apiProperty.pricePerUnit,
    apiProperty.areaUnit,
  );
  const monthlyRentLabel = formatTotalPriceDisplay(
    apiProperty.monthlyRent ?? apiProperty.price,
  );

  return (
    <>
      <section className="tp-property-details-area pb-130">
        <div className="container tp-property-details-box">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: listingLabel, href: listingHref },
              { label: "Details" },
            ]}
          />
          <div className="row" style={{ paddingTop: "10px" }}>
            <div className="col-lg-8">
              <div className="tp-property-details-heading mb-40">
                <div className="mb-2 d-flex gap-2 flex-wrap">
                  {apiProperty.listingType && (
                    <span
                      style={{
                        ...getListingTypeBadgeStyle(apiProperty.listingType),
                        borderRadius: "20px",
                        padding: "4px 14px",
                        fontSize: "13px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {getListingTypeLabel(apiProperty.listingType)}
                    </span>
                  )}
                  {apiProperty.propertyType && (
                    <span
                      style={{
                        background: "#f5f5f5",
                        color: "#555",
                        borderRadius: "20px",
                        padding: "4px 14px",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {apiProperty.propertyType}
                    </span>
                  )}
                </div>

                <h4 className="tp-property-details-title">{display.title}</h4>
                <span style={{ color: "#777", fontSize: "15px" }}>
                  {display.address}
                </span>

                <div className="tp-property-details-info mt-3 d-flex flex-wrap gap-3 align-items-center">
                  <span>
                    <strong>Size:</strong> {display.bedrooms}
                  </span>
                  {isLease ? (
                    <span>
                      <strong>Monthly Rent:</strong> {monthlyRentLabel}
                    </span>
                  ) : (
                    <>
                      <span>
                        <strong>Price:</strong>{" "}
                        {formatTotalPriceDisplay(display.price)}
                      </span>
                      {pricePerUnitLabel !== "—" && (
                        <span style={{ color: "#888", fontSize: "14px" }}>
                          {pricePerUnitLabel}
                        </span>
                      )}
                    </>
                  )}
                  {apiProperty.facingDirection && (
                    <span style={{ color: "#888", fontSize: "14px" }}>
                      Facing {apiProperty.facingDirection}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="tp-property-details-right-side text-lg-end mb-40">
                <SocialShare
                  variant="property"
                  path={getPropertyDetailsPath(apiProperty)}
                  title={display.title?.trim() || "Property"}
                  text={toDescriptionSnippet(apiProperty.description ?? "", 180)}
                />

                <button
                  type="button"
                  onClick={handleSaveToggle}
                  disabled={saveLoading}
                  aria-label={isSaved ? "Remove from favourite properties" : "Add to favourite properties"}
                  title={isSaved ? "Remove from favourite properties" : "Add to favourite properties"}
                  style={{
                    border: "1px solid #dbe1ef",
                    background: isSaved ? "#fff1f2" : "#fff",
                    color: isSaved ? "#c62828" : "#003b5c",
                    width: 42,
                    height: 42,
                    borderRadius: 6,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 12,
                  }}
                >
                  <Heart size={19} fill={isSaved ? "currentColor" : "none"} />
                </button>

                <h4 className="tp-property-details-icon-price">
                  {formatTotalPriceDisplay(display.price)}
                </h4>

                {apiProperty.negotiable && (
                  <p
                    style={{
                      color: "#2e7d32",
                      fontSize: "13px",
                      fontWeight: 500,
                      marginTop: "6px",
                    }}
                  >
                    ✓ Negotiable
                  </p>
                )}
                {apiProperty.availability && (
                  <p
                    style={{
                      color: "#888",
                      fontSize: "13px",
                      marginTop: "4px",
                    }}
                  >
                    Available: {apiProperty.availability}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <PropertyDetailsSlider images={apiProperty.images} />
        </div>
      </section>
      <DetailsReusableArea
        property={apiProperty}
        featuredProperty={featuredProperty}
        recentProperties={recentProperties}
      />
    </>
  );
}

function PropertyDetailsFallback() {
  return (
    <section className="tp-property-details-area pb-130">
      <div className="container">
        <div
          className="placeholder-glow rounded-3"
          style={{ height: "420px", background: "#f0f0f0" }}
        />
      </div>
    </section>
  );
}

export default function PropertyDetailsOneArea(props: PropertyDetailsProps) {
  return (
    <Suspense fallback={<PropertyDetailsFallback />}>
      <PropertyDetailsContent {...props} />
    </Suspense>
  );
}
