"use client";

import React from "react";
import { BadgeCheck } from "lucide-react";

type PropertyVerifiedBadgeProps = {
  verified?: boolean | string | number | null;
  className?: string;
  style?: React.CSSProperties;
};

export default function PropertyVerifiedBadge({
  verified,
  className = "",
  style,
}: PropertyVerifiedBadgeProps) {
  const isVerified =
    verified === true ||
    verified === 1 ||
    (typeof verified === "string" &&
      ["true", "1", "yes", "verified", "approved"].includes(
        verified.trim().toLowerCase(),
      ));

  if (!isVerified) return null;

  return (
    <span
      className={`property-verified-badge${className ? ` ${className}` : ""}`}
      style={style}
      title="Verified listing by Dekho Land admin"
    >
      <BadgeCheck size={14} strokeWidth={2.4} aria-hidden="true" />
      Verified
    </span>
  );
}
