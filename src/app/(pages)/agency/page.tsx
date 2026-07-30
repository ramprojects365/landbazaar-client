import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import CtaArea from "@/components/CTA/CtaArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Agencies in Malaysia | PropertyLa Agency Network",
  description:
    "Discover top real estate agencies in Malaysia on PropertyLa. Connect with professional agencies specializing in residential, commercial, and investment-property-malaysia across Kuala Lumpur, Selangor, Penang and more. Find condo-for-rent/kuala-lumpur and house-for-sale/kajang listings.",
};

export default function Agency() {
  return (
    <>
      {/* breadcrumb area */}
      <BreadcrumbArea title="Agency" />
      {/* breadcrumb area end */}

      {/* cta area */}
      <CtaArea wrapClass="tp-cta-4-ptb" />
      {/* cta area end */}
    </>
  );
}
