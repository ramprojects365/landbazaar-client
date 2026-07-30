"use client";
import { useEffect, useMemo, useState } from "react";
import rentThumb from "../../../../public/assets/img/rent/rent-thumb-1.jpg";
import { BathroomsSvg, BedroomsSvg, LivingSvg } from "@/components/SVG";
import { formatPrice } from "@/components/Utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { createCleanFromUrl } from "@/utils/urlEncoding";
import { getCoverImageUrl } from "@/utils/propertyImages";

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
    listingType: "rent" | "sale" | string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: string;
    imageUrl: string | null;
  } | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_BASE ?? "http://159.223.92.101:3008";
        const res = await fetch(`${API_BASE}/api/properties`, {
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
          price?: number | string;
          bedrooms?: number | string;
          bathrooms?: number | string;
          buildupArea?: number | string;
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
        const beds = parseInt(String(item.bedrooms ?? 0), 10) || 0;
        const baths = parseInt(String(item.bathrooms ?? 0), 10) || 0;
        const areaNum = parseFloat(String(item.buildupArea ?? 0)) || 0;
        const area =
          areaNum > 0
            ? Number.isInteger(areaNum)
              ? `${areaNum} sq`
              : `${areaNum.toFixed(0)} sq`
            : "N/A";

        setLatest({
          id: item.id,
          title: item.propertyName || item.title || "Property",
          listingType: item.listingType || "",
          price: parseFloat(String(item.price ?? 0)) || 0,
          bedrooms: beds,
          bathrooms: baths,
          area,
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
          <h4 className="tp-team-details-item-title">Recent Properties</h4>
          {latest ? (
            <div className="sidebar-recent-property">
              <div className="tp-rent-thumb p-relative">
                <Link href={detailsHref}>
                  {latest.imageUrl ? (
                    <img
                      src={latest.imageUrl}
                      alt={latest.title || "Property listing in Malaysia"}
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : (
                    <Image
                      style={{ width: "100%", height: "auto" }}
                      src={rentThumb}
                      alt={latest.title || "Property listing in Malaysia"}
                    />
                  )}
                </Link>
                <div className="tp-rent-tags">
                  <Link href="#">
                    {latest.listingType === "sale" ? "FOR SALE" : "FOR RENT"}
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
                      <BedroomsSvg />
                    </span>
                    <p>{String(latest.bedrooms).padStart(2, "0")}</p>
                  </div>
                  <p>Bed</p>
                </div>
                <div className="tp-rent-meta-item">
                  <div className="tp-rent-meta-content d-flex">
                    <span>
                      <BathroomsSvg />
                    </span>
                    <p>{String(latest.bathrooms).padStart(2, "0")}</p>
                  </div>
                  <p>Baths</p>
                </div>
                <div className="tp-rent-meta-item">
                  <div className="tp-rent-meta-content d-flex">
                    <span>
                      <LivingSvg />
                    </span>
                    <p>{latest.area}</p>
                  </div>
                  <p>Area</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
