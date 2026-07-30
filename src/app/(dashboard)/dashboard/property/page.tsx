"use client";

import DashboardPropertyItem from "./components/DashboardPropertyItem";
import DashboardLayout from "@/layouts/DashboardLayout";
import DiscountOfferCard from "@/components/Layout/subComponents/DiscountOfferCard";
import RecentlyViewedProperties from "@/components/RealEstate/PropertyDetailsOne/subComponents/RecentlyViewedItem";
import { useEffect, useState } from "react";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import { deleteProperty } from "@/services/propertyService";
import { getCoverImageUrl } from "@/utils/propertyImages";

// API Property interface
interface ApiProperty {
  id: string;
  title?: string;
  propertyName?: string;
  price?: number;
  monthlyRent?: number;
  images?: unknown[];
  imageUrl?: string;
  listingType?: string;
  address?: string;
  location?: string;
  streetName?: string;
  bedrooms?: number;
  bathrooms?: number;
  livingArea?: number;
  buildupArea?: number;
  cityName?: string;
  state?: string;
  stateName?: string;
}

const buildPropertyAddress = (property: ApiProperty): string => {
  const addressParts = [
    property.streetName,
    property.cityName,
    property.state || property.stateName,
  ]
    .map((part) => part?.trim())
    .filter(Boolean);

  return (
    property.address?.trim() ||
    property.location?.trim() ||
    addressParts.join(", ") ||
    "Address not available"
  );
};

export default function DashboardProperty() {
  const [properties, setProperties] = useState<IFeaturedPropertyDT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string | number) => {
    try {
      await deleteProperty(id);

      setProperties((prev) =>
        prev.filter((p) => p.id !== id)
      );
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // const API_BASE =
        //   process.env.NEXT_PUBLIC_API_BASE ?? "http://159.223.92.101:3008";
        // const res = await fetch(`${API_BASE}/api/properties`);
        // if (!res.ok) {
        //   throw new Error(`Failed to fetch properties: ${res.status}`);
        // }
        // const data = await res.json();
        // const apiProperties: ApiProperty[] = data?.data || [];

        const token = localStorage.getItem("authToken");
        const base = process.env.NEXT_PUBLIC_API_BASE;
        const res = await fetch(`${base}/api/properties/my-properties`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch properties: ${res.status}`);
        }

        const json = await res.json();
        const apiProperties: ApiProperty[] = json?.data ?? []; // Array of user's properties

        // Transform API data to match IFeaturedPropertyDT interface
        const transformedProperties: IFeaturedPropertyDT[] = apiProperties.map(
          (property, index) => {
            const title = property.propertyName || property.title || "Property";
            const price = property.price || property.monthlyRent || 0;
            const image =
              property.imageUrl ||
              getCoverImageUrl(property.images) ||
              "/assets/img/rent/property/property-1.jpg";

            return {
              id: property.id || String(index + 1),
              title: title,
              address: buildPropertyAddress(property),
              image: image,
              price: price,
              quantity: 1,
              bedrooms: String(property.bedrooms || 0),
              bathrooms: String(property.bathrooms || 0),
              livingArea: String(property.livingArea || property.buildupArea || 0),
              city: property.cityName || "",
              state: property.state || property.stateName || "",
              isForRent: property.listingType === "rent",
              isForSale: property.listingType === "sale",
              showTags: true,
              userName: "Property Owner",
              userRole: "Agent",
            };
          },
        );

        setProperties(transformedProperties);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <DashboardLayout>
      <div className="tp-dashboard-property-wrapper">
        <div className="row">
          <div className="col-8">
            <div className="row">
              {loading && (
                <div className="col-12 text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading properties...</p>
                </div>
              )}

              {error && (
                <div className="col-12">
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                </div>
              )}

              {!loading && !error && properties.length === 0 && (
                <div className="col-12 text-center py-5">
                  <p className="text-muted">No properties found</p>
                </div>
              )}

              {!loading &&
                !error &&
                properties.map((property) => (
                  <div className="col-12" key={property.id}>
                    <DashboardPropertyItem property={property} onDelete={handleDelete} />
                  </div>
                ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="tp-property-details-right">
              <DiscountOfferCard wrapperCls="tp-property-filter-wrap" />
              <RecentlyViewedProperties />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
