import { Metadata } from "next";
import Link from "next/link";
import RecentPosts from "@/components/Blog/RecentPosts";
// Using direct paths for public directory images

export const metadata: Metadata = {
  metadataBase: new URL("https://propertyla.com.my"),
  title:
    "Stamp Duty in Malaysia Property (2026): Complete Guide | PropertyLa Malaysia",
  description:
    "Complete guide to Malaysia property stamp duty in 2026. Learn about rates, exemptions, foreign buyer rules, and calculation tips for home buyers.",
  keywords:
    "stamp duty Malaysia 2026, Malaysia property stamp duty rates, property tax Malaysia, memorandum of transfer Malaysia, foreign buyer stamp duty Malaysia, first time buyer stamp duty exemption Malaysia, calculate stamp duty Malaysia, SPA stamp duty Malaysia, property purchase tax Malaysia, real estate stamp duty Malaysia",
  openGraph: {
    title: "Stamp Duty in Malaysia Property (2026): A Complete Guide",
    description:
      "Complete guide to Malaysia property stamp duty in 2026. Learn about rates, exemptions, and calculation tips.",
    images: ["/assets/img/blog/blog-thumb-3.jpg"],
    type: "article",
  },
};

export default function StampDutyBlog() {
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
                      Stamp Duty in Malaysia Property (2026): A Complete Guide
                      for Home Buyers
                    </h3>

                    <p className="mb-30">
                      Buying a property in Malaysia involves more than just the
                      purchase price. One of the most important costs you must
                      understand is stamp duty—a legal tax that can
                      significantly impact your overall budget.
                    </p>

                    <p className="mb-30">
                      In 2026, there are several updates and key rules every
                      property buyer should know. This guide breaks everything
                      down in a simple and practical way.
                    </p>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      🏠 What is Stamp Duty?
                    </h3>

                    <p className="mb-20">
                      Stamp duty is a tax imposed on legal documents, especially
                      those related to property transactions such as:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Sale & Purchase Agreement (SPA)</li>
                      <li>Memorandum of Transfer (MOT)</li>
                      <li>Loan Agreement</li>
                    </ul>

                    <p className="mb-30">
                      It is governed under the Stamp Act 1949 and must be paid
                      for documents to be legally valid and enforceable.
                    </p>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      📊 Stamp Duty Rates for Property (2026)
                    </h3>

                    <p className="mb-20">
                      For Malaysian citizens and permanent residents, stamp duty
                      is calculated using a progressive (tiered) rate:
                    </p>

                    <div
                      className="tp-blog-details-table mb-30"
                      style={{
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        padding: "20px",
                        borderRadius: "8px",
                      }}
                    >
                      <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                      >
                        <thead>
                          <tr
                            style={{
                              backgroundColor: "#003B5C",
                              color: "#fff",
                            }}
                          >
                            <th
                              style={{
                                padding: "12px",
                                textAlign: "left",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Property Price
                            </th>
                            <th
                              style={{
                                padding: "12px",
                                textAlign: "left",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Stamp Duty Rate
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                padding: "12px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              First RM100,000
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              1%
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                padding: "12px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Next RM400,000
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              2%
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                padding: "12px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Next RM500,000
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              3%
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                padding: "12px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Above RM1,000,000
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              4%
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div
                      className="tp-blog-details-alert mb-30"
                      style={{
                        backgroundColor: "#e7f3ff",
                        border: "1px solid #b3d9ff",
                        padding: "15px",
                        borderRadius: "8px",
                      }}
                    >
                      <h5 style={{ color: "#0066cc", marginBottom: "10px" }}>
                        👉 Important Note:
                      </h5>
                      <p style={{ color: "#0066cc", margin: 0 }}>
                        This means higher-value properties pay more tax
                        proportionally.
                      </p>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      🌍 Special Rule (2026): Foreign Buyers
                    </h3>

                    <p className="mb-20">A major update in 2026:</p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        Foreign buyers now pay a flat 8% stamp duty on
                        residential property
                      </li>
                      <li>Previously it was only 4%</li>
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
                        👉 Impact:
                      </h5>
                      <p style={{ color: "#856404", margin: 0 }}>
                        This change aims to control foreign ownership and
                        support local buyers.
                      </p>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      💰 Other Property-Related Stamp Duties
                    </h3>

                    <p className="mb-20">
                      When buying property, you don't just pay one stamp duty:
                    </p>

                    <div className="tp-blog-details-list mb-30">
                      <div style={{ marginBottom: "15px" }}>
                        <strong>1. Transfer (MOT / DOA)</strong>
                        <p style={{ margin: "5px 0 0 20px", color: "#666" }}>
                          Based on property price (1%–4%)
                        </p>
                      </div>
                      <div style={{ marginBottom: "15px" }}>
                        <strong>2. Loan Agreement</strong>
                        <p style={{ margin: "5px 0 0 20px", color: "#666" }}>
                          0.5% of loan amount
                        </p>
                      </div>
                      <div style={{ marginBottom: "15px" }}>
                        <strong>3. Sale & Purchase Agreement (SPA)</strong>
                        <p style={{ margin: "5px 0 0 20px", color: "#666" }}>
                          Fixed RM10 per copy
                        </p>
                      </div>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      🎁 Exemptions & Reliefs (Good News for Buyers)
                    </h3>

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
                        🟢 First-Time Home Buyers
                      </h5>
                      <ul
                        style={{
                          color: "#155724",
                          marginBottom: 0,
                          paddingLeft: "20px",
                        }}
                      >
                        <li>100% exemption on:</li>
                        <li>Transfer stamp duty</li>
                        <li>Loan agreement stamp duty</li>
                        <li>Applicable for properties up to RM500,000</li>
                        <li>Extended until 31 December 2027</li>
                      </ul>
                    </div>

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
                        🟢 Family Transfers
                      </h5>
                      <ul
                        style={{
                          color: "#155724",
                          marginBottom: 0,
                          paddingLeft: "20px",
                        }}
                      >
                        <li>Between spouses → Fully exempt</li>
                        <li>Parent ↔ child → Partial exemption (50%)</li>
                      </ul>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      ⏰ Important Timeline & Penalties
                    </h3>

                    <div className="tp-blog-details-list mb-30">
                      <li>Stamp duty must be paid within 30 days of signing</li>
                      <li>Late payment penalties:</li>
                      <li>RM50 or 10% (within 3 months)</li>
                      <li>RM100 or 20% (after 3 months)</li>
                    </div>

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
                        👉 Warning:
                      </h5>
                      <p style={{ color: "#856404", margin: 0 }}>
                        Late payment can increase your cost significantly—always
                        plan early.
                      </p>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      🔄 New System (2026): Self-Assessment
                    </h3>

                    <p className="mb-20">
                      Malaysia is moving toward a self-assessment system:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        Buyers (or lawyers) must calculate stamp duty themselves
                      </li>
                      <li>Responsibility is now on the taxpayer</li>
                      <li>Errors can lead to penalties in the future</li>
                    </ul>

                    <div
                      className="tp-blog-details-alert mb-30"
                      style={{
                        backgroundColor: "#e7f3ff",
                        border: "1px solid #b3d9ff",
                        padding: "15px",
                        borderRadius: "8px",
                      }}
                    >
                      <h5 style={{ color: "#0066cc", marginBottom: "10px" }}>
                        👉 Important:
                      </h5>
                      <p style={{ color: "#0066cc", margin: 0 }}>
                        This means accuracy and proper documentation are more
                        important than ever.
                      </p>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      🧮 Example Calculation
                    </h3>

                    <p className="mb-20">
                      Let's say you buy a property worth RM750,000:
                    </p>

                    <div
                      className="tp-blog-details-calculation mb-30"
                      style={{
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        padding: "20px",
                        borderRadius: "8px",
                      }}
                    >
                      <div style={{ marginBottom: "10px" }}>
                        <strong>First RM100,000 → 1% = RM1,000</strong>
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Next RM400,000 → 2% = RM8,000</strong>
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Remaining RM250,000 → 3% = RM7,500</strong>
                      </div>
                      <div
                        style={{
                          marginTop: "15px",
                          paddingTop: "15px",
                          borderTop: "1px solid #dee2e6",
                        }}
                      >
                        <strong>👉 Total Stamp Duty = RM16,500</strong>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            color: "#666",
                            fontSize: "14px",
                          }}
                        >
                          (Excludes loan and SPA duty)
                        </p>
                      </div>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      💡 Smart Tips for Property Buyers
                    </h3>

                    <ul className="tp-blog-details-list mb-30">
                      <li>✔️ Always budget for stamp duty early</li>
                      <li>
                        ✔️ Check if you qualify for first-time buyer exemption
                      </li>
                      <li>
                        ✔️ Compare total cost (price + legal + stamp duty)
                      </li>
                      <li>✔️ Consult a lawyer for accurate calculation</li>
                      <li>✔️ Avoid late stamping penalties</li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      🏁 Final Thoughts
                    </h3>

                    <p className="mb-20">
                      Stamp duty is a mandatory and significant cost in any
                      property transaction in Malaysia. With the 2026
                      updates—especially the higher rate for foreign buyers and
                      the shift to self-assessment—buyers must be more informed
                      than ever.
                    </p>

                    <p className="mb-30">
                      Understanding how stamp duty works will help you:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Avoid unexpected costs</li>
                      <li>Plan your finances better</li>
                      <li>Make smarter property decisions</li>
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
                        🏠 Pro Tip
                      </h3>
                      <p style={{ margin: 0 }}>
                        When buying a property, don't just ask:
                      </p>
                      <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                        👉 "Can I afford the house?"
                      </p>
                      <p style={{ margin: 0 }}>Ask:</p>
                      <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                        👉 "Can I afford the total cost including stamp duty?"
                      </p>
                      <p style={{ margin: "10px 0 0 0" }}>
                        Stay informed, plan wisely, and make confident property
                        decisions in Malaysia!
                      </p>
                    </div>
                  </div>

                  <div className="tp-blog-details-tag mb-35">
                    <span>Tags:</span>
                    <Link href="#">Stamp Duty</Link>
                    <Link href="#">Malaysia Property</Link>
                    <Link href="#">Property Tax</Link>
                    <Link href="#">Home Buying</Link>
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
              {/* Sidebar */}
              <div className="tp-blog-sidebar">
                {/* Category Widget */}
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

                {/* Recent Posts */}
                <RecentPosts currentSlug="/blog/Stamp-Duty-in-Malaysia-Property" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
