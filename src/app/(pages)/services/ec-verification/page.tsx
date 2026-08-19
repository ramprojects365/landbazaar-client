import { Metadata } from "next";
import Link from "next/link";
import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import "../../blog/blog-page.scss";
import "./ec-verification.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dekholand.com"),
  title:
    "EC Verification in Telangana: The Ultimate Guide to Checking Property Liabilities | Dekho Land",
  description:
    "Learn how to check an Encumbrance Certificate (EC) in Telangana via IGRS and Dharani. Understand Form 15 vs Form 16, search steps, red flags, and limitations before buying plots or farmland around Hyderabad.",
  keywords:
    "EC verification Telangana, encumbrance certificate Hyderabad, IGRS Telangana EC search, Form 15 Form 16 EC, Dharani EC check, property liabilities Telangana, mortgage discharge deed, Shankarpally plots, Shadnagar land, Sangareddy farmland",
  alternates: {
    canonical: "/services/ec-verification",
  },
  openGraph: {
    title:
      "EC Verification in Telangana: The Ultimate Guide to Checking Property Liabilities",
    description:
      "Step-by-step guide to checking Encumbrance Certificates on IGRS Telangana and Dharani before buying land around Hyderabad.",
    url: "https://www.dekholand.com/services/ec-verification",
    siteName: "Dekho Land",
    type: "article",
  },
  twitter: {
    card: "summary",
    title:
      "EC Verification in Telangana: The Ultimate Guide to Checking Property Liabilities",
    description:
      "Step-by-step guide to checking Encumbrance Certificates on IGRS Telangana and Dharani before buying land around Hyderabad.",
  },
};

const redFlags = [
  {
    flag: "Mortgage Deed (Lien)",
    meaning:
      "The land was pledged to a bank or financial institution for a loan.",
    action:
      "Demand an official Mortgage Discharge Deed / Bank No-Objection Certificate (NOC) from the seller.",
  },
  {
    flag: "Court Attachment Order",
    meaning:
      "A civil court has frozen the property due to pending litigation or recovery cases.",
    action: "Do not proceed until court clearance documents are obtained.",
  },
  {
    flag: "Multiple Quick Sales",
    meaning:
      "The land was bought and resold several times within a short duration.",
    action:
      "Investigating suspicious ownership flipping requires a full chain-of-title review.",
  },
  {
    flag: "Missing Sale/Gift Deed",
    meaning:
      "A transaction occurred in the physical title deed history but doesn't reflect on the digital EC.",
    action:
      "Request a manual check at the local SRO office to reconcile old physical register books.",
  },
];

