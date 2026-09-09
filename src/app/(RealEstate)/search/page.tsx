import DekhoLayout from "@/components/Layout/PropertyLayout";
import PropertyListing from "@/components/RealEstate/PropertyStyleOne/PropertyListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Search Lands & Plots in Hyderabad, Telangana, Visakhapatnam | Dekho Land",
  description:
    "Search plots for sale in Hyderabad, Telangana, and Andhra Pradesh. Find land for sale in Visakhapatnam, Vijayawada, and Amaravati, plus HMDA, DTCP, and RERA approved plots on Dekho Land.",
  keywords:
    "plots for sale in Hyderabad, plots for sale in Telangana, plots for sale in Andhra Pradesh, land for sale in Hyderabad, plots for sale in Visakhapatnam, plots for sale in Vizag, HMDA plots for sale, DTCP plots for sale, RERA approved plots for sale",
  metadataBase: new URL("https://www.dekholand.com"),
  alternates: {
    canonical: "/search",
  },
  openGraph: {
    title: "Search Lands & Plots in Hyderabad, Telangana, Visakhapatnam | Dekho Land",
    description: "Search plots for sale in Hyderabad, Telangana, and Andhra Pradesh. Find land for sale in Visakhapatnam, Vijayawada, and Amaravati, plus HMDA, DTCP, and RERA approved plots on Dekho Land.",
    url: "https://www.dekholand.com/search",
    siteName: "Dekho Land",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Search Lands & Plots in Hyderabad, Telangana, Visakhapatnam | Dekho Land",
    description: "Search plots for sale in Hyderabad, Telangana, and Andhra Pradesh. Find land for sale in Visakhapatnam, Vijayawada, and Amaravati, plus HMDA, DTCP, and RERA approved plots on Dekho Land.",
  },
};

export default function PropertyOne() {
  return (
    <>
      {/* property area start */}
      <DekhoLayout>
        <PropertyListing />
      </DekhoLayout>
      {/* property area end */}
    </>
  );
}
