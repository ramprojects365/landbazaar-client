import { getCurrentYear } from "@/components/Utils/getCurrentYear";
import { FooterSocialLinks } from "@/components/UI/SocialLinks";
import Link from "next/link";

export default function FooterCopyright() {
  return (
    <div className="tp-footer-copyright-ptb pt-20 pb-20">
      <div className="row align-items-center gy-3">
        <div className="col-lg-5">
          <div className="tp-footer-copyright">
            <p>© {getCurrentYear()} PropertyLa. All rights reserved.</p>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="tp-footer-copyright-actions">
            <div className="tp-footer-copyright-links">
              <Link href="/terms-and-conditions">Terms and Conditions</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
            <div className="tp-footer-social-line" aria-label="PropertyLa social media">
              <FooterSocialLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
