"use client";

import logoIcon from "../../../public/assets/img/logo/logo-icon-blue.png";
import OffcanvasArea from "../../components/OffCanvas/OffcanvasArea";
import UserSvg from "@/components/SVG/UserSvg";
import useGlobalContext from "@/hooks/useContext";
import NavMenus from "../subComponents/NavMenus";
import useSticky from "@/hooks/useSticky";
import ProfileDropdown from "./ProfileDropdown";
import Image from "next/image";
import Link from "next/link";
import SignInForm from "@/components/Form/auth/SignInForm";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import NotificationBell from "@/components/Notifications/NotificationBell";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardHeader() {
  const { toggleOffcanvas } = useGlobalContext();
  const { sticky } = useSticky();
  const { user } = useAuth();

  const renderHeaderContent = () => (
    <div className="container-fluid">
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
        <div className="col-xl-7 col-lg-4 d-none d-lg-block">
          <div className="tp-header-dashboard-menu d-flex justify-content-center">
            <div className="tp-main-menu d-none d-xl-block">
              <nav className="tp-mobile-menu-active">
                <NavMenus />
              </nav>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-9 col-6">
          <div className="tp-header-dashboard-main-right d-flex align-items-center justify-content-end">
            <LanguageSwitcher />
            <NotificationBell />
            <div className="tp-header-right-user ml-10">
              {(() => {
                return user ? (
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
      {/* off canvas */}
      <OffcanvasArea />

      {/* header area start */}
      <header className="tp-header-dashboard-ptb p-relative">
        <div className="tp-header-main-sticky p-relative">
          {renderHeaderContent()}
        </div>
      </header>
      <header
        className={`tp-header-2-ptb p-relative tp-int-menu tp-header-sticky-cloned ${
          sticky ? "tp-header-pinned" : ""
        }`}
      >
        <div className="tp-header-main-sticky tp-header-5-main p-relative">
          {renderHeaderContent()}
        </div>
      </header>
      {/* header area end */}

      {/* modal area start */}
      <div className="tp-modal-box">
        <div
          className="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="tp-sign-in-register-box p-relative text-center">
                <div className="tp-sign-in-register-heading mb-30">
                  <h4 className="tp-sign-in-register-title">Welcome</h4>
                  <p>Enter your credentials to access your account.</p>
                </div>
                <div className="tp-sign-in-input-form">
                  <SignInForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal area end */}
    </>
  );
}
