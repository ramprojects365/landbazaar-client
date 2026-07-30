import PropertyFitResults from "@/components/Advisor/PropertyFitResults";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Fit Tool | Find Your Perfect Property Match in Malaysia",
  description:
    "Use PropertyLa's Property Fit tool to find properties that match your specific requirements. Answer a few questions about your budget, location preferences, and property type to get personalized property recommendations in Kuala Lumpur, Selangor, Penang, Johor and nationwide.",
};

export default function PropertyFitPage() {
  return <PropertyFitResults />;
}
