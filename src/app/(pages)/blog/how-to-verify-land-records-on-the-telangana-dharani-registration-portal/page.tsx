import { Metadata } from "next";
import RecentPosts from "@/components/Blog/RecentPosts";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dekholand.com"),
  title:
    "How to Verify Land Records on the Telangana Dharani / Registration Portal | Dekho Land",
  description:
    "Complete guide to verifying land records on the Telangana Dharani portal (dharani.telangana.gov.in). Learn step-by-step methods to check ownership, survey details, encumbrance certificates, and registered sale deeds before buying property.",
  keywords:
    "Telangana Dharani portal, land records verification Telangana, Dharani land details search, encumbrance certificate Telangana, Pattadar passbook verification, survey number check Telangana, ROR-1B Telangana, land registration portal Telangana, property verification Telangana, Dharani portal guide",
  openGraph: {
    title: "How to Verify Land Records on the Telangana Dharani / Registration Portal",
    description:
      "Complete guide to verifying land records on the Telangana Dharani portal. Learn step-by-step methods to check ownership, survey details, and encumbrance certificates.",
    images: [
      "/assets/img/blog/verify-land-records-telangana-dharani-registration-portal.png",
    ],
    type: "article",
  },
};

export default function TelanganaDharaniBlog() {
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
                      How to Verify Land Records on the Telangana Dharani / Registration Portal
                    </h3>

                    <p className="mb-30">
                      Verifying land records on the official Telangana Dharani portal (dharani.telangana.gov.in) allows buyers and investors to confirm ownership, survey boundaries, and registered legal transactions before closing a deal.
                    </p>

                    <p className="mb-30">
                      The primary verification procedures on the portal include the following step-by-step methods:
                    </p>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Method 1: Check Ownership & Survey Details (Pahani & ROR-1B)
                    </h3>

                    <p className="mb-20">
                      This check confirms who owns the plot, the exact acreage, land type, and Pattadar passbook details.
                    </p>

                    <div
                      className="tp-blog-details-step mb-30"
                      style={{
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        padding: "20px",
                        borderRadius: "8px",
                      }}
                    >
                      <h5 style={{ marginBottom: "15px", color: "#003B5C" }}>
                        Step-by-Step Process:
                      </h5>
                      <ol style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                        <li style={{ marginBottom: "10px" }}>
                          <strong>Go to the official Dharani Telangana Portal</strong> - Visit dharani.telangana.gov.in
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                          <strong>Select Land Classification</strong> - On the homepage, select Agriculture or Non-Agriculture depending on the land classification
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                          <strong>Access Land Details Search</strong> - Click on Land Details Search under the Citizen Services section
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                          <strong>Choose Search Criteria</strong> - Select one of the following:
                          <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
                            <li>Search by Survey No. / Sub-Division No.</li>
                            <li>Search by Pattadar Passbook Number (PPB)</li>
                          </ul>
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                          <strong>Select Location Details</strong> - Select the District, Mandal, and Village from the drop-down menus
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                          <strong>Enter Details and Fetch</strong> - Enter the specific Survey/Sub-Division Number or Khata Number, input the Captcha, and click Fetch
                        </li>
                      </ol>
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
                        ✅ What to verify:
                      </h5>
                      <ul style={{ color: "#155724", margin: 0, paddingLeft: "20px" }}>
                        <li>Check that the listed Pattadar (Owner) name matches the seller's claims</li>
                        <li>Verify total land area (in Acres/Guntas)</li>
                        <li>Ensure there are no legal disputes marked under the land status</li>
                      </ul>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Method 2: Check Encumbrance Certificate (EC)
                    </h3>

                    <p className="mb-20">
                      The Encumbrance Certificate reveals whether the property has existing bank mortgages, court attachments, or prior sale liabilities.
                    </p>

                    <div
                      className="tp-blog-details-step mb-30"
                      style={{
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        padding: "20px",
                        borderRadius: "8px",
                      }}
                    >
                      <h5 style={{ marginBottom: "15px", color: "#003B5C" }}>
                        Step-by-Step Process:
                      </h5>
                      <ol style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                        <li style={{ marginBottom: "10px" }}>
                          <strong>Access EC Search</strong> - On the Dharani homepage, click Search Encumbrance Details
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                          <strong>Login or Sign Up</strong> - Log in using your mobile number and OTP (or complete a quick sign-up if first time)
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                          <strong>Enter Location Details</strong> - Select the District, Mandal, Village, and enter the Survey Number
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                          <strong>Generate Certificate</strong> - Click Fetch to generate the digital Encumbrance Certificate
                        </li>
                      </ol>
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
                        ✅ What to verify:
                      </h5>
                      <p style={{ color: "#155724", margin: 0 }}>
                        Ensure the statement shows clean transactions without ongoing mortgages or legal claims attached to the survey number.
                      </p>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Method 3: Check Registered Sale Deeds & Title History
                    </h3>

                    <p className="mb-20">
                      To verify if past sale deeds or transactions registered at the Sub-Registrar Office (SRO) are genuine:
                    </p>

                    <div
                      className="tp-blog-details-step mb-30"
                      style={{
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        padding: "20px",
                        borderRadius: "8px",
                      }}
                    >
                      <h5 style={{ marginBottom: "15px", color: "#003B5C" }}>
                        Step-by-Step Process:
                      </h5>
                      <ol style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                        <li style={{ marginBottom: "10px" }}>
                          <strong>Select Document Search</strong> - Select Registered Document Details on the Dharani portal
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                          <strong>Enter Document Details</strong> - Enter the Document Number, Year of Registration, and select SRO/Tehsildar office details
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                          <strong>Submit and View</strong> - Click Submit to view the recorded transaction details, executants, and claimants
                        </li>
                      </ol>
                    </div>

                    <h3 className="tp-blog-details-subtitle mb-20">
                      Critical Pre-Purchase Red Flags to Check
                    </h3>

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
                        ⚠️ Prohibited Lands List:
                      </h5>
                      <p style={{ color: "#856404", margin: 0 }}>
                        Verify on the Dharani homepage that the survey number is not listed under Section 22A (Government/Assigned lands prohibited for transfer/sale).
                      </p>
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
                        ⚠️ Location Pin Matching:
                      </h5>
                      <p style={{ color: "#856404", margin: 0 }}>
                        Cross-verify the physical boundaries on-site with the survey map (FMB) to ensure the physical plot matches the survey number recorded in Dharani.
                      </p>
                    </div>

                    <div
                      className="tp-blog-details-info mb-30"
                      style={{
                        backgroundColor: "#e7f3ff",
                        border: "1px solid #b3d9ff",
                        padding: "15px",
                        borderRadius: "8px",
                      }}
                    >
                      <h5 style={{ color: "#004085", marginBottom: "10px" }}>
                        💡 Pro Tip:
                      </h5>
                      <p style={{ color: "#004085", margin: 0 }}>
                        Always cross-reference the information obtained from Dharani with physical site visits and consult with legal experts before finalizing any land purchase in Telangana.
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <RecentPosts currentSlug="how-to-verify-land-records-on-the-telangana-dharani-registration-portal" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}