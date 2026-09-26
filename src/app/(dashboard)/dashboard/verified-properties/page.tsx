"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { BadgeCheck, CheckCircle2, ExternalLink, IndianRupee, MapPin, RefreshCw, Search, ShieldAlert, User } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/config/axios";
import { getCoverImageUrl, withDefaultPropertyImage } from "@/utils/propertyImages";
import { formatLandSize, getListingTypeBadgeStyle, getListingTypeLabel, getPropertyHeadingTitle, parseTotalPrice } from "@/utils/mapApiProperty";
import { formatTotalPriceDisplay } from "@/components/Utils/formatPrice";
import { getDekhoLandScoreColor, getDekhoLandScoreLabel, parseDekhoLandScore } from "@/utils/dekhoLandScore";
import { getPropertyDetailsPath } from "@/utils/propertySlug";
import PaginationControls from "@/components/UI/PaginationControls";

interface AdminUnverifiedProperty {
  id: string;
  title: string;
  propertyName?: string;
  listingType?: string;
  propertyType?: string;
  price?: number;
  totalPrice?: number;
  landSize?: number;
  areaUnit?: string;
  cityName?: string;
  state?: string;
  streetName?: string;
  location?: string;
  images?: unknown[];
  dekhoLandScore?: number;
  createdAt: string;
  user?: {
    id: string;
    fullName?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    profileImage?: string;
  };
}

