import signUpThumb from "../../../../public/assets/img/others/sign-in-thumb.jpg";
import SignUpForm from "@/components/Form/auth/SignUpForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up - PropertyLa Malaysia | Create Your Real Estate Account",
  description:
    "Create your PropertyLa account to browse Malaysian properties, save favorites, manage listings, and connect with verified real estate agents. Free registration for buyers, sellers, and property investors in Kuala Lumpur, Selangor, Penang, Johor and nationwide.",
};

export default function SignUp() {
  return (
    <>
      {/* -- sign in area start -- */}
      <section
        className="tp-sign-in-register-ptb pt-195 pb-95"
        style={{ backgroundImage: `url(${signUpThumb.src})` }}
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
                <div className="tp-sign-in-register-heading mb-40">
                  <h4 className="tp-sign-in-register-title">Register now!</h4>
                </div>
                <div className="tp-sign-in-input-form">
                  <SignUpForm />
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
