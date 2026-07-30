import RealestateAboutArea from "@/components/PropertyFeature/RealestateAboutArea";
import AboutTestimonial from "@/components/Testimonial/AboutTestimonial";
import AboutHomeFive from "@/components/About/ReusableAboutArea";
import AboutPointArea from "@/components/About/AboutPointArea";
import ContactArea from "@/components/Contact/ContactArea";
import { Metadata } from "next";
import "./about-page.scss";

export const metadata: Metadata = {
  title:
    "About PropertyLa | Malaysia's Premier Real Estate Platform for Rentals & Sales",
  description:
    "Discover PropertyLa, Malaysia's leading real estate platform for apartments, condos, landed houses, and bungalows. We serve Kuala Lumpur, Selangor, Penang, Johor, Cheras and nationwide. Explore new-property-malaysia listings and investment-property-malaysia opportunities. Your trusted alternative to iProperty and PropertyGuru for Malaysian property market.",
  metadataBase: new URL("https://propertyla.com.my"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About PropertyLa | Malaysia's Premier Real Estate Platform",
    description: "Discover PropertyLa, Malaysia's leading real estate platform for apartments, condos, landed houses, and bungalows across Kuala Lumpur, Selangor, Penang, Johor and nationwide.",
    url: "https://propertyla.com.my/about",
    siteName: "PropertyLa",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About PropertyLa | Malaysia's Premier Real Estate Platform",
    description: "Discover PropertyLa, Malaysia's leading real estate platform for apartments, condos, landed houses, and bungalows across Kuala Lumpur, Selangor, Penang, Johor and nationwide.",
  },
};

export default function About() {
  return (
    <main className="about-page">
      {/* about area */}
      <AboutHomeFive />
      {/* about area end */}
      {/* about point area */}
      <AboutPointArea />
      {/* about point area end */}
      {/* realestate area */}
      <RealestateAboutArea />
      {/* realestate area end */}
      {/* testimonial area */}
      <AboutTestimonial />
      {/* testimonial area end */}
      {/* contact area */}
      <ContactArea btnClass="tp-countact-btn" />
      {/* contact area end */}
    </main>
  );
}
