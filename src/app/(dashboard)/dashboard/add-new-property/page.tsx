import DashboardLayout from "@/layouts/DashboardLayout";
import AddPropertyMain from "./components/AddPropertyMain";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import GoogleMapsProvider from "@/components/HeroBanner/subComponents/GoogleMapsProvider";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Add New Land | Dekho Land Dashboard",
  description:
    "List your land for sale on Dekho Land. Upload details, photos, and reach thousands of buyers in Hyderabad, Telangana and across India. Easy land listing management for agents and owners.",
  robots: "noindex, nofollow",
};

export default function AddProperty() {
  return (
    <ProtectedRoute redirectTo="/dashboard/add-new-property">
      <DashboardLayout>
        <GoogleMapsProvider deferChildren>
          <Suspense
            fallback={
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status" />
              </div>
            }
          >
            <AddPropertyMain />
          </Suspense>
        </GoogleMapsProvider>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
