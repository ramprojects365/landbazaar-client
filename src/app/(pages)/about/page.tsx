import RealestateAboutArea from "@/components/PropertyFeature/RealestateAboutArea";
import AboutTestimonial from "@/components/Testimonial/AboutTestimonial";
import AboutHomeFive from "@/components/About/ReusableAboutArea";
import AboutPointArea from "@/components/About/AboutPointArea";
import ContactArea from "@/components/Contact/ContactArea";
import { Metadata } from "next";
import "./about-page.scss";

export const metadata: Metadata = {
  title:
    "About Dekho Land | India's Trusted Platform to Buy & Sell Lands and Plots",
  description:
    "Dekho Land is India's trusted land marketplace for buying and selling open plots, agricultural lands, commercial lands, farm lands, and gated community plots. Every listing is verified before it goes live.",
  metadataBase: new URL("https://www.dekholand.com"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title:
      "About Dekho Land | India's Trusted Platform to Buy & Sell Lands and Plots",
    description:
      "Buy and sell verified lands and plots across India — residential plots, agricultural lands, commercial lands, and gated community projects.",
    url: "https://www.dekholand.com/about",
    siteName: "Dekho Land",
    type: "website",
  },
  twitter: {
    card: "summary",
    title:
      "About Dekho Land | India's Trusted Platform to Buy & Sell Lands and Plots",
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
