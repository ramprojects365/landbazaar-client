import AddressSvg from "@/components/SVG/ContactSvg/AddressSvg";
import CallSvg from "@/components/SVG/ContactSvg/CallSvg";
import ContactEmailSvg from "@/components/SVG/ContactSvg/EmailSvg";
import Link from "next/link";

const HYDERABAD_MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.905094979!2d78.24323194335936!3d17.412608650000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin";

export default function ContactInfoList() {
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
          <Link href="tel:+919849967236">+916303245269</Link>
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
          <Link href="mailto:support@dekholand.com">support@dekholand.com</Link>
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
          <Link href={HYDERABAD_MAP_URL}>Hyderabad, Telangana, India</Link>
        </div>
      </div>
    </div>
  );
}
