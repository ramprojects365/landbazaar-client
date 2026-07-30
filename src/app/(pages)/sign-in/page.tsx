import { Metadata } from "next";
import signInThumb from "../../../../public/assets/img/others/sign-in-thumb.jpg";
import SignInForm from "@/components/Form/auth/SignInForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In to PropertyLa | Access Your Real Estate Account",
  description:
    "Sign in to your PropertyLa account to manage property listings, save favorites, and connect with real estate agents in Malaysia. Secure login for buyers, sellers, and property professionals.",
};

export default function SignIn() {
  return (
    <>
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
                <div className="tp-sign-in-register-heading mb-30">
                  <h4 className="tp-sign-in-register-title">Welcome</h4>
                  <p>Enter your credentials to acces your account.</p>
                </div>
                <div className="tp-sign-in-input-form">
                  <SignInForm />
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
