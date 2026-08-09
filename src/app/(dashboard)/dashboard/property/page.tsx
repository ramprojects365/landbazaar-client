"use client";

import DashboardPropertyItem from "./components/DashboardPropertyItem";
import DashboardLayout from "@/layouts/DashboardLayout";
import RecentlyViewedProperties from "@/components/RealEstate/PropertyDetailsOne/subComponents/RecentlyViewedItem";
import { useEffect, useState } from "react";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import { deleteProperty } from "@/services/propertyService";
import { getCoverImageUrl } from "@/utils/propertyImages";
import { API_BASE_URL } from "@/config/constants";
import { formatLandSize, parseTotalPrice } from "@/utils/mapApiProperty";

// API Property interface
interface ApiProperty {
  id: string;
  title?: string;
  propertyName?: string;
  price?: number;
  monthlyRent?: number;
  totalPrice?: number | string | null;
  images?: unknown[];
  imageUrl?: string;
  listingType?: string;
  propertyType?: string;
  address?: string;
  location?: string;
  streetName?: string;
  landSize?: number | string | null;
  areaUnit?: string;
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

      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(`${API_BASE_URL}/properties/my-properties`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

            const listingType = (() => {
              const type = property.listingType?.trim().toLowerCase();
              if (type === "rent") return "lease";
              return type || undefined;
            })();

            return {
              id: property.id || String(index + 1),
              title: title,
              address: buildPropertyAddress(property),
              image: image,
              price: parseTotalPrice(property.totalPrice, price),
              quantity: 1,
              bedrooms: formatLandSize(property.landSize, property.areaUnit),
              bathrooms: property.propertyType?.trim() || "Land",
              livingArea: "",
              city: property.cityName || "",
              state: property.state || property.stateName || "",
              listingType,
              isForSale: listingType === "sale",
              isForLease: listingType === "lease",
              showTags: true,
              userName: "Property Owner",
              userRole: "Seller",
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
          <div className="col-12 col-lg-8">
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
                    <DashboardPropertyItem
                      property={property}
                      onDelete={handleDelete}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="tp-property-details-right">
              <RecentlyViewedProperties />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
