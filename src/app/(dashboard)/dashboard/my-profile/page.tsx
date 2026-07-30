import UserProfileForm from "@/components/Form/UserProfileForm";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | PropertyLa Malaysia Dashboard",
  description:
    "Manage your PropertyLa profile and account settings. Update personal information, contact details, and preferences for your Malaysia real estate account.",
  robots: "noindex, nofollow",
};

export default function MyProfile() {
  return (
    <>
      <DashboardLayout>
        <div className="tp-dashboard-profile-wrapper">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <h5 className="tp-dashboard-new-title" style={{ margin: 0 }}>
              Account Settings
            </h5>
          </div>

          <UserProfileForm />
        </div>
      </DashboardLayout>
    </>
  );
}
