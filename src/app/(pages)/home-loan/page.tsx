import HomeLoanCalculator from "@/components/Tools/HomeLoanCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Loan Calculator Malaysia | LandWay",
  description:
    "Estimate Malaysia mortgage repayments, upfront costs, stamp duty, legal fees, MRTA, MLTA, and total loan cost with LandWay's home loan calculator.",
  metadataBase: new URL("https://landway.com"),
  alternates: {
    canonical: "/home-loan",
  },
  openGraph: {
    title: "Home Loan Calculator Malaysia | LandWay",
    description: "Estimate Malaysia mortgage repayments, upfront costs, stamp duty, legal fees, MRTA, MLTA, and total loan cost with LandWay's home loan calculator.",
    url: "https://landway.com/home-loan",
    siteName: "LandWay",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Home Loan Calculator Malaysia | LandWay",
    description: "Estimate Malaysia mortgage repayments, upfront costs, stamp duty, legal fees, MRTA, MLTA, and total loan cost with LandWay's home loan calculator.",
  },
};

export default function HomeLoanPage() {
  return <HomeLoanCalculator />;
}
