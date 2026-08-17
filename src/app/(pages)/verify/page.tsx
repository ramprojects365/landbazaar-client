import { Metadata } from "next";
import signInThumb from "../../../../public/assets/img/others/sign-in-thumb.jpg";
import VerifyForm from "@/components/Form/auth/VerifyForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verify Account | Dekho Land",
  description:
    "Verify your Dekho Land account to browse lands and plots, save favorites, and manage listings across Hyderabad, Telangana, Visakhapatnam and India.",
};

export default function Verify() {
  return (
    <>
      {/* sign in area start */}
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
                <div className="tp-sign-in-register-heading mb-10">
                  <h4 className="tp-sign-in-register-title">Verify now!</h4>
                </div>
                <div className="tp-sign-in-input-form">
                  <VerifyForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* sign in area end */}
    </>
  );
}
