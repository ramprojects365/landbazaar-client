import { Metadata } from "next";
import Link from "next/link";
import RecentPosts from "@/components/Blog/RecentPosts";

export const metadata: Metadata = {
  metadataBase: new URL("https://landway.com"),
  title:
    "How to Get a Plot Loan: Bank Eligibility & Interest Rates | LandWay",
  description:
    "Step-by-step guide to getting a plot loan in India — property eligibility (HMDA/DTCP/NALA), bank criteria, documents, interest rates from SBI, HDFC, ICICI, LIC Housing, and key differences vs home loans.",
  keywords:
    "plot loan India, land purchase loan Hyderabad, plot loan eligibility, plot loan interest rates 2026, SBI plot loan, HDFC land loan, HMDA DTCP plot loan, NALA converted land loan, LTV plot loan, plot loan vs home loan tax benefits",
  openGraph: {
    title: "How to Get a Plot Loan: Bank Eligibility & Interest Rates",
    description:
      "Learn the plot loan process, bank eligibility criteria, documents, indicative interest rates, and how plot loans differ from home loans.",
    images: [
      "/assets/img/blog/10-essential-legal-documents-to-check-before-buying-a-plot-in-Hyderabad.png",
    ],
    type: "article",
  },
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
  fontSize: "14px",
};

const thStyle = {
  padding: "12px",
  textAlign: "left" as const,
  border: "1px solid #003B5C",
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #dee2e6",
};

