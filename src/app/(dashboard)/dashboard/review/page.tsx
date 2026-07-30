import { dashboardReviews } from "@/data/reviewData";
import DashboardLayout from "@/layouts/DashboardLayout";
import ReviewItem from "./components/ReviewSingleItem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Reviews | PropertyLa Malaysia Dashboard",
  description:
    "View and manage your property reviews on PropertyLa. Track your feedback on Malaysia real estate agents, properties, and services.",
  robots: "noindex, nofollow",
};

export default function DashboardReview() {
  return (
    <DashboardLayout>
      <div className="tp-dashboard-new-property">
        <h5 className="tp-dashboard-new-title">Information</h5>
        <div className="tp-postbox-comment">
          <ul>
            {dashboardReviews.map((review, index) => (
              <ReviewItem key={index} {...review} />
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
