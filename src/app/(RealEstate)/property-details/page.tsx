import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Property Details | PropertyLa Malaysia Real Estate",
  description:
    "View comprehensive property details including photos, specifications, location maps, and pricing information for properties across Malaysia. Browse related listings like condo-for-rent/kuala-lumpur, apartment-for-rent/selangor, and investment-property-malaysia.",
};

export default function PropertyDetails() {
  redirect("/search");
  return null;
}
