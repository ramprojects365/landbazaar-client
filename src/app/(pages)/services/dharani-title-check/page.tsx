import { Metadata } from "next";
import Link from "next/link";
import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import "../../blog/blog-page.scss";
import "./dharani-title-check.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dekholand.com"),
  title:
    "Dharani Title Check: How to Verify Telangana Land Ownership Before You Buy | Dekho Land",
  description:
    "Learn how to complete a Dharani Title Check on dharani.telangana.gov.in. Verify Pattadar details, survey numbers, land classification, encumbrance certificates, and prohibited lands before buying plots or farmland around Hyderabad.",
  keywords:
    "Dharani Title Check, Dharani portal Telangana, verify land ownership Telangana, Pattadar passbook check, encumbrance certificate Telangana, prohibited lands Dharani, Bhu-Naksha cadastral map, Shankarpally land verification, Shadnagar plots, Sangareddy farmland",
  alternates: {
    canonical: "/services/dharani-title-check",
  },
  openGraph: {
    title:
      "Dharani Title Check: How to Verify Telangana Land Ownership Before You Buy",
    description:
      "Use Telangana’s Dharani portal to verify ownership, land classification, and legal encumbrances before buying farmland or plots around Hyderabad.",
    url: "https://www.dekholand.com/services/dharani-title-check",
    siteName: "Dekho Land",
    type: "article",
  },
  twitter: {
    card: "summary",
    title:
      "Dharani Title Check: How to Verify Telangana Land Ownership Before You Buy",
    description:
      "Use Telangana’s Dharani portal to verify ownership, land classification, and legal encumbrances before buying farmland or plots around Hyderabad.",
  },
};

const redFlags = [
  {
    flag: "Name Mismatch",
    meaning:
      "Name on Dharani differs from the seller’s Aadhaar/Pattadar book.",
    action:
      "Ask the seller to complete a mutation or succession update first.",
  },
  {
    flag: "Pattadar Passbook Not Issued",
    meaning: "Land details exist, but digital passbook is pending.",
    action:
      "Requires NALA or passbook ratification via the Revenue Department before sale.",
  },
  {
    flag: "Existing Mortgages",
    meaning: "Bank liens or private charges recorded on the EC.",
    action:
      "Demand a formal No Objection Certificate (NOC) / clearance letter from the lender.",
  },
  {
    flag: "Joint Pattadar Holdings",
    meaning: "Multiple family members listed under one survey number.",
    action:
      "All legal heirs/pattadars must sign the sale deed or execute an official Power of Attorney (GPA).",
  },
];

