/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  //AuthFacebookSvg,
  //AuthGoogleSvg,
  AuthLockSvg,
  AuthUserSvg,
  ClosedEyeSvg,
  OpenEyeSvg,
} from "@/components/SVG";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/schemas/validationSchema";
import ErrorMessage from "../ErrorMassage";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const [showPass, setShowPass] = useState(false);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data: FormData) => {
    const requestBody = {
      email: data.email,
      password: data.password,
    };
    const headers = {
      "Content-Type": "application/json",
      "X-Request-Source": "react-client",
    };
    const API_BASE =
      process.env.NEXT_PUBLIC_API_BASE ?? "http://159.223.92.101:3008";

    const formatApiError = (err: any): string => {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;
        if (!data) return err.message ?? "Login failed";

        if (typeof data === "string") return data;
        if (typeof data.message === "string") return data.message;
        if (typeof data.error === "string") return data.error;
        if (Array.isArray(data.error)) return data.error.join(", ");

        if (Array.isArray(data.errors)) {
          return data.errors
            .map((e: any) => e?.message || String(e))
            .join(", ");
        }
        if (typeof data.errors === "object" && data.errors !== null) {
          return Object.values(data.errors)
            .flat()
            .map((v: any) =>
              typeof v === "string" ? v : v?.message || JSON.stringify(v),
            )
            .join(", ");
        }

        return JSON.stringify(data);
      }

      if (typeof err === "string") return err;
      return String(err) || "Login failed";
    };

    // Wrap toast.error so existing catch(...) { toast.error(error) } shows API-friendly messages
    const _toastError = toast.error;
    toast.error = (err: any, opts?: any) => {
      return _toastError(formatApiError(err), opts);
    };
    const signupUrl = `${API_BASE}/api/auth/login`;
    try {
      const response = await axios.post<any>(signupUrl, requestBody, {
        headers,
      });

      // if token returned, store it immediately and schedule a redirect so the rest of the code (toast, etc.) can run
      const token = response?.data?.data?.token;
      if (token) {
        localStorage.setItem("authToken", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log(
          "axios token",
          axios.defaults.headers.common["Authorization"],
        );
        console.log(
          "Stored authToken in localStorage",
          localStorage.getItem("authToken"),
        );
        setTimeout(() => {
          if (typeof window !== "undefined") {
            const redirectPath = redirectUrl || "/";
            window.location.href = redirectPath;
          }
        }, 700);
      }
      console.log("token", token);
      console.log("login response", response);
      const user = response?.data?.data?.user;
      const username = user?.username || "";
      const displayName = user?.fullName || user?.username || "";
      localStorage.setItem("loginUser", username);
      localStorage.setItem("loginUserDisplayName", displayName);
      localStorage.setItem("loginUserType", user?.userType || "");
      window.dispatchEvent(new Event("propertyla-auth-changed"));
      toast.success("Login successful!");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast.error(errorMessage);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative">
              <input {...register("email")} type="text" placeholder="Email" />
              <i>
                <AuthUserSvg />
              </i>
            </div>
            <ErrorMessage message={errors?.email?.message || ""} />
          </div>
        </div>
        <div className="col-12">
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative">
              <div className="password-input p-relative">
                <input
                  {...register("password")}
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                />
                <div
                  className="tp-sign-in-input-eye password-show-toggle"
                  onClick={() => setShowPass(!showPass)}
                >
                  <i>
                    <AuthLockSvg />
                  </i>
                  <span
                    id="open-eye"
                    className="open-eye open-eye-icon"
                    style={{ display: showPass ? "block" : "none" }}
                  >
                    <OpenEyeSvg />
                  </span>

                  <span
                    id="close-eye"
                    className="open-close close-eye-icon"
                    style={{ display: showPass ? "none" : "block" }}
                  >
                    <ClosedEyeSvg />
                  </span>
                </div>
              </div>
            </div>
            <ErrorMessage message={errors?.password?.message || ""} />
          </div>
        </div>
        <div className="col-12">
          <div className="tp-sign-in-from-remeber">
            <div className="row">
              <div className="col-6">
                <div className="tp-contact-input-remeber">
                  <input id="remember" type="checkbox" />
                  <label htmlFor="remember">Remember me</label>
                </div>
              </div>
              <div className="col-6">
                <div className="tp-sign-in-input-remeber text-end">
                  <Link href="/forget">Forgot Password?</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="tp-sign-in-from-btn mb-30">
            <button type="submit" className="tp-btn w-100 text-center">
              Login
            </button>
          </div>

          {/* Social Login */}
          {/* <div className="tp-sign-in-from-subtitle-heading">
                        <h5 className="tp-sign-in-from-subtitle">Or Sign In with</h5>
                    </div>
                    <div className="tp-sign-in-from-btn mb-30">
                        <Link href="https://google.com" target="_blank">
                            <span><AuthGoogleSvg /></span>{" "}
                            Google
                        </Link>{" "}
                        <Link href="https://facebook.com" target="_blank">
                            <span><AuthFacebookSvg /></span>{" "}
                            Facebook
                        </Link>{" "}
                        <Link href="https://apple.com" target="_blank">
                            <span>
                                <i className="fa-brands fa-apple"></i>
                            </span>{" "}
                            Apple
                        </Link>
                    </div> */}
          {/* Register Link */}
          <div className="tp-sign-in-from-register">
            <p>
              Don’t have an account?{" "}
              <Link className="textline" href="/sign-up">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
