import AddressSvg from "@/components/SVG/ContactSvg/AddressSvg";
import CallSvg from "@/components/SVG/ContactSvg/CallSvg";
import ContactEmailSvg from "@/components/SVG/ContactSvg/EmailSvg";
import Link from "next/link";

export default function ContactInfoList() {
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4902.030604269124!2d101.68526107497111!3d3.1283924968470944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49eb996ef441%3A0x6de34fcd050ef0db!2s86%2C%20Jalan%20Berhala%2C%20Brickfields%2C%2050470%20Kuala%20Lumpur%2C%20Wilayah%20Persekutuan%20Kuala%20Lumpur!5e1!3m2!1sen!2smy!4v1780136583896!5m2!1sen!2smy";

  return (
    <div className="tp-contact-wrap">
      <div className="tp-contact-info d-flex align-items-center mb-10">
        <div className="tp-contact-info-icon">
          <span>
            <CallSvg />
          </span>
        </div>
        <div className="tp-contact-info-content">
          <span>Call us at</span>
          <Link href="tel:01126368426">+60 11 2636 8426</Link>
        </div>
      </div>
      <div className="tp-contact-info d-flex align-items-center mb-10">
        <div className="tp-contact-info-icon">
          <span>
            <ContactEmailSvg />
          </span>
        </div>
        <div className="tp-contact-info-content">
          <span>Email us on</span>
          <Link href="mailto:support@propertyla.com.my">support@propertyla.com.my</Link>
        </div>
      </div>
      <div className="tp-contact-info d-flex align-items-center mb-10">
        <div className="tp-contact-info-icon">
          <span>
            <AddressSvg />
          </span>
        </div>
        <div className="tp-contact-info-content">
          <span>Address</span>
          <Link href={mapUrl}>86 Jalan Berhala, Brickfields</Link>
        </div>
      </div>
    </div>
  );
}
