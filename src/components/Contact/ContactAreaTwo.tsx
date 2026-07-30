import { CallThreeSvg } from "../SVG/ContactSvg/CallTwoSvg";
import { ContactLocation } from "@/types/custom-interface";
import { TeamEmailSvg } from "../SVG";
import Link from "next/link";

const contactLocations: ContactLocation[] = [
  {
    title: "Kuala Lumpur",
    address: (
      <>
        <p>
          PropertyLa Malaysia, <br /> Kuala Lumpur City Centre
        </p>
      </>
    ),
    phone: "+60 11 2114 9066",
    email: "support@propertyla.com.my",
  },
];

export default function ContactAreaTwo() {
  return (
    <section className="tp-contact-inner-ptb pt-130 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="tp-contact-inner-heading mb-30">
              <span className="tp-section-title-pre">Contact PropertyLa</span>
              <h3 className="tp-section-title">
                Talk to our <br /> Malaysia team.
              </h3>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-contact-inner-item-box d-flex flex-wrap">
              {contactLocations.map(({ title, address, phone, email }) => (
                <div key={title} className="tp-contact-inner-item">
                  <span className="tp-contact-inner-item-title">{title}</span>
                  {address}
                  <Link href={`tel:${phone}`}>
                    <span>
                      <CallThreeSvg width="16" height="16" />
                    </span>
                    {phone}
                  </Link>
                  <Link href={`mailto:${email}`}>
                    <span>
                      <TeamEmailSvg />
                    </span>
                    {email}
                  </Link>
                  <Link
                    className="tp-contact-inner-whatsapp"
                    href="https://wa.me/601121149066?text=Hi%20PropertyLa%2C%20I%20would%20like%20help%20with%20my%20property%20search."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      <i className="fa-brands fa-whatsapp"></i>
                    </span>
                    Reach out on WhatsApp
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
