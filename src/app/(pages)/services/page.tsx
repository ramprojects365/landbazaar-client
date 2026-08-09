import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | DekhoLand",
  description:
    "DekhoLand land services including Dharani title check, legal verification, EC verification, and site visit scheduling. Dedicated pages coming soon.",
  robots: "noindex, follow",
};

const serviceItems = [
  "Dharani Title Check",
  "Legal Verification",
  "EC Verification",
  "Site Visit Scheduler",
];

export default function ServicesPage() {
  return (
    <main>
      <BreadcrumbArea title="Services" />
      <section className="pt-80 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <span className="tp-section-title-pre">DekhoLand Services</span>
              <h3 className="tp-section-title mb-20">Coming soon</h3>
              <p
                style={{
                  color: "#5c6f7b",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                }}
              >
                We are preparing dedicated pages for these services. For now,
                you can explore verified lands and plots on DekhoLand, or
                contact our team for help.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 32px",
                  display: "grid",
                  gap: "10px",
                }}
              >
                {serviceItems.map((item) => (
                  <li
                    key={item}
                    style={{
                      padding: "12px 16px",
                      border: "1px solid rgba(0, 59, 92, 0.12)",
                      borderRadius: "8px",
                      color: "#003B5C",
                      fontWeight: 600,
                      background: "#fff",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link className="tp-btn" href="/search">
                  Browse lands
                </Link>
                <Link className="tp-btn" href="/contact">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
