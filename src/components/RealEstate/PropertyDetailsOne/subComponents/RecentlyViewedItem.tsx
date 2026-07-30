"use client";
import { useEffect, useState } from "react";
import { formatPrice } from "@/components/Utils/formatPrice";
import { IRecentlyViewedItem } from "@/types/custom-interface";
import Image from "next/image";
import Link from "next/link";
import { createCleanFromUrl } from "@/utils/urlEncoding";
import { usePathname, useSearchParams } from "next/navigation";
import { getCoverImageUrl } from "@/utils/propertyImages";

interface Property {
  id: string;
  title?: string;
  propertyName?: string;
  price?: number;
  monthlyRent?: number;
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
        const API_BASE =
          process.env.NEXT_PUBLIC_API_BASE ?? "http://159.223.92.101:3008";
        const res = await fetch(
          `${API_BASE}/api/properties?limit=3&sort=createdAt&order=desc`,
        );

        if (!res.ok) {
          console.error("Failed to fetch recent properties");
          return;
        }

        const data = await res.json();
        const recentProperties: Property[] = data?.data || [];

        // Ensure we only take the first 3 properties
        const limitedProperties = recentProperties.slice(0, 3);

        // Transform API data to match IRecentlyViewedItem interface
        const transformedProperties: IRecentlyViewedItem[] =
          limitedProperties.map((property) => {
            const title = property.propertyName || property.title || "Property";
            const priceNum =
              Number(property.monthlyRent || property.price || 0) || 0;
            const image =
              property.imageUrl ||
              getCoverImageUrl(property.images) ||
              "/assets/img/rent/property/recent-1.jpg";

            // Create property details link with from parameter
            const fromUrl =
              pathname === "/search"
                ? `/search?${searchParams.toString()}`
                : null;
            const link = fromUrl
              ? `/property-details/${property.id}?from=${createCleanFromUrl(fromUrl)}`
              : `/property-details/${property.id}`;

            const rentSuffix =
              property.listingType === "rent" ? "/mo" : "";

            return {
              image,
              link,
              title,
              price: `${formatPrice(priceNum, false)}${rentSuffix}`,
            };
          });

        setProperties(transformedProperties);
      } catch (error) {
        console.error("Error fetching recent properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentProperties();
  }, [pathname, searchParams]);

  if (loading) {
    return (
      <div className="tp-property-filter-wrap mb-40">
        <h4 className="tp-team-details-item-title">Recently viewed</h4>
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
        <h4 className="tp-team-details-item-title">Recently viewed</h4>
        <p className="text-muted">No recent properties found</p>
      </div>
    );
  }

  return (
    <div className="tp-property-filter-wrap mb-40">
      <h4 className="tp-team-details-item-title">Recently viewed</h4>
      {properties.map((property, index) => (
        <div
          className="tp-property-recent-post d-flex align-items-center mb-30"
          key={index}
        >
          <div
            className="tp-property-recent-post-thumb mr-15"
            style={{ width: "25%" }}
          >
            <Link href={property.link}>
              <Image
                src={property.image}
                alt={property.title || "Property listing in Malaysia"}
                width={80}
                height={80}
                style={{ objectFit: "cover" }}
              />
            </Link>
          </div>
          <div className="tp-property-recent-post-content">
            <h3 className="tp-property-recent-post-title">
              <Link href={property.link}>{property.title}</Link>
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
