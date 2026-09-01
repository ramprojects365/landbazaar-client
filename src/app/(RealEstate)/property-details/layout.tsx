import BackToTop from "@/components/Common/BackToTop";
import PropertyDetailsShell from "@/components/RealEstate/PropertyDetailsOne/PropertyDetailsShell";
import CommonFooter from "@/layouts/Footers/CommonFooter";
import CommonHeader from "@/layouts/Headers/CommonHeader";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PropertyDetailsShell>
      <CommonHeader />
      {children}
      <CommonFooter className="pt-140" />
      <BackToTop />
    </PropertyDetailsShell>
  );
}
