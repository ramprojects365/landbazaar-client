import RealestateAboutArea from "@/components/PropertyFeature/RealestateAboutArea";
import AboutTestimonial from "@/components/Testimonial/AboutTestimonial";
import AboutHomeFive from "@/components/About/ReusableAboutArea";
import AboutPointArea from "@/components/About/AboutPointArea";
import ContactArea from "@/components/Contact/ContactArea";
import { Metadata } from "next";
import "./about-page.scss";

const aboutTitle = "About DekhoLand - Why Choose Us";
const aboutDescription =
  "DekhoLand helps you find plots for sale in Andhra Pradesh and Telangana, including Hyderabad, Visakhapatnam, Vizag, Vijayawada, and Amaravati. Browse HMDA, DTCP, and RERA approved plots, farm land, and agricultural land with verified sellers.";

export const metadata: Metadata = {
  title: {
    absolute: aboutTitle,
  },
  description: aboutDescription,
  keywords:
    "plots for sale in Andhra Pradesh, plots for sale in Telangana, plots for sale in Hyderabad, plots for sale in Visakhapatnam, HMDA plots for sale, agricultural land for sale in Telangana",
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
        alt: "DekhoLand — plots for sale in Hyderabad, Telangana, and Andhra Pradesh",
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
