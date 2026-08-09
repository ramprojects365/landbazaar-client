import UpdatePasswordForm from "@/components/Form/UpdatePasswordForm";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Password | LandWay India Dashboard",
  description:
    "Update your LandWay India account password securely. Change your password to keep your land marketplace account protected.",
  robots: "noindex, nofollow",
};

export default function UpdatePassword() {
  return (
    <>
      <DashboardLayout>
        <div className="tp-dashboard-profile-wrapper">
          <UpdatePasswordForm />
        </div>
      </DashboardLayout>
    </>
  );
}
