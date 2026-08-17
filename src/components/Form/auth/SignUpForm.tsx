"use client";
import {
  AuthEmailSvg,
  AuthLockSvg,
  AuthUserSvg,
  ClosedEyeSvg,
  OpenEyeSvg,
} from "@/components/SVG";
import AuthPhoneSvg from "@/components/SVG/AuthSvg/AuthPhoneSvg";
import { ISignUpFormData } from "@/types/custom-interface";
import { signUpSchema } from "@/schemas/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../ErrorMassage";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import apiClient from "@/config/axios";
import {
  PHONE_NUMBER_PLACEHOLDER,
  formatPhoneWithCountryCode,
  sanitizePhoneDigits,
} from "@/utils/phoneInput";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const formatNum = formatPhoneWithCountryCode;

  const onSubmit = async (data: ISignUpFormData) => {
    const requestBody = {
      username: data.displayname,
      email: data.email,
      phone_number: formatNum(data.phone),
      phoneNumber: formatNum(data.phone),
      password: data.password,
      confirmPassword: data.confirmPassword,
      remember: data.remember,
    };
    try {
      const response = await apiClient.post("/auth/register", requestBody, {
        headers: {
          "Content-Type": "application/json",
          "X-Request-Source": "react-client",
        },
      });
      // Persist the registered email so the verify page can read it via localStorage.getItem("registeredEmail")
      try {
        console.log("Registration response:", response);
        const registeredEmail = response?.data?.data?.email ?? data.email;
        const userId = response?.data?.data?.userId || response?.data?.data?.id;
        if (registeredEmail) {
          localStorage.setItem("registeredEmail", registeredEmail);
          localStorage.setItem("email", registeredEmail);
          localStorage.setItem("user_id", userId || "");
          localStorage.setItem("userId", userId || "");
          localStorage.setItem("username", response?.data?.data?.username);
          localStorage.setItem(
            "loginUserDisplayName",
            response?.data?.data?.fullName ||
              response?.data?.data?.username ||
              data.displayname,
          );
        }
      } catch (e) {
        // ignore localStorage errors in environments where it's unavailable
        console.warn("Could not store registeredEmail", e);
      }
      toast.success("Sign-up successful! Welcome aboard!");
      router.push("/verify");
    } catch (err: unknown) {
      let message = "Sign-up failed";
      if (axios.isAxiosError(err)) {
        const respData = err.response?.data as
          | {
              errors?: Array<{ path?: string; msg?: string; message?: string }>;
              message?: string;
            }
          | undefined;
        // If server returned structured validation errors array, map them into form fields
        if (respData?.errors && Array.isArray(respData.errors)) {
          for (const serverErr of respData.errors) {
            const serverPath = serverErr.path;
            // map server field names to local form field names
            const fieldMap: Record<string, keyof ISignUpFormData> = {
              username: "displayname",
              // add additional mappings here if server uses different names
            };
            const mappedField = serverPath
              ? (fieldMap[serverPath as string] ??
                (serverPath as keyof ISignUpFormData))
              : undefined;
            if (mappedField) {
              // set field error in the form so it shows next to the input
              try {
                setError(mappedField as keyof ISignUpFormData, {
                  type: "server",
                  message:
                    serverErr.msg || serverErr.message || "Invalid value",
                });
              } catch {
                // ignore if mapping doesn't match a registered field
              }
            }
          }
          message = respData?.message || "Validation failed";
        } else {
          const maybeMessage =
            (err.response &&
              (err.response as { data?: { message?: string } }).data
                ?.message) ||
            (err instanceof Error ? err.message : undefined);
          if (typeof maybeMessage === "string") {
            message = maybeMessage;
          }
        }
      } else if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "string") {
        message = err;
      }
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative">
              <input
                type="text"
                placeholder="Enter display name"
                {...register("displayname")}
              />
              <i>
                <AuthUserSvg />
              </i>
            </div>
            <ErrorMessage message={errors?.displayname?.message || ""} />
          </div>
        </div>
        <div className="col-12">
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative">
              <input
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              <i>
                <AuthEmailSvg />
              </i>
            </div>
            <ErrorMessage message={errors?.email?.message || ""} />
          </div>
        </div>
        <div className="col-12">
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative">
              <input
                id="signup-phone"
                type="text"
                inputMode="numeric"
                maxLength={10}
                placeholder={PHONE_NUMBER_PLACEHOLDER}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  e.currentTarget.value = sanitizePhoneDigits(
                    e.currentTarget.value,
                  );
                }}
                {...register("phone")}
              />
              <i>
                <AuthPhoneSvg />
              </i>
            </div>
            <ErrorMessage message={errors?.phone?.message || ""} />
          </div>
        </div>
        <div className="col-12">
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative">
              <div className="password-input p-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
                <div
                  className="tp-sign-in-input-eye password-show-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <i>
                    <AuthLockSvg />
                  </i>
                  <span
                    id="open-eye"
                    className="open-eye open-eye-icon"
                    style={{ display: showPassword ? "block" : "none" }}
                  >
                    <OpenEyeSvg />
                  </span>

                  <span
                    id="close-eye"
                    className="open-close close-eye-icon"
                    style={{ display: showPassword ? "none" : "block" }}
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
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative">
              <div className="password-input p-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                />
                <div
                  className="tp-sign-in-input-eye password-show-toggle"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <i>
                    <AuthLockSvg />
                  </i>
                  <span
                    id="open-eye"
                    className="open-eye open-eye-icon"
                    style={{ display: showConfirmPassword ? "block" : "none" }}
                  >
                    <OpenEyeSvg />
                  </span>

                  <span
                    id="close-eye"
                    className="open-close close-eye-icon"
                    style={{ display: showConfirmPassword ? "none" : "block" }}
                  >
                    <ClosedEyeSvg />
                  </span>
                </div>
              </div>
            </div>
            <ErrorMessage message={errors?.confirmPassword?.message || ""} />
          </div>
        </div>

        <div className="col-12">
          <div className="tp-sign-in-from-remeber">
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="tp-contact-input-remeber">
                  <input
                    id="remember"
                    type="checkbox"
                    {...register("remember")}
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
              </div>
              <div className="col-12 col-sm-6 text-end">
                <div className="tp-sign-in-input-remeber text-end">
                  <Link className="tp-sign-in-register-link" href="/forget">
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="tp-sign-in-from-btn mb-30">
            <button type="submit" className="tp-btn w-100 text-center">
              Sign Up
            </button>
          </div>
          <div className="tp-sign-in-from-register">
            <p>
              Already have an account?{" "}
              <Link className="tp-sign-in-register-link" href="/sign-in">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
