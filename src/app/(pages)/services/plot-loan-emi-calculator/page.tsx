import { Metadata } from "next";
import Link from "next/link";
import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import PlotLoanEmiCalculator from "@/components/Services/PlotLoanEmiCalculator";
import { calculatePlotLoanEmi } from "@/config/telanganaRealEstate";
import { formatIndianCurrency } from "@/utils/calculatorFormat";
import "../../blog/blog-page.scss";
import "../services-calculator.scss";

const examplePlotPrice = 60_00_000;
const exampleDownPayment = 15_00_000;
const exampleRate = 8.75;
const exampleTenure = 15;
const exampleBreakdown = calculatePlotLoanEmi(
  examplePlotPrice,
  exampleDownPayment,
  exampleRate,
  exampleTenure,
);

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dekholand.com"),
  title:
    "Hyderabad Plot Loan EMI Calculator | Telangana Land Loan | Dekho Land",
  description:
    "Calculate plot loan EMI using the reducing balance formula for Hyderabad and Telangana. Estimate down payment, interest, max eligible loan, and total repayment for HMDA/DTCP plots.",
  keywords:
    "plot loan EMI calculator Hyderabad, Telangana land loan EMI, Shankarpally plot loan, HMDA plot finance, SBI Realty loan, HDFC plot loan, reducing balance EMI formula, plot loan eligibility",
  alternates: {
    canonical: "/services/plot-loan-emi-calculator",
  },
  openGraph: {
    title: "Hyderabad Plot Loan EMI Calculator | Dekho Land",
    description:
      "Free plot loan EMI calculator for open plots in Hyderabad, Shadnagar, Shankarpally, and Telangana. Includes eligibility estimate and bank rate guide.",
    url: "https://www.dekholand.com/services/plot-loan-emi-calculator",
    siteName: "Dekho Land",
    type: "website",
  },
};

const bankRates = [
  {
    bank: "SBI Realty Home Loan",
    rate: "8.50% – 9.15%",
    tenure: "10–15 years",
    note: "Up to ₹15 crore. Construction mandatory within 5 years for many products.",
  },
  {
    bank: "HDFC Bank Plot Loan",
    rate: "8.70% – 9.40%",
    tenure: "Up to 15 years",
    note: "HMDA/DTCP layouts; funding up to 75–80% LTV in approved projects.",
  },
  {
    bank: "ICICI Bank Plot Loan",
    rate: "9.00% – 10.00%",
    tenure: "10–20 years",
    note: "Fast processing for salaried and corporate profiles.",
  },
  {
    bank: "Axis Bank / L&T Finance",
    rate: "9.00% – 10.25%",
    tenure: "Up to 15 years",
    note: "Flexible eligibility; location must be on lender approved list.",
  },
  {
    bank: "Bajaj Housing Finance",
    rate: "8.60% – 10.50%",
    tenure: "Up to 15 years",
    note: "Higher LTV possible for RERA/HMDA layouts; self-employed friendly.",
  },
];

const additionalCosts = [
  {
    item: "Stamp duty & registration",
    cost: "~6% in GHMC/HMDA urban areas (~7.5% in Gram Panchayat)",
    note: "Not financed by plot loan — pay from own funds.",
  },
  {
    item: "Bank processing fee",
    cost: "0.35% – 1% of loan amount",
    note: "SBI caps around ₹10,000; private banks may charge ₹3,000–₹15,000 + GST.",
  },
  {
    item: "Legal verification",
    cost: "₹5,000 – ₹25,000",
    note: "Title search, EC, and document vetting before disbursement.",
  },
  {
    item: "Property valuation",
    cost: "₹3,000 – ₹10,000",
    note: "Bank-appointed valuer; loan based on lower of agreement or valuation.",
  },
];

