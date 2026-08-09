"use client";
import React, { useState } from "react";
import Link from "next/link";
import HeroBannerTabContent from "./subComponents/HeroBannerTab";
import { SocialLinks } from "../UI/SocialLinks";
import BannerSlider from "./BannerSlider";
import { useTranslation } from "@/contexts/LanguageContext";

export default function HeroBannerOne() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilter = () => setIsFilterVisible((prev) => !prev);
  const handleSorting = () => {};
  const { t } = useTranslation();

  return (
    <>
      {/* -- hero area start -- */}
      <section
        className="tp-hero-ptb tp-hero-hight pt-325 p-relative"
        style={{
          padding: "100px 0 200px",
          overflow: "hidden",
        }}
      >
        <BannerSlider />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className="tp-hero-content" style={{ marginTop: "15%" }}>
                {/* Welcome Text Section */}
                <div className="text-center mb-4">
                  <h1
                    style={{
                      fontSize: "42px",
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: "15px",
                      textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {t("hero.findProperties")}
                  </h1>
                  <p
                    style={{
                      fontSize: "18px",
                      color: "#fff",
                      marginBottom: "30px",
                      textShadow: "2px 2px 6px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {t("hero.searchDescription")}
                  </p>
                </div>
                <div
                  className="tp-hero-tab p-relative wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".7s"
                >
                  <div className="row">
                    <div className="tab-content" id="nav-tabContent">
                      <HeroBannerTabContent
                        id="land"
                        isActive
                        onSortChange={handleSorting}
                        toggleFilter={toggleFilter}
                      />
                    </div>
                  </div>
                  <section
                    className={`tp-from-filter ${
                      isFilterVisible ? "show" : "hidden"
                    }`}
                  />
                </div>
                {/* CTA Button */}
                <div className="text-center mt-4">
                  <Link
                    href="/search"
                    style={{
                      display: "inline-block",
                      padding: "12px 24px",
                      backgroundColor: "#003B5C",
                      color: "#fff",
                      borderRadius: "8px",
                      minHeight: "48px",
                      fontSize: "16px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(0, 59, 92, 0.3)",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.currentTarget.style.backgroundColor = "#0056b3";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(0, 59, 92, 0.4)";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.currentTarget.style.backgroundColor = "#003B5C";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(0, 59, 92, 0.3)";
                    }}
                  >
                    Explore Lands
                  </Link>
                </div>
                <SocialLinks />
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </section>
      {/* -- hero area end -- */}
    </>
  );
}
