import UserProfileForm from "@/components/Form/UserProfileForm";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | Dekho Land Dashboard",
  description:
    "Manage your Dekho Land profile and account settings. Update personal information, contact details, and preferences for your land marketplace account.",
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
