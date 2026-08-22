"use client";
import Image from "next/image";
import React from "react";
import logoWhite from "../../../public/assets/img/logo/logo-white.png";
import logoBlue from "../../../public/assets/img/logo/logo-blue.png";
import ProfileDropdown from "./ProfileDropdown";
import OffcanvasArea from "../../components/OffCanvas/OffcanvasArea";
import useGlobalContext from "@/hooks/useContext";
import NavMenus from "../subComponents/NavMenus";
import UserSvg from "@/components/SVG/UserSvg";
import useSticky from "@/hooks/useSticky";
import Link from "next/link";
import { requireAuth } from "@/utils/auth";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "@/contexts/LanguageContext";
import NotificationBell from "@/components/Notifications/NotificationBell";
import { useAuth } from "@/hooks/useAuth";

type LogoVariant = "white" | "blue";

export default function HeaderOne() {
  const { toggleOffcanvas } = useGlobalContext();
  const { sticky } = useSticky();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  const handlePostPropertyClick = () => {
    const isAuthenticated = requireAuth("/dashboard/add-new-property");
    if (isAuthenticated) {
      window.location.href = "/dashboard/add-new-property";
    }
  };

  const renderHeaderContent = (logoVariant: LogoVariant = "white") => (
    <div className="container container-large">
      <div className="row align-items-center">
        <div className="col-xl-2 col-lg-4 col-md-3 col-7">
          <div className="tp-header-top-pad">
            <Link
              href="/"
              className="logo-header-link"
              aria-label="Dekho Land home"
            >
              <Image
                className={`logo-header logo-header--${logoVariant}`}
                src={logoVariant === "white" ? logoWhite : logoBlue}
                alt="Dekho Land"
                priority
              />
            </Link>
          </div>
        </div>
        <div className="col-xl-6 col-lg-4 d-none d-lg-block">
          <div className="tp-header-1-menu">
            <div className="tp-main-menu d-none d-xl-block">
              <nav>
                <NavMenus />
              </nav>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-lg-2 col-md-4 d-none d-md-flex align-items-center justify-content-center">
          <div
            className="tp-header-dashboard-btn d-none d-md-block"
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
        </div>
        <div className="col-xl-2 col-lg-2 col-md-5 col-5">
          <div className="tp-header-main-right d-flex align-items-center justify-content-end">
            <LanguageSwitcher />
            {isAuthenticated && <NotificationBell />}
            <div className="tp-header-right-user d-md-flex align-items-center">
              {(() => {
                return isAuthenticated ? (
                  <ProfileDropdown />
                ) : (
                  <div className="tp-header-right-user-icon">
                    <Link href="/sign-in">
                      <span>
                        <UserSvg />
                      </span>
                    </Link>
                  </div>
                );
              })()}

              <div
                className="tp-header-right-user-content d-show"
                style={{ paddingLeft: "5px" }}
              >
                {(() => {
                  return isAuthenticated ? null : <p>{t("header.hiSignIn")}</p>;
                })()}
              </div>
            </div>
            <div className="tp-header-hamburger d-xl-none offcanvas-open-btn">
              <button onClick={toggleOffcanvas} className="hamburger-btn">
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
      <header className="tp-header-1-ptb tp-header-transparent top p-relative">
        <div className="tp-header-main-sticky p-relative">
          {renderHeaderContent("white")}
        </div>
      </header>
      <header
        className={`tp-header-1-ptb p-relative tp-int-menu tp-header-sticky-cloned ${
          sticky ? "tp-header-pinned" : ""
        }`}
      >
        <div className="tp-header-main-sticky tp-header-1-main p-relative">
          {renderHeaderContent("blue")}
        </div>
      </header>
      {/* Offcanvas Area */}
      <OffcanvasArea />
    </>
  );
}
