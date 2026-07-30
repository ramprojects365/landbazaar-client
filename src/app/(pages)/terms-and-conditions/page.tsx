import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | PropertyLa",
  description:
    "Read PropertyLa's website terms for property listings, enquiries, accounts, content, and acceptable platform use.",
};

const sections = [
  {
    title: "Use of PropertyLa",
    body: "PropertyLa provides a platform for users to browse property listings, submit enquiries, connect with agents, and access property-related tools. You agree to use the website lawfully and not misuse, disrupt, scrape, or attempt to gain unauthorised access to our services.",
  },
  {
    title: "Listings and information",
    body: "Property details, prices, availability, images, agent profiles, and related information may be provided by property owners, agents, developers, or third parties. We aim to keep information useful, but we do not guarantee that every listing is complete, current, accurate, or available.",
  },
  {
    title: "Accounts and submissions",
    body: "When you create an account, submit a property, send an enquiry, or use Property Fit, you are responsible for providing accurate information. We may remove or restrict content that appears misleading, unlawful, duplicated, abusive, or unsuitable for the platform.",
  },
  {
    title: "Enquiries and agent contact",
    body: "When you share contact details or enquire about a property, we may pass your enquiry to a relevant property consultant or account holder so they can follow up. PropertyLa is not responsible for the conduct, advice, promises, or services of independent agents or third parties.",
  },
  {
    title: "Calculators and tools",
    body: "Loan, mortgage, affordability, and property matching tools are provided for general guidance only. Figures are estimates and should not be treated as financial, legal, tax, or investment advice. Please verify important decisions with qualified professionals.",
  },
  {
    title: "Intellectual property",
    body: "The PropertyLa brand, website design, platform content, and related materials are owned by or licensed to PropertyLa. You may not copy, reproduce, or reuse our content except where allowed by law or with written permission.",
  },
  {
    title: "Limitation of liability",
    body: "To the fullest extent permitted by law, PropertyLa is not liable for losses arising from your use of the website, reliance on listing information, third-party conduct, service interruptions, or unavailable features.",
  },
  {
    title: "Updates to these terms",
    body: "We may update these Terms and Conditions from time to time. Continued use of PropertyLa after changes are published means you accept the updated terms.",
  },
];

export default function TermsAndConditions() {
  return (
    <section className="legal-page pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="legal-page__header">
              <span className="tp-section-title-pre">Legal</span>
              <h1 className="tp-section-title">Terms and Conditions</h1>
              <p>
                These terms explain how you may use PropertyLa and what to
                expect when browsing listings, submitting enquiries, or using
                our property tools.
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
                  For questions about these terms, contact us at{" "}
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
