import DashboardLayout from "@/layouts/DashboardLayout";
import AddPropertyMain from "./components/AddPropertyMain";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Property | PropertyLa Malaysia Dashboard",
  description:
    "List your property for sale or rent on PropertyLa Malaysia. Upload details, photos, and reach thousands of buyers and renters in Kuala Lumpur, Selangor, Penang, Johor and nationwide. Easy property listing management for agents and owners.",
  robots: "noindex, nofollow",
};

export default function AddProperty() {
  return (
    <ProtectedRoute redirectTo="/dashboard/add-new-property">
      <DashboardLayout>
        {/* tp dashboard area start */}
        <AddPropertyMain />
        {/* tp dashboard area end */}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
