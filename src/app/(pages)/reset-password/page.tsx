import ResetPasswordForm from "@/components/Form/auth/ResetPasswordForm";
import signInThumb from "../../../../public/assets/img/others/sign-in-thumb.jpg";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Set New Password | PropertyLa Malaysia Real Estate Platform",
  description:
    "Set a new PropertyLa account password securely and regain access to your property dashboard.",
};

export default function ResetPassword() {
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
                  <h4 className="tp-sign-in-register-title">Set new password</h4>
                  <p>Enter a new password for your PropertyLa account.</p>
                </div>
                <div className="tp-sign-in-input-form">
                  <ResetPasswordForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
