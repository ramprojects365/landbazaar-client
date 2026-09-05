import { ReactNode } from "react";
import Sidebar from "./subComponents/DashboardSidebar";
import DashboardHeader from "./Headers/DashboardHeader";
import CommonFooter from "./Footers/CommonFooter";
import Wrapper from "./Wrapper";
import BackToTop from "@/components/Common/BackToTop";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Wrapper>
        <DashboardHeader />
        {/* Header is included here */}
        <main>
          <div className="tp-dashboard-wrapper">
            {/* Sidebar */}
            <Sidebar />
            {/* Page Content */}
            <div className="tp-dashboard-main">{children}</div>
          </div>
        </main>
        <div className="tp-dashboard-footer-wrap">
          <CommonFooter className="pt-50" />
        </div>
        <BackToTop />
      </Wrapper>
    </>
  );
}
