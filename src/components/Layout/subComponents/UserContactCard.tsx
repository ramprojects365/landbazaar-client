"use client";

import { SocialLinksThree } from "@/components/UI/SocialLinks";
import { CallThreeSvg, TeamEmailSvg } from "@/components/SVG";
import Image from "next/image";
import Link from "next/link";

interface UserContactCardProps {
  user?: {
    id?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    userType?: string | null;
    profileImage?: string;
    fullName?: string | null;
    bio?: string | null;
    companyName?: string | null;
    designation?: string | null;
    experienceYears?: number | null;
    renNumber?: string | null;
    renStatus?: string | null;
    renVerified?: boolean;
    renStatusLabel?: string;
    emailVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
}

export default function UserContactCard({ user }: UserContactCardProps) {
  // Use dynamic data if available, otherwise fallback to default
  const agentName = user?.username || "";
  const agentPhone = user?.phoneNumber || "";
  const agentEmail = user?.email || "";
  const agentImage =
    user?.profileImage || "/assets/img/team/team-details/user.png";
  const agentWhatsAppNumberLabel = user?.phoneNumber || "";
  const agentWhatsAppNumber = agentWhatsAppNumberLabel.replace(/\D/g, "");
  const whatsappNumber = agentWhatsAppNumber || "601121149066";
  const renVerified =
    user?.renVerified === true || user?.renStatus === "verified";
  const renStatusLabel =
    user?.renStatusLabel || (renVerified ? "Verified" : "Not verified");
  const contactRole =
    user?.userType?.trim().toLowerCase() === "owner"
      ? "Owner"
      : "Property Consultant";

  const handleWhatsAppClick = () => {
    const url = window.location.href;
    const message = encodeURIComponent(
      `Hi, I am interested in this property and would like to know more ${url}`,
    );
    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // Create clean agent profile URL with full user data
  const getAgentProfileUrl = () => {
    if (!user) return `/property-agent/david-hussy-2987852`;

    // Use user ID or create a slug from name
    const slug: string = user.username || "";
    const cleanSlug = slug
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Serialize user data to pass to agent page
    // Use actual API data if available, otherwise use defaults
    const userData = {
      id: user.id || cleanSlug,
      username: user.username || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      userType: user.userType || "",
      profileImage: user.profileImage || "",
      fullName: user.fullName || user.username || "",
      designation: user.designation || "Real Estate Agent",
      experienceYears: user.experienceYears || 5,
      bio:
        user.bio ||
        "Professional real estate agent specializing in Malaysian properties.",
      companyName: user.companyName || "",
      renNumber: user.renNumber || "",
      renStatus: user.renStatus || "not_verified",
      renVerified,
      renStatusLabel,
      emailVerified: user.emailVerified ?? true,
      createdAt: user.createdAt || new Date().toISOString(),
      updatedAt: user.updatedAt || new Date().toISOString(),
    };

    // Encode with Unicode support using encodeURIComponent + btoa
    const jsonString = JSON.stringify(userData);
    const encodedData = btoa(encodeURIComponent(jsonString));
    const finalUrl = `/property-agent/${cleanSlug}?data=${encodedData}`;
    return finalUrl;
  };

  return (
    <>
      <div className="tp-team-details-widget mb-40">
        <div className="tp-team-details-info-box">
          <div className="tp-team-details-info-top">
            <div className="tp-team-details-info-user d-flex align-items-center">
              <div className="tp-team-details-info-user-thumb">
                <Image
                  src={agentImage}
                  alt={agentName}
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              </div>
              <div className="tp-team-details-info-user-content">
                <Link
                  href={getAgentProfileUrl()}
                  style={{
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <span>{agentName}</span>
                    {/* {renVerified ? (
                      <BadgeCheck
                        size={15}
                        strokeWidth={2.7}
                        color="#fff"
                        fill="#0095F6"
                        aria-label="Verified REN/PEA"
                      />
                    ) : (
                      <BadgeAlert
                        size={15}
                        strokeWidth={2.5}
                        color="#ffd77a"
                        aria-label="REN/PEA not verified"
                      />
                    )} */}
                  </span>
                </Link>
                {/* <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 3,
                    color: renVerified ? "#8FD9FF" : "#ffd77a",
                    fontSize: 11,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {renVerified ? (
                    <BadgeCheck size={13} strokeWidth={2.5} />
                  ) : (
                    <BadgeAlert size={13} strokeWidth={2.5} />
                  )}
                  <span>{renStatusLabel}</span>
                </div> */}
                <p>{contactRole}</p>
              </div>
            </div>
            <div className="tp-team-details-info-user-social text-center">
              <SocialLinksThree />
            </div>
          </div>
          <div className="tp-team-details-info-content text-center">
            <div className="tp-team-details-info-contact">
              <Link href={`tel:${agentWhatsAppNumber}`}>
                <span>
                  <CallThreeSvg width="16" height="16" />
                </span>
                {agentPhone}
              </Link>
              <Link href={`mailto:${agentEmail}`}>
                <span>
                  <TeamEmailSvg />
                </span>
                {agentEmail}
              </Link>
            </div>
            <div className="tp-header-dashboard-btn d-md-block">
              <button
                type="button"
                onClick={handleWhatsAppClick}
                style={{
                  backgroundColor: "#25D366",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  minHeight: "48px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = "#128C7E";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = "#25D366";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enquiry on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
