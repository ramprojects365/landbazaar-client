import PropertyFitResults from "@/components/Advisor/PropertyFitResults";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Land Fit Tool | Find Your Perfect Plot Match in India | Dekho Land",
  description:
    "Use Dekho Land's Land Fit tool to find lands and plots that match your requirements. Answer a few questions about budget, location, and land preferences for personalized recommendations in Hyderabad, Telangana, Visakhapatnam and nationwide.",
};

export default function PropertyFitPage() {
  return <PropertyFitResults />;
}