export default function EcVerificationPage() {
  return (
    <main className="blog-page ec-verification-page">
      <BreadcrumbArea title="EC Verification" showBackground={false} />
      <section className="tp-blog-details-area pt-40 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="tp-blog-details-wrapper">
                <div className="tp-blog-details-content">
                  <div className="tp-blog-details-text">
                    <h1 className="tp-blog-details-title mb-30">
                      EC Verification in Telangana: The Ultimate Guide to
                      Checking Property Liabilities
                    </h1>

                    <p className="mb-20">
                      When buying a plot or farmland in and around
                      Hyderabad—whether in Shankarpally, Shadnagar, Sangareddy,
                      or Narayankhed—confirming that the land has zero legal or
                      financial burdens is essential.
                    </p>

                    <p className="mb-30">
                      An Encumbrance Certificate (EC) is the single most
                      important legal document that tracks every registered
                      transaction on a property over a given time period.
                      Performing a thorough EC Verification ensures the land
                      you buy is free from hidden bank mortgages, court
                      attachments, or third-party liabilities.
                    </p>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      What is an Encumbrance Certificate (EC)?
                    </h2>
                    <p className="mb-30">
                      An EC provides an official financial and ownership
                      timeline of a property. It confirms whether the current
                      seller has full legal authority to sell or if the
                      property has been pledged as collateral for loans or tied
                      up in legal disputes.
                    </p>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Form 15 vs. Form 16: What’s the Difference?
                    </h2>
                    <div className="ec-verification-page__forms mb-30">
                      <article>
                        <span>Form 15</span>
                        <h3>Encumbrance Statement</h3>
                        <p>
                          Issued if there are active registered transactions
                          (sales, mortgages, gifts, partition deeds) on the
                          land during the requested period. It lists all
                          document numbers, transaction dates, and parties
                          involved.
                        </p>
                      </article>
                      <article>
                        <span>Form 16</span>
                        <h3>Nil Encumbrance Certificate</h3>
                        <p>
                          Issued if no registered transactions occurred during
                          the search period. This confirms the property was
                          completely clear of any registered liabilities for
                          those specific years.
                        </p>
                      </article>
                    </div>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Where to Perform EC Search in Telangana?
                    </h2>
                    <p className="mb-20">
                      In Telangana, EC searches depend on whether the property
                      is urban or agricultural and when it was registered:
                    </p>
                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>Urban Properties &amp; Pre-2020 Agricultural Land:</strong>{" "}
                        Checked via the{" "}
                        <a
                          href="https://registration.telangana.gov.in"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          IGRS Telangana Portal (registration.telangana.gov.in)
                        </a>{" "}
                        maintained by the Registration &amp; Stamps Department.
                      </li>
                      <li>
                        <strong>Post-2020 Agricultural Land:</strong> Managed
                        and verified directly via the{" "}
                        <a
                          href="https://dharani.telangana.gov.in"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Dharani Portal (dharani.telangana.gov.in)
                        </a>
                        . See also our{" "}
                        <Link href="/services/dharani-title-check">
                          Dharani Title Check guide
                        </Link>
                        .
                      </li>
                    </ul>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Step-by-Step Guide: How to Check EC Online via IGRS
                      Telangana
                    </h2>

                    <h3 className="ec-verification-page__step-title mb-15">
                      Step 1: Access the Portal
                    </h3>
                    <ol className="tp-blog-details-list mb-30">
                      <li>
                        Visit the official website:{" "}
                        <a
                          href="https://registration.telangana.gov.in"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          registration.telangana.gov.in
                        </a>
                        .
                      </li>
                      <li>
                        Create an account or log in with your registered mobile
                        number.
                      </li>
                    </ol>

                    <h3 className="ec-verification-page__step-title mb-15">
                      Step 2: Select &quot;Encumbrance Search&quot;
                    </h3>
                    <ol className="tp-blog-details-list mb-30">
                      <li>
                        On the homepage, click on Encumbrance Search under
                        online services.
                      </li>
                      <li>
                        Read the disclaimer detailing search guidelines and
                        click Submit.
                      </li>
                    </ol>

                    <h3 className="ec-verification-page__step-title mb-15">
                      Step 3: Choose Search Criteria
                    </h3>
                    <p className="mb-20">
                      You can search through two primary parameters:
                    </p>
                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>By Document No. &amp; Year:</strong> Enter the
                        registered document number, SRO (Sub-Registrar Office)
                        name, and registration year from past sale deeds.
                      </li>
                      <li>
                        <strong>By Property Details:</strong> Select the
                        District, Mandal, Village, and enter the
                        Survey/Sub-division Number or House/Plot Number.
                      </li>
                    </ul>

                    <h3 className="ec-verification-page__step-title mb-15">
                      Step 4: Specify the Search Period
                    </h3>
                    <p className="mb-30">
                      Choose the verification timeframe. While financial
                      institutions typically ask for 13 to 15 years of EC
                      records for home loans, getting a 30-year EC check is
                      recommended for complete legal security.
                    </p>

                    <h3 className="ec-verification-page__step-title mb-15">
                      Step 5: Review &amp; Download
                    </h3>
                    <p className="mb-30">
                      Click Submit to view the statement on-screen. Download
                      the generated PDF to review the entry details.
                    </p>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Critical Red Flags to Look Out for in an EC
                    </h2>
                    <div
                      className="tp-blog-details-table mb-30"
                      style={{ overflowX: "auto" }}
                    >
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          minWidth: "640px",
                        }}
                      >
                        <thead>
                          <tr style={{ background: "#003B5C", color: "#fff" }}>
                            <th style={{ padding: "12px", textAlign: "left" }}>
                              What You See on the EC
                            </th>
                            <th style={{ padding: "12px", textAlign: "left" }}>
                              What It Means
                            </th>
                            <th style={{ padding: "12px", textAlign: "left" }}>
                              Action Required
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {redFlags.map((row) => (
                            <tr key={row.flag}>
                              <td
                                style={{
                                  padding: "12px",
                                  border: "1px solid #dee2e6",
                                  fontWeight: 700,
                                  color: "#003B5C",
                                }}
                              >
                                {row.flag}
                              </td>
                              <td
                                style={{
                                  padding: "12px",
                                  border: "1px solid #dee2e6",
                                }}
                              >
                                {row.meaning}
                              </td>
                              <td
                                style={{
                                  padding: "12px",
                                  border: "1px solid #dee2e6",
                                }}
                              >
                                {row.action}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Limitations of an Encumbrance Certificate
                    </h2>
                    <p className="mb-20">
                      While essential, an EC does not catch every risk on its
                      own. Note these exceptions:
                    </p>
                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>Unregistered Transactions:</strong> Oral
                        partitions, unregistered wills, short-term lease
                        agreements, or equitable oral mortgages do not show up
                        on an EC.
                      </li>
                      <li>
                        <strong>Revenue Disputes:</strong> Mutation updates and
                        Gram Panchayat land tax details are managed separately
                        on revenue portals (like Dharani or local municipal
                        systems). Pair an EC with{" "}
                        <Link href="/legal-verification">
                          full legal verification
                        </Link>
                        .
                      </li>
                    </ul>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Key Takeaway for Investors
                    </h2>
                    <div
                      className="tp-blog-details-quote mb-30"
                      style={{
                        backgroundColor: "#f8faf9",
                        borderLeft: "4px solid #003B5C",
                        padding: "18px 20px",
                        borderRadius: "0 8px 8px 0",
                      }}
                    >
                      <p style={{ margin: 0 }}>
                        An Encumbrance Certificate is your shield against
                        fraud. Always pull a minimum 13- to 30-year EC before
                        paying booking tokens or executing sale agreements for
                        land around Hyderabad.
                      </p>
                    </div>

                    <div className="ec-verification-page__cta">
                      <h2>Want total peace of mind?</h2>
                      <p>
                        At Dekho Land, listed agricultural plots and farmland
                        ventures are presented for buyers who want clear titles
                        and verified ECs. Explore listings and complete your
                        due diligence before you buy.
                      </p>
                      <div className="d-flex flex-wrap gap-3">
                        <Link className="tp-btn" href="/search">
                          Explore verified listings
                        </Link>
                        <a
                          className="tp-btn"
                          href="https://registration.telangana.gov.in"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open IGRS Telangana
                        </a>
                      </div>
                    </div>
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
