import HomeLoanCalculator from "@/components/Tools/HomeLoanCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plot Loan & EMI Calculator India | Dekho Land",
  description:
    "Estimate India plot loan EMIs, upfront costs, stamp duty, legal fees, and total loan cost with Dekho Land's plot loan calculator.",
  metadataBase: new URL("https://www.dekholand.com"),
  alternates: {
    canonical: "/home-loan",
  },
  openGraph: {
    title: "Plot Loan & EMI Calculator India | Dekho Land",
    description: "Estimate India plot loan EMIs, upfront costs, stamp duty, legal fees, and total loan cost with Dekho Land's plot loan calculator.",
    url: "https://www.dekholand.com/home-loan",
    siteName: "Dekho Land",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Plot Loan & EMI Calculator India | Dekho Land",
    description: "Estimate India plot loan EMIs, upfront costs, stamp duty, legal fees, and total loan cost with Dekho Land's plot loan calculator.",
  },
};

export default function HomeLoanPage() {
  return <HomeLoanCalculator />;
}