export default function PlotLoanEmiCalculatorPage() {
  return (
    <main className="blog-page service-calculator-page">
      <BreadcrumbArea
        title="Plot Loan EMI Calculator"
        showBackground={false}
      />
      <section className="tp-blog-details-area pt-40 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="tp-blog-details-wrapper">
                <div className="tp-blog-details-content">
                  <div className="tp-blog-details-text">
                    <h1 className="tp-blog-details-title mb-20">
                      Hyderabad Plot Loan EMI Calculator
                    </h1>
                    <p className="mb-30">
                      Estimate monthly EMI for plot loans in Hyderabad and
                      Telangana using the standard{" "}
                      <strong>reducing balance interest method</strong>. Plot
                      loans finance residential NA plots in HMDA, DTCP/YTDA, and
                      select RERA layouts — not raw agricultural land or
                      unapproved Gram Panchayat parcels without LRS.
                    </p>

                    <PlotLoanEmiCalculator />

                    <h2 className="tp-blog-details-subtitle mb-20 mt-40">
                      Plot loan EMI calculation formula
                    </h2>
                    <p className="mb-20">
                      Plot loan EMIs use the reducing balance method:
                    </p>
                    <p
                      className="mb-20 service-calculator-page__formula"
                      style={{
                        padding: "16px 20px",
                        background: "#f8faf9",
                        borderRadius: "8px",
                        fontFamily: "monospace",
                        fontSize: "15px",
                        lineHeight: 1.6,
                      }}
                    >
                      EMI = P × R × (1 + R)<sup>N</sup> / ((1 + R)<sup>N</sup> −
                      1)
                    </p>
                    <ul className="service-calculator-page__list mb-30">
                      <li>
                        <strong>P</strong> = Principal loan amount (Plot price −
                        Down payment)
                      </li>
                      <li>
                        <strong>R</strong> = Monthly interest rate (Annual rate ÷
                        12 ÷ 100)
                      </li>
                      <li>
                        <strong>N</strong> = Total tenure in months (Years × 12)
                      </li>
                    </ul>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Example: Shankarpally / outer Hyderabad plot
                    </h2>
                    <ul className="service-calculator-page__list mb-20">
                      <li>Plot price: {formatIndianCurrency(examplePlotPrice)}</li>
                      <li>
                        Down payment (25%):{" "}
                        {formatIndianCurrency(exampleDownPayment)}
                      </li>
                      <li>
                        Required loan amount (P):{" "}
                        {formatIndianCurrency(examplePlotPrice - exampleDownPayment)}
                      </li>
                      <li>Interest rate: {exampleRate}% p.a.</li>
                      <li>
                        Tenure (N): {exampleTenure} years (
                        {exampleTenure * 12} months)
                      </li>
                    </ul>
                    {exampleBreakdown && (
                      <ul className="service-calculator-page__list mb-30">
                        <li>
                          <strong>
                            Monthly EMI:{" "}
                            {formatIndianCurrency(Math.round(exampleBreakdown.emi))}
                          </strong>
                        </li>
                        <li>
                          Total interest payable:{" "}
                          {formatIndianCurrency(
                            Math.round(exampleBreakdown.totalInterest),
                          )}
                        </li>
                        <li>
                          Total amount paid to bank:{" "}
                          {formatIndianCurrency(
                            Math.round(exampleBreakdown.totalPayment),
                          )}
                        </li>
                      </ul>
                    )}

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Top banks offering plot loans in Hyderabad
                    </h2>
                    <div className="service-calculator-page__table-wrap mb-30">
                      <table className="service-calculator-page__table">
                        <thead>
                          <tr>
                            <th>Bank / lender</th>
                            <th>Interest rate</th>
                            <th>Tenure</th>
                            <th>Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bankRates.map((row) => (
                            <tr key={row.bank}>
                              <td>{row.bank}</td>
                              <td>{row.rate}</td>
                              <td>{row.tenure}</td>
                              <td>{row.note}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Additional out-of-pocket costs
                    </h2>
                    <div className="service-calculator-page__table-wrap mb-30">
                      <table className="service-calculator-page__table">
                        <thead>
                          <tr>
                            <th>Cost item</th>
                            <th>Typical range</th>
                            <th>Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {additionalCosts.map((row) => (
                            <tr key={row.item}>
                              <td>{row.item}</td>
                              <td>{row.cost}</td>
                              <td>{row.note}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Location-specific notes for Telangana buyers
                    </h2>
                    <ul className="service-calculator-page__list">
                      <li>
                        <strong>HMDA &amp; DTCP layouts:</strong> Banks prefer
                        approved residential layouts in Hyderabad, Shadnagar,
                        Shankarpally, Maheshwaram, and Sangareddy. Funding is
                        faster and LTV is higher (often 70–80%).
                      </li>
                      <li>
                        <strong>Gram Panchayat lands:</strong> Harder to finance
                        unless LRS proceedings and clear NA conversion exist.
                        PSU banks may decline; some NBFCs (e.g. LIC HFL) may
                        consider on case-by-case basis.
                      </li>
                      <li>
                        <strong>Construction clause:</strong> SBI and others
                        require house construction within 2–5 years. Non-compliance
                        can shift you to a higher commercial interest rate.
                      </li>
                      <li>
                        <strong>Valuation gap:</strong> Banks lend on registered
                        or bank-assessed value — often 15–30% below market. Budget
                        extra margin beyond the down payment shown in this
                        calculator.
                      </li>
                      <li>
                        <strong>Stamp duty:</strong> Budget ~6% separately in
                        urban Telangana. Use our{" "}
                        <Link href="/services/stamp-duty-calculator">
                          stamp duty calculator
                        </Link>
                        .
                      </li>
                    </ul>

                    <div className="service-calculator-page__cta mt-40">
                      <h2>Found a plot you want to finance?</h2>
                      <p>
                        Verify HMDA/DTCP approval, run Dharani title check, and
                        browse verified listings on Dekho Land.
                      </p>
                      <div className="d-flex gap-3 flex-wrap">
                        <Link className="tp-btn" href="/search">
                          Browse plots
                        </Link>
                        <Link className="tp-btn" href="/services/dharani-title-check">
                          Dharani title check
                        </Link>
                        <Link className="tp-btn" href="/services/stamp-duty-calculator">
                          Stamp duty calculator
                        </Link>
                      </div>
                    </div>

                    <p
                      className="mt-30"
                      style={{ color: "#64717f", fontSize: "13px" }}
                    >
                      Disclaimer: EMI and eligibility figures are estimates using
                      the standard reducing balance formula. Interest rates, LTV,
                      FOIR limits, and approval criteria vary by lender and
                      profile. This tool does not constitute financial advice or
                      a loan offer.
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
