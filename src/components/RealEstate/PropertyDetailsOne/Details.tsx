"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import DetailsReusableArea from "./subComponents/DetailsReusableArea";
import PropertyDetailsSlider from "./subComponents/PropertySlider";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import { IdProps } from "@/types/custom-interface";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { toast } from "sonner";
import { recordPropertyView } from "@/services/propertyService";
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

type ApiProperty = ApiPropertyFields;

export default function PropertyDetailsOneArea({ id }: IdProps) {
  const searchParams = useSearchParams();
  const viewRecordedRef = useRef(false);
  const [apiProperty, setApiProperty] = useState<ApiProperty | null>(null);
  const [display, setDisplay] = useState<IFeaturedPropertyDT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        sp.get("propertyName") ||
        sp.get("q") ||
        sp.get("address") ||
        sp.get("city") ||
        "Property Listing"
      );
    } catch {
      return "Property Listing";
    }
  })();

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/properties/${id}`);
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
  }, [id]);

  useEffect(() => {
    if (!id || viewRecordedRef.current) return;
    viewRecordedRef.current = true;

    recordPropertyView({
      propertyId: id,
      propertyUrl: window.location.href,
    }).catch(() => {
      viewRecordedRef.current = false;
    });
  }, [id]);

  const getShareUrl = () => window.location.href;
  const getShareText = () => {
    const title = display?.title?.trim() ?? "";
    const description = apiProperty?.description?.trim() ?? "";
    const url = getShareUrl();
    return [title, description, url].filter(Boolean).join("\n\n");
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied.");
      return true;
    } catch {
      toast.error("Could not copy link.");
      return false;
    }
  };

  const shareOnFacebook = () => {
    const url = getShareUrl();
    openExternal(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    );
  };

  const shareOnWhatsApp = () => {
    const text = getShareText();
    openExternal(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };

  const shareOnInstagram = async () => {
    const url = getShareUrl();
    const title = display?.title ?? "Property";
    const description = apiProperty?.description ?? "";

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: [title, description].filter(Boolean).join("\n\n"),
          url,
        });
        return;
      } catch {}
    }

    const copied = await copyToClipboard(url);
    if (copied) {
      openExternal("https://www.instagram.com/");
      toast.message("Paste the copied link into Instagram to share.");
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
                    <strong>Land Size:</strong> {display.bedrooms}
                  </span>
                  {isLease ? (
                    <span>
                      <strong>Monthly Rent:</strong> {monthlyRentLabel}
                    </span>
                  ) : (
                    <>
                      <span>
                        <strong>Total Price:</strong>{" "}
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
                <div className="tp-property-details-icon-box mb-3">
                  <button title="Share on Facebook" onClick={shareOnFacebook}>
                    <span>
                      <i
                        className="fa-brands fa-facebook-f"
                        style={{ color: "#1877F2", fontSize: "25px" }}
                      ></i>
                    </span>
                  </button>
                  <button title="Share on Instagram" onClick={shareOnInstagram}>
                    <span>
                      <i
                        className="fa-brands fa-instagram"
                        style={{
                          display: "inline-block",
                          background:
                            "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontSize: "25px",
                        }}
                      ></i>
                    </span>
                  </button>
                  <button title="Share on WhatsApp" onClick={shareOnWhatsApp}>
                    <span>
                      <i
                        className="fa-brands fa-whatsapp"
                        style={{ color: "#25D366", fontSize: "25px" }}
                      ></i>
                    </span>
                  </button>
                </div>

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
      <DetailsReusableArea property={apiProperty} />
    </>
  );
}
