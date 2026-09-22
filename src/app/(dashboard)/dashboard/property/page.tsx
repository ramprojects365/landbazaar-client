"use client";

import DashboardPropertyItem from "./components/DashboardPropertyItem";
import DashboardLayout from "@/layouts/DashboardLayout";
import RecentlyViewedProperties from "@/components/RealEstate/PropertyDetailsOne/subComponents/RecentlyViewedItem";
import { useEffect, useState } from "react";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import { getCoverImageUrl, withDefaultPropertyImage } from "@/utils/propertyImages";
import { API_BASE_URL } from "@/config/constants";
import { formatLandSize, getPropertyHeadingTitle, parsePropertyVerified, parseTotalPrice } from "@/utils/mapApiProperty";
import {
  getApiDekhoLandScore,
  getApiDekhoLandScoreDetails,
  parseDekhoLandScore,
} from "@/utils/dekhoLandScore";
import { resolveUserDisplayProfile } from "@/utils/userProfileDisplay";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/config/axios";
import PaginationControls from "@/components/UI/PaginationControls";

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
  dekhoLandScore?: number | string | null;
  dekholandScore?: number | string | null;
  score?: number | string | null;
  dekhoLandScoreDetails?: unknown;
  scoreDetails?: unknown;
  user?: IFeaturedPropertyDT["user"];
  owner?: IFeaturedPropertyDT["user"];
  seller?: IFeaturedPropertyDT["user"];
  verified?: boolean | string | number | null;
  isVerified?: boolean | string | number | null;
  verificationStatus?: string | null;
}

function readProfileUser(payload: unknown): IFeaturedPropertyDT["user"] | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const record = payload as Record<string, unknown>;
  const data = record.data;
  if (data && typeof data === "object") {
    const nested = data as Record<string, unknown>;
    if (nested.user && typeof nested.user === "object") {
      return nested.user as IFeaturedPropertyDT["user"];
    }
    if (nested.profile && typeof nested.profile === "object") {
      return nested.profile as IFeaturedPropertyDT["user"];
    }
    if (nested.data && typeof nested.data === "object") {
      return nested.data as IFeaturedPropertyDT["user"];
    }
    return data as IFeaturedPropertyDT["user"];
  }
  if (record.user && typeof record.user === "object") {
    return record.user as IFeaturedPropertyDT["user"];
  }
  return record as IFeaturedPropertyDT["user"];
}

function withSellerProfile(
  property: IFeaturedPropertyDT,
  fallbackUser?: IFeaturedPropertyDT["user"],
): IFeaturedPropertyDT {
  const owner = property.user || fallbackUser;
  const ownerProfile = resolveUserDisplayProfile(owner);
  return {
    ...property,
    user: owner,
    userName: ownerProfile.name || undefined,
    userImage: ownerProfile.profileImage,
  };
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
  const [currentOwner, setCurrentOwner] = useState<IFeaturedPropertyDT["user"]>();

  const handleDelete = async (id: string | number) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    if (!token || isAdmin) return;

    apiClient
      .get("/users/profile")
      .then((res) => setCurrentOwner(readProfileUser(res.data)))
      .catch(() => undefined);
  }, [token, isAdmin]);

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
            const ownerUser = property.user || property.owner || property.seller;
            const ownerProfile = resolveUserDisplayProfile(ownerUser);

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
              verified: parsePropertyVerified(property, property.id),
              userName: ownerProfile.name || undefined,
              userImage: ownerProfile.profileImage,
              user: ownerUser,
              userRole: "Seller",
              viewCount: property.viewCount || 0,
              uniqueViewCount: property.uniqueViewCount || 0,
              favouriteCount: property.favouriteCount || 0,
              leadCount: property.leadCount || 0,
              leads: property.leads || [],
              dekhoLandScore: parseDekhoLandScore(getApiDekhoLandScore(property)),
              dekhoLandScoreDetails: getApiDekhoLandScoreDetails(property),
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
                <div className="dashboard-property-search">
                  <svg
                    className="dashboard-property-search__icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M20 20L16.5 16.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    value={search}
                    onChange={(event) => {
                      setPage(1);
                      setSearch(event.target.value);
                    }}
                    placeholder="Search title, location, city, or state"
                    className="form-control"
                    aria-label="Search title, location, city, or state"
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
                    property={withSellerProfile(
                      property,
                      isAdmin ? undefined : currentOwner,
                    )}
                    onDelete={handleDelete}
                  />
                ))}

              {!loading && !error && isAdmin && totalPages > 1 && (
                <PaginationControls
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
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
