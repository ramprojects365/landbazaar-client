import PropertyLayout from "@/components/Layout/PropertyLayout";
import PropertyListing from "@/components/RealEstate/PropertyStyleOne/PropertyListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Search Lands & Plots in Hyderabad, Telangana, Visakhapatnam | LandWay India",
  description:
    "Search lands and plots for sale and lease across India. Find residential plots, agricultural land, farm land, and commercial land in Hyderabad, Telangana, Visakhapatnam and beyond. Filter by location, price, and land type on LandWay India.",
  metadataBase: new URL("https://landway.com"),
  alternates: {
    canonical: "/search",
  },
  openGraph: {
    title: "Search Lands & Plots in Hyderabad, Telangana, Visakhapatnam | LandWay India",
    description: "Search lands and plots for sale and lease across India. Find residential plots, agricultural land, farm land, and commercial land in Hyderabad, Telangana, Visakhapatnam and beyond.",
    url: "https://landway.com/search",
    siteName: "LandWay",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Search Lands & Plots in Hyderabad, Telangana, Visakhapatnam | LandWay India",
    description: "Search lands and plots for sale and lease across India. Find residential plots, agricultural land, farm land, and commercial land in Hyderabad, Telangana, Visakhapatnam and beyond.",
  },
};

export default function PropertyOne() {
  return (
    <>
      {/* property area start */}
      <PropertyLayout>
        <PropertyListing />
      </PropertyLayout>
      {/* property area end */}
    </>
  );
}
