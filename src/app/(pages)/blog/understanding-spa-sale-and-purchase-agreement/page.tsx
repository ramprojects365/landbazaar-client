import { Metadata } from "next";
import Link from "next/link";
import RecentPosts from "@/components/Blog/RecentPosts";

export const metadata: Metadata = {
  metadataBase: new URL("https://propertyla.com.my"),
  title:
    "Understanding SPA (Sale and Purchase Agreement) in Malaysia | PropertyLa",
  description:
    "Learn about the Sale and Purchase Agreement (SPA) when buying property in Malaysia. Understand key clauses, legal obligations, and buyer protections.",
  keywords:
    "SPA Malaysia 2026, Sale and Purchase Agreement Malaysia, property legal documents Malaysia, buying property legal process Malaysia, property agreement Malaysia, SPA lawyer Malaysia, property lawyer Malaysia, legal fees SPA Malaysia, property purchase agreement Malaysia, Malaysia property legal guide",
  openGraph: {
    title: "Understanding SPA (Sale and Purchase Agreement) in Malaysia",
    description:
      "Learn about the Sale and Purchase Agreement (SPA) when buying property in Malaysia.",
    images: ["/assets/img/blog/Stamp-Duty-in-Malaysia-Property.png"],
    type: "article",
  },
};

export default function UnderstandingSPA() {
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
                      Understanding SPA (Sale and Purchase Agreement) in
                      Malaysia
                    </h3>

                    <p className="mb-30">
                      The Sale and Purchase Agreement (SPA) is the most
                      important legal document in any property transaction in
                      Malaysia. It outlines the terms and conditions of the
                      sale, protecting both buyer and seller. Understanding this
                      document is crucial before signing.
                    </p>

                    <p className="mb-30">
                      In this guide, we break down the key components of an SPA
                      and what you need to know before signing.
                    </p>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      What is an SPA?
                    </h3>

                    <p className="mb-20">
                      The SPA is a legally binding contract between the buyer
                      and seller that details:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Property description and details</li>
                      <li>Purchase price and payment terms</li>
                      <li>Completion timeline</li>
                      <li>Rights and obligations of both parties</li>
                      <li>Conditions precedent (if any)</li>
                      <li>Default clauses and remedies</li>
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
                        ⚖️ Legal Requirement:
                      </h5>
                      <p style={{ color: "#155724", margin: 0 }}>
                        The SPA must be signed within 14 days of paying the
                        booking fee. Always have your lawyer review the document
                        before signing.
                      </p>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Key Clauses in an SPA
                    </h3>

                    <p className="mb-20">
                      Understanding these essential clauses helps protect your
                      interests:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>Property Description:</strong> Address, lot
                        number, title details
                      </li>
                      <li>
                        <strong>Purchase Price:</strong> Total amount and
                        payment schedule
                      </li>
                      <li>
                        <strong>Completion Date:</strong> When the transaction
                        must be completed
                      </li>
                      <li>
                        <strong>Deposit:</strong> Amount paid and conditions for
                        refund
                      </li>
                      <li>
                        <strong>Vacant Possession:</strong> When you get the
                        keys
                      </li>
                      <li>
                        <strong>Defects Liability Period:</strong> Warranty
                        period for defects
                      </li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Payment Schedule
                    </h3>

                    <p className="mb-20">
                      The SPA outlines when payments are due:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>Booking Fee:</strong> 2-3% (paid upfront)
                      </li>
                      <li>
                        <strong>Down Payment:</strong> 10% total (minus booking
                        fee)
                      </li>
                      <li>
                        <strong>Progress Payments:</strong> For
                        under-construction properties
                      </li>
                      <li>
                        <strong>Final Payment:</strong> Upon completion
                      </li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      For Subsale Properties
                    </h3>

                    <p className="mb-20">
                      Additional considerations for resale properties:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Existing tenant arrangements</li>
                      <li>Furniture and fittings included</li>
                      <li>Utilities and service charges</li>
                      <li>Strata title status</li>
                      <li>Outstanding maintenance fees</li>
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
                        ⚠️ Important Check:
                      </h5>
                      <p style={{ color: "#856404", margin: 0 }}>
                        Ensure the seller has cleared all outstanding
                        maintenance fees, quit rent, and assessment taxes before
                        completion. These should be specified in the SPA.
                      </p>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      For New Developments
                    </h3>

                    <p className="mb-20">
                      Special clauses for developer properties:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        Progress payment schedule based on construction stages
                      </li>
                      <li>Defects liability period (usually 18-24 months)</li>
                      <li>Late delivery compensation</li>
                      <li>Size variation allowance (usually ±10%)</li>
                      <li>Marketing materials disclaimer</li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Default Clauses
                    </h3>

                    <p className="mb-20">
                      What happens if either party fails to fulfill obligations:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>Buyer Default:</strong> Deposit may be forfeited
                      </li>
                      <li>
                        <strong>Seller Default:</strong> Must return deposit
                        with interest
                      </li>
                      <li>
                        <strong>Specific Performance:</strong> Court order to
                        complete sale
                      </li>
                      <li>
                        <strong>Termination Rights:</strong> Conditions for
                        canceling the agreement
                      </li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Common SPA Issues
                    </h3>

                    <p className="mb-20">
                      Watch out for these potential problems:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Vague property descriptions</li>
                      <li>Unrealistic completion dates</li>
                      <li>Hidden fees not disclosed</li>
                      <li>Unfair penalty clauses</li>
                      <li>Missing warranties or guarantees</li>
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
                        🏠 Lawyer's Role
                      </h3>
                      <p style={{ margin: 0 }}>
                        Your lawyer will review the SPA, explain all clauses,
                        negotiate unfair terms, and ensure your interests are
                        protected. Never sign an SPA without legal review.
                      </p>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      After Signing the SPA
                    </h3>

                    <p className="mb-20">
                      What happens once the agreement is signed:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Lawyer submits SPA for stamping</li>
                      <li>Bank processes loan application</li>
                      <li>Searches and title transfer initiated</li>
                      <li>Progress payments made (for new properties)</li>
                      <li>Completion and handover</li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Conclusion
                    </h3>

                    <p className="mb-20">
                      The SPA is a critical document that protects your rights
                      as a property buyer. Take the time to understand every
                      clause, ask questions, and ensure you're comfortable with
                      all terms before signing.
                    </p>

                    <p className="mb-30">
                      Remember, once signed, the SPA is legally binding. Make
                      sure all verbal promises from the seller or developer are
                      written into the agreement.
                    </p>
                  </div>

                  <div className="tp-blog-details-tag mb-35">
                    <span>Tags:</span>
                    <Link href="#">Legal Documents</Link>
                    <Link href="#">Property Buying</Link>
                    <Link href="#">Malaysia Property</Link>
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

                <RecentPosts currentSlug="/blog/understanding-spa-sale-and-purchase-agreement" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
