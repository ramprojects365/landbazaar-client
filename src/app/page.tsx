import Header from "@/layouts/Headers/Header";
import HomeOnePage from "./(homes)/home-one/page";
import BackToTop from "@/components/Common/BackToTop";
import Wrapper from "@/layouts/Wrapper";
import CommonFooter from "@/layouts/Footers/CommonFooter";
import { Metadata } from "next";
import HomeAdvisorPopup from "@/components/Advisor/HomeAdvisorPopup";

export const metadata: Metadata = {
  title: {
    absolute: "PropertyLa Malaysia Real Estate | Buy, Rent & Discover Property",
  },
  description:
    "PropertyLa is a Malaysia real estate platform for condos, houses, apartments, rental homes, subsale homes and verified property agents.",
  metadataBase: new URL("https://propertyla.com.my"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PropertyLa Malaysia Real Estate | Buy, Rent & Discover Property",
    description: "PropertyLa is a Malaysia real estate platform for condos, houses, apartments, rental homes, subsale homes and verified property agents.",
    url: "https://propertyla.com.my",
    siteName: "PropertyLa",
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://propertyla.com.my/assets/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PropertyLa Malaysia Real Estate Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PropertyLa Malaysia Real Estate | Buy, Rent & Discover Property",
    description: "PropertyLa is a Malaysia real estate platform for condos, houses, apartments, rental homes, subsale homes and verified property agents.",
    images: ["https://propertyla.com.my/assets/img/og-image.jpg"],
  },
  keywords: "Malaysia real estate, property for sale, property for rent, condos, apartments, houses, Kuala Lumpur, Selangor, Penang, Johor, PropertyLa",
};

const Home = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <main className="home-page">
          <HomeOnePage />
        </main>
        <BackToTop />
        <HomeAdvisorPopup />
        <CommonFooter />
      </Wrapper>
    </>
  );
};

export default Home;
