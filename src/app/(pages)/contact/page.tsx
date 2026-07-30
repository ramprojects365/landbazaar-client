import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import ContactAreaTwo from "@/components/Contact/ContactAreaTwo";
import ContactFormTwo from "@/components/Form/ContactFormTwo";
import MapArea from "@/components/Contact/MapArea";
import { Metadata } from "next";
import "./contact-page.scss";

export const metadata: Metadata = {
  title: "Contact PropertyLa | Malaysia Real Estate Agents & Property Services",
  description:
    "Get in touch with PropertyLa experts for Malaysian real estate. Contact our agents for apartments, condos, landed houses, and bungalows in Kuala Lumpur, Selangor, Penang, Johor and nationwide. Browse property-for-sale/klang-valley and investment-property-malaysia listings. Your trusted alternative to iProperty and PropertyGuru.",
  metadataBase: new URL("https://propertyla.com.my"),
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact PropertyLa | Malaysia Real Estate Agents & Property Services",
    description: "Get in touch with PropertyLa experts for Malaysian real estate. Contact our agents for apartments, condos, landed houses, and bungalows in Kuala Lumpur, Selangor, Penang, Johor and nationwide.",
    url: "https://propertyla.com.my/contact",
    siteName: "PropertyLa",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact PropertyLa | Malaysia Real Estate Agents & Property Services",
    description: "Get in touch with PropertyLa experts for Malaysian real estate. Contact our agents for apartments, condos, landed houses, and bungalows in Kuala Lumpur, Selangor, Penang, Johor and nationwide.",
  },
};

export default function Contact() {
  return (
    <main className="contact-page">
      {/* breadcrumb area start */}
      <BreadcrumbArea title="Contact us" />
      {/* breadcrumb area end */}

      {/* contact area start */}
      <ContactAreaTwo />
      {/* contact area end */}

      {/* map area start  */}
      <MapArea />
      {/* map area end  */}

      {/* contact form area start */}
      <section className="tp-contact-inner-form-ptb">
        <div className="container">
          <div className="tp-contact-inner-form-shape">
            <h4 className="tp-contact-inner-form-shape-title">real estate</h4>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="tp-contact-inner-wrap">
                <h4 className="tp-contact-inner-wrap-title">
                  Let&apos;s talk. Need help with a property?
                </h4>
                <ContactFormTwo />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
