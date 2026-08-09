import GuidedPropertyAdvisor from "@/components/Advisor/GuidedPropertyAdvisor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guided Land Advisor | Dekho Land",
  description:
    "Find better land and plot matches across India with Dekho Land's guided advisor. Get ranked listings, clear match reasons, and seller follow-up with useful context.",
};

export default function PropertyAdvisorPage() {
  return <GuidedPropertyAdvisor />;
}
