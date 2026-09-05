"use client";

import DashboardLayout from "@/layouts/DashboardLayout";
import RecentlyViewedProperties from "@/components/RealEstate/PropertyDetailsOne/subComponents/RecentlyViewedItem";
import { getSavedProperties } from "@/services/propertyService";
import { getCoverImageUrl } from "@/utils/propertyImages";
import { formatLandSize, parseTotalPrice } from "@/utils/mapApiProperty";
import { useEffect, useState } from "react";
import DashboardPropertyItem from "../property/components/DashboardPropertyItem";
import type { IFeaturedPropertyDT } from "@/types/property-d-t";

type SavedProperty = {
  id: string;
  title?: string;
  propertyName?: string;
  price?: number;
  totalPrice?: number | string | null;
  images?: unknown[];
  location?: string;
  cityName?: string;
  state?: string;
  landSize?: number | string | null;
  areaUnit?: string;
  propertyType?: string;
  listingType?: string;
};

const mapSavedProperty = (property: SavedProperty): IFeaturedPropertyDT => {
  const listingType =
    property.listingType?.toLowerCase() === "rent"
      ? "lease"
      : property.listingType;
  return {
    id: property.id,
    title: property.propertyName || property.title || "Property",
    address:
      property.location ||
      [property.cityName, property.state].filter(Boolean).join(", "),
    image:
      getCoverImageUrl(property.images) ||
      "/assets/img/rent/property/property-1.jpg",
    price: parseTotalPrice(property.totalPrice, property.price || 0),
    quantity: 1,
    bedrooms: formatLandSize(property.landSize, property.areaUnit),
    bathrooms: property.propertyType || "Land",
    livingArea: "",
    listingType,
    isForSale: listingType === "sale",
    isForLease: listingType === "lease",
    showTags: true,
    userName: "Property Owner",
    userRole: "Seller",
  };
};

export default function SavedPropertiesPage() {
  const [properties, setProperties] = useState<IFeaturedPropertyDT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getSavedProperties()
      .then((response) =>
        setProperties((response?.data || []).map(mapSavedProperty)),
      )
      .catch(() => setError("Failed to load favourite properties."))
      .finally(() => setLoading(false));
  }, []);

  const removeSaved = async (id: string | number) => {
    setProperties((current) =>
      current.filter((property) => property.id !== id),
    );
  };

  return (
    <DashboardLayout>
      <div className="tp-dashboard-property-wrapper">
        <h4 className="tp-dashboard-new-title mb-30">Favourite properties</h4>
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="row">
              {loading && (
                <div className="col-12 text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading favourite properties...</p>
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
                  <p className="text-muted">No favourite properties yet.</p>
                </div>
              )}

              {!loading &&
                !error &&
                properties.map((property) => (
                  <div className="col-12" key={property.id}>
                    <DashboardPropertyItem
                      property={property}
                      onDelete={removeSaved}
                      removeInsteadOfDelete
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
