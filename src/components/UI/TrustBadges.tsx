"use client";

import React from "react";
import { LockKeyhole, ShieldCheck, Trophy, Users } from "lucide-react";

const badges = [
  {
    label: "Verified Agents",
    detail: "REN-focused profiles",
    icon: ShieldCheck,
  },
  {
    label: "Secure Platform",
    detail: "Protected enquiries",
    icon: LockKeyhole,
  },
  {
    label: "Top Rated",
    detail: "Trusted by buyers",
    icon: Trophy,
  },
  {
    label: "10,000+ Users",
    detail: "Growing community",
    icon: Users,
  },
];

export default function TrustBadges() {
  return (
    <div className="trust-badges">
      {badges.map(({ label, detail, icon: Icon }) => (
        <div className="trust-badge" key={label}>
          <span className="trust-badge__icon">
            <Icon size={19} strokeWidth={2.4} />
          </span>
          <span className="trust-badge__copy">
            <strong>{label}</strong>
            <small>{detail}</small>
          </span>
        </div>
      ))}
    </div>
  );
}
