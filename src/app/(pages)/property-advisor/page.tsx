import GuidedPropertyAdvisor from "@/components/Advisor/GuidedPropertyAdvisor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guided Property Advisor | PropertyLa",
  description:
    "Find better Malaysia property matches with PropertyLa's guided advisor. Get ranked listings, clear match reasons, and agent follow-up with useful context.",
};

export default function PropertyAdvisorPage() {
  return <GuidedPropertyAdvisor />;
}
