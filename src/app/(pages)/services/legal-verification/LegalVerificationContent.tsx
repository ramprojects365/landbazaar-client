import Link from "next/link";
import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import "../../blog/blog-page.scss";
import "./legal-verification.scss";

const checklist = [
  {
    category: "Ownership / Title",
    documents:
      "Mother Deed, Title Deeds, Registered Sale/Gift/Partition Deeds, Power of Attorney (if applicable)",
  },
  {
    category: "Revenue Records",
    documents:
      "Pattadar Passbook, Dharani Pahani/ROR-1B, Mutation Certificate, Tax Receipts",
  },
  {
    category: "Financial / Liabilities",
    documents:
      "Encumbrance Certificate (13–30 yrs), Bank NOC / Mortgage Discharge Deed",
  },
  {
    category: "Layout & Construction",
    documents:
      "HMDA / DTCP Final Layout Approval, NALA Conversion Certificate, TSRERA Registration",
  },
  {
    category: "Survey & Boundaries",
    documents: "Tippani / Cadastral Map, Physical Survey Report",
  },
];

const opinionStatuses = [
  {
    title: "Clear & Marketable Title",
    body: "Safe for purchase, registration, and bank loan processing.",
  },
  {
    title: "Conditional Title",
    body: "Safe only after specific conditions are met (e.g., obtaining a Bank NOC or updating mutation).",
  },
  {
    title: "Defective / Unmarketable Title",
    body: "High legal risk; purchase should be avoided.",
  },
];

