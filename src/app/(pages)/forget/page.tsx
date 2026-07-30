import ForgotForm from "@/components/Form/auth/ForgotForm";
import signInThumb from "../../../../public/assets/img/others/sign-in-thumb.jpg";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reset Password | PropertyLa Malaysia Real Estate Platform",
  description:
    "Reset your PropertyLa account password securely. Recover access to your Malaysia real estate account to manage property listings, favorites, and agent communications.",
};

export default function Forget() {
  return (
    <>
      <section
        className="tp-sign-in-ptb pt-250 pb-95"
        style={{ backgroundImage: `url(${signInThumb.src})` }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="tp-sign-in-register-box p-relative text-center">
                <div>
                  <Link href="/" style={{ float: "right" }}>
                    X
                  </Link>
                </div>
                <div className="tp-sign-in-register-heading mb-30">
                  <h4 className="tp-sign-in-register-title">Reset Password</h4>
                  <p>Enter your email address to request password reset.</p>
                </div>
                <div className="tp-sign-in-input-form">
                  <ForgotForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* -- forget area end -- */}
    </>
  );
}
