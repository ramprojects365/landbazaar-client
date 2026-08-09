import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import TrustedDevelopers from "@/components/TrustedDevelopers/TrustedDevelopers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trusted Developers | Dekho Land",
  description:
    "Explore trusted land and plot developers on Dekho Land. View developer profiles, logos, and project details across Hyderabad, Telangana, and India.",
  metadataBase: new URL("https://www.dekholand.com"),
  alternates: {
    canonical: "/developers",
  },
};

export default function DevelopersPage() {
  return (
    <main>
      <BreadcrumbArea title="Trusted Developers" />
      <TrustedDevelopers showViewAllLink={false} />
    </main>
  );
}
