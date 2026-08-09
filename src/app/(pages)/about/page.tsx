import RealestateAboutArea from "@/components/PropertyFeature/RealestateAboutArea";
import AboutTestimonial from "@/components/Testimonial/AboutTestimonial";
import AboutHomeFive from "@/components/About/ReusableAboutArea";
import AboutPointArea from "@/components/About/AboutPointArea";
import ContactArea from "@/components/Contact/ContactArea";
import { Metadata } from "next";
import "./about-page.scss";

export const metadata: Metadata = {
  title:
    "About LandWay | India's Trusted Platform to Buy & Sell Lands and Plots",
  description:
    "LandWay is India's trusted land marketplace for buying and selling open plots, agricultural lands, commercial lands, farm lands, and gated community plots. Every listing is verified before it goes live.",
  metadataBase: new URL("https://landway.com"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title:
      "About LandWay | India's Trusted Platform to Buy & Sell Lands and Plots",
    description:
      "Buy and sell verified lands and plots across India — residential plots, agricultural lands, commercial lands, and gated community projects.",
    url: "https://landway.com/about",
    siteName: "LandWay",
    type: "website",
  },
  twitter: {
    card: "summary",
    title:
      "About LandWay | India's Trusted Platform to Buy & Sell Lands and Plots",
    description:
      "India's trusted website for verified land and plot listings. Buy and sell with confidence.",
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
