"use client";

import HomeBlogArea from "@/components/Blog/HomeBlogArea";
import HeroBannerOne from "@/components/HeroBanner/HeroBannerOne";
import HomePropertiesByCity from "@/components/Neighborhood/HomePropertiesByCity";
import PropertyHome from "@/components/Property/PropertyHome";
import HomeLoanCalculator from "@/components/Tools/HomeLoanCalculator";
import TrustBadges from "@/components/UI/TrustBadges";
import TrustedAgents from "@/components/TrustedAgents/TrustedAgents";
import React from "react";
import { useTranslation } from "@/contexts/LanguageContext";

export default function HomeOnePage() {
  const { t } = useTranslation();

  return (
    <>
      <HeroBannerOne />
      <div style={{ backgroundColor: "#fff" }}>
        <PropertyHome />
      </div>
      <div style={{ backgroundColor: "rgb(240, 244, 253)" }}>
        <HomePropertiesByCity />
      </div>
      <div style={{ backgroundColor: "#fff" }}>
        <TrustedAgents />
      </div>
      <div style={{ backgroundColor: "rgb(240, 244, 253)" }}>
        <HomeBlogArea />
      </div>
      <section className="home-trust-section">
        <div className="container">
          <div className="home-trust-section__inner">
            <span className="tp-section-title-pre">Why PropertyLa</span>
            <h3 className="tp-section-title">{t("home.whyChoosePropertyLa")}</h3>
            <TrustBadges />
          </div>
        </div>
      </section>
      <div style={{ backgroundColor: "#fff" }}>
        <HomeLoanCalculator variant="home" />
      </div>
    </>
  );
}
