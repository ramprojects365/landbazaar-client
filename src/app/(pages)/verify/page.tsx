import { Metadata } from "next";
import signInThumb from "../../../../public/assets/img/others/sign-in-thumb.jpg";
import VerifyForm from "@/components/Form/auth/VerifyForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In - Property near MRT Kuala Lumpur",
  description: "property near international school KL",
};

export default function Verify() {
  return (
    <>
      {/* sign in area start */}
      <section
        className="tp-sign-in-ptb pt-195 pb-95"
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