export default function PlotLoanGuideBlog() {
  return (
    <>
      <section className="tp-blog-details-area pt-40 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="tp-blog-details-wrapper">
                <div className="tp-blog-details-content">
                  <div className="tp-blog-details-text">
                    <h3 className="tp-blog-details-title mb-30">
                      How to Get a Plot Loan: Bank Eligibility &amp; Interest
                      Rates
                    </h3>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      1. How to Get a Plot Loan (Step-by-Step Process)
                    </h3>

                    <p className="mb-20">
                      A plot loan (or land purchase loan) is specifically
                      designed to finance the purchase of non-agricultural,
                      residential land.
                    </p>

                    <pre
                      className="mb-30"
                      style={{
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        padding: "20px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        lineHeight: 1.5,
                        overflowX: "auto",
                        whiteSpace: "pre",
                      }}
                    >
{`┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Step 1: Verify │───>│  Step 2: Check  │───>│ Step 3: Apply & │───>│  Step 4: Legal  │───> Sanction &
│ Property Status │    │   Eligibility   │    │ Submit Papers   │    │  & Tech Audit   │    Disbursement
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘`}
                    </pre>

                    <h4 className="mb-15" style={{ fontSize: "18px" }}>
                      Verify Property Eligibility First
                    </h4>

                    <ul className="tp-blog-details-list mb-20">
                      <li>
                        <strong>Approval Status:</strong> Banks generally fund
                        plots approved by local development authorities (e.g.,
                        HMDA, DTCP, BDA, DDA).
                      </li>
                      <li>
                        <strong>Non-Agricultural Status:</strong> Banks do not
                        offer plot loans for raw agricultural or forest land. The
                        land must be non-agricultural or converted (via NALA in
                        states like Telangana).
                      </li>
                    </ul>

                    <h4 className="mb-15" style={{ fontSize: "18px" }}>
                      Check Eligibility &amp; Down Payment (LTV)
                    </h4>

                    <ul className="tp-blog-details-list mb-20">
                      <li>
                        Banks fund between 70% to 80% of the registered
                        value/market value (Loan-to-Value Ratio).
                      </li>
                      <li>
                        You must arrange 20% to 30% out of pocket as a down
                        payment. Registration and stamp duty fees are excluded
                        from the loan funding.
                      </li>
                    </ul>

                    <h4 className="mb-15" style={{ fontSize: "18px" }}>
                      Apply &amp; Submit Documentation
                    </h4>

                    <p className="mb-20">
                      Complete the application form and submit personal, income,
                      and plot-related papers.
                    </p>

                    <h4 className="mb-15" style={{ fontSize: "18px" }}>
                      Legal &amp; Technical Verification
                    </h4>

                    <p className="mb-20">
                      The bank sends legal and engineering teams to inspect the
                      plot. They verify title deeds, link documents, layout
                      sanctions, and physical boundaries to ensure no
                      encumbrances exist.
                    </p>

                    <h4 className="mb-15" style={{ fontSize: "18px" }}>
                      Sanction &amp; Disbursement
                    </h4>

                    <p className="mb-30">
                      Once cleared, the bank issues a sanction letter and
                      disburses the loan directly to the seller via demand
                      draft/NEFT during registration.
                    </p>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      2. General Bank Eligibility Criteria
                    </h3>

                    <div
                      className="tp-blog-details-table mb-30"
                      style={{
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        padding: "20px",
                        borderRadius: "8px",
                        overflowX: "auto",
                      }}
                    >
                      <table style={tableStyle}>
                        <thead>
                          <tr
                            style={{
                              backgroundColor: "#003B5C",
                              color: "#fff",
                            }}
                          >
                            <th style={thStyle}>Criteria</th>
                            <th style={thStyle}>Requirements</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ ...tdStyle, fontWeight: 600 }}>Age</td>
                            <td style={tdStyle}>
                              Minimum 21 years, Maximum 65 years at loan
                              maturity.
                            </td>
                          </tr>
                          <tr>
                            <td style={{ ...tdStyle, fontWeight: 600 }}>
                              Employment
                            </td>
                            <td style={tdStyle}>
                              Salaried (minimum 2–3 years work experience) or
                              Self-Employed (3+ years business continuity).
                            </td>
                          </tr>
                          <tr>
                            <td style={{ ...tdStyle, fontWeight: 600 }}>
                              Minimum Income
                            </td>
                            <td style={tdStyle}>
                              Typically INR 25,000/month (salaried) or equivalent
                              taxable business income.
                            </td>
                          </tr>
                          <tr>
                            <td style={{ ...tdStyle, fontWeight: 600 }}>
                              Credit Score
                            </td>
                            <td style={tdStyle}>
                              750 or higher for best interest rates.
                            </td>
                          </tr>
                          <tr>
                            <td style={{ ...tdStyle, fontWeight: 600 }}>
                              FOIR (Debt-to-Income)
                            </td>
                            <td style={tdStyle}>
                              Total existing EMIs + proposed plot EMI should not
                              exceed 50% of net monthly income.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 className="mb-15" style={{ fontSize: "18px" }}>
                      Essential Documents Needed
                    </h4>

                    <ul className="tp-blog-details-list mb-20">
                      <li>
                        <strong>KYC Proofs:</strong> Aadhaar, PAN card, Voter ID,
                        or Passport.
                      </li>
                      <li>
                        <strong>Income Proofs:</strong>
                        <ul className="tp-blog-details-list mt-10 mb-0">
                          <li>
                            <strong>Salaried:</strong> Last 3 months&apos; salary
                            slips, Form 16 (last 2 years), 6 months&apos; bank
                            statements.
                          </li>
                          <li>
                            <strong>Self-Employed:</strong> 3 years&apos; ITR
                            with computation, audited financial statements, 6
                            months&apos; bank statements.
                          </li>
                        </ul>
                      </li>
                      <li>
                        <strong>Property Documents:</strong> Sale agreement,
                        title deed, layout sanction plan, layout NOC, and
                        allotment letter.
                      </li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      3. Interest Rates &amp; Terms
                    </h3>

                    <p className="mb-20">
                      Plot loan interest rates are typically slightly higher
                      (approx. 0.25% to 0.50%) or equivalent to standard home
                      loans depending on credit profile.
                    </p>

                    <ul className="tp-blog-details-list mb-20">
                      <li>
                        <strong>Standard Interest Rate Range:</strong> 8.40% –
                        10.50% p.a. (floating, linked to Repo Rate).
                      </li>
                      <li>
                        <strong>Maximum Tenure:</strong> Generally 15 to 20 years
                        (shorter than standard 30-year home loans).
                      </li>
                      <li>
                        <strong>Processing Fees:</strong> Ranging from 0.25% to
                        1.0% of loan amount + GST.
                      </li>
                    </ul>

                    <p className="mb-15">
                      <strong>Snapshot across major lenders:</strong>
                    </p>

                    <div
                      className="tp-blog-details-table mb-30"
                      style={{
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        padding: "20px",
                        borderRadius: "8px",
                        overflowX: "auto",
                      }}
                    >
                      <table style={tableStyle}>
                        <thead>
                          <tr
                            style={{
                              backgroundColor: "#003B5C",
                              color: "#fff",
                            }}
                          >
                            <th style={thStyle}>Bank / Lender</th>
                            <th style={thStyle}>Indicative Rate Range</th>
                            <th style={thStyle}>Max Tenure</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ ...tdStyle, fontWeight: 600 }}>
                              State Bank of India (SBI Realty)
                            </td>
                            <td style={tdStyle}>~8.50% – 9.85% p.a.</td>
                            <td style={tdStyle}>Up to 10–15 years</td>
                          </tr>
                          <tr>
                            <td style={{ ...tdStyle, fontWeight: 600 }}>
                              HDFC Bank
                            </td>
                            <td style={tdStyle}>~8.70% – 9.60% p.a.</td>
                            <td style={tdStyle}>Up to 20–30 years</td>
                          </tr>
                          <tr>
                            <td style={{ ...tdStyle, fontWeight: 600 }}>
                              ICICI Bank
                            </td>
                            <td style={tdStyle}>~8.75% – 10.30% p.a.</td>
                            <td style={tdStyle}>Up to 20 years</td>
                          </tr>
                          <tr>
                            <td style={{ ...tdStyle, fontWeight: 600 }}>
                              LIC Housing Finance
                            </td>
                            <td style={tdStyle}>~8.75% – 9.50% p.a.</td>
                            <td style={tdStyle}>Up to 15 years</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 className="mb-15" style={{ fontSize: "18px" }}>
                      Key Differences: Plot Loan vs. Home Loan
                    </h4>

                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>Tax Benefits:</strong> Unlike home loans (Section
                        80C &amp; Section 24b), a standalone plot loan offers no
                        tax deductions on principal or interest until home
                        construction starts on that plot.
                      </li>
                      <li>
                        <strong>Construction Timeline Clause:</strong> Many banks
                        (like SBI) mandate that construction of a house must
                        begin within 2 to 5 years from the date of plot loan
                        disbursement; otherwise, the loan interest rate converts
                        to higher commercial rates.
                      </li>
                    </ul>

                    <div
                      className="tp-blog-details-quote mb-30"
                      style={{
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        padding: "20px",
                        borderRadius: "8px",
                        borderLeft: "4px solid #003B5C",
                      }}
                    >
                      <h3 style={{ color: "#003B5C", marginBottom: "15px" }}>
                        Pro Tip for Plot Loan Applicants
                      </h3>
                      <p style={{ margin: 0 }}>
                        Confirm HMDA/DTCP (or equivalent) approval and
                        non-agricultural status before applying. Keep a 20–30%
                        down payment ready, aim for a 750+ credit score, and ask
                        lenders about construction timeline clauses that can
                        raise rates if you delay building.
                      </p>
                    </div>
                  </div>

                  <div className="tp-blog-details-tag mb-35">
                    <span>Tags:</span>
                    <Link href="#">Plot Loan</Link>
                    <Link href="#">Bank Eligibility</Link>
                    <Link href="#">Interest Rates</Link>
                    <Link href="#">Land Guide</Link>
                  </div>

                  <div className="tp-blog-details-share">
                    <span>Share:</span>
                    <Link className="share-facebook" href="#">
                      <i className="fab fa-facebook-f"></i>
                      Facebook
                    </Link>
                    <Link className="share-twitter" href="#">
                      <i className="fab fa-twitter"></i>
                      Twitter
                    </Link>
                    <Link className="share-linkedin" href="#">
                      <i className="fab fa-linkedin-in"></i>
                      LinkedIn
                    </Link>
                    <Link className="share-whatsapp" href="#">
                      <i className="fab fa-whatsapp"></i>
                      WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="tp-blog-sidebar">
                <div className="tp-blog-widget mb-40">
                  <h4 className="tp-blog-widget-title">Categories</h4>
                  <div className="tp-blog-widget-category">
                    <ul>
                      <li>
                        <Link href="#">
                          Land Investment <span>(12)</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Hyderabad Real Estate <span>(8)</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Market Analysis <span>(6)</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Tips &amp; Guides <span>(15)</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <RecentPosts currentSlug="/blog/how-to-get-a-plot-loan-bank-eligibility-and-interest-rates" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