export default function VerifiedPropertiesPage() {
  const { userType, token } = useAuth();
  const isAdmin = userType?.trim().toLowerCase() === "admin";

  const [properties, setProperties] = useState<AdminUnverifiedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const fetchUnverifiedProperties = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await apiClient.get("/properties/admin/unverified", {
        params: {
          page,
          limit: 10,
          search: search.trim() || undefined,
        },
      });

      const data = response.data?.data;
      if (data) {
        setProperties(data.items || []);
        setTotalPages(data.totalPages || 0);
        setTotalItems(data.total || 0);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load properties for review");
    } finally {
      setLoading(false);
    }
  }, [token, page, search]);

  useEffect(() => {
    if (isAdmin && token) {
      fetchUnverifiedProperties();
    } else if (token && !isAdmin) {
      setLoading(false);
    }
  }, [isAdmin, token, fetchUnverifiedProperties]);

  const handleApprove = async (property: AdminUnverifiedProperty) => {
    setApprovingId(property.id);
    try {
      const res = await apiClient.patch(`/properties/${property.id}/verify`);
      if (res.data?.success) {
        toast.success(`"${property.title || 'Property'}" approved and verified!`);
        // Remove approved property from the list
        setProperties((current) => current.filter((p) => p.id !== property.id));
        setTotalItems((prev) => Math.max(0, prev - 1));
      } else {
        throw new Error(res.data?.message || "Verification failed");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err.message || "Failed to approve property");
    } finally {
      setApprovingId(null);
    }
  };

  if (!isAdmin && !loading) {
    return (
      <DashboardLayout>
        <div className="container py-5 text-center">
          <div className="card shadow-sm p-5 mx-auto" style={{ maxWidth: 500, borderRadius: 16 }}>
            <ShieldAlert size={48} className="text-warning mx-auto mb-3" />
            <h3>Administrator Access Required</h3>
            <p className="text-muted">
              You must be logged in as an administrator to access the property verification queue.
            </p>
            <div className="mt-3">
              <Link href="/dashboard/property" className="tp-btn">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="tp-dashboard-property-wrapper pb-80">
        <div className="container-fluid">
          {/* Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-30" style={{ gap: 16 }}>
            <div>
              <h3 className="tp-dashboard-title" style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
                Verified Properties (Review Queue)
              </h3>
              <p className="text-muted" style={{ margin: "4px 0 0" }}>
                Review newly submitted properties. Click <strong>Approve</strong> to verify and attach the Verified badge.
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge rounded-pill bg-light text-dark px-3 py-2" style={{ fontSize: 14, border: "1px solid #e5e7eb" }}>
                Pending Review: <strong>{totalItems}</strong>
              </span>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                onClick={fetchUnverifiedProperties}
                disabled={loading}
                title="Refresh list"
              >
                <RefreshCw size={14} className={loading ? "spin" : ""} /> Refresh
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="row mb-25">
            <div className="col-md-6 col-lg-5">
              <div className="input-group" style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                <span className="input-group-text bg-white border-0">
                  <Search size={16} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search by title, location, or seller name..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  style={{ outline: "none", boxShadow: "none" }}
                />
              </div>
            </div>
          </div>

          {/* List Content */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-3">Loading pending properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-3 shadow-sm p-5" style={{ border: "1px solid #f0f0f0" }}>
              <CheckCircle2 size={56} className="text-success mx-auto mb-3" />
              <h4 style={{ fontWeight: 600 }}>All Caught Up!</h4>
              <p className="text-muted mx-auto" style={{ maxWidth: 460 }}>
                There are no properties pending verification review. Once sellers post new listings, they will appear here for your approval.
              </p>
              <Link href="/dashboard/property" className="tp-btn mt-3">
                View All Properties
              </Link>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {properties.map((item) => {
                const coverImage = withDefaultPropertyImage(getCoverImageUrl(item.images));
                const priceValue = parseTotalPrice(item.totalPrice, item.price || 0);
                const score = parseDekhoLandScore(item.dekhoLandScore);
                const scoreColor = score ? getDekhoLandScoreColor(score) : "#6B7280";
                const isApproving = approvingId === item.id;
                const locationText = [item.streetName, item.cityName, item.state].filter(Boolean).join(", ") || item.location || "Location not specified";
                const detailsHref = getPropertyDetailsPath({
                  id: item.id,
                  title: item.title,
                  propertyName: item.propertyName,
                });

                return (
                  <div
                    key={item.id}
                    className="card border-0 shadow-sm rounded-3 overflow-hidden"
                    style={{ border: "1px solid #eef2f6" }}
                  >
                    <div className="card-body p-3 p-md-4">
                      <div className="row g-3 align-items-center">
                        {/* Thumbnail */}
                        <div className="col-12 col-md-3 col-xl-2">
                          <div style={{ position: "relative", width: "100%", height: 130, borderRadius: 8, overflow: "hidden", background: "#f3f4f6" }}>
                            <Image
                              src={coverImage}
                              alt={item.title || "Property image"}
                              fill
                              sizes="(max-width: 768px) 100vw, 200px"
                              style={{ objectFit: "cover" }}
                              unoptimized
                            />
                            {item.listingType && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: 8,
                                  left: 8,
                                  ...getListingTypeBadgeStyle(item.listingType),
                                  fontSize: 11,
                                  padding: "2px 8px",
                                  borderRadius: 4,
                                  fontWeight: 600,
                                  textTransform: "uppercase",
                                }}
                              >
                                {getListingTypeLabel(item.listingType)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Property Details */}
                        <div className="col-12 col-md-5 col-xl-6">
                          <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                            {item.propertyType && (
                              <span className="badge bg-light text-secondary" style={{ fontSize: 12 }}>
                                {item.propertyType}
                              </span>
                            )}
                            {score != null && (
                              <span
                                style={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  color: scoreColor,
                                  background: `${scoreColor}15`,
                                  padding: "2px 8px",
                                  borderRadius: 12,
                                }}
                              >
                                Dekho Score: {score}/100 ({getDekhoLandScoreLabel(score)})
                              </span>
                            )}
                          </div>

                          <h5 style={{ fontSize: 17, fontWeight: 600, margin: "4px 0" }}>
                            <Link href={detailsHref} target="_blank" className="text-dark text-decoration-none">
                              {getPropertyHeadingTitle(item)}
                            </Link>
                          </h5>

                          <div className="d-flex align-items-center text-muted mb-2" style={{ fontSize: 13, gap: 4 }}>
                            <MapPin size={14} />
                            <span>{locationText}</span>
                          </div>

                          <div className="d-flex align-items-center gap-3" style={{ fontSize: 13 }}>
                            <span className="text-muted">
                              Size: <strong>{formatLandSize(item.landSize, item.areaUnit)}</strong>
                            </span>
                            {item.user && (
                              <span className="text-muted d-flex align-items-center gap-1">
                                <User size={13} />
                                Seller: <strong>{item.user.fullName || item.user.username || item.user.email}</strong>
                                {item.user.phoneNumber && ` (${item.user.phoneNumber})`}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="col-12 col-md-4 col-xl-4 d-flex flex-column justify-content-between align-items-md-end" style={{ gap: 12 }}>
                          <div className="d-flex align-items-center text-primary" style={{ fontSize: 20, fontWeight: 700, gap: 4 }}>
                            <IndianRupee size={18} strokeWidth={2.5} />
                            <span>{formatTotalPriceDisplay(priceValue)}</span>
                          </div>

                          <div className="d-flex align-items-center gap-2 w-100 justify-content-md-end flex-wrap">
                            <Link
                              href={detailsHref}
                              target="_blank"
                              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 px-3 py-2"
                              style={{ borderRadius: 6, fontWeight: 500 }}
                            >
                              <ExternalLink size={14} /> View Details
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleApprove(item)}
                              disabled={isApproving}
                              className="btn btn-success btn-sm d-flex align-items-center gap-1 px-3 py-2"
                              style={{
                                borderRadius: 6,
                                fontWeight: 600,
                                background: "#16a34a",
                                borderColor: "#16a34a",
                              }}
                            >
                              {isApproving ? (
                                <>
                                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                  <span>Approving...</span>
                                </>
                              ) : (
                                <>
                                  <BadgeCheck size={16} strokeWidth={2.4} />
                                  <span>Approve</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4 d-flex justify-content-center">
                  <PaginationControls
                    page={page}
                    totalPages={totalPages}
                    onPageChange={(next) => setPage(next)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
