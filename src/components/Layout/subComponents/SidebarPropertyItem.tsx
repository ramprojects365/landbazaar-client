"use client";
import { useEffect, useMemo, useState } from "react";
import rentThumb from "../../../../public/assets/img/rent/rent-thumb-1.jpg";
import { LivingSvg } from "@/components/SVG";
import { formatPrice } from "@/components/Utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { createCleanFromUrl } from "@/utils/urlEncoding";
import { getCoverImageUrl } from "@/utils/propertyImages";
import { formatLandSize, parseTotalPrice } from "@/utils/mapApiProperty";
import { API_BASE_URL } from "@/config/constants";

interface IPropsWrapperCls {
  wrapperCls?: string;
  customClass?: string;
}

export default function SidebarPropertyItem({
  wrapperCls,
  customClass,
}: IPropsWrapperCls) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fromUrl = useMemo(() => {
    if (pathname !== "/search") return null;
    const qs = searchParams.toString();
    return qs ? `/search?${qs}` : "/search";
  }, [pathname, searchParams]);

  const [latest, setLatest] = useState<{
    id: string;
    title: string;
    listingType: string;
    price: number;
    landSize: string;
    propertyType: string;
    imageUrl: string | null;
  } | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/properties`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return;
        const json = await res.json();
        const list: Array<{
          id: string;
          title?: string;
          propertyName?: string;
          listingType?: string;
          propertyType?: string;
          price?: number | string;
          totalPrice?: number | string;
          landSize?: number | string;
          areaUnit?: string;
          images?: unknown[];
          createdAt?: string;
          updatedAt?: string;
        }> = json?.data ?? json ?? [];

        if (!Array.isArray(list) || list.length === 0) return;

        const sorted = [...list].sort((a, b) => {
          const aTime = new Date(a.createdAt || a.updatedAt || 0).getTime();
          const bTime = new Date(b.createdAt || b.updatedAt || 0).getTime();
          if (
            !Number.isNaN(aTime) &&
            !Number.isNaN(bTime) &&
            (aTime || bTime)
          ) {
            return bTime - aTime;
          }
          return 0;
        });

        const item = sorted[0];
        setLatest({
          id: item.id,
          title: item.propertyName || item.title || "Land listing",
          listingType: item.listingType || "sale",
          price: parseTotalPrice(item.totalPrice, item.price),
          landSize: formatLandSize(item.landSize, item.areaUnit),
          propertyType: item.propertyType || "Land",
          imageUrl: getCoverImageUrl(item.images),
        });
      } catch {
        return;
      }
    };

    run();
  }, []);

  const detailsHref = latest
    ? fromUrl
      ? `/property-details/${latest.id}?from=${createCleanFromUrl(fromUrl)}`
      : `/property-details/${latest.id}`
    : "#";

  return (
    <>
      <div
        className={`${wrapperCls ? wrapperCls : "tp-team-details-widget"} mb-40`}
      >
        <div className={customClass ? customClass : ""}>
          <h4 className="tp-team-details-item-title">Recent Lands</h4>
          {latest ? (
            <div className="sidebar-recent-property">
              <div className="tp-rent-thumb p-relative">
                <Link href={detailsHref}>
                  {latest.imageUrl ? (
                    <img
                      src={latest.imageUrl}
                      alt={latest.title || "Land listing"}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Image
                      style={{ width: "100%", height: "auto" }}
                      src={rentThumb}
                      alt={latest.title || "Land listing"}
                    />
                  )}
                </Link>
                <div className="tp-rent-tags">
                  <Link href={detailsHref}>
                    {latest.listingType === "sale" ? "FOR SALE" : "FOR SALE"}
                  </Link>
                </div>
                <div className="tp-rent-user-wrap d-flex align-items-center justify-content-between">
                  <div className="tp-rent-user d-flex align-items-center">
                    <div className="tp-rent-user-content">
                      <h5 className="tp-rent-user-content-title">
                        <Link href={detailsHref}>{latest.title}</Link>
                      </h5>
                      <span>{formatPrice(latest.price, false)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tp-rent-meta-list team-details d-flex justify-content-between align-items-center">
                <div className="tp-rent-meta-item">
                  <div className="tp-rent-meta-content d-flex">
                    <span>
                      <LivingSvg />
                    </span>
                    <p>{latest.landSize}</p>
                  </div>
                  <p>Land Size</p>
                </div>
                <div className="tp-rent-meta-item">
                  <div className="tp-rent-meta-content d-flex">
                    <p>{latest.propertyType}</p>
                  </div>
                  <p>Land Type</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
