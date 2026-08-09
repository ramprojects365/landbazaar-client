import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Land & Plot Details | LandWay India",
  description:
    "View comprehensive land and plot details including photos, survey info, location maps, and pricing across India. Browse residential plots, agricultural land, farm land, and commercial land in Hyderabad, Telangana, Visakhapatnam and nationwide.",
};

export default function PropertyDetails() {
  redirect("/search");
  return null;
}
