"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import rentThumb from "../../../../public/assets/img/rent/rent-thumb-1.jpg";
import { formatTotalPriceDisplay } from "@/components/Utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { getListingTypeFlag } from "@/utils/mapApiProperty";
import { getPropertyDetailsPath } from "@/utils/propertySlug";
import { getCoverImageUrl } from "@/utils/propertyImages";
import { formatLandSize, parseTotalPrice } from "@/utils/mapApiProperty";
import { fetchPropertiesList } from "@/services/propertiesList";
import { buildSearchHrefFromParams } from "@/utils/searchUrl";
import type { FeaturedSidebarProperty } from "@/types/propertySidebar";
import FavoriteButton from "@/components/UI/FavoriteButton";

interface IPropsWrapperCls {
  wrapperCls?: string;
  customClass?: string;
  featuredProperty?: FeaturedSidebarProperty | null;
}

export default function SidebarPropertyItem(props: IPropsWrapperCls) {
  return (
    <Suspense fallback={null}>
      <SidebarPropertyItemInner {...props} />
    </Suspense>
  );
}

function SidebarPropertyItemInner({
  wrapperCls,
  customClass,
  featuredProperty: featuredPropertyProp = null,
}: IPropsWrapperCls) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fromUrl = useMemo(() => {
    if (pathname !== "/search") return null;
    return buildSearchHrefFromParams(searchParams);
  }, [pathname, searchParams]);

  const [latestState, setLatestState] = useState<FeaturedSidebarProperty | null>(
    null,
  );

  useEffect(() => {
    if (featuredPropertyProp) return;

    const run = async () => {
      try {
        const list = await fetchPropertiesList();
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
        setLatestState({
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
  }, [featuredPropertyProp]);

  const latest = featuredPropertyProp ?? latestState;

  const detailsHref = latest
    ? getPropertyDetailsPath(
        { id: latest.id, title: latest.title },
        { from: fromUrl },
      )
    : "#";

  return (
    <>
      <div
        className={`${wrapperCls ? wrapperCls : "tp-team-details-widget"} mb-40`}
      >
        <div className={customClass ? customClass : ""}>
          <h4 className="tp-team-details-item-title">Featured Lands</h4>
          {latest ? (
            <div className="sidebar-recent-property">
              <div className="tp-rent-thumb p-relative">
                <Link href={detailsHref}>
                  {latest.imageUrl ? (
                    <img
                      src={latest.imageUrl}
                      alt={latest.title || "Land listing"}
                      loading="lazy"
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
                    {getListingTypeFlag(latest.listingType) || "FOR SALE"}
                  </Link>
                </div>
                <div className="tp-rent-user-wrap d-flex align-items-center justify-content-between">
                  <div className="tp-rent-user d-flex align-items-center">
                    <div className="tp-rent-user-content">
                      <h5 className="tp-rent-user-content-title">
                        <Link href={detailsHref}>{latest.title}</Link>
                      </h5>
                      <span>{formatTotalPriceDisplay(latest.price)}</span>
                    </div>
                  </div>
                  {pathname.startsWith("/property-details") ? (
                    <FavoriteButton propertyId={latest.id} />
                  ) : null}
                </div>
              </div>

              <div className="tp-rent-meta-list team-details d-flex justify-content-between align-items-center">
                <div className="tp-rent-meta-item">
                  <div className="tp-rent-meta-content d-flex">
                    <p>{latest.landSize}</p>
                  </div>
                </div>
                <div className="tp-rent-meta-item">
                  <div className="tp-rent-meta-content d-flex">
                    <p>{latest.propertyType}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
