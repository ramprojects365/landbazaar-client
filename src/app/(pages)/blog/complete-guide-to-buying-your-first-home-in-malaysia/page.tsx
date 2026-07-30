import { Metadata } from "next";
import Link from "next/link";
import RecentPosts from "@/components/Blog/RecentPosts";

export const metadata: Metadata = {
  metadataBase: new URL("https://propertyla.com.my"),
  title: "Complete Guide to Buying Your First Home in Malaysia | PropertyLa",
  description:
    "Step-by-step guide for first-time homebuyers in Malaysia. Learn about eligibility, financing, hidden costs, legal processes, and tips to make your dream home a reality.",
  keywords:
    "first home buyer Malaysia 2026, buying first home guide Malaysia, Malaysia home loan for beginners, property purchase process Malaysia, first time buyer benefits Malaysia, PR1MA Malaysia, MyFirstHome scheme Malaysia, first home loan Malaysia, BSN first home, first house buyer Malaysia",
  openGraph: {
    title: "Complete Guide to Buying Your First Home in Malaysia",
    description:
      "Step-by-step guide for first-time homebuyers in Malaysia. Learn about eligibility, financing, and the purchase process.",
    images: ["/assets/img/blog/Stamp-Duty-in-Malaysia-Property.png"],
    type: "article",
  },
};

export default function FirstHomeGuide() {
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
                      Complete Guide to Buying Your First Home in Malaysia
                    </h3>

                    <p className="mb-30">
                      Buying your first home is an exciting milestone, but it
                      can also be overwhelming. This comprehensive guide will
                      walk you through every step of the home buying process in
                      Malaysia, from assessing your finances to getting your
                      keys.
                    </p>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Step 1: Assess Your Financial Readiness
                    </h3>

                    <p className="mb-20">
                      Before you start house hunting, it's crucial to understand
                      your financial position.
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Calculate your monthly income and expenses</li>
                      <li>Check your credit score (CTOS/CCRIS)</li>
                      <li>
                        Determine your budget (housing loan should not exceed
                        30-40% of income)
                      </li>
                      <li>
                        Save for down payment (typically 10% of property price)
                      </li>
                      <li>
                        Prepare additional funds for legal fees, stamp duty, and
                        renovation
                      </li>
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
                        💰 Financial Planning Tip:
                      </h5>
                      <p style={{ color: "#856404", margin: 0 }}>
                        Use the 28/36 rule: Your housing expenses should not
                        exceed 28% of your gross monthly income, and total debt
                        payments should not exceed 36%.
                      </p>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Step 2: Understand First-Time Buyer Schemes
                    </h3>

                    <p className="mb-20">
                      Malaysia offers several schemes to help first-time
                      homebuyers:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>MyFirstHome Scheme:</strong> For first-time
                        buyers with monthly income ≤ RM5,000
                      </li>
                      <li>
                        <strong>PR1MA:</strong> Affordable housing for Malaysian
                        citizens
                      </li>
                      <li>
                        <strong>Stamp Duty Exemption:</strong> First-time buyers
                        enjoy stamp duty exemption on the first RM300,000
                      </li>
                      <li>
                        <strong>Rumah Wilayah Persekutuan:</strong> Affordable
                        homes in Kuala Lumpur
                      </li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Step 3: Get Pre-Approved for a Loan
                    </h3>

                    <p className="mb-20">
                      Getting pre-approved helps you understand your borrowing
                      capacity and strengthens your position when making offers.
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Compare loan packages from at least 3 banks</li>
                      <li>Understand interest rates (BLR vs fixed rate)</li>
                      <li>
                        Check lock-in periods and early settlement penalties
                      </li>
                      <li>Consider MRTA (Mortgage Reducing Term Assurance)</li>
                      <li>
                        Prepare necessary documents (IC, income proof, EPF
                        statements)
                      </li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Step 4: Start House Hunting
                    </h3>

                    <p className="mb-20">
                      Now comes the exciting part - finding your dream home!
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Define your must-haves vs nice-to-haves</li>
                      <li>Research locations based on your lifestyle needs</li>
                      <li>
                        Consider proximity to work, schools, and amenities
                      </li>
                      <li>Visit properties at different times of day</li>
                      <li>Check neighborhood development plans</li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Step 5: Make an Offer and Sign SPA
                    </h3>

                    <p className="mb-20">
                      Once you've found your ideal property, it's time to make
                      it official.
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Negotiate the price with the seller/developer</li>
                      <li>Pay the booking fee (typically 2-3%)</li>
                      <li>
                        Engage a lawyer to review the Sale & Purchase Agreement
                        (SPA)
                      </li>
                      <li>Sign the SPA within 14 days of booking</li>
                      <li>Pay the down payment (10% minus booking fee)</li>
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
                        ⚖️ Legal Protection:
                      </h5>
                      <p style={{ color: "#155724", margin: 0 }}>
                        Always have your lawyer review the SPA before signing.
                        Ensure all verbal promises from the developer are
                        written in the agreement.
                      </p>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Step 6: Complete the Purchase
                    </h3>

                    <p className="mb-20">
                      The final steps before getting your keys:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>Bank releases loan (typically within 3 months)</li>
                      <li>Pay stamp duty and legal fees</li>
                      <li>Transfer of title (strata title for condos)</li>
                      <li>Handover of keys</li>
                      <li>
                        Register for utilities (water, electricity, internet)
                      </li>
                    </ul>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Additional Costs to Budget For
                    </h3>

                    <p className="mb-20">
                      Beyond the property price, expect these costs:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>Legal Fees:</strong> Approximately 1% of
                        property price
                      </li>
                      <li>
                        <strong>Stamp Duty:</strong> 1-3% depending on property
                        value
                      </li>
                      <li>
                        <strong>Valuation Fee:</strong> RM200-500
                      </li>
                      <li>
                        <strong>Renovation:</strong> RM20,000-100,000 depending
                        on scope
                      </li>
                      <li>
                        <strong>Moving Costs:</strong> RM1,000-3,000
                      </li>
                      <li>
                        <strong>Maintenance Fees:</strong> RM200-500/month for
                        condos
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
                        🏠 Pro Tip for First-Time Buyers
                      </h3>
                      <p style={{ margin: 0 }}>
                        Don't rush into buying. Take your time to research,
                        compare options, and ensure you're financially ready. A
                        home is a long-term commitment, so make sure it aligns
                        with your future plans.
                      </p>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Conclusion
                    </h3>

                    <p className="mb-20">
                      Buying your first home is a journey that requires careful
                      planning and patience. By following this guide and doing
                      your due diligence, you can make informed decisions and
                      avoid common pitfalls.
                    </p>

                    <p className="mb-30">
                      Remember, your first home doesn't have to be your forever
                      home. Focus on what you can afford now, and upgrade later
                      as your financial situation improves.
                    </p>
                  </div>

                  <div className="tp-blog-details-tag mb-35">
                    <span>Tags:</span>
                    <Link href="#">First Home Buyer</Link>
                    <Link href="#">Home Buying Guide</Link>
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

                <RecentPosts currentSlug="/blog/complete-guide-to-buying-your-first-home-in-malaysia" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
