import UpdatePasswordForm from "@/components/Form/UpdatePasswordForm";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Password | PropertyLa Malaysia Dashboard",
  description:
    "Update your PropertyLa account password securely. Change your password to keep your Malaysia real estate account protected.",
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
