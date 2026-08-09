import signUpThumb from "../../../../public/assets/img/others/sign-in-thumb.jpg";
import SignUpForm from "@/components/Form/auth/SignUpForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up - LandWay India | Create Your Land Marketplace Account",
  description:
    "Create your LandWay India account to browse lands and plots, save favorites, manage listings, and connect with verified sellers. Free registration for buyers, sellers, and land investors in Hyderabad, Telangana, Visakhapatnam and nationwide.",
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
