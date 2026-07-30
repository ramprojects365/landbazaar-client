"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CallThreeSvg, TeamEmailSvg } from "@/components/SVG";
import { BadgeAlert, BadgeCheck } from "lucide-react";

// Define the agent interface to match API response
interface AgentData {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  userType?: string | null;
  profileImage?: string;
  fullName?: string;
  bio?: string;
  companyName?: string;
  icPassport?: string;
  designation?: string;
  experienceYears?: number;
  renNumber?: string | null;
  renStatus?: string | null;
  renVerified?: boolean;
  renStatusLabel?: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Function to parse user data from URL parameters
const parseUserDataFromUrl = (): AgentData | null => {
  if (typeof window === "undefined") return null;

  const urlParams = new URLSearchParams(window.location.search);
  const userDataParam = urlParams.get("data");

  if (!userDataParam) return null;

  try {
    const decoded = decodeURIComponent(atob(userDataParam));
    const userData = JSON.parse(decoded);
    return userData;
  } catch (error) {
    console.error("Error parsing user data from URL:", error);
    return null;
  }
};

export default function PropertyAgentPage() {
  // Get agent data from URL query params
  const [agent, setAgent] = React.useState<AgentData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Try to parse agent data from URL
    const agentData = parseUserDataFromUrl();

    if (agentData) {
      setAgent(agentData);
    } else {
      // Fallback: create basic agent data from slug
      const pathParts = window.location.pathname.split("/");
      const slugFromPath = pathParts[pathParts.length - 1];

      if (slugFromPath) {
        const fallbackAgent: AgentData = {
          id: slugFromPath,
          username: slugFromPath,
          email: "agent@propertyla.com.my",
          phoneNumber: "+601126368426",
          fullName: slugFromPath
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l: string) => l.toUpperCase()),
          designation: "Real Estate Agent",
          experienceYears: 5,
          bio: "Professional real estate agent specializing in Malaysian properties.",
          emailVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setAgent(fallbackAgent);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div
          className="spinner-border"
          role="status"
          style={{ color: "#003B5C" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading agent profile...</p>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="container text-center py-5">
        <div
          className="spinner-border"
          role="status"
          style={{ color: "#003B5C" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading agent profile...</p>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi ${agent.fullName || agent.username}, I found your profile on PropertyLa and would like to inquire about property services.`,
    );
    window.open(
      `https://wa.me/${agent.phoneNumber.replace(/\D/g, "")}?text=${message}`,
      "_blank",
    );
  };

  const renVerified =
    agent.renVerified === true || agent.renStatus === "verified";
  const renStatusLabel =
    agent.renStatusLabel || (renVerified ? "Verified" : "Not verified");
  // const profileRole =
  //   agent.userType?.trim().toLowerCase() === "owner"
  //     ? "Owner"
  //     : "Property Consultant";

  return (
    <>
      {/* Breadcrumb Area Start */}
      <section
        className="tp-breadcrumb-area pt-25 pb-10"
        style={{ backgroundColor: "#f8f9ff" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tp-breadcrumb">
                <nav>
                  <Link
                    href="/"
                    style={{
                      position: "relative",
                      display: "inline-block",
                      textDecoration: "underline",
                      color: "#003B5C",
                    }}
                  >
                    Home
                  </Link>
                  {" / "}
                  <span style={{ color: "#666" }}>
                    {agent.fullName || agent.username}
                  </span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Profile Area Start */}
      <section className="tp-agent-profile-area pt-40 pb-100">
        <div className="container">
          <div className="row">
            {/* Left Column - Agent Info */}
            <div className="col-lg-4">
              <div className="tp-agent-profile-card">
                <div className="tp-agent-profile-header">
                  <div className="tp-agent-profile-image">
                    <Image
                      src={
                        agent.profileImage ||
                        "/assets/img/team/team-details/user.png"
                      }
                      alt={agent.fullName || agent.username}
                      width={200}
                      height={200}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="tp-agent-profile-basic-info">
                    <h2 className="tp-agent-profile-name">
                      <span>{agent.fullName || agent.username}</span>
                      {renVerified ? (
                        <BadgeCheck
                          size={22}
                          strokeWidth={2.8}
                          color="#fff"
                          fill="#0095F6"
                          aria-label="Verified REN/PEA"
                        />
                      ) : (
                        <BadgeAlert
                          size={21}
                          strokeWidth={2.6}
                          color="#8a6116"
                          aria-label="REN/PEA not verified"
                        />
                      )}
                    </h2>
                    <div
                      className={`tp-agent-ren-badge ${
                        renVerified ? "is-verified" : "is-not-verified"
                      }`}
                    >
                      <span>
                        {agent.renNumber
                          ? `${agent.renNumber}: ${renStatusLabel}`
                          : `${renStatusLabel}`}
                      </span>
                    </div>
                    <p className="tp-agent-profile-designation">
                      {agent.designation || "Real Estate Agent"}
                    </p>
                    {/* <div className="tp-agent-profile-stats">
                      <div className="stat-item">
                        <span className="stat-number">25</span>
                        <span className="stat-label">{profileRole}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">
                          {agent.experienceYears || 0}
                        </span>
                        <span className="stat-label">Years Exp</span>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="tp-agent-profile-contact">
                  <h3 className="tp-agent-profile-section-title">
                    Contact Information
                  </h3>
                  <div className="contact-info-list">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <CallThreeSvg width="16" height="16" />
                      </div>
                      <div className="contact-details">
                        <span className="contact-label">Phone</span>
                        <Link
                          href={`tel:${agent.phoneNumber}`}
                          className="contact-value"
                        >
                          {agent.phoneNumber}
                        </Link>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <TeamEmailSvg />
                      </div>
                      <div className="contact-details">
                        <span className="contact-label">Email</span>
                        <Link
                          href={`mailto:${agent.email}`}
                          className="contact-value"
                        >
                          {agent.email}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-100"
                    onClick={handleWhatsAppClick}
                    style={{
                      backgroundColor: "#25D366",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "12px 20px",
                      fontSize: "16px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#128C7E";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
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
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="col-lg-8">
              <div className="tp-agent-profile-details">
                {/* Professional Information */}
                <div className="tp-agent-profile-section">
                  <h3 className="tp-agent-profile-section-title">
                    Professional Information
                  </h3>
                  <div className="tp-agent-professional-info">
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Company Name</span>
                        <span className="info-value">
                          {agent.companyName || "N/A"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Designation</span>
                        <span className="info-value">
                          {agent.designation || "Real Estate Agent"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Experience</span>
                        <span className="info-value">
                          {agent.experienceYears || 0} Years
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">IC/Passport</span>
                        <span className="info-value">
                          {agent.icPassport || "N/A"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">REN/PEA</span>
                        <span className="info-value">
                          {agent.renNumber || "N/A"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">REN/PEA Status</span>
                        <span className="info-value">{renStatusLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="tp-agent-profile-section">
                  <h3 className="tp-agent-profile-section-title">
                    About {agent.fullName || agent.username}
                  </h3>
                  <div className="tp-agent-profile-about">
                    <p>{agent.bio?.trim() ? agent.bio : "No bio available."}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .tp-agent-profile-area {
          background-color: #f8f9ff;
        }
        .tp-agent-profile-card {
          background: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }
        .tp-agent-profile-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .tp-agent-profile-name {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 28px;
          font-weight: 600;
          color: #003b5c;
          margin-bottom: 5px;
        }
        .tp-agent-profile-designation {
          color: #666;
          margin-bottom: 20px;
        }
        .tp-agent-profile-stats {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 20px;
        }
        .tp-agent-ren-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 18px;
          padding: 7px 10px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
        }
        .tp-agent-ren-badge.is-verified {
          color: #003b5c;
          background: rgba(0, 59, 92, 0.08);
          border: 1px solid rgba(0, 59, 92, 0.24);
        }
        .tp-agent-ren-badge.is-not-verified {
          color: #8a6116;
          background: rgba(255, 193, 7, 0.12);
          border: 1px solid rgba(160, 110, 20, 0.28);
        }
        .stat-item {
          text-align: center;
        }
        .stat-number {
          display: block;
          font-size: 24px;
          font-weight: 600;
          color: #003b5c;
        }
        .stat-label {
          font-size: 14px;
          color: #666;
        }
        .tp-agent-profile-section {
          margin-bottom: 30px;
        }
        .tp-agent-profile-section-title {
          font-size: 18px;
          font-weight: 600;
          color: #003b5c;
          margin-bottom: 15px;
        }
        .contact-info-list {
          margin-bottom: 20px;
        }
        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        .contact-icon {
          margin-right: 15px;
          color: #003b5c;
        }
        .contact-label {
          display: block;
          font-size: 14px;
          color: #666;
        }
        .contact-value {
          color: #003b5c;
          text-decoration: none;
        }
        .contact-value:hover {
          text-decoration: underline;
        }
        .tp-agent-profile-about p {
          color: #666;
          line-height: 1.6;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 15px;
          background: #f8f9ff;
          border-radius: 5px;
        }
        .info-label {
          color: #666;
          font-weight: 500;
        }
        .info-value {
          color: #003b5c;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
