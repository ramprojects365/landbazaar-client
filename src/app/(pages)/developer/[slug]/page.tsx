"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BadgeAlert, BadgeCheck } from "lucide-react";
import { CallThreeSvg, TeamEmailSvg } from "@/components/SVG";
import { getDeveloperBySlug } from "@/data/developersData";

export default function DeveloperDetailsPage() {
  const params = useParams();
  const slug = String(params?.slug || "");
  const developer = getDeveloperBySlug(slug);

  if (!developer) {
    return (
      <div className="container text-center py-5">
        <h2 style={{ color: "#003B5C", marginBottom: 12 }}>
          Developer not found
        </h2>
        <p className="text-muted mb-4">
          The developer profile you are looking for is unavailable.
        </p>
        <Link href="/developers" className="tp-btn">
          Browse developers
        </Link>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const digits = developer.phone.replace(/\D/g, "");
    const message = encodeURIComponent(
      `Hi ${developer.name}, I found your profile on Dekho Land and would like to know more about your land projects.`,
    );
    window.open(`https://wa.me/${digits}?text=${message}`, "_blank");
  };

  return (
    <>
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
                      textDecoration: "underline",
                      color: "#003B5C",
                    }}
                  >
                    Home
                  </Link>
                  {" / "}
                  <Link
                    href="/developers"
                    style={{
                      textDecoration: "underline",
                      color: "#003B5C",
                    }}
                  >
                    Developers
                  </Link>
                  {" / "}
                  <span style={{ color: "#666" }}>{developer.name}</span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tp-agent-profile-area pt-40 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="tp-agent-profile-card">
                <div className="tp-agent-profile-header">
                  <div className="tp-developer-profile-logo">
                    <Image
                      src={developer.logo}
                      alt={`${developer.name} logo`}
                      width={180}
                      height={180}
                      unoptimized
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="tp-agent-profile-basic-info">
                    <h2 className="tp-agent-profile-name">
                      <span>{developer.name}</span>
                      {developer.verified ? (
                        <BadgeCheck
                          size={22}
                          strokeWidth={2.8}
                          color="#fff"
                          fill="#0095F6"
                          aria-label="Verified developer"
                        />
                      ) : (
                        <BadgeAlert
                          size={21}
                          strokeWidth={2.6}
                          color="#8a6116"
                          aria-label="Developer not verified"
                        />
                      )}
                    </h2>
                    {developer.reraNumber ? (
                      <div
                        className={`tp-agent-ren-badge ${
                          developer.verified
                            ? "is-verified"
                            : "is-not-verified"
                        }`}
                      >
                        <span>RERA: {developer.reraNumber}</span>
                      </div>
                    ) : null}
                    <p className="tp-agent-profile-designation">
                      {developer.tagline}
                    </p>
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
                          href={`tel:${developer.phone}`}
                          className="contact-value"
                        >
                          {developer.phone}
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
                          href={`mailto:${developer.email}`}
                          className="contact-value"
                        >
                          {developer.email}
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
                  >
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="tp-agent-profile-details">
                <div className="tp-agent-profile-section">
                  <h3 className="tp-agent-profile-section-title">
                    Developer Information
                  </h3>
                  <div className="tp-agent-professional-info">
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Developer</span>
                        <span className="info-value">{developer.name}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Location</span>
                        <span className="info-value">{developer.location}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Projects</span>
                        <span className="info-value">
                          {developer.projectsCount}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Established</span>
                        <span className="info-value">
                          {developer.establishedYear || "N/A"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">RERA</span>
                        <span className="info-value">
                          {developer.reraNumber || "N/A"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Website</span>
                        <span className="info-value">
                          {developer.website ? (
                            <Link
                              href={developer.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visit site
                            </Link>
                          ) : (
                            "N/A"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tp-agent-profile-section">
                  <h3 className="tp-agent-profile-section-title">
                    About {developer.name}
                  </h3>
                  <div className="tp-agent-profile-about">
                    <p>{developer.bio}</p>
                  </div>
                </div>

                <div className="tp-agent-profile-section">
                  <h3 className="tp-agent-profile-section-title">
                    Specialties
                  </h3>
                  <div className="tp-developer-specialties">
                    {developer.specialties.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
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
        .tp-developer-profile-logo {
          width: 180px;
          height: 180px;
          margin: 0 auto 18px;
          border-radius: 16px;
          border: 1px solid rgba(0, 59, 92, 0.12);
          background: #fff;
          padding: 14px;
          overflow: hidden;
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
        .tp-agent-profile-section {
          margin-bottom: 30px;
        }
        .tp-agent-profile-section-title {
          font-size: 18px;
          font-weight: 600;
          color: #003b5c;
          margin-bottom: 15px;
        }
        @media (max-width: 767px) {
          .tp-agent-profile-name {
            font-size: 18px;
            line-height: 1.25;
          }
          .tp-agent-profile-section-title {
            font-size: 15px;
          }
          .tp-agent-profile-designation,
          .tp-agent-profile-about p,
          .contact-label,
          .contact-value,
          .info-label,
          .info-value {
            font-size: 13px;
          }
          .tp-developer-specialties span {
            font-size: 12px;
          }
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
          gap: 12px;
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
          text-align: right;
        }
        .tp-developer-specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .tp-developer-specialties span {
          display: inline-flex;
          min-height: 34px;
          align-items: center;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(0, 59, 92, 0.08);
          color: #003b5c;
          font-size: 13px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
