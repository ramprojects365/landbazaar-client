import Header from "@/layouts/Headers/Header";
import HomeOnePage from "./(homes)/home-one/page";
import BackToTop from "@/components/Common/BackToTop";
import Wrapper from "@/layouts/Wrapper";
import CommonFooter from "@/layouts/Footers/CommonFooter";
import { Metadata } from "next";
import HomeAdvisorPopup from "@/components/Advisor/HomeAdvisorPopup";

export const metadata: Metadata = {
  title: {
    absolute: "Dekho Land | Buy & Sell Lands and Plots",
  },
  description:
    "Dekho Land is India's premier platform for buying and selling lands, plots, agricultural land, and farmland. Connect with verified sellers and find your perfect plot.",
  metadataBase: new URL("https://www.dekholand.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dekho Land | Buy & Sell Lands and Plots",
    description: "Dekho Land is India's premier platform for buying and selling lands, plots, agricultural land, and farmland. Connect with verified sellers and find your perfect plot.",
    url: "https://www.dekholand.com",
    siteName: "Dekho Land",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://www.dekholand.com/assets/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dekho Land Land & Plats Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dekho Land | Buy & Sell Lands and Plots",
    description: "Dekho Land is India's premier platform for buying and selling lands, plots, agricultural land, and farmland. Connect with verified sellers and find your perfect plot.",
    images: ["https://www.dekholand.com/assets/img/og-image.jpg"],
  },
  keywords: "India land, plots for sale, agricultural land, farmland, buy land India, sell land India, Telangana land, Hyderabad plots, Dekho Land",
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