export default function LegalVerificationContent() {
  return (
    <main className="blog-page legal-verification-page">
      <BreadcrumbArea title="Legal Verification" showBackground={false} />
      <section className="tp-blog-details-area pt-40 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="tp-blog-details-wrapper">
                <div className="tp-blog-details-content">
                  <div className="tp-blog-details-text">
                    <h1 className="tp-blog-details-title mb-30">
                      Legal Verification of Property in Hyderabad: The Complete
                      Due Diligence Guide
                    </h1>

                    <p className="mb-20">
                      Whether you are investing in a farmland plot in
                      Narayankhed, a residential site in Shadnagar, or a
                      high-end layout in Shankarpally, one rule stands above
                      all in real estate: Never buy a property based on trust
                      alone.
                    </p>

                    <p className="mb-30">
                      A Legal Verification (also known as a Property Legal
                      Opinion or Due Diligence) is a comprehensive
                      investigation into a property’s ownership history,
                      regulatory approvals, and legal status. Performing
                      thorough legal due diligence ensures that your
                      hard-earned capital is safe from litigation, title
                      disputes, and unmarketable land.
                    </p>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Why is Legal Verification Essential in Hyderabad?
                    </h2>

                    <p className="mb-20">
                      Hyderabad’s real estate market has experienced rapid
                      expansion, leading to complex land ownership structures.
                      Common risks that legal verification uncovers include:
                    </p>

                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>Disputed Ownership:</strong> Multiple claims by
                        family members or joint legal heirs.
                      </li>
                      <li>
                        <strong>Encumbered Properties:</strong> Undisclosed
                        bank loans, mortgages, or court attachments.
                      </li>
                      <li>
                        <strong>Prohibited Lands:</strong> Illegal sale of
                        Government land, Assigned land (Lavoni Patta), or
                        Wakf/Endowment properties.
                      </li>
                      <li>
                        <strong>Unapproved Layouts:</strong> Plots sold without
                        mandatory HMDA or DTCP layout approvals.
                      </li>
                    </ul>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      The 6-Step Legal Verification Process in Telangana
                    </h2>

                    <h3 className="legal-verification-page__step-title mb-15">
                      Step 1: Chain of Title Analysis (13–30 Years)
                    </h3>
                    <p className="mb-20">
                      A senior property advocate traces the complete chain of
                      transfers from the original owner to the current seller.
                    </p>
                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>What to check:</strong> Mother Deed (original
                        document), Sale Deeds, Gift Deeds, Partition Deeds,
                        Release Deeds, or Succession Certificates.
                      </li>
                      <li>
                        <strong>Goal:</strong> Ensure there are no missing
                        links or breaks in the ownership chain over at least 30
                        years.
                      </li>
                    </ul>

                    <h3 className="legal-verification-page__step-title mb-15">
                      Step 2: Revenue Records Search (Dharani Portal &amp;
                      Municipal Data)
                    </h3>
                    <p className="mb-20">
                      Revenue documents confirm whether the property details
                      match government records.
                    </p>
                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>Farmland Verification:</strong> Verify Pattadar
                        Passbook details, Pahani/ROR-1B records, and land
                        classification on Telangana’s{" "}
                        <Link href="/services/dharani-title-check">
                          Dharani Portal
                        </Link>
                        .
                      </li>
                      <li>
                        <strong>Urban/Plot Verification:</strong> Check
                        GHMC/HMDA Mutation Certificates, Khata extracts, and
                        Property Tax Payment receipts.
                      </li>
                    </ul>

                    <h3 className="legal-verification-page__step-title mb-15">
                      Step 3: Encumbrance Certificate (EC) Audit
                    </h3>
                    <p className="mb-20">
                      An Encumbrance Certificate records all registered
                      financial and legal transactions tied to a specific
                      survey number or plot.
                    </p>
                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>Goal:</strong> Confirm the property is free
                        from undischarged bank mortgages, liens, or court
                        attachments.
                      </li>
                      <li>
                        <strong>Duration:</strong> An EC spanning 13 to 30
                        years should be downloaded and audited.
                      </li>
                    </ul>

                    <h3 className="legal-verification-page__step-title mb-15">
                      Step 4: Layout &amp; Planning Authority Approvals
                    </h3>
                    <p className="mb-20">
                      Purchasing an unapproved plot can lead to legal penalties
                      or demolition risks.
                    </p>
                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>Regulatory Bodies:</strong> Confirm whether the
                        layout is approved by HMDA (Hyderabad Metropolitan
                        Development Authority), DTCP (Directorate of Town and
                        Country Planning), or local UDA authorities.
                      </li>
                      <li>
                        <strong>RERA Compliance:</strong> For projects
                        exceeding 500 sq. meters or 8 plots, verify that the
                        project is registered under TSRERA (Telangana Real
                        Estate Regulatory Authority).
                      </li>
                    </ul>

                    <h3 className="legal-verification-page__step-title mb-15">
                      Step 5: Physical Survey &amp; Boundary Audit
                    </h3>
                    <p className="mb-20">
                      Legal paperwork must match physical reality.
                    </p>
                    <ul className="tp-blog-details-list mb-30">
                      <li>
                        <strong>Action:</strong> Engage a qualified surveyor to
                        measure the plot against the official survey map
                        (Bhu-Naksha) or approved layout plan.
                      </li>
                      <li>
                        <strong>Goal:</strong> Verify clear boundaries, ensure
                        proper road access, and confirm the land does not
                        encroach on FTL (Full Tank Level) lake zones or buffer
                        boundaries.
                      </li>
                    </ul>

                    <h3 className="legal-verification-page__step-title mb-15">
                      Step 6: Litigation Search
                    </h3>
                    <p className="mb-30">
                      Check local civil court records and revenue tribunals for
                      any active or pending litigation involving the property,
                      survey number, or current/previous owners.
                    </p>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      Legal Verification Document Checklist
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
                              Document Category
                            </th>
                            <th style={{ padding: "12px", textAlign: "left" }}>
                              Key Documents Needed
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {checklist.map((row) => (
                            <tr key={row.category}>
                              <td
                                style={{
                                  padding: "12px",
                                  border: "1px solid #dee2e6",
                                  fontWeight: 700,
                                  color: "#003B5C",
                                  width: "32%",
                                }}
                              >
                                {row.category}
                              </td>
                              <td
                                style={{
                                  padding: "12px",
                                  border: "1px solid #dee2e6",
                                }}
                              >
                                {row.documents}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <h2 className="tp-blog-details-subtitle mb-20">
                      The Final Step: Written Legal Opinion
                    </h2>
                    <p className="mb-20">
                      Once all checks are complete, a senior real estate lawyer
                      issues a formal Legal Opinion Report. This document
                      categorizes the property into one of three statuses:
                    </p>

                    <div className="legal-verification-page__statuses mb-30">
                      {opinionStatuses.map((status) => (
                        <article key={status.title}>
                          <h3>{status.title}</h3>
                          <p>{status.body}</p>
                        </article>
                      ))}
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
                        The small cost of getting a professional legal
                        verification done before buying land is a fraction of
                        the cost of long-drawn-out legal battles. Never skip
                        due diligence when investing in real estate.
                      </p>
                    </div>

                    <div className="legal-verification-page__cta">
                      <h2>
                        Looking for pre-verified, hassle-free farmlands in
                        Telangana?
                      </h2>
                      <p>
                        Explore verified projects on Dekho Land after you
                        complete legal due diligence.
                      </p>
                      <div className="d-flex flex-wrap gap-3">
                        <Link className="tp-btn" href="/search">
                          Explore verified listings
                        </Link>
                        <Link
                          className="tp-btn"
                          href="/services/dharani-title-check"
                        >
                          Dharani Title Check guide
                        </Link>
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
