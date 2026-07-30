import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PropertyLa",
  description:
    "Learn how PropertyLa collects, uses, protects, and shares personal information for property enquiries, accounts, listings, and platform services.",
};

const sections = [
  {
    title: "Information we collect",
    body: "We may collect information you provide directly, including your name, email address, phone number, profile details, property information, enquiry details, saved preferences, and messages submitted through our forms or tools.",
  },
  {
    title: "How we use your information",
    body: "We use information to operate PropertyLa, show relevant listings, respond to enquiries, connect you with property consultants, manage accounts, improve the platform, prevent misuse, and send important service updates.",
  },
  {
    title: "Property enquiries and agent follow-up",
    body: "If you enquire about a property, share contact details, or use Property Fit, we may share relevant enquiry details with a matching agent, property owner, developer, or account holder so they can contact you about your request.",
  },
  {
    title: "Cookies and analytics",
    body: "PropertyLa may use cookies, local storage, analytics, and similar technologies to remember preferences, keep you signed in, understand website performance, and improve user experience.",
  },
  {
    title: "How we protect data",
    body: "We use reasonable technical and organisational measures to protect personal information. No online service is completely risk-free, so please use strong passwords and avoid sharing sensitive information unnecessarily.",
  },
  {
    title: "When we may disclose information",
    body: "We may disclose information to service providers, hosting partners, email providers, agents involved in your enquiry, or authorities where required by law, safety, fraud prevention, or platform protection.",
  },
  {
    title: "Your choices",
    body: "You may request access, correction, or deletion of your personal information, subject to legal, security, and operational requirements. You may also unsubscribe from non-essential communications where available.",
  },
  {
    title: "Policy updates",
    body: "We may update this Privacy Policy as PropertyLa grows or legal requirements change. The latest version will be available on this page.",
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="legal-page pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="legal-page__header">
              <span className="tp-section-title-pre">Privacy</span>
              <h1 className="tp-section-title">Privacy Policy</h1>
              <p>
                This policy explains how PropertyLa handles personal
                information when you browse listings, create an account, submit
                a property, send an enquiry, or use our property tools.
              </p>
            </div>
            <div className="legal-page__content">
              {sections.map((section) => (
                <article key={section.title}>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                </article>
              ))}
              <article>
                <h2>Contact</h2>
                <p>
                  To ask about privacy or request a data update, contact{" "}
                  <a href="mailto:support@propertyla.com.my">
                    support@propertyla.com.my
                  </a>
                  .
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
