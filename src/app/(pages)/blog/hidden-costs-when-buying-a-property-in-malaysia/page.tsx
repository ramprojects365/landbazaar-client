import { Metadata } from "next";
import Link from "next/link";
import RecentPosts from "@/components/Blog/RecentPosts";

export const metadata: Metadata = {
  metadataBase: new URL("https://propertyla.com.my"),
  title: "Hidden Costs When Buying a Property in Malaysia | PropertyLa",
  description:
    "Discover the hidden costs of buying property in Malaysia beyond the purchase price. Learn about stamp duty, legal fees, renovation costs, and other expenses to budget for.",
  keywords:
    "hidden costs property Malaysia 2026, property buying costs Malaysia, stamp duty Malaysia fees, legal fees property Malaysia, renovation costs Malaysia, property purchase expenses Malaysia, additional costs buying house Malaysia, property transaction costs Malaysia, SPA legal fees Malaysia, property maintenance costs Malaysia",
  openGraph: {
    title: "Hidden Costs When Buying a Property in Malaysia",
    description:
      "Discover the hidden costs of buying property in Malaysia beyond the purchase price.",
    images: ["/assets/img/blog/Stamp-Duty-in-Malaysia-Property.png"],
    type: "article",
  },
};

export default function HiddenCostsProperty() {
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
                      Hidden Costs When Buying a Property in Malaysia
                    </h3>

                    <p className="mb-30">
                      When buying a property in Malaysia, the purchase price is
                      just the beginning. Many first-time buyers are surprised
                      by the additional costs that can add up to 10-15% of the
                      property value. Understanding these hidden costs is
                      crucial for proper financial planning.
                    </p>

                    <p className="mb-30">
                      In this guide, we break down all the hidden costs you need
                      to budget for when buying property in Malaysia.
                    </p>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      1. Stamp Duty (Memorandum of Transfer)
                    </h3>

                    <p className="mb-20">
                      Stamp duty is a tax levied on property transfer documents.
                      The rates are:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>First RM100,000: 1%</li>
                      <li>RM100,001 - RM500,000: 2%</li>
                      <li>RM500,001 - RM1,000,000: 3%</li>
                      <li>Above RM1,000,000: 4%</li>
                    </ul>

                    <div
                      className="tp-blog-details-success mb-30"
                      style={{
                        backgroundColor: "#d4edda",
                        border: "1px solid #c3e6cb",
                        padding: "15px",
                        borderRadius: "8px",
                      }}
                    >
                      <h5 style={{ color: "#155724", marginBottom: "10px" }}>
                        💡 First-Time Buyer Exemption:
                      </h5>
                      <p style={{ color: "#155724", margin: 0 }}>
                        First-time Malaysian homebuyers enjoy stamp duty
                        exemption on the first RM300,000 for properties priced
                        up to RM500,000.
                      </p>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      2. Legal Fees
                    </h3>

                    <p className="mb-20">
                      You'll need to pay legal fees for both the Sale & Purchase
                      Agreement (SPA) and Loan Agreement.
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>First RM500,000: 1%</li>
                      <li>RM500,001 - RM1,000,000: 0.8%</li>
                      <li>RM1,000,001 - RM2,000,000: 0.7%</li>
                      <li>RM2,000,001 - RM3,000,000: 0.6%</li>
                      <li>Above RM3,000,000: 0.5%</li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      3. Stamp Duty on Loan Agreement
                    </h3>

                    <p className="mb-20">
                      Additional stamp duty is charged on the loan agreement
                      document.
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Flat rate of 0.5% of loan amount</li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      4. Valuation Fee
                    </h3>

                    <p className="mb-20">
                      Banks require property valuation before approving loans.
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Typically RM200-500 depending on property value</li>
                      <li>Some banks waive this for certain loan packages</li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      5. SPA Stamp Duty (For New Properties)
                    </h3>

                    <p className="mb-20">
                      For new properties from developers, additional stamp duty
                      applies to the SPA.
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Fixed rate of RM10 per document</li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      6. Renovation and Furnishing Costs
                    </h3>

                    <p className="mb-20">
                      Most properties need some work before moving in.
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Basic renovation: RM20,000-50,000</li>
                      <li>Full renovation: RM50,000-150,000</li>
                      <li>Furnishing: RM10,000-30,000</li>
                      <li>Appliances: RM5,000-15,000</li>
                    </ul>

                    <div
                      className="tp-blog-details-alert mb-30"
                      style={{
                        backgroundColor: "#fff3cd",
                        border: "1px solid #ffeaa7",
                        padding: "15px",
                        borderRadius: "8px",
                      }}
                    >
                      <h5 style={{ color: "#856404", marginBottom: "10px" }}>
                        ⚠️ Budget Tip:
                      </h5>
                      <p style={{ color: "#856404", margin: 0 }}>
                        Always set aside 10-15% of the property price for
                        renovation and furnishing. It's better to over-budget
                        than under-budget.
                      </p>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      7. Maintenance Fees (For Condos)
                    </h3>

                    <p className="mb-20">
                      Monthly maintenance fees for strata-titled properties.
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Standard condos: RM200-400/month</li>
                      <li>Luxury condos: RM400-800/month</li>
                      <li>Sinking fund: Additional RM50-100/month</li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      8. Insurance Costs
                    </h3>

                    <p className="mb-20">
                      Various insurance policies for property protection.
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        MRTA (Mortgage Reducing Term Assurance): RM2,000-10,000
                        one-time
                      </li>
                      <li>
                        MLTA (Mortgage Level Term Assurance): RM500-2,000/year
                      </li>
                      <li>Fire insurance: RM200-500/year</li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      9. Property Taxes
                    </h3>

                    <p className="mb-20">Annual property taxes in Malaysia.</p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Quit rent: RM1-3 per sq ft/year (varies by state)</li>
                      <li>Assessment tax: 4-6% of annual rental value</li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      10. Utility Connection Fees
                    </h3>

                    <p className="mb-20">Initial costs to connect utilities.</p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Electricity deposit: RM200-500</li>
                      <li>Water deposit: RM50-100</li>
                      <li>Internet installation: RM100-300</li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      11. Moving Costs
                    </h3>

                    <p className="mb-20">Professional moving services.</p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Local move: RM1,000-3,000</li>
                      <li>Inter-state move: RM2,000-5,000</li>
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
                        💰 Total Cost Example
                      </h3>
                      <p style={{ margin: 0 }}>
                        For a RM500,000 property, expect additional costs of
                        approximately RM50,000-75,000 (10-15%). This includes
                        stamp duty (~RM9,000), legal fees (~RM4,500), renovation
                        (~RM30,000), and other miscellaneous costs.
                      </p>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Tips to Reduce Hidden Costs
                    </h3>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Negotiate legal fees with your lawyer</li>
                      <li>Compare bank loan packages for better rates</li>
                      <li>Consider properties that need less renovation</li>
                      <li>Take advantage of first-time buyer exemptions</li>
                      <li>Buy during promotional periods from developers</li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Conclusion
                    </h3>

                    <p className="mb-20">
                      Being aware of hidden costs helps you budget accurately
                      and avoid financial stress. Always factor in these
                      additional expenses when calculating your affordability.
                    </p>

                    <p className="mb-30">
                      Work with a reputable property agent and lawyer who can
                      provide accurate estimates of all costs involved in your
                      property purchase.
                    </p>
                  </div>

                  <div className="tp-blog-details-tag mb-35">
                    <span>Tags:</span>
                    <Link href="#">Property Costs</Link>
                    <Link href="#">Buying Property</Link>
                    <Link href="#">Malaysia Real Estate</Link>
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
                          Property <span>(12)</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Investment <span>(8)</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Market Analysis <span>(6)</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Tips & Guides <span>(15)</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <RecentPosts currentSlug="/blog/hidden-costs-when-buying-a-property-in-malaysia" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
