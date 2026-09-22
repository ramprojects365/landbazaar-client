"use client";

import { BadgeCheck } from "lucide-react";

type PropertyVerifiedBadgeProps = {
  verified?: boolean;
};

export default function PropertyVerifiedBadge({
  verified,
}: PropertyVerifiedBadgeProps) {
  if (!verified) return null;

  return (
    <span className="property-verified-badge" title="Verified listing">
      <BadgeCheck size={14} strokeWidth={2.4} aria-hidden="true" />
      Verified
    </span>
  );
}
