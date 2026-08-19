import DekhoLayout from "@/components/Layout/PropertyLayout";
import PropertyListing from "@/components/RealEstate/PropertyStyleOne/PropertyListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Search Plots & Farmlands - DekhoLand",
  },
  description:
    "Search plots and farmlands for sale and lease across India. Find residential plots, agricultural land, farm land, and commercial land in Hyderabad, Telangana, Visakhapatnam and beyond.",
  metadataBase: new URL("https://www.dekholand.com"),
  alternates: {
    canonical: "/plots",
  },
  openGraph: {
    title: "Search Plots & Farmlands - DekhoLand",
    description:
      "Search plots and farmlands for sale and lease across India. Find residential plots, agricultural land, farm land, and commercial land in Hyderabad, Telangana, Visakhapatnam and beyond.",
    url: "https://www.dekholand.com/plots",
    siteName: "DekhoLand",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Search Plots & Farmlands - DekhoLand",
    description:
      "Search plots and farmlands for sale and lease across India. Find residential plots, agricultural land, farm land, and commercial land in Hyderabad, Telangana, Visakhapatnam and beyond.",
  },
};

export default function PlotsPage() {
  return (
    <DekhoLayout>
      <PropertyListing />
    </DekhoLayout>
  );
}
