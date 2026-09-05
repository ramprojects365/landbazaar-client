"use client";
import { DeleteIconSvg, LivingSvg, PropertyEditSvg } from "@/components/SVG";
import { formatTotalPriceDisplay } from "@/components/Utils/formatPrice";
import { resolveListingTypeFlag } from "@/utils/mapApiProperty";
import { getPropertyDetailsPath } from "@/utils/propertySlug";
import { deleteProperty } from "@/services/propertyService";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  property: IFeaturedPropertyDT;
  onDelete?: (id: string | number) => void;
}

export default function DashboardPropertyItem({ property, onDelete }: IProps) {
  const [loading, setLoading] = useState(false);
  const listingFlag = resolveListingTypeFlag(property);
  const detailsHref = getPropertyDetailsPath({
    id: property.id,
    title: property.title,
  });
  const handleDelete = async (id: string | number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?",
    );
    if (!confirmed) return;

    try {
      setLoading(true);
      await deleteProperty(id);
      onDelete?.(id);
      toast.success("Property deleted successfully");
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
        className="col-xl-6 tp-rent-thumb p-relative"
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
      <div className="col-xl-6 tp-rent-content">
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
                <LivingSvg />
              </span>
              <p>{property.bedrooms || "—"}</p>
            </div>
          </div>
          <div className="tp-rent-meta-item">
            <div className="tp-rent-meta-content d-flex">
              <p>{property.bathrooms || "Land"}</p>
            </div>
          </div>
        </div>
        <div className="tp-rent-btn-box d-flex justify-content-between align-items-center">
          <div className="tp-rent-btn">
            <Link className="tp-btn" href={detailsHref}>
              View Details
            </Link>
          </div>
          <div className="tp-rent-action-btn d-flex">
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
          </div>
          <div className="tp-rent-price">
            <span>{formatTotalPriceDisplay(Number(property.price) || 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
