import logoWhite from "../../../public/assets/img/logo/logo-white.png";
import useGlobalContext from "@/hooks/useContext";
import OffcanvasMenus from "./OffcanvasMenus";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { requireAuth } from "@/utils/auth";

export default function OffcanvasArea() {
  const { openOffcanvas, toggleOffcanvas } = useGlobalContext();
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.905094979!2d78.24323194335936!3d17.412608650000004!2m3!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin";

  const handlePostPropertyClick = () => {
    const isAuthenticated = requireAuth("/dashboard/add-new-property");
    if (isAuthenticated) {
      toggleOffcanvas();
      window.location.href = "/dashboard/add-new-property";
    }
  };

  return (
    <>
      {/* -- offcanvas area start -- */}
      <div
        className={`offcanvas__area ${openOffcanvas ? "offcanvas-opened" : ""}`}
      >
        <div className="offcanvas__close">
          <button
            onClick={toggleOffcanvas}
            className="offcanvas__close-btn offcanvas-close-btn"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 1L11 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="offcanvas__wrapper">
          <div className="offcanvas__content">
            <div className="offcanvas__top mb-40" onClick={toggleOffcanvas}>
              <div className="offcanvas__logo">
                <Link
                  href="/"
                  className="logo-header-link"
                  aria-label="Dekho Land home"
                >
                  <Image
                    className="logo-header logo-header--white"
                    src={logoWhite}
                    alt="Dekho Land"
                  />
                </Link>
              </div>
            </div>
            <div
              className="tp-header-dashboard-btn d-md-block d-flex align-items-center"
              style={{ marginTop: "0px" }}
            >
              <button
                className="tp-btn"
                onClick={handlePostPropertyClick}
                style={{
                  padding: "12px 16px",
                  whiteSpace: "nowrap",
                  minWidth: "auto",
                  minHeight: "48px",
                }}
              >
                <span style={{ color: "#000", fontWeight: 600 }}>
                  Post Property
                </span>
                <span
                  style={{
                    backgroundColor: "#25D366",
                    color: "#fff",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontWeight: 600,
                    fontSize: "14px",
                    marginLeft: "5px",
                  }}
                >
                  FREE
                </span>
              </button>
            </div>

            <div className="tp-offcanvas-menu fix d-xl-none mb-30">
              <nav>
                <OffcanvasMenus />
              </nav>
            </div>
            <div className="offcanvas__contact d-none d-xl-block">
              <div className="offcanvas__text mb-30">
                <p>
                  India&apos;s marketplace for lands and plots — browse open
                  plots, farm land, and agricultural land across Telangana and
                  beyond.
                </p>
              </div>
              <div className="offcanvas__gallery mb-30">
                <h4 className="offcanvas__title">Gallery</h4>
              </div>
            </div>
            <div className="offcanvas-info mb-30">
              <h4 className="offcanvas__title">Contacts</h4>
              <div className="offcanvas__contact-content d-flex align-items-center">
                <div className="offcanvas__contact-content-icon">
                  <i className="fa-sharp fa-solid fa-location-dot"></i>
                </div>
                <div className="offcanvas__contact-content-content">
                  <Link href={mapUrl}>Hyderabad, Telangana, India</Link>
                </div>
              </div>
              <div className="offcanvas__contact-content d-flex align-items-center">
                <div className="offcanvas__contact-content-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="offcanvas__contact-content-content">
                  <Link href="mailto:support@dekholand.com">
                    {" "}
                    support@dekholand.com{" "}
                  </Link>
                </div>
              </div>
              <div className="offcanvas__contact-content d-flex align-items-center">
                <div className="offcanvas__contact-content-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="offcanvas__contact-content-content">
                  <Link href="tel:+919849967236"> +916303245269</Link>
                </div>
              </div>
            </div>
            <div className="offcanvas__social">
              <Link
                className="icon facebook"
                href="https://www.facebook.com/profile.php?id=61592897772107"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link
                className="icon twitter"
                href="https://x.com/dekho_land"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link
                className="icon instagram"
                href="https://www.instagram.com/dekho_land/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </Link>
              <Link
                className="icon pinterest"
                href="https://www.pinterest.com/dekholand/dekholand-your-path-to-verified-land/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={toggleOffcanvas}
        className={`body-overlay ${openOffcanvas ? "overlay-open" : ""}`}
      ></div>
      {/* -- offcanvas area end -- */}
    </>
  );
}
