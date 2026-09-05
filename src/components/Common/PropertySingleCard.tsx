"use client";
import { Suspense } from "react";
import { LandSizeSvg } from "../SVG";
import { IndianRupee, LandPlot } from "lucide-react";
import { IFeatureListProps } from "@/types/custom-interface";
import { formatTotalPriceDisplay } from "../Utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { resolveListingTypeFlag } from "@/utils/mapApiProperty";
import { getPropertyDetailsPath } from "@/utils/propertySlug";
import { buildSearchHrefFromParams } from "@/utils/searchUrl";
import FavoriteButton from "@/components/UI/FavoriteButton";

function getImageSrc(image: IFeatureListProps["item"]["image"]): string {
  if (typeof image === "string") return image;
  return (
    (image as { src?: string })?.src || "/assets/img/rent/rent-thumb-1.jpg"
  );
}

export default function PropertySingleCard(props: IFeatureListProps) {
  return (
    <Suspense
      fallback={
        <div
          className="row tp-rent-item mb-30 placeholder-glow"
          style={{ border: "1px solid #DBE1EF", minHeight: "310px" }}
        >
          <span className="placeholder col-12 h-100" />
        </div>
      }
    >
      <PropertySingleCardInner {...props} />
    </Suspense>
  );
}

function PropertySingleCardInner({
  item,
  showFavorite = false,
}: IFeatureListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fromUrl =
    pathname === "/search" ? buildSearchHrefFromParams(searchParams) : null;
  const detailsHref = getPropertyDetailsPath(
    { id: item.id, title: item.title },
    { from: fromUrl },
  );
  const imageSrc = getImageSrc(item.image);
  const listingFlag = resolveListingTypeFlag(item);

  return (
    <div
      style={{ border: "1px solid #DBE1EF" }}
      className={`row tp-rent-item p-relative ${item.spacing && "mb-30"} ${
        item.wowAnimation && "wow fadeInUp"
      }`}
      data-wow-duration={item.wowDelay ? "1s" : undefined}
      data-wow-delay={item.wowDelay ? item.wowDelay : undefined}
    >
      <div
        className="col-xl-6 tp-rent-thumb p-relative"
        style={{ padding: "0px" }}
      >
        <Link href={detailsHref}>
          <img
            src={imageSrc}
            style={{ width: "100%", height: "310px", objectFit: "cover" }}
            alt={item.title || "Land or plot for sale"}
            loading="lazy"
          />
        </Link>
        <div
          className={`tp-rent-user-wrap d-flex align-items-center justify-content-between${
            showFavorite ? " tp-rent-user-wrap--with-favorite" : ""
          }`}
        >
          <div className="tp-rent-user d-flex align-items-center">
            <div className="tp-rent-user-thumb">
              <Image
                src={item.userImage || "/assets/img/team/team-details/user.png"}
                alt={item.userName || "Seller"}
                width={40}
                height={40}
                style={{ borderRadius: "50%", objectFit: "cover" }}
                unoptimized={
                  typeof item.userImage === "string" &&
                  (item.userImage.startsWith("http") ||
                    item.userImage.startsWith("/uploads"))
                }
              />
            </div>
            <div className="tp-rent-user-content">
              <h5 className="tp-rent-user-content-title">
                {item.userName || "—"}
              </h5>
            </div>
          </div>
          {showFavorite ? <FavoriteButton propertyId={item.id} /> : null}
        </div>
        {item.showTags && (
          <div className="tp-rent-tags">
            {listingFlag ? <Link href={detailsHref}>{listingFlag}</Link> : null}{" "}
            {item.isFeatured ? (
              <Link className="two" href={detailsHref}>
                FEATURED
              </Link>
            ) : null}
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
          title={item.title}
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
            {item.title}
          </Link>
        </h4>
        <p>{item.address}</p>
        <div className="tp-rent-meta-list d-flex align-items-center gap-4">
          <div className="tp-rent-meta-item">
            <div className="tp-rent-meta-content d-flex">
              <span>
                <LandSizeSvg size={18} />
              </span>
              <p>{item.bedrooms}</p>
            </div>
          </div>
          <div className="tp-rent-meta-item">
            <div className="tp-rent-meta-content d-flex">
              <span>
                <LandPlot size={16} color="#003B5C" strokeWidth={2} aria-hidden="true" />
              </span>
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
          <div className="tp-rent-price d-flex align-items-center" style={{ gap: 6 }}>
            <IndianRupee size={16} color="#003B5C" strokeWidth={2} aria-hidden="true" />
            <span>{formatTotalPriceDisplay(item.price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
