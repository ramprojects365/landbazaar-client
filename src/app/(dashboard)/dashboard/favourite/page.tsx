import PropertyPagination from "@/components/Common/pagination/PropertyPagination";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardPropertyItem from "../property/components/DashboardPropertyItem";
import { propertyData } from "@/data/propertyData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Favorites | Dekho Land Dashboard",
  description:
    "View and manage your favorite land and plot listings on Dekho Land. Access saved lands for sale and lease in Hyderabad, Telangana, Visakhapatnam and nationwide.",
  robots: "noindex, nofollow",
};

export default function DashboardFavourite() {
  return (
    <>
      <DashboardLayout>
        <div className="tp-dashboard-property-wrapper">
          <div className="row">
            {/* My Property */}
            {propertyData.slice(55, 59).map((property) => (
              <DashboardPropertyItem property={property} key={property.id} />
            ))}
            {/* pagination area */}
            <div className="col-lg-12">
              <PropertyPagination />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
