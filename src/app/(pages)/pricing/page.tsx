import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import ContactHomeFour from "@/components/Contact/ContactHomeFour";
import CounterHomeFour from "@/components/Counter/CounterHomeFour";
import PricingPlanTwo from "@/components/Pricing/PricingPlanTwo";
import ProgressArea from "@/components/Progress/ProgressArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PropertyLa Pricing Plans | Real Estate Advertising Rates in Malaysia",
  description:
    "View PropertyLa's affordable pricing plans for property listings and advertising in Malaysia. Choose the best package for selling, renting, or promoting your real estate properties.",
  metadataBase: new URL("https://propertyla.com.my"),
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "PropertyLa Pricing Plans | Real Estate Advertising Rates in Malaysia",
    description: "View PropertyLa's affordable pricing plans for property listings and advertising in Malaysia. Choose the best package for selling, renting, or promoting your real estate properties.",
    url: "https://propertyla.com.my/pricing",
    siteName: "PropertyLa",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "PropertyLa Pricing Plans | Real Estate Advertising Rates in Malaysia",
    description: "View PropertyLa's affordable pricing plans for property listings and advertising in Malaysia. Choose the best package for selling, renting, or promoting your real estate properties.",
  },
};

export default function Pricing() {
  return (
    <>
      {/* breadcrumb area */}
      <BreadcrumbArea title="Pricing table" />
      {/* breadcrumb area end */}

      {/* counter area start */}
      <CounterHomeFour />
      {/* counter area end */}

      {/* pricing area */}
      <PricingPlanTwo />
      {/* pricing area end */}

      {/* progress area */}
      {/* <ProgressArea paddingTopCls="pt-130" paddingBottomCls="" /> */}
      {/* progress area end */}

      {/* get in touch area */}
      <ContactHomeFour />
      {/* get in touch area end */}
    </>
  );
}