export default function DharaniTitleCheckPage() {
  return (
    <main className="blog-page dharani-title-check-page">
      <BreadcrumbArea title="Dharani Title Check" showBackground={false} />
      <section className="tp-blog-details-area pt-40 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="tp-blog-details-wrapper">
                <div className="tp-blog-details-content">
                  <div className="tp-blog-details-text">
                    <h1 className="tp-blog-details-title mb-30">
                      Dharani Title Check: How to Verify Telangana Land
                      Ownership Before You Buy
                    </h1>

                    <p className="mb-20">
                      Buying farmland or plot ventures around Hyderabad—whether
                      in Shankarpally, Shadnagar, Sangareddy, or
                      Narayankhed—is an exciting investment. However, nothing
                      is more critical than confirming that the seller actually
                      holds a clean, dispute-free title.
                    </p>

                    <p className="mb-30">
                      Enter the{" "}
                      <a
                        href="https://dharani.telangana.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Dharani Portal (dharani.telangana.gov.in)
                      </a>
                      , Telangana’s official Integrated Land Records Management
                      System. Dharani allows buyers to perform a comprehensive
                      Title Check to verify ownership, check land
                      classification, and uncover legal encumbrances before
                      paying a single rupee in advance.
                    </p>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      What is a &quot;Dharani Title Check&quot;?
                    </h2>

                    <p className="mb-20">
                      A Dharani Title Check is the process of reviewing the
                      digital land records maintained by the Revenue Department
                      of Telangana. It provides a complete legal snapshot of a
                      land parcel, including:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>Pattadar Details:</strong> The legally
                        recognized owner&apos;s name and Pattadar Passbook
                        Number.
                      </li>
                      <li>
                        <strong>Extent &amp; Survey Number:</strong> The exact
                        acreage or square yards registered to that survey
                        number.
                      </li>
                      <li>
                        <strong>Land Classification:</strong> Whether it is
                        private Patta land, Government land, Assigned land
                        (Lavoni Patta), or Forest/Lake buffer zones.
                      </li>
                      <li>
                        <strong>Encumbrance Status:</strong> Any existing
                        mortgages, bank loans, court stays, or past
                        transactions tied to the property.
                      </li>
                    </ul>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Step-by-Step Guide: How to Perform a Dharani Title Check
                    </h2>

                    <h3 className="dharani-title-check-page__step-title mb-15">
                      Step 1: Check Land Details (Pahani &amp; ROR-1B)
                    </h3>

                    <ol className="tp-blog-details-list mb-20">
                      <li>
                        Visit the official website:{" "}
                        <a
                          href="https://dharani.telangana.gov.in"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          dharani.telangana.gov.in
                        </a>
                        .
                      </li>
                      <li>Click on Land Details Search.</li>
                      <li>
                        Choose your search mode: Survey No. / Sub-Division No.
                        or Pattadar Passbook Number.
                      </li>
                      <li>
                        Select the target District, Mandal, and Village from
                        the drop-down menus.
                      </li>
                      <li>
                        Enter the Survey Number and Captcha, then click Fetch.
                      </li>
                    </ol>

                    <div
                      className="tp-blog-details-success mb-30"
                      style={{
                        backgroundColor: "#d4edda",
                        border: "1px solid #c3e6cb",
                        padding: "15px",
                        borderRadius: "8px",
                      }}
                    >
                      <p style={{ margin: 0, color: "#155724" }}>
                        <strong>What to verify:</strong> Confirm that the name
                        on the screen matches the seller’s ID and that the
                        total extent (acres/guntas) matches what they claim to
                        be selling.
                      </p>
                    </div>

                    <h3 className="dharani-title-check-page__step-title mb-15">
                      Step 2: Search Encumbrance Certificate (EC)
                    </h3>

                    <p className="mb-20">
                      An Encumbrance Certificate proves whether the land is
                      free from monetary or legal liabilities.
                    </p>

                    <ol className="tp-blog-details-list mb-30">
                      <li>
                        Navigate to the Search Encumbrance Details section on
                        Dharani.
                      </li>
                      <li>
                        Input the survey details or past registered document
                        numbers.
                      </li>
                      <li>
                        Generate the EC statement to review historical sales,
                        gifts, mortgages, or bank liens registered against the
                        property.
                      </li>
                    </ol>

                    <h3 className="dharani-title-check-page__step-title mb-15">
                      Step 3: Check Prohibited Lands List
                    </h3>

                    <p className="mb-20">
                      Not all land listed in Dharani can be sold legally.
                    </p>

                    <ol className="tp-blog-details-list mb-30">
                      <li>
                        Access the Prohibited Lands / Dispute Registry tab.
                      </li>
                      <li>
                        Verify if the survey number falls under restricted
                        categories like Assigned Land, Government/TSIIC Land,
                        Wakf/Endowment, or Court Injunctions.
                      </li>
                      <li>
                        If a land parcel is in the prohibited list, Dharani
                        will block slot booking for registration automatically.
                      </li>
                    </ol>

                    <h3 className="dharani-title-check-page__step-title mb-15">
                      Step 4: Check Cadastral Map (Bhu-Naksha)
                    </h3>

                    <ol className="tp-blog-details-list mb-20">
                      <li>Click on Cadastral Maps on the portal.</li>
                      <li>
                        Select your District, Mandal, and Village to view the
                        visual survey map.
                      </li>
                    </ol>

                    <div
                      className="tp-blog-details-success mb-30"
                      style={{
                        backgroundColor: "#d4edda",
                        border: "1px solid #c3e6cb",
                        padding: "15px",
                        borderRadius: "8px",
                      }}
                    >
                      <p style={{ margin: 0, color: "#155724" }}>
                        <strong>What to verify:</strong> Check physical road
                        access, boundaries, and ensure the plot isn&apos;t
                        encroaching on FTL (Full Tank Level) lake zones or
                        buffer boundaries.
                      </p>
                    </div>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Red Flags to Watch Out For During a Title Search
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
                              Red Flag
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
                        Dharani has significantly improved transparency in
                        Telangana real estate, but online verification should
                        be your first step, not your last. Always pair a
                        Dharani Title Check with an on-the-ground physical
                        inspection and a formal legal opinion from a qualified
                        legal practitioner before closing any property deal.
                      </p>
                    </div>

                    <div className="dharani-title-check-page__cta">
                      <h2>Looking for pre-verified, hassle-free farmlands in Telangana?</h2>
                      <p>
                        Explore verified projects on Dekho Land and connect
                        with sellers after you have completed your Dharani
                        Title Check.
                      </p>
                      <div className="d-flex flex-wrap gap-3">
                        <Link className="tp-btn" href="/search">
                          Explore verified listings
                        </Link>
                        <a
                          className="tp-btn"
                          href="https://dharani.telangana.gov.in"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open Dharani Portal
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
