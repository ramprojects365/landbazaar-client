"use client";
import { useEffect, useState } from "react";
import { formatTotalPriceDisplay } from "@/components/Utils/formatPrice";
import { IRecentlyViewedItem } from "@/types/custom-interface";
import Link from "next/link";
import { createCleanFromUrl } from "@/utils/urlEncoding";
import { usePathname, useSearchParams } from "next/navigation";
import { getCoverImageUrl } from "@/utils/propertyImages";
import { parseTotalPrice } from "@/utils/mapApiProperty";
import { API_BASE_URL } from "@/config/constants";

interface Property {
  id: string;
  title?: string;
  propertyName?: string;
  price?: number | string;
  totalPrice?: number | string;
  images?: unknown[];
  imageUrl?: string;
  listingType?: string;
}

export default function RecentlyViewedProperties() {
  const [properties, setProperties] = useState<IRecentlyViewedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchRecentProperties = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/properties?limit=3&sort=createdAt&order=desc`,
        );

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        const recentProperties: Property[] = data?.data || [];
        const limitedProperties = recentProperties.slice(0, 3);

        const transformedProperties: IRecentlyViewedItem[] =
          limitedProperties.map((property) => {
            const title =
              property.propertyName || property.title || "Land listing";
            const priceNum = parseTotalPrice(
              property.totalPrice,
              property.price,
            );
            const image =
              property.imageUrl ||
              getCoverImageUrl(property.images) ||
              "/assets/img/rent/property/recent-1.jpg";

            return {
              image,
              link: `/property-details/${property.id}`,
              title,
              price: formatTotalPriceDisplay(priceNum),
            };
          });

        setProperties(transformedProperties);
      } catch {
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchRecentProperties();
  }, []);

  const fromUrl =
    pathname === "/search" ? `/search?${searchParams.toString()}` : null;
  const withFrom = (href: string) =>
    fromUrl ? `${href}?from=${createCleanFromUrl(fromUrl)}` : href;

  if (loading) {
    return (
      <div className="tp-property-filter-wrap mb-40">
        <h4 className="tp-team-details-item-title">Recent lands</h4>
        <div className="text-center py-3">
          <div
            className="spinner-border spinner-border-sm text-primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="tp-property-filter-wrap mb-40">
        <h4 className="tp-team-details-item-title">Recent lands</h4>
        <p className="text-muted">No recent listings found</p>
      </div>
    );
  }

  return (
    <div className="tp-property-filter-wrap mb-40">
      <h4 className="tp-team-details-item-title">Recent lands</h4>
      {properties.map((property, index) => (
        <div
          className="tp-property-recent-post d-flex align-items-center mb-30"
          key={index}
        >
          <div
            className="tp-property-recent-post-thumb mr-15"
            style={{ width: "25%" }}
          >
            <Link href={withFrom(property.link)}>
              <img
                src={
                  typeof property.image === "string"
                    ? property.image
                    : (property.image as { src?: string })?.src ||
                      "/assets/img/rent/property/recent-1.jpg"
                }
                alt={property.title || "Land listing"}
                loading="lazy"
                width={80}
                height={80}
                style={{ objectFit: "cover", width: 80, height: 80 }}
              />
            </Link>
          </div>
          <div className="tp-property-recent-post-content">
            <h3 className="tp-property-recent-post-title">
              <Link href={withFrom(property.link)}>{property.title}</Link>
            </h3>
            <div className="tp-property-recent-post-meta">
              <span>{property.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
