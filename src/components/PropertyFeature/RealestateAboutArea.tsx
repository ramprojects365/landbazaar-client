"use client";

import realStateImg from "../../../public/assets/img/rent/about/real-state.jpg";
import BathroomsSvg from "../SVG/PropertySvg/BathroomsSvg";
import BedroomsSvg from "../SVG/PropertySvg/BedroomsSvg";
import LivingSvg from "../SVG/PropertySvg/LivingSvg";
import { RentMetaItemProps } from "@/types/property-d-t";
import { formatPrice } from "../Utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/config/constants";

interface Property {
  id: string;
  propertyName?: string;
  title?: string;
  location?: string;
  streetName?: string;
  cityName?: string;
  state?: string;
  bedrooms?: number;
  bathrooms?: number;
  livingArea?: number;
  buildupArea?: number;
  price?: number;
  listingType?: string;
  images?: unknown[];
  createdAt?: string;
  updatedAt?: string;
}

const RentMetaItem: React.FC<RentMetaItemProps> = ({ icon, value, label }) => (
  <div className="tp-rent-meta-item">
    <div className="tp-rent-meta-content d-flex">
      <span>{icon}</span>
      <p>{value}</p>
    </div>
    <p>{label}</p>
  </div>
);

const getCoverImage = (images: unknown[]): string => {
  if (!images || !Array.isArray(images) || images.length === 0) return "";

  const first = images[0];
  if (typeof first === "string") return first;
  if (typeof first === "object" && first !== null) {
    const item = first as Record<string, unknown>;
    return ((item.url || item.imageUrl || item.src) as string) || "";
  }
  return "";
};

const getPropertyLocation = (property: Property): string => {
  return (
    property.location ||
    [property.streetName, property.cityName, property.state].filter(Boolean).join(", ") ||
    "Malaysia"
  );
};

export default function RealestateAboutArea() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/properties`);
        if (!res.ok) throw new Error("Failed to fetch properties");

        const data = await res.json();
        const apiProperties: Property[] = Array.isArray(data) ? data : data?.data || [];

        const sorted = apiProperties.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.updatedAt || 0);
          const dateB = new Date(b.createdAt || b.updatedAt || 0);
          return dateB.getTime() - dateA.getTime();
        });

        setProperties(sorted.slice(0, 3));
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <section className="tp-realstate-ptb about-featured-properties pt-120 pb-140">
        <div className="container">
          <div className="text-center">
            <p>Loading featured properties...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!properties.length) {
    return (
      <section className="tp-realstate-ptb about-featured-properties pt-120 pb-140">
        <div className="container">
          <div className="text-center">
            <p>No featured property available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="tp-realstate-ptb about-featured-properties pt-120 pb-140">
      <div className="container">
        <div className="tp-realstate-heading text-center mb-40">
          <span className="tp-section-title-pre">Featured homes</span>
          <h3 className="tp-section-title">Fresh picks on PropertyLa</h3>
        </div>

        <div className="about-featured-properties__grid">
          {properties.map((property) => {
            const image = getCoverImage(property.images || []);
            const area = property.livingArea || property.buildupArea;
            const metaItems: RentMetaItemProps[] = [
              {
                icon: <BedroomsSvg />,
                value: String(property.bedrooms || "0"),
                label: "Bedrooms",
              },
              {
                icon: <BathroomsSvg />,
                value: String(property.bathrooms || "0"),
                label: "Bathrooms",
              },
              {
                icon: <LivingSvg />,
                value: area ? `${area} Sq Ft` : "N/A",
                label: "Area",
              },
            ];

            return (
              <article className="about-featured-card" key={property.id}>
                <Link className="about-featured-card__image" href={`/property-details/${property.id}`}>
                  <Image
                    src={image || realStateImg}
                    alt={property.propertyName || property.title || "Featured Property"}
                    width={520}
                    height={340}
                    unoptimized
                  />
                  {property.listingType && (
                    <span>{property.listingType === "rent" ? "For rent" : "For sale"}</span>
                  )}
                </Link>

                <div className="about-featured-card__body">
                  <h4>
                    <Link href={`/property-details/${property.id}`}>
                      {property.propertyName || property.title || "Featured Property"}
                    </Link>
                  </h4>
                  <p>{getPropertyLocation(property)}</p>
                  <div className="about-featured-card__meta">
                    {metaItems.map((item, index) => (
                      <RentMetaItem key={index} {...item} />
                    ))}
                  </div>
                  <div className="about-featured-card__footer">
                    <strong>{formatPrice(property.price || 0, false)}</strong>
                    <Link href={`/property-details/${property.id}`}>View</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
