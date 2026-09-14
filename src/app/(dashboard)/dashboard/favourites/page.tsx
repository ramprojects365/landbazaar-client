"use client";

import DashboardLayout from "@/layouts/DashboardLayout";
import RecentlyViewedProperties from "@/components/RealEstate/PropertyDetailsOne/subComponents/RecentlyViewedItem";
import { getSavedProperties } from "@/services/propertyService";
import { getCoverImageUrl, withDefaultPropertyImage } from "@/utils/propertyImages";
import { formatLandSize, getPropertyHeadingTitle, parseTotalPrice } from "@/utils/mapApiProperty";
import {
  getApiDekhoLandScore,
  getApiDekhoLandScoreDetails,
  parseDekhoLandScore,
} from "@/utils/dekhoLandScore";
import { resolveUserDisplayProfile } from "@/utils/userProfileDisplay";
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
  dekhoLandScore?: number | string | null;
  dekholandScore?: number | string | null;
  score?: number | string | null;
  dekhoLandScoreDetails?: unknown;
  scoreDetails?: unknown;
  user?: IFeaturedPropertyDT["user"];
  owner?: IFeaturedPropertyDT["user"];
  seller?: IFeaturedPropertyDT["user"];
  property?: SavedProperty;
};

const mapSavedProperty = (property: SavedProperty): IFeaturedPropertyDT => {
  const listing = property.property ?? property;
  const listingType =
    listing.listingType?.toLowerCase() === "rent"
      ? "lease"
      : listing.listingType;
  const ownerUser =
    listing.user || property.user || listing.owner || property.owner || listing.seller || property.seller;
  const ownerProfile = resolveUserDisplayProfile(ownerUser);
  return {
    id: listing.id,
    title: getPropertyHeadingTitle(listing),
    propertyName: listing.propertyName,
    address:
      listing.location ||
      [listing.cityName, listing.state].filter(Boolean).join(", "),
    image: withDefaultPropertyImage(getCoverImageUrl(listing.images)),
    price: parseTotalPrice(listing.totalPrice, listing.price || 0),
    quantity: 1,
    bedrooms: formatLandSize(listing.landSize, listing.areaUnit),
    bathrooms: listing.propertyType || "Land",
    livingArea: "",
    listingType,
    isForSale: listingType === "sale",
    isForLease: listingType === "lease",
    showTags: true,
    userName: ownerProfile.name || undefined,
    userImage: ownerProfile.profileImage,
    user: ownerUser,
    userRole: "Seller",
    dekhoLandScore: parseDekhoLandScore(
      getApiDekhoLandScore(listing) ?? getApiDekhoLandScore(property),
    ),
    dekhoLandScoreDetails:
      getApiDekhoLandScoreDetails(listing) ?? getApiDekhoLandScoreDetails(property),
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
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="dashboard-property-main">
              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading favourite properties...</p>
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {!loading && !error && properties.length === 0 && (
                <div className="text-center py-5">
                  <p className="text-muted">No data found</p>
                </div>
              )}

              {!loading &&
                !error &&
                properties.map((property) => (
                  <DashboardPropertyItem
                    key={property.id}
                    property={property}
                    onDelete={removeSaved}
                    removeInsteadOfDelete
                  />
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
