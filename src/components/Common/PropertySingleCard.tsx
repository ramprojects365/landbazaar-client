"use client";
import { LivingSvg } from "../SVG";
import { IFeatureListProps } from "@/types/custom-interface";
import { formatPrice } from "../Utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { createCleanFromUrl } from "@/utils/urlEncoding";

function getImageSrc(image: IFeatureListProps["item"]["image"]): string {
  if (typeof image === "string") return image;
  return (image as { src?: string })?.src || "/assets/img/rent/rent-thumb-1.jpg";
}

export default function PropertySingleCard({ item }: IFeatureListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fromUrl =
    pathname === "/search" ? `/search?${searchParams.toString()}` : null;
  const detailsHref = fromUrl
    ? `/${item.linkUrl}/${item.id}?from=${createCleanFromUrl(fromUrl)}`
    : `/${item.linkUrl}/${item.id}`;
  const imageSrc = getImageSrc(item.image);

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
          />
        </Link>
        <div className="tp-rent-user-wrap d-flex align-items-center justify-content-between">
          <div className="tp-rent-user d-flex align-items-center">
            <div className="tp-rent-user-thumb">
              <Image
                src={item.userImage || "/assets/img/team/team-details/user.png"}
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
        {item.showTags && (
          <div className="tp-rent-tags">
            {item.isForSale ? (
              <Link href={detailsHref}>FOR SALE</Link>
            ) : null}{" "}
            {item.isFeatured ? (
              <Link className="two" href={detailsHref}>
                FEATURED
              </Link>
            ) : null}
          </div>
        )}
      </div>
      <div className="col-xl-6 tp-rent-content">
        <h4 className="tp-rent-title">
          <Link className="textline" href={detailsHref}>
            {item.title}
          </Link>
        </h4>
        <p>{item.address}</p>
        <div className="tp-rent-meta-list d-flex justify-content-between align-items-center">
          <div className="tp-rent-meta-item">
            <div className="tp-rent-meta-content d-flex">
              <span>
                <LivingSvg />
              </span>
              <p>{item.bedrooms}</p>
            </div>
            <p>Land Size</p>
          </div>
          <div className="tp-rent-meta-item">
            <div className="tp-rent-meta-content d-flex">
              <p>{item.bathrooms || "Land"}</p>
            </div>
            <p>Land Type</p>
          </div>
          <div className="tp-rent-meta-item">
            <div className="tp-rent-meta-content d-flex">
              <p>{formatPrice(item.price, false)}</p>
            </div>
            <p>Total Price</p>
          </div>
        </div>
        <div className="tp-rent-btn-box d-flex justify-content-between align-items-center">
          <div className="tp-rent-btn">
            <Link className="tp-btn" href={detailsHref}>
              View Details
            </Link>
          </div>
          <div className="tp-rent-price">
            <span>{formatPrice(item.price, false)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
