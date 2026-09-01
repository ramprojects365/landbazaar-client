import { Metadata } from "next";
import Link from "next/link";
import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import StampDutyCalculator from "@/components/Services/StampDutyCalculator";
import {
  calculateTelanganaStampDutyByTransaction,
} from "@/config/telanganaRealEstate";
import { formatIndianCurrency } from "@/utils/calculatorFormat";
import "../../blog/blog-page.scss";
import "../services-calculator.scss";

const exampleValue = 80_00_000;
const exampleBreakdown = calculateTelanganaStampDutyByTransaction(
  exampleValue,
  "sale_urban",
);

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dekholand.com"),
  title:
    "Hyderabad Stamp Duty & Registration Calculator | Telangana Plot Fees | Dekho Land",
  description:
    "Free Telangana stamp duty and property registration fee calculator for Hyderabad, HMDA, and Gram Panchayat plots. Urban sale deed ~6%, rural ~7.5%. Uses higher of agreed price or IGRS guidance value.",
  keywords:
    "Hyderabad stamp duty calculator, Telangana registration charges, plot registration fee Hyderabad, GHMC stamp duty 2026, HMDA land registration, Shankarpally stamp duty, IGRS guidance value, gift deed stamp duty Telangana, Section 80C stamp duty",
  alternates: {
    canonical: "/services/stamp-duty-calculator",
  },
  openGraph: {
    title:
      "Hyderabad Stamp Duty & Property Registration Calculator | Dekho Land",
    description:
      "Calculate stamp duty, transfer duty, and registration fees for plots and land in Hyderabad and Telangana before you register at the SRO.",
    url: "https://www.dekholand.com/services/stamp-duty-calculator",
    siteName: "Dekho Land",
    type: "website",
  },
};

const feeStructure = [
  {
    zone: "Urban / Municipal / GHMC (Hyderabad, HMDA)",
    stampDuty: "4%",
    transferDuty: "1.5%",
    registrationFee: "0.5%",
    total: "~6.0%",
  },
  {
    zone: "Rural / Gram Panchayat (outer areas)",
    stampDuty: "5.5%",
    transferDuty: "0%",
    registrationFee: "2.0%",
    total: "~7.5%",
  },
  {
    zone: "Gift deed — family members (urban)",
    stampDuty: "2%",
    transferDuty: "—",
    registrationFee: "0.5% (min ₹2,000, max ₹25,000)",
    total: "Varies",
  },
  {
    zone: "Gift deed — non-family (urban)",
    stampDuty: "5%",
    transferDuty: "—",
    registrationFee: "0.5%",
    total: "Varies",
  },
  {
    zone: "Partition deed — family (urban)",
    stampDuty: "0.5% (max ₹1,00,000)",
    transferDuty: "—",
    registrationFee: "₹2,000 fixed",
    total: "Varies",
  },
];

