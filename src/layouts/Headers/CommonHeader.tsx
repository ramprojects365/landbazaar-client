"use client";
import logoIcon from "../../../public/assets/img/logo/logo-icon-blue.png";
import UserSvg from "@/components/SVG/UserSvg";
import OffcanvasArea from "../../components/OffCanvas/OffcanvasArea";
import useGlobalContext from "@/hooks/useContext";
import NavMenus from "../subComponents/NavMenus";
import useSticky from "@/hooks/useSticky";
import ProfileDropdown from "./ProfileDropdown";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { requireAuth } from "@/utils/auth";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "@/contexts/LanguageContext";
import NotificationBell from "@/components/Notifications/NotificationBell";
import { useAuth } from "@/hooks/useAuth";

export default function CommonHeader({ wrapClass = "" }) {
  const { toggleOffcanvas } = useGlobalContext();
  const { sticky } = useSticky();
  const { t } = useTranslation();
  const { user } = useAuth();

  const handlePostPropertyClick = () => {
    const isAuthenticated = requireAuth("/dashboard/add-new-property");
    // If user is authenticated, navigate to the dashboard
    if (isAuthenticated) {
      window.location.href = "/dashboard/add-new-property";
    }
  };

  // Header Content Component
  const renderHeaderContent = ({
    toggleOffcanvas,
  }: {
    toggleOffcanvas: () => void;
  }) => (
    <div className="container container-large">
      <div className="row align-items-center">
        <div className="col-xl-2 col-lg-4 col-md-3 col-6">
          <div className="tp-header-top-pad">
            <Link href="/">
              {sticky ? (
                <>
                  <span className="logo-icon-black">Property</span>{" "}
                  <span className="logo-icon-black">La</span>
                  <Image className="logo-header" src={logoIcon} alt="PropertyLa" />
                </>
              ) : (
                <>
                  <span className="logo-icon-black">Property</span>{" "}
                  <span className="logo-icon-black">La</span>
                  <Image className="logo-header" src={logoIcon} alt="PropertyLa" />
                </>
              )}
            </Link>
          </div>
        </div>
        <div className="col-xl-6 col-lg-4 d-none d-lg-block">
          <div className="tp-header-2-menu">
            <div className="tp-main-menu d-none d-xl-block">
              <nav className="tp-mobile-menu-active">
                <NavMenus />
              </nav>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-9 col-6">
          <div className="tp-header-5-main-right d-flex align-items-center justify-content-end">
            <div
              className="tp-header-dashboard-btn d-none d-md-block d-flex align-items-center"
              style={{ marginTop: "0px" }}
            >
              <button
                className="tp-btn header-post-property-btn"
                onClick={handlePostPropertyClick}
              >
                <span className="header-post-property-text">
                  {t("header.postPropertyText")}
                </span>
                <span className="header-post-property-free">
                  {t("header.postPropertyFree")}
                </span>
              </button>
            </div>
            <LanguageSwitcher />
            {user && <NotificationBell />}
            <div className="tp-header-right-user ml-10">
              {(() => {
                return user ? (
                  <ProfileDropdown />
                ) : (
                  <div className="tp-header-right-user-icon">
                    <Link href="/sign-in">
                      <span
                        style={{
                          background: "var(--tp-theme-primary)",
                          color: "#fff",
                        }}
                      >
                        <UserSvg />
                      </span>
                    </Link>
                  </div>
                );
              })()}
            </div>
            <div className="tp-header-hamburger d-xl-none offcanvas-open-btn">
              <button
                onClick={toggleOffcanvas}
                className="hamburger-btn"
                style={{ background: "var(--tp-theme-primary)" }}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Main Header */}
      <header className={`tp-header-5-ptb p-relative ${wrapClass}`}>
        <div className="tp-header-main-sticky p-relative">
          {renderHeaderContent({ toggleOffcanvas })}
        </div>
      </header>

      {/* Sticky Header */}
      <header
        className={`tp-header-5-ptb p-relative tp-int-menu tp-header-sticky-cloned ${
          sticky ? "tp-header-pinned" : ""
        }`}
      >
        <div className="tp-header-main-sticky tp-header-5-main p-relative">
          {renderHeaderContent({ toggleOffcanvas })}
        </div>
      </header>

      {/* Offcanvas Area */}
      <OffcanvasArea />
    </>
  );
}
