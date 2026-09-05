"use client";
import { DeleteIconSvg, LandSizeSvg, PropertyEditSvg } from "@/components/SVG";
import { IndianRupee, LandPlot } from "lucide-react";
import { formatTotalPriceDisplay } from "@/components/Utils/formatPrice";
import { resolveListingTypeFlag } from "@/utils/mapApiProperty";
import { getPropertyDetailsPath } from "@/utils/propertySlug";
import { deleteProperty } from "@/services/propertyService";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import FavoriteButton from "@/components/UI/FavoriteButton";

interface IProps {
  property: IFeaturedPropertyDT;
  onDelete?: (id: string | number) => void;
  removeInsteadOfDelete?: boolean;
}

export default function DashboardPropertyItem({ property, onDelete, removeInsteadOfDelete = false }: IProps) {
  const [loading, setLoading] = useState(false);
  const [showLeads, setShowLeads] = useState(false);
  const listingFlag = resolveListingTypeFlag(property);
  const detailsHref = getPropertyDetailsPath({
    id: property.id,
    title: property.title,
  });
  const handleDelete = async (id: string | number) => {
    const confirmed = window.confirm(
      removeInsteadOfDelete
        ? "Remove this property from your favourite properties?"
        : "Are you sure you want to delete this property?",
    );
    if (!confirmed) return;

    try {
      setLoading(true);
      if (!removeInsteadOfDelete) {
        await deleteProperty(id);
      }
      onDelete?.(id);
      toast.success(removeInsteadOfDelete ? "Property removed from favourite properties" : "Property deleted successfully");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ border: "1px solid #DBE1EF", marginLeft: "0px" }}
      className="row tp-rent-item p-relative mb-30"
    >
      <div
        className="col-md-5 tp-rent-thumb p-relative"
        style={{ padding: "0px" }}
      >
        <Link href={detailsHref}>
          <Image
            src={property?.image}
            width={400}
            height={280}
            style={{ width: "100%", height: "280px", objectFit: "cover" }}
            alt="property image"
            unoptimized
          />
        </Link>
        {property.showTags && listingFlag && (
          <div className="tp-rent-tags">
            <Link className="two" href="#">
              {listingFlag}
            </Link>
            {property.isFeatured === true ? (
              <Link className="two" href="#">
                FEATURED
              </Link>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      <div className="col-md-7 tp-rent-content">
        <h4
          className="tp-rent-title"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={property.title}
        >
          <Link
            className="textline"
            href={detailsHref}
            style={{
              display: "block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {property.title}
          </Link>
        </h4>
        <p
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: 0,
          }}
          title={property?.address}
        >
          {property?.address}
        </p>
        <div className="tp-rent-meta-list d-flex align-items-center gap-4">
          <div className="tp-rent-meta-item">
            <div className="tp-rent-meta-content d-flex">
              <span>
                <LandSizeSvg size={18} />
              </span>
              <p>{property.bedrooms || "—"}</p>
            </div>
          </div>
          <div className="tp-rent-meta-item">
            <div className="tp-rent-meta-content d-flex">
              <span>
                <LandPlot size={16} color="#003B5C" strokeWidth={2} aria-hidden="true" />
              </span>
              <p>{property.bathrooms || "Land"}</p>
            </div>
          </div>
        </div>
        {!removeInsteadOfDelete && (property.leads?.length || property.leadCount) ? (
          <div style={{ marginTop: 12, marginBottom: 16 }}>
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => setShowLeads((current) => !current)}
              aria-expanded={showLeads}
            >
              {showLeads ? "Hide leads" : `View leads (${property.leadCount ?? property.leads?.length ?? 0})`}
            </button>
            {showLeads && (
              <div style={{ marginTop: 8 }}>
                {property.leads?.map((lead) => (
                  <div key={`${lead.email || lead.phone || lead.name}-${lead.lastInteractionAt}`} style={{ marginBottom: 8 }}>
                    <strong>{lead.name}</strong>
                    <div style={{ fontSize: 13, color: "#667085" }}>
                      {lead.phone || "Phone not provided"}
                      {lead.email ? ` | ${lead.email}` : ""}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
        <div className="tp-rent-btn-box d-flex justify-content-between align-items-center">
          <div className="tp-rent-btn">
            <Link className="tp-btn" href={detailsHref}>
              View Details
            </Link>
          </div>
          <div className="tp-rent-action-btn d-flex">
            {removeInsteadOfDelete ? (
              <FavoriteButton
                propertyId={property.id}
                initialFavorite
                tone="light"
                onFavoriteChange={(saved) => {
                  if (!saved) onDelete?.(property.id);
                }}
              />
            ) : (
              <>
                <div className="tp-action-btn mr-10">
                  <Link
                    href={`/dashboard/add-new-property?edit=${property.id}`}
                    title="Edit Property"
                  >
                    <PropertyEditSvg />
                  </Link>
                </div>
                {onDelete && (
                  <div className="tp-action-btn">
                    <button
                      className="click"
                      onClick={() => handleDelete(property.id)}
                      title="Delete Property"
                      disabled={loading}
                      style={{
                        opacity: loading ? 0.6 : 1,
                        cursor: loading ? "not-allowed" : "pointer",
                      }}
                    >
                      <DeleteIconSvg />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="tp-rent-price d-flex align-items-center" style={{ gap: 6 }}>
            <IndianRupee size={16} color="#003B5C" strokeWidth={2} aria-hidden="true" />
            <span>{formatTotalPriceDisplay(Number(property.price) || 0)}</span>
          </div>
        </div>
        {!removeInsteadOfDelete && (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ marginTop: 14 }}
          >
            <span style={{ color: "#667085", fontSize: 13 }}>
              Views: {property.viewCount ?? 0}
            </span>
            <span style={{ color: "#667085", fontSize: 13 }}>
              Favourites: {property.favouriteCount ?? 0}
            </span>
            <span style={{ color: "#667085", fontSize: 13 }}>
              Leads: {property.leadCount ?? 0}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
