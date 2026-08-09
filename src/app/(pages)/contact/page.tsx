import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import ContactAreaTwo from "@/components/Contact/ContactAreaTwo";
import ContactFormTwo from "@/components/Form/ContactFormTwo";
import MapArea from "@/components/Contact/MapArea";
import { Metadata } from "next";
import "./contact-page.scss";

export const metadata: Metadata = {
  title: "Contact Dekho Land | Land & Plot Marketplace Support",
  description:
    "Get in touch with Dekho Land for land and plot enquiries across India. Reach our team for sale and lease listings, listing support, and marketplace help.",
  metadataBase: new URL("https://www.dekholand.com"),
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Dekho Land | Land & Plot Marketplace Support",
    description:
      "Get in touch with Dekho Land for land and plot enquiries across India. Reach our team for sale and lease listings, listing support, and marketplace help.",
    url: "https://www.dekholand.com/contact",
    siteName: "Dekho Land",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Dekho Land | Land & Plot Marketplace Support",
    description:
      "Get in touch with Dekho Land for land and plot enquiries across India. Reach our team for sale and lease listings, listing support, and marketplace help.",
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
