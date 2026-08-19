import { Metadata } from "next";
import Link from "next/link";
import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";

export const metadata: Metadata = {
  title: {
    absolute: "Free Property Listing - DekhoLand",
  },
  description:
    "List your land or plot for free on DekhoLand. Add property details, upload photos, and reach buyers looking for plots and farmlands across India.",
  metadataBase: new URL("https://www.dekholand.com"),
  alternates: {
    canonical: "/add-property",
  },
  openGraph: {
    title: "Free Property Listing - DekhoLand",
    description:
      "List your land or plot for free on DekhoLand. Add property details, upload photos, and reach buyers looking for plots and farmlands across India.",
    url: "https://www.dekholand.com/add-property",
    siteName: "DekhoLand",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Free Property Listing - DekhoLand",
    description:
      "List your land or plot for free on DekhoLand. Add property details, upload photos, and reach buyers looking for plots and farmlands across India.",
  },
};

const steps = [
  {
    title: "Create your free account",
    body: "Sign up with your name and mobile number so buyers can reach you about your land or plot.",
  },
  {
    title: "Add listing details",
    body: "Enter location, land type, size, price, and a short description so your property is easy to find in search.",
  },
  {
    title: "Upload photos and documents",
    body: "Add clear land photos in the media section. Title deeds and approvals can be uploaded as PDF or Word files.",
  },
  {
    title: "Publish and get enquiries",
    body: "Once published, your listing appears on DekhoLand for buyers searching plots and farmlands in your area.",
  },
];

export default function AddPropertyPage() {
  return (
    <main>
      <BreadcrumbArea title="Free Property Listing" showBackground={false} />
      <section className="pt-40 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <span className="tp-section-title-pre">List on DekhoLand</span>
              <h1 className="tp-section-title mb-20">
                How to add a property listing
              </h1>
              <p
                style={{
                  color: "#5c6f7b",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                }}
              >
                DekhoLand lets landowners and sellers list plots, farmlands, and
                agricultural land for free. Use the steps below to publish a
                verified listing and start receiving buyer enquiries.
              </p>
              <ol
                style={{
                  paddingLeft: "20px",
                  margin: "0 0 32px",
                  display: "grid",
                  gap: "16px",
                }}
              >
                {steps.map((step, index) => (
                  <li key={step.title} style={{ color: "#102a43" }}>
                    <strong>
                      {index + 1}. {step.title}
                    </strong>
                    <p
                      style={{
                        color: "#5c6f7b",
                        margin: "6px 0 0",
                        lineHeight: 1.6,
                      }}
                    >
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="d-flex gap-3 flex-wrap">
                <Link className="tp-btn" href="/dashboard/add-new-property">
                  List your property free
                </Link>
                <Link className="tp-btn" href="/plots">
                  Search plots & farmlands
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
