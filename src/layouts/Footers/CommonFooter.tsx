import React from "react";
import { quickLinks, locationLinks, landTypeLinks } from "@/data/footerLinks";
import FooterContact from "./subComponents/FooterContact";
import FooterColumn from "./subComponents/FooterColumn";
import FooterCopyright from "./subComponents/FooterCopyright";

// Main Footer component
export default function CommonFooter({ className = "pt-50" }) {
  return (
    <footer className={`tp-footer-area p-relative ${className}`}>
      <div className="tp-footer-bg"></div>
      <div className="container">
        <div className="tp-footer-widget-border">
          <div className="row">
            <FooterContact />
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
              <FooterColumn title="Quick Link" links={quickLinks} />
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
              <FooterColumn title="Locations" links={locationLinks} />
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
              <FooterColumn title="Land Types" links={landTypeLinks} />
            </div>
          </div>
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
}
