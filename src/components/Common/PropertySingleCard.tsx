"use client";
import { BathroomsSvg, BedroomsSvg, LivingSvg } from "../SVG";
import { IFeatureListProps } from "@/types/custom-interface";
//import { IFeaturedPropertyDT } from "@/types/property-d-t";
//import { useDispatch } from "react-redux";
//import { cart_product } from "@/redux/slices/cartSlice";
import { formatPrice } from "../Utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { createCleanFromUrl } from "@/utils/urlEncoding";

export default function PropertySingleCard({ item }: IFeatureListProps) {
  //const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fromUrl =
    pathname === "/search" ? `/search?${searchParams.toString()}` : null;
  const detailsHref = fromUrl
    ? `/${item.linkUrl}/${item.id}?from=${createCleanFromUrl(fromUrl)}`
    : `/${item.linkUrl}/${item.id}`;

  //handle add to cart
  // const handleAddToCart = (product: IFeaturedPropertyDT) => {
  //   if (product) {
  //     dispatch(cart_product(product));
  //   }
  // };

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
            src={
              typeof item.image === "string"
                ? item.image
                : (item.image as { src: string }).src
            }
            style={{ width: "100%", height: "310px" }}
            alt={item.title}
          />
        </Link>
        <div className="tp-rent-user-wrap d-flex align-items-center justify-content-between">
          <div className="tp-rent-user d-flex align-items-center">
            <div className="tp-rent-user-thumb">
              <Image
                src={item.userImage || "/assets/img/team/team-details/user.png"}
                alt={item.userName || "User"}
                width={40}
                height={40}
              />
            </div>
            <div className="tp-rent-user-content">
              <h5 className="tp-rent-user-content-title">{item.userName || "—"}</h5>
              <span>{item.userRole || "—"}</span>
            </div>
          </div>
          {/* <div className="tp-rent-option d-flex">
            <button onClick={() => handleAddToCart(item)}>
              <span>
                <CartSvg />
              </span>
            </button>
          </div> */}
        </div>
        {item.showTags && (
          <div className="tp-rent-tags">
            {item.isForRent === true ? <Link href="#">FOR RENT</Link> : ""}{" "}
            {item.isForSale === true ? <Link href="#">FOR SALE</Link> : ""}{" "}
            {item.isFeatured === true ? (
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
                <BedroomsSvg />
              </span>
              <p>{item.bedrooms}</p>
            </div>
            <p>Bedrooms</p>
          </div>
          <div className="tp-rent-meta-item">
            <div className="tp-rent-meta-content d-flex">
              <span>
                <BathroomsSvg />
              </span>
              <p>{item.bathrooms}</p>
            </div>
            <p>Bathrooms</p>
          </div>
          <div className="tp-rent-meta-item">
            <div className="tp-rent-meta-content d-flex">
              <span>
                <LivingSvg />
              </span>
              <p>1</p>
            </div>
            <p>Living Area</p>
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
