import DekhoLayout from "@/components/Layout/PropertyLayout";
import PropertyListing from "@/components/RealEstate/PropertyStyleOne/PropertyListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Search Plots & Farmlands - DekhoLand",
  },
  description:
    "Search plots and farmlands for sale across Hyderabad, Telangana, and Andhra Pradesh. Find residential plots, open plots, HMDA plots, farm land near Hyderabad, and agricultural land on DekhoLand.",
  keywords:
    "plots for sale in Hyderabad, open plots for sale in Hyderabad, farm land for sale near Hyderabad, agricultural land for sale in Telangana, HMDA plots for sale, gated community plots for sale",
  metadataBase: new URL("https://www.dekholand.com"),
  alternates: {
    canonical: "/plots",
  },
  openGraph: {
    title: "Search Plots & Farmlands - DekhoLand",
    description:
      "Search plots and farmlands for sale across Hyderabad, Telangana, and Andhra Pradesh. Find residential plots, open plots, HMDA plots, farm land near Hyderabad, and agricultural land on DekhoLand.",
    url: "https://www.dekholand.com/plots",
    siteName: "DekhoLand",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Search Plots & Farmlands - DekhoLand",
    description:
      "Search plots and farmlands for sale across Hyderabad, Telangana, and Andhra Pradesh. Find residential plots, open plots, HMDA plots, farm land near Hyderabad, and agricultural land on DekhoLand.",
  },
};

export default function PlotsPage() {
  return (
    <DekhoLayout>
      <PropertyListing />
    </DekhoLayout>
  );
}
