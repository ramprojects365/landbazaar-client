import Header from "@/layouts/Headers/Header";
import HomeOnePage from "./(homes)/home-one/page";
import BackToTop from "@/components/Common/BackToTop";
import Wrapper from "@/layouts/Wrapper";
import CommonFooter from "@/layouts/Footers/CommonFooter";
import { Metadata } from "next";
import HomeAdvisorPopup from "@/components/Advisor/HomeAdvisorPopup";

const siteTitle = "DekhoLand | Buy & Sell Verified Lands and Plots";
const siteDescription =
  "India's trusted marketplace for lands and plots. Buy or sell open plots, farm land, and agricultural land with Dekho Land.";
const siteImage = "https://www.dekholand.com/assets/img/logo/logo-blue.png";

export const metadata: Metadata = {
  title: {
    absolute: siteTitle,
  },
  description: siteDescription,
  metadataBase: new URL("https://www.dekholand.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://www.dekholand.com",
    siteName: "DekhoLand",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: siteImage,
        width: 512,
        height: 512,
        alt: "DekhoLand — verified lands and plots marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [siteImage],
  },
  keywords:
    "DekhoLand, India land, plots for sale, verified land, agricultural land, farmland, buy land India, sell land India, Telangana land, Hyderabad plots",
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
