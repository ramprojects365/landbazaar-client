import { Metadata } from "next";
import Link from "next/link";
import RecentPosts from "@/components/Blog/RecentPosts";

export const metadata: Metadata = {
  metadataBase: new URL("https://landway.com"),
  title: "Can Non-Farmers Buy Agricultural Land in Telangana? | LandWay",
  description:
    "Learn whether non-farmers can buy agricultural land in Telangana, key legal rules, eligibility, restrictions, and due diligence steps before purchasing farmland.",
  keywords:
    "non-farmers buy agricultural land Telangana, agricultural land purchase Telangana, Telangana farmland eligibility, buy agri land Hyderabad, NALA conversion Telangana, Dharani land purchase rules",
  openGraph: {
    title: "Can Non-Farmers Buy Agricultural Land in Telangana?",
    description:
      "Clear guide on eligibility rules for non-farmers buying agricultural land in Telangana.",
    images: [
      "/assets/img/blog/10-essential-legal-documents-to-check-before-buying-a-plot-in-Hyderabad.png",
    ],
    type: "article",
  },
};

export default function NonFarmersAgriLandTelanganaBlog() {
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
                      Can Non-Farmers Buy Agricultural Land in Telangana?
                    </h3>

                    <p className="mb-30">
                      Yes — in Telangana, any Indian citizen can generally
                      purchase agricultural land, including non-farmers. This is
                      different from states that still restrict agri-land sales
                      primarily to agriculturists. Even so, buyers should
                      complete full legal due diligence before paying an advance.
                    </p>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Key Points to Verify Before Buying
                    </h3>

                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        Confirm clear title and mutation on the Dharani / Bhu
                        Bharati portal.
                      </li>
                      <li>
                        Check that the survey number is not blocked under
                        Section 22-A or listed as assigned / prohibited land.
                      </li>
                      <li>
                        Obtain a 30-year Encumbrance Certificate (EC) and review
                        link documents.
                      </li>
                      <li>
                        Confirm access road rights and water availability for
                        farmland use.
                      </li>
                      <li>
                        If you plan non-agricultural use or construction beyond
                        farmhouse limits, check NALA conversion requirements.
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
                        Pro Tip
                      </h3>
                      <p style={{ margin: 0 }}>
                        Eligibility to buy is only the first step. Always
                        verify ownership, encumbrance status, and prohibited-list
                        status before committing funds.
                      </p>
                    </div>
                  </div>

                  <div className="tp-blog-details-tag mb-35">
                    <span>Tags:</span>
                    <Link href="#">Telangana Land</Link>
                    <Link href="#">Agricultural Land</Link>
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
                          Tips &amp; Guides <span>(15)</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <RecentPosts currentSlug="can-non-farmers-buy-agricultural-land-in-telangana" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
