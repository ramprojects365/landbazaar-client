import HomeLoanCalculator from "@/components/Tools/HomeLoanCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Loan Calculator Malaysia | PropertyLa",
  description:
    "Estimate Malaysia mortgage repayments, upfront costs, stamp duty, legal fees, MRTA, MLTA, and total loan cost with PropertyLa's home loan calculator.",
  metadataBase: new URL("https://propertyla.com.my"),
  alternates: {
    canonical: "/home-loan",
  },
  openGraph: {
    title: "Home Loan Calculator Malaysia | PropertyLa",
    description: "Estimate Malaysia mortgage repayments, upfront costs, stamp duty, legal fees, MRTA, MLTA, and total loan cost with PropertyLa's home loan calculator.",
    url: "https://propertyla.com.my/home-loan",
    siteName: "PropertyLa",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Home Loan Calculator Malaysia | PropertyLa",
    description: "Estimate Malaysia mortgage repayments, upfront costs, stamp duty, legal fees, MRTA, MLTA, and total loan cost with PropertyLa's home loan calculator.",
  },
};

export default function HomeLoanPage() {
  return <HomeLoanCalculator />;
}
