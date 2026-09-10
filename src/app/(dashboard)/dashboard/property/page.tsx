"use client";

import DashboardPropertyItem from "./components/DashboardPropertyItem";
import DashboardLayout from "@/layouts/DashboardLayout";
import RecentlyViewedProperties from "@/components/RealEstate/PropertyDetailsOne/subComponents/RecentlyViewedItem";
import { useEffect, useState } from "react";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import { getCoverImageUrl, withDefaultPropertyImage } from "@/utils/propertyImages";
import { API_BASE_URL } from "@/config/constants";
import { formatLandSize, getPropertyHeadingTitle, parseTotalPrice } from "@/utils/mapApiProperty";
import { useAuth } from "@/hooks/useAuth";

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
  viewCount?: number;
  uniqueViewCount?: number;
  favouriteCount?: number;
  leadCount?: number;
  leads?: IFeaturedPropertyDT["leads"];
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
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { token, userType } = useAuth();
  const isAdmin = userType?.trim().toLowerCase() === "admin";

  const handleDelete = async (id: string | number) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    if (!token) return;

    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const propertiesEndpoint = isAdmin
          ? "/properties/admin/all"
          : "/properties/my-properties";
        const query = new URLSearchParams();

        if (isAdmin) {
          query.set("page", String(page));
          query.set("limit", "10");
          if (search.trim()) {
            query.set("search", search.trim());
          }
        }

        const res = await fetch(`${API_BASE_URL}${propertiesEndpoint}?${query.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch properties: ${res.status}`);
        }

        const json = await res.json();
        const apiProperties: ApiProperty[] = json?.data ?? [];

        const transformedProperties: IFeaturedPropertyDT[] = apiProperties.map(
          (property, index) => {
            const title = getPropertyHeadingTitle(property);
            const price = property.price || property.monthlyRent || 0;
            const image = withDefaultPropertyImage(
              property.imageUrl || getCoverImageUrl(property.images),
            );

            const listingType = (() => {
              const type = property.listingType?.trim().toLowerCase();
              if (type === "rent") return "lease";
              return type || undefined;
            })();

            return {
              id: property.id || String(index + 1),
              title: title,
              propertyName: property.propertyName,
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
              viewCount: property.viewCount || 0,
              uniqueViewCount: property.uniqueViewCount || 0,
              favouriteCount: property.favouriteCount || 0,
              leadCount: property.leadCount || 0,
              leads: property.leads || [],
            };
          },
        );

        setProperties(transformedProperties);
        if (isAdmin) {
          setTotalPages(json?.totalPages ?? 0);
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [token, userType, isAdmin, page, search]);

  const engagementSummary = properties.reduce(
    (summary, property) => ({
      views: summary.views + (property.viewCount ?? 0),
      saved: summary.saved + (property.favouriteCount ?? 0),
      leads: summary.leads + (property.leadCount ?? 0),
    }),
    { views: 0, saved: 0, leads: 0 },
  );

  return (
    <DashboardLayout>
      <div className="tp-dashboard-property-wrapper">
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="dashboard-property-main">
              {!isAdmin && (
                <div
                  className="property-engagement-box mb-30"
                  style={{
                    border: "1px solid #DBE1EF",
                    background: "#fff",
                    padding: "20px 24px",
                  }}
                >
                  <h4 className="tp-dashboard-new-title mb-15">
                    Property engagement
                  </h4>
                  <div className="row property-engagement-stats">
                    <div className="col-4">
                      <div>
                        <span style={{ color: "#667085", fontSize: 13 }}>Total views</span>
                        <strong style={{ display: "block", color: "#003B5C", fontSize: 24 }}>
                          {engagementSummary.views}
                        </strong>
                      </div>
                    </div>
                    <div className="col-4">
                      <div>
                        <span style={{ color: "#667085", fontSize: 13 }}>Total Favourite</span>
                        <strong style={{ display: "block", color: "#FF7A00", fontSize: 24 }}>
                          {engagementSummary.saved}
                        </strong>
                      </div>
                    </div>
                    <div className="col-4">
                      <div>
                        <span style={{ color: "#667085", fontSize: 13 }}>Total leads</span>
                        <strong style={{ display: "block", color: "#2E7D32", fontSize: 24 }}>
                          {engagementSummary.leads}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isAdmin && (
                <div className="mb-30">
                  <input
                    value={search}
                    onChange={(event) => {
                      setPage(1);
                      setSearch(event.target.value);
                    }}
                    placeholder="Search title, location, city, or state"
                    className="form-control"
                    style={{ border: "1px solid #DBE1EF", borderRadius: 8, height: 44 }}
                  />
                </div>
              )}

              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading properties...</p>
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
                    onDelete={handleDelete}
                  />
                ))}

              {!loading && !error && isAdmin && totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    disabled={page <= 1}
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                  >
                    Prev
                  </button>
                  <span style={{ color: "#475467", fontSize: 14 }}>
                    {page} / {totalPages}
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    disabled={page >= totalPages}
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  >
                    Next
                  </button>
                </div>
              )}
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
