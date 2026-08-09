import Dekho Landyout from "@/components/Layout/Dekho Landyout";
import PropertyListing from "@/components/RealEstate/PropertyStyleOne/PropertyListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Search Lands & Plots in Hyderabad, Telangana, Visakhapatnam | Dekho Land",
  description:
    "Search lands and plots for sale and lease across India. Find residential plots, agricultural land, farm land, and commercial land in Hyderabad, Telangana, Visakhapatnam and beyond. Filter by location, price, and land type on Dekho Land.",
  metadataBase: new URL("https://www.dekholand.com"),
  alternates: {
    canonical: "/search",
  },
  openGraph: {
    title: "Search Lands & Plots in Hyderabad, Telangana, Visakhapatnam | Dekho Land",
    description: "Search lands and plots for sale and lease across India. Find residential plots, agricultural land, farm land, and commercial land in Hyderabad, Telangana, Visakhapatnam and beyond.",
    url: "https://www.dekholand.com/search",
    siteName: "Dekho Land",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Search Lands & Plots in Hyderabad, Telangana, Visakhapatnam | Dekho Land",
    description: "Search lands and plots for sale and lease across India. Find residential plots, agricultural land, farm land, and commercial land in Hyderabad, Telangana, Visakhapatnam and beyond.",
  },
};

export default function PropertyOne() {
  return (
    <>
      {/* property area start */}
      <Dekho Landyout>
        <PropertyListing />
      </Dekho Landyout>
      {/* property area end */}
    </>
  );
}
