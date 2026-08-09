import HomeLoanCalculator from "@/components/Tools/HomeLoanCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plot Loan & EMI Calculator India | LandWay",
  description:
    "Estimate India plot loan EMIs, upfront costs, stamp duty, legal fees, and total loan cost with LandWay India's plot loan calculator.",
  metadataBase: new URL("https://landway.com"),
  alternates: {
    canonical: "/home-loan",
  },
  openGraph: {
    title: "Plot Loan & EMI Calculator India | LandWay",
    description: "Estimate India plot loan EMIs, upfront costs, stamp duty, legal fees, and total loan cost with LandWay India's plot loan calculator.",
    url: "https://landway.com/home-loan",
    siteName: "LandWay",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Plot Loan & EMI Calculator India | LandWay",
    description: "Estimate India plot loan EMIs, upfront costs, stamp duty, legal fees, and total loan cost with LandWay India's plot loan calculator.",
  },
};

export default function HomeLoanPage() {
  return <HomeLoanCalculator />;
}
