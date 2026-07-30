import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import TrustedAgents from "@/components/TrustedAgents/TrustedAgents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Agent Details | PropertyLa Malaysia",
  description:
    "View detailed profiles of real estate agents in Malaysia. Find experienced property agents specializing in residential, commercial, and investment properties across Kuala Lumpur, Selangor, Penang and more.",
};

export default async function AgentDetails() {
  return (
    <main>
      <>
        {/* breadcrumb area */}
        <BreadcrumbArea title="Agent Details" />
        {/* breadcrumb area end */}
        <TrustedAgents />
      </>
    </main>
  );
}
