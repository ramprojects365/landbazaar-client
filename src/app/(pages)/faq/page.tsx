import FaqArea from "@/components/FAQ/FaqArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | LandWay Malaysia Real Estate",
  description:
    "Find answers to common questions about buying, selling, and renting properties in Malaysia. Learn about LandWay's services, property search, agent verification, and real estate transactions. Explore condo-for-rent/kuala-lumpur, apartment-for-rent/selangor, and new-property-malaysia options.",
  metadataBase: new URL("https://landway.com"),
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | LandWay Malaysia Real Estate",
    description: "Find answers to common questions about buying, selling, and renting properties in Malaysia. Learn about LandWay's services, property search, agent verification, and real estate transactions.",
    url: "https://landway.com/faq",
    siteName: "LandWay",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Frequently Asked Questions | LandWay Malaysia Real Estate",
    description: "Find answers to common questions about buying, selling, and renting properties in Malaysia. Learn about LandWay's services, property search, agent verification, and real estate transactions.",
  },
};

export default function Faq() {
  return (
    <>
      {/* faq area start */}
      <FaqArea />
      {/* faq area end */}
    </>
  );
}
