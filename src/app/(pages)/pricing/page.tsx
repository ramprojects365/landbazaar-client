import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import ContactHomeFour from "@/components/Contact/ContactHomeFour";
import CounterHomeFour from "@/components/Counter/CounterHomeFour";
import PricingPlanTwo from "@/components/Pricing/PricingPlanTwo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LandWay Pricing Plans | Real Estate Advertising Rates in Malaysia",
  description:
    "View LandWay's affordable pricing plans for property listings and advertising in Malaysia. Choose the best package for selling, renting, or promoting your real estate properties.",
  metadataBase: new URL("https://landway.com"),
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "LandWay Pricing Plans | Real Estate Advertising Rates in Malaysia",
    description: "View LandWay's affordable pricing plans for property listings and advertising in Malaysia. Choose the best package for selling, renting, or promoting your real estate properties.",
    url: "https://landway.com/pricing",
    siteName: "LandWay",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "LandWay Pricing Plans | Real Estate Advertising Rates in Malaysia",
    description: "View LandWay's affordable pricing plans for property listings and advertising in Malaysia. Choose the best package for selling, renting, or promoting your real estate properties.",
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
