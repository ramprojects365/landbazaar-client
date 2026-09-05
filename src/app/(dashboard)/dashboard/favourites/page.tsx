"use client";

import DashboardLayout from "@/layouts/DashboardLayout";
import { getSavedProperties, removeSavedProperty } from "@/services/propertyService";
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
  const listingType = property.listingType?.toLowerCase() === "rent" ? "lease" : property.listingType;
  return {
    id: property.id,
    title: property.propertyName || property.title || "Property",
    address: property.location || [property.cityName, property.state].filter(Boolean).join(", "),
    image: getCoverImageUrl(property.images) || "/assets/img/rent/property/property-1.jpg",
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
      .then((response) => setProperties((response?.data || []).map(mapSavedProperty)))
      .catch(() => setError("Failed to load saved properties."))
      .finally(() => setLoading(false));
  }, []);

  const removeSaved = async (id: string | number) => {
    await removeSavedProperty(id);
    setProperties((current) => current.filter((property) => property.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="tp-dashboard-property-wrapper">
        <h4 className="tp-dashboard-new-title mb-30">Saved properties</h4>
        {loading && <p>Loading saved properties...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && properties.length === 0 && <p className="text-muted">No saved properties yet.</p>}
        {!loading && !error && properties.map((property) => (
          <DashboardPropertyItem key={property.id} property={property} onDelete={removeSaved} removeInsteadOfDelete />
        ))}
      </div>
    </DashboardLayout>
  );
}