// Contact details component
import { FooterSocialLinks } from "@/components/UI/SocialLinks";
import logoIcon from "../../../../public/assets/img/logo/logo-icon-white.png";
import Image from "next/image";
import Link from "next/link";

export default function FooterContact() {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-12">
      <div className="tp-footer-widget tp-footer-col-1 mb-50">
        <div className="tp-footer-logo mb-35">
          <Link href="/">
            <>
              <span className="logo-icon-white">Property</span>{" "}
              <span className="logo-icon-white">La</span>
              <Image className="logo-header" src={logoIcon} alt="PropertyLa" />
            </>
          </Link>
        </div>
        <div className="tp-footer-widget-content">
          <p>
            Malaysia's premier real estate platform for KL, Selangor, Cheras,
            Puchong & Klang Valley. Find your perfect property with PropertyLa.
          </p>
          <div className="tp-footer-widget-contact">
            <Link className="tp-footer-phone-link" href="tel:+601126368426">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M0 16.33C0 16.69 0.0801201 17.06 0.250376 17.42C0.420631 17.78 0.640961 18.12 0.931396 18.44C1.42213 18.98 1.96294 19.37 2.57386 19.62C3.17476 19.87 3.82574 20 4.52679 20C5.54832 20 6.63996 19.76 7.79169 19.27C8.94342 18.78 10.0951 18.12 11.2369 17.29C12.3886 16.45 13.4802 15.52 14.5218 14.49C15.5533 13.45 16.4847 12.36 17.316 11.22C18.1372 10.08 18.7982 8.94 19.2789 7.81C19.7596 6.67 20 5.58 20 4.54C20 3.86 19.8798 3.21 19.6395 2.61C19.3991 2 19.0185 1.44 18.4877 0.94C17.8468 0.31 17.1457 0 16.4046 0C16.1242 0 15.8438 0.0600001 15.5934 0.18C15.333 0.3 15.1027 0.48 14.9224 0.74L12.5989 4.01C12.4186 4.26 12.2884 4.49 12.1983 4.71C12.1082 4.92 12.0581 5.13 12.0581 5.32C12.0581 5.56 12.1282 5.8 12.2684 6.03C12.3986 6.26 12.5889 6.5 12.8292 6.74L13.5904 7.53C13.7006 7.64 13.7506 7.77 13.7506 7.93C13.7506 8.01 13.7406 8.08 13.7206 8.16C13.6905 8.24 13.6605 8.3 13.6405 8.36C13.4602 8.69 13.1497 9.12 12.7091 9.64C12.2584 10.16 11.7777 10.69 11.2569 11.22C10.7161 11.75 10.1953 12.24 9.6645 12.69C9.14372 13.13 8.71307 13.43 8.37256 13.61C8.32248 13.63 8.26239 13.66 8.19229 13.69C8.11217 13.72 8.03205 13.73 7.94191 13.73C7.77166 13.73 7.64146 13.67 7.5313 13.56L6.77015 12.81C6.51978 12.56 6.27942 12.37 6.04907 12.25C5.81873 12.11 5.58838 12.04 5.33801 12.04C5.14772 12.04 4.94742 12.08 4.72709 12.17C4.50676 12.26 4.27641 12.39 4.02604 12.56L0.711065 14.91C0.450676 15.09 0.270405 15.3 0.16024 15.55C0.060091 15.8 0 16.05 0 16.33Z"
                    fill="currentColor"
                  ></path>
                </svg>{" "}
                +60 11 2636 8426
              </span>
            </Link>
            <p>support@propertyla.com.my</p>
          </div>
        </div>
      </div>
    </div>
  );
}
