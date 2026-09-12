import { Metadata } from "next";
import FaqList from "@/components/Faq/FaqList";
import { faqItems, stripFaqMarkup } from "@/data/faqData";
import "./faq-page.scss";

const faqTitle = "FAQs — Buying Plots and Land in Andhra Pradesh & Telangana";
const faqDescription =
  "Answers from DekhoLand on how to find, verify, and buy plots and land in Andhra Pradesh and Telangana — including Hyderabad, Visakhapatnam, Vijayawada, Amaravati, documents, HMDA, DTCP, RERA, and budgets.";

export const metadata: Metadata = {
  title: {
    absolute: faqTitle,
  },
  description: faqDescription,
  keywords:
    "plot buying FAQ, land for sale Telangana, plots for sale Andhra Pradesh, HMDA plots, DTCP approval, RERA plots, Encumbrance Certificate, agricultural land, DekhoLand",
  metadataBase: new URL("https://www.dekholand.com"),
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: faqTitle,
    description: faqDescription,
    url: "https://www.dekholand.com/faq",
    siteName: "DekhoLand",
    type: "website",
    images: [
      {
        url: "https://www.dekholand.com/assets/img/logo/logo-blue.png",
        width: 512,
        height: 512,
        alt: "DekhoLand — plots and land FAQs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: faqTitle,
    description: faqDescription,
    images: ["https://www.dekholand.com/assets/img/logo/logo-blue.png"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: stripFaqMarkup(item.answer),
    },
  })),
};

export default function FaqPage() {
  return (
    <main className="faq-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="faq-page__header">
                <h1 className="tp-section-title">Frequently Asked Questions</h1>
              </div>
              <FaqList />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