export default function StampDutyCalculatorPage() {
  return (
    <main className="blog-page service-calculator-page">
      <BreadcrumbArea title="Stamp Duty Calculator" showBackground={false} />
      <section className="tp-blog-details-area pt-40 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="tp-blog-details-wrapper">
                <div className="tp-blog-details-content">
                  <div className="tp-blog-details-text">
                    <h1 className="tp-blog-details-title mb-20">
                      Hyderabad Stamp Duty &amp; Property Registration Fee
                      Calculator
                    </h1>
                    <p className="mb-30">
                      Estimate stamp duty, transfer duty, and registration charges
                      for open plots and land in Hyderabad, Telangana. Fees apply
                      to the <strong>higher of the agreed sale price or the
                      government market (guidance) value</strong>. Telangana
                      charges identical rates for all buyers — there is no stamp
                      duty discount based on gender.
                    </p>

                    <StampDutyCalculator />

                    <h2 className="tp-blog-details-subtitle mb-20 mt-40">
                      Telangana stamp duty &amp; registration structure
                    </h2>
                    <div className="service-calculator-page__table-wrap mb-30">
                      <table className="service-calculator-page__table">
                        <thead>
                          <tr>
                            <th>Zone / transaction type</th>
                            <th>Stamp duty</th>
                            <th>Transfer duty</th>
                            <th>Registration fee</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {feeStructure.map((row) => (
                            <tr key={row.zone}>
                              <td>{row.zone}</td>
                              <td>{row.stampDuty}</td>
                              <td>{row.transferDuty}</td>
                              <td>{row.registrationFee}</td>
                              <td>
                                <strong>{row.total}</strong>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Formula &amp; calculation example
                    </h2>
                    <p className="mb-20">
                      <strong>Assessed value</strong> = Higher of (Agreed Sale
                      Price, Government Market Value)
                    </p>
                    <p className="mb-20">
                      <strong>Example:</strong> Plot in Shankarpally (Urban / HMDA
                      limits) with agreed price ₹80,00,000 and guidance value
                      ₹75,00,000. Assessed value = ₹80,00,000.
                    </p>
                    {exampleBreakdown && (
                      <ul className="service-calculator-page__list mb-20">
                        <li>
                          Stamp duty (4%):{" "}
                          {formatIndianCurrency(exampleBreakdown.stampDuty)}
                        </li>
                        <li>
                          Transfer duty (1.5%):{" "}
                          {formatIndianCurrency(exampleBreakdown.transferDuty)}
                        </li>
                        <li>
                          Registration fee (0.5%):{" "}
                          {formatIndianCurrency(exampleBreakdown.registrationFee)}
                        </li>
                        <li>
                          <strong>
                            Total payable to government:{" "}
                            {formatIndianCurrency(exampleBreakdown.total)}
                          </strong>
                        </li>
                      </ul>
                    )}
                    <p className="mb-30">
                      Use the calculator above with your own agreed price and
                      IGRS guidance value. Default inputs match this Shankarpally
                      example ({formatIndianCurrency(exampleValue)} assessed at
                      urban sale deed rates).
                    </p>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Important rules for land buyers in Telangana
                    </h2>
                    <ul className="service-calculator-page__list">
                      <li>
                        <strong>Market value rule:</strong> Stamp duty and
                        registration are always calculated on whichever is
                        higher — the government-notified market value or the
                        actual sale value declared in the sale deed.
                      </li>
                      <li>
                        <strong>Dharani / IGRS portal check:</strong> Verify
                        official market values before signing. Use the{" "}
                        <a
                          href="https://registration.telangana.gov.in/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Telangana IGRS portal
                        </a>{" "}
                        and{" "}
                        <a
                          href="https://dharani.telangana.gov.in/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Dharani portal
                        </a>{" "}
                        for guidance values, survey numbers, and Pattadar records.
                      </li>
                      <li>
                        <strong>Section 80C tax savings:</strong> Stamp duty and
                        registration charges paid in the year of purchase can be
                        claimed as a deduction under Section 80C up to ₹1.5 lakh
                        (combined with other 80C investments). Confirm eligibility
                        with your chartered accountant.
                      </li>
                      <li>
                        <strong>No gender-based concession:</strong> Unlike
                        Maharashtra or Delhi, Telangana does not offer reduced
                        stamp duty rates for female buyers.
                      </li>
                      <li>
                        <strong>Section 47A:</strong> Declaring a sale value below
                        guidance value can lead to re-assessment, penalties, and
                        demand notices from the Sub-Registrar.
                      </li>
                      <li>
                        <strong>Guidance value revisions:</strong> Telangana
                        revised land market values in 2025 and 2026, with
                        significant increases in western Hyderabad and ORR
                        corridors (Kokapet, Gachibowli, Shadnagar, Shankarpally).
                      </li>
                    </ul>

                    <div className="service-calculator-page__cta mt-40">
                      <h2>Ready to buy a plot in Hyderabad?</h2>
                      <p>
                        Verify title on Dharani, run an EC check, and plan
                        registration costs before you pay token advance.
                      </p>
                      <div className="d-flex gap-3 flex-wrap">
                        <Link className="tp-btn" href="/search">
                          Browse plots
                        </Link>
                        <Link className="tp-btn" href="/services/dharani-title-check">
                          Dharani title check
                        </Link>
                        <Link
                          className="tp-btn"
                          href="/services/plot-loan-emi-calculator"
                        >
                          Plot loan EMI calculator
                        </Link>
                      </div>
                    </div>

                    <p
                      className="mt-30"
                      style={{ color: "#64717f", fontSize: "13px" }}
                    >
                      Disclaimer: This calculator provides estimates based on
                      Telangana Registration &amp; Stamps Department rate
                      structures commonly cited for 2025–2026. Actual charges
                      depend on instrument type, Sub-Registrar office, and
                      applicable notifications. Not financial or legal advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
