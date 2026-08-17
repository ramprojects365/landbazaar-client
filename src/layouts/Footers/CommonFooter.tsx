import React from "react";
import {
  quickLinks,
  farmlandLinks,
  plotLinks,
  landTypeLinks,
} from "@/data/footerLinks";
import FooterContact from "./subComponents/FooterContact";
import FooterColumn from "./subComponents/FooterColumn";
import FooterCopyright from "./subComponents/FooterCopyright";

export default function CommonFooter({ className = "pt-50" }) {
  return (
    <footer className={`tp-footer-area p-relative ${className}`}>
      <div className="tp-footer-bg"></div>
      <div className="container">
        <div className="tp-footer-widget-border">
          <div className="row gy-4">
            <FooterContact />
            <div className="col-xl-9 col-lg-12">
              <div className="row gy-4">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <FooterColumn title="Quick Link" links={quickLinks} />
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <FooterColumn title="Farmlands" links={farmlandLinks} />
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <FooterColumn title="Plots" links={plotLinks} />
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <FooterColumn title="Land Types" links={landTypeLinks} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
}
