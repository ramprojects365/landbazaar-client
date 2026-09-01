import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | DekhoLand",
  description:
    "DekhoLand land services including Dharani title check, legal verification, and EC verification.",
};

const serviceItems = [
  { label: "Dharani Title Check", href: "/services/dharani-title-check" },
  { label: "Legal Verification", href: "/legal-verification" },
  { label: "EC Verification", href: "/services/ec-verification" },
  { label: "Stamp Duty Calculator", href: "/services/stamp-duty-calculator" },
  {
    label: "Plot Loan EMI Calculator",
    href: "/services/plot-loan-emi-calculator",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <BreadcrumbArea title="Services" showBackground={false} />
      <section className="pt-40 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <span className="tp-section-title-pre">DekhoLand Services</span>
              <h3 className="tp-section-title mb-20">Land services</h3>
              <p
                style={{
                  color: "#5c6f7b",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                }}
              >
                Start with a Dharani Title Check, Legal Verification, and EC
                Verification before buying land in Telangana. Use our stamp duty
                and plot loan EMI calculators to plan registration costs and
                monthly repayments.
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
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      style={{
                        display: "block",
                        padding: "12px 16px",
                        border: "1px solid rgba(0, 59, 92, 0.12)",
                        borderRadius: "8px",
                        color: "#003B5C",
                        fontWeight: 600,
                        background: "#fff",
                      }}
                    >
                      {item.label}
                    </Link>
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
