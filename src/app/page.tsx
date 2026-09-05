import Header from "@/layouts/Headers/Header";
import HomeOnePage from "./(homes)/home-one/page";
import BackToTop from "@/components/Common/BackToTop";
import Wrapper from "@/layouts/Wrapper";
import CommonFooter from "@/layouts/Footers/CommonFooter";
import { Metadata } from "next";
import HomeAdvisorPopup from "@/components/Advisor/HomeAdvisorPopup";
import { landTypeSearchHref } from "@/config/landOptions";

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

const siteUrl = "https://www.dekholand.com";

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "DekhoLand",
      url: siteUrl,
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#navigation`,
      name: "Main navigation",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "Residential",
          url: `${siteUrl}/search`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "Commercial",
          url: `${siteUrl}${landTypeSearchHref("Commercial Plot")}`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Farm",
          url: `${siteUrl}${landTypeSearchHref("Agricultural Land")}`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "Services",
          url: `${siteUrl}/services`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 5,
          name: "Plots",
          url: `${siteUrl}/plots`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 6,
          name: "Blog",
          url: `${siteUrl}/blog`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 7,
          name: "About",
          url: `${siteUrl}/about`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 8,
          name: "Contact",
          url: `${siteUrl}/contact`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 9,
          name: "Add Property",
          url: `${siteUrl}/add-property`,
        },
      ],
    },
  ],
};

const Home = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData).replace(/</g, "\\u003c"),
        }}
      />
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
