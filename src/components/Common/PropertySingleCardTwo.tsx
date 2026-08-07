import MapMarkerSvg from "@/components/SVG/PropertySvg/MapMarkerIcon";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import { formatTotalPriceDisplay } from "../Utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface propertyProps {
  item: IFeaturedPropertyDT;
}

function getImageSrc(image: IFeaturedPropertyDT["image"]): string {
  if (typeof image === "string") return image;
  return image?.src || "/assets/img/rent/rent-thumb-1.jpg";
}

function PropertySingleCardTwo({ item }: propertyProps) {
  const detailsHref = `/property-details/${item.id}`;
  const imageSrc = getImageSrc(item.image);

  return (
    <div
      className={`tp-listing-2-item ${item.spacing && "mb-30"} ${
        item.wowAnimation && "wow fadeInUp"
      }`}
      data-wow-duration={item.wowDelay ? "1s" : undefined}
      data-wow-delay={item.wowDelay ? item.wowDelay : undefined}
    >
      <div className="tp-rent-item p-relative">
        <div className="tp-rent-thumb p-relative">
          <Link href={detailsHref}>
            <img
              src={imageSrc}
              alt={item.title || "Land or plot for sale"}
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
          </Link>

          {item.showTags && (
            <div className="tp-rent-tags">
              {item.isForSale && (
                <Link className="two" href={detailsHref}>
                  FOR SALE
                </Link>
              )}
              {item.isFeatured && (
                <Link className="two" href={detailsHref}>
                  FEATURED
                </Link>
              )}
            </div>
          )}
          <div className="tp-rent-user-wrap d-flex align-items-center justify-content-between">
            <div className="tp-rent-user d-flex align-items-center">
              <div className="tp-rent-user-thumb">
                <Image
                  src={
                    item.userImage || "/assets/img/team/team-details/user.png"
                  }
                  alt={item.userName || "Seller"}
                  width={40}
                  height={40}
                />
              </div>
              <div className="tp-rent-user-content">
                <h5 className="tp-rent-user-content-title">
                  {item.userName || "—"}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-rent-content">
          <h4 className="tp-rent-title">
            <Link className="textline" href={detailsHref}>
              {item.title}
            </Link>
          </h4>
          <p style={{ height: "43px" }}>
            <MapMarkerSvg /> {item.address}
          </p>
          <div className="tp-rent-meta-list d-flex justify-content-between align-items-center">
            <div className="tp-rent-meta-item">
              <div className="tp-rent-meta-content d-flex">
                <p>{item.bedrooms}</p>
              </div>
            </div>
            <div className="tp-rent-meta-item">
              <div className="tp-rent-meta-content d-flex">
                <p>{item.bathrooms || "Land"}</p>
              </div>
            </div>
          </div>
          <div className="tp-rent-btn-box d-flex justify-content-between align-items-center">
            <div className="tp-rent-btn">
              <Link className="tp-btn" href={detailsHref}>
                View Details
              </Link>
            </div>
            <div className="tp-rent-price">
              <span>{formatTotalPriceDisplay(item.price)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PropertySingleCardTwo);
