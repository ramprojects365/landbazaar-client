"use client";

import Link from "next/link";
import UserSvg from "@/components/SVG/UserSvg";
import { useTranslation } from "@/contexts/LanguageContext";

type HeaderAuthGuestProps = {
  iconTone?: "default" | "primary";
};

export default function HeaderAuthGuest({
  iconTone = "default",
}: HeaderAuthGuestProps) {
  const { t } = useTranslation();

  return (
    <div className="header-auth-guest">
      <Link
        href="/sign-in"
        className="header-auth-guest__link"
        aria-label={t("header.signIn")}
      >
        <span
          className={`header-auth-guest__icon${iconTone === "primary" ? " header-auth-guest__icon--primary" : ""}`}
        >
          <UserSvg />
        </span>
        <span className="header-auth-guest__label">{t("header.signIn")}</span>
      </Link>
    </div>
  );
}
