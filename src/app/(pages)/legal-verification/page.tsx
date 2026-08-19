import { Metadata } from "next";
import LegalVerificationContent from "../services/legal-verification/LegalVerificationContent";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dekholand.com"),
  title: {
    absolute: "Land Verification Guide - DekhoLand",
  },
  description:
    "Complete legal verification and due diligence guide for buying plots and farmland in Hyderabad and Telangana. Cover chain of title, Dharani records, encumbrance certificates, HMDA/DTCP approvals, TSRERA, and written legal opinion.",
  keywords:
    "legal verification Hyderabad property, property due diligence Telangana, chain of title Hyderabad, encumbrance certificate Telangana, HMDA DTCP layout approval, TSRERA registration, legal opinion report land purchase, Shankarpally plots, Shadnagar land, Narayankhed farmland",
  alternates: {
    canonical: "/legal-verification",
  },
  openGraph: {
    title: "Land Verification Guide - DekhoLand",
    description:
      "A 6-step legal due diligence guide covering title history, Dharani records, EC audit, layout approvals, physical survey, and litigation search before buying land in Hyderabad.",
    url: "https://www.dekholand.com/legal-verification",
    siteName: "DekhoLand",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Land Verification Guide - DekhoLand",
    description:
      "A 6-step legal due diligence guide covering title history, Dharani records, EC audit, layout approvals, physical survey, and litigation search before buying land in Hyderabad.",
  },
};

export default LegalVerificationContent;
