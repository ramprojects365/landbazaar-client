import { Metadata } from "next";
import signInThumb from "../../../../public/assets/img/others/sign-in-thumb.jpg";
import SignInForm from "@/components/Form/auth/SignInForm";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign In to Dekho Land | Access Your Land Marketplace Account",
  description:
    "Sign in to your Dekho Land account to manage land and plot listings, save favorites, and connect with sellers. Secure login for buyers, sellers, and land professionals.",
};

export default function SignIn() {
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
                  <Link href="/" className="auth-close-link" aria-label="Close sign in">
                    X
                  </Link>
                </div>
                <div className="tp-sign-in-register-heading mb-30">
                  <h4 className="tp-sign-in-register-title">Welcome</h4>
                  <p>Enter your credentials to acces your account.</p>
                </div>
                <div className="tp-sign-in-input-form">
                  <Suspense
                    fallback={
                      <div className="text-center py-4">
                        <div className="spinner-border text-primary" role="status" />
                      </div>
                    }
                  >
                    <SignInForm />
                  </Suspense>
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
