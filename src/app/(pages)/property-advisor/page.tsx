import GuidedPropertyAdvisor from "@/components/Advisor/GuidedPropertyAdvisor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guided Land Advisor | LandWay India",
  description:
    "Find better land and plot matches across India with LandWay India's guided advisor. Get ranked listings, clear match reasons, and seller follow-up with useful context.",
};

export default function PropertyAdvisorPage() {
  return <GuidedPropertyAdvisor />;
}
