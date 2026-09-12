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
  "Find plots for sale in Andhra Pradesh and Telangana — including Hyderabad, Visakhapatnam, Vizag, Vijayawada, and Amaravati. Browse HMDA, DTCP, and RERA approved plots, farm land, and agricultural land on DekhoLand.";
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
        alt: "DekhoLand — plots for sale in Hyderabad, Telangana, and Andhra Pradesh",
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
    "plots for sale in Andhra Pradesh, plots for sale in Telangana, land for sale in Andhra Pradesh, land for sale in Telangana, plots for sale in Hyderabad, land for sale in Hyderabad, open plots for sale in Hyderabad, residential plots for sale in Hyderabad, plots for sale in Visakhapatnam, plots for sale in Vizag, plots for sale in Vijayawada, plots for sale in Amaravati, farm land for sale near Hyderabad, agricultural land for sale in Telangana, HMDA plots for sale, DTCP plots for sale, RERA approved plots for sale, gated community plots for sale, best places to buy land in Hyderabad",
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
          name: "FAQ",
          url: `${siteUrl}/faq`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 10,
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
