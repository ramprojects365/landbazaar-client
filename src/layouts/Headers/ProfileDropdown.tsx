"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserProfileSVG from "@/components/SVG/UserProfileSVG";
import { useTranslation } from "@/contexts/LanguageContext";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t } = useTranslation();

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
    localStorage.removeItem("authToken");
    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginUserDisplayName");
    localStorage.removeItem("loginUserType");
    window.dispatchEvent(new Event("propertyla-auth-changed"));
    setOpen(false);
    router.push("/sign-in");
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button type="button" className="profile-btn" onClick={handleToggle}>
        <span className="Profile-btn-span" aria-label="Logged in user">
          <UserProfileSVG />
          <span
            style={{
              position: "absolute",
              right: -1,
              bottom: -1,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22C55E",
              border: "1.5px solid #003B5C",
            }}
            aria-hidden="true"
          />
        </span>
        <div
          style={{
            paddingLeft: "0px",
            paddingRight: "5px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div className="tp-header-right-user-content" style={{ margin: 0 }}>
            {(() => {
              const displayName =
                typeof window !== "undefined"
                  ? localStorage.getItem("loginUserDisplayName") ||
                    localStorage.getItem("loginUser")
                  : null;

              return displayName ? (
                <>
                  <p className="hide-mobile" style={{ margin: 0 }}>{`${truncateUsername(displayName, 4)}`}</p>
                  <p className="hide-desktop" style={{ margin: 0 }}>{`${truncateUsername(displayName, 3, false)}`}</p>
                </>
              ) : (
                <p style={{ margin: 0 }}></p>
              );
            })()}
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
              <span>Add new property</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/property" onClick={() => setOpen(false)}>
              <span>My properties</span>
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
