import RealestateAboutArea from "@/components/PropertyFeature/RealestateAboutArea";
import AboutTestimonial from "@/components/Testimonial/AboutTestimonial";
import AboutHomeFive from "@/components/About/ReusableAboutArea";
import AboutPointArea from "@/components/About/AboutPointArea";
import ContactArea from "@/components/Contact/ContactArea";
import { Metadata } from "next";
import "./about-page.scss";

const aboutTitle = "About DekhoLand | Verified Lands & Plots Marketplace";
const aboutDescription =
  "DekhoLand is transforming how people buy and sell real estate across India. Connect with verified land sellers, explore residential, commercial, and agricultural land, and buy or sell with confidence.";

export const metadata: Metadata = {
  title: aboutTitle,
  description: aboutDescription,
  metadataBase: new URL("https://www.dekholand.com"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: aboutTitle,
    description: aboutDescription,
    url: "https://www.dekholand.com/about",
    siteName: "DekhoLand",
    type: "website",
    images: [
      {
        url: "https://www.dekholand.com/assets/img/logo/logo-blue.png",
        width: 512,
        height: 512,
        alt: "DekhoLand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: aboutTitle,
    description: aboutDescription,
    images: ["https://www.dekholand.com/assets/img/logo/logo-blue.png"],
  },
};

export default function About() {
  return (
    <main className="about-page">
      <AboutHomeFive />
      <AboutPointArea />
      <RealestateAboutArea />
      <AboutTestimonial />
      <ContactArea btnClass="tp-countact-btn" />
    </main>
  );
}
