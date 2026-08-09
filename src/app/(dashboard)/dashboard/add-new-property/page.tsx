import DashboardLayout from "@/layouts/DashboardLayout";
import AddPropertyMain from "./components/AddPropertyMain";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import { Metadata } from "next";

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
        {/* tp dashboard area start */}
        <AddPropertyMain />
        {/* tp dashboard area end */}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
