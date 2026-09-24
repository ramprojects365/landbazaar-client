"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import UserProfileSVG from "@/components/SVG/UserProfileSVG";
import { useTranslation } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/config/axios";
import { persistAuthSession } from "@/utils/auth";
import {
  DEFAULT_PROFILE_IMAGE,
  resolveProfileImageSrc,
} from "@/utils/userProfileDisplay";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { userDisplayName, user, profileImage, token, logout } = useAuth();
  const [photoFailed, setPhotoFailed] = useState(false);

  const truncateUsername = (value: string, maxLength: number, addDots: boolean = true) => {
    if (value.length <= maxLength) return value;
    return addDots ? value.slice(0, maxLength) + "…" : value.slice(0, maxLength);
  };

  // ✅ Close only when clicking OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;

      if (!dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // ⭐ IMPORTANT FIX
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    window.location.href = "/sign-in";
  };

  const displayName = (userDisplayName || user || "").trim();
  const firstName = displayName.split(/\s+/)[0] || "";
  const showPhoto = Boolean(profileImage) && !photoFailed;

  useEffect(() => {
    setPhotoFailed(false);
  }, [profileImage]);

  useEffect(() => {
    if (!token || profileImage) return undefined;

    let cancelled = false;
    apiClient
      .get("/users/profile")
      .then((response) => {
        const payload = response.data?.data ?? response.data;
        const src = resolveProfileImageSrc(
          payload?.profileImage,
          payload?.profileImageUrl,
          payload?.user?.profileImage,
          payload?.user?.profileImageUrl,
        );
        if (cancelled || src === DEFAULT_PROFILE_IMAGE) return;
        persistAuthSession({ profileImage: src });
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [token, profileImage]);

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button type="button" className="profile-btn" onClick={handleToggle}>
        <span className="Profile-btn-span" aria-label={displayName || "Logged in user"}>
          {showPhoto ? (
            <img
              src={profileImage || ""}
              alt=""
              className="header-auth-photo"
              onError={() => setPhotoFailed(true)}
            />
          ) : (
            <UserProfileSVG />
          )}
          <span className="header-auth-status-dot" aria-hidden="true" />
        </span>
        <div
          className="profile-btn-meta"
          style={{
            paddingLeft: "0px",
            paddingRight: "5px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div className="tp-header-right-user-content" style={{ margin: 0 }}>
            {displayName ? (
              <>
                <p className="hide-mobile" style={{ margin: 0 }}>
                  {truncateUsername(displayName, 4)}
                </p>
                <p className="hide-desktop header-auth-name-mobile" style={{ margin: 0 }}>
                  {truncateUsername(firstName, 8)}
                </p>
              </>
            ) : (
              <p style={{ margin: 0 }}></p>
            )}
          </div>

          <span className={`arrow ${open ? "rotate" : ""}`}>
            <i className="far fa-chevron-down" style={{ color: "#fff" }}></i>
          </span>
        </div>
      </button>

      {/* ✅ Dropdown */}
      {open && (
        <ul className="sub-menu">
          <li className="profile-dropdown__section">Manage listing</li>
          <li>
            <Link href="/dashboard/add-new-property" onClick={() => setOpen(false)}>
              <span>Add property</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/property" onClick={() => setOpen(false)}>
              <span>My properties</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/favourites" onClick={() => setOpen(false)}>
              <span>My Favourites</span>
            </Link>
          </li>
          <li className="profile-dropdown__section">Manage account</li>
          <li>
            <Link href="/dashboard/my-profile" onClick={() => setOpen(false)}>
              <span>My profile</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/update-password" onClick={() => setOpen(false)}>
              <span>Update Password</span>
            </Link>
          </li>
          <li>
            <button type="button" onClick={handleLogout}>
              <span>{t("common.logout")}</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
