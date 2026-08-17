import ForgotForm from "@/components/Form/auth/ForgotForm";
import signInThumb from "../../../../public/assets/img/others/sign-in-thumb.jpg";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reset Password | Dekho Land Land Marketplace",
  description:
    "Reset your Dekho Land account password securely. Recover access to manage land and plot listings, favorites, and seller communications.",
};

export default function Forget() {
  return (
    <>
      <section
        className="tp-sign-in-ptb"
        style={{ backgroundImage: `url(${signInThumb.src})` }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="tp-sign-in-register-box p-relative text-center">
                <div className="text-end mb-2">
                  <Link href="/" className="auth-close-link" aria-label="Close">
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
