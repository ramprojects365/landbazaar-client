"use client";
import {
  AuthEmailSvg,
  //AuthFacebookSvg,
  //AuthGoogleSvg,
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
import { useState, CSSProperties } from "react";
import { toast } from "sonner";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRen, setShowRen] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("Owner");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignUpFormData>({
    resolver: yupResolver(signUpSchema),
    context: { showRen },
  });

  const styles: Record<string, CSSProperties> = {
    container: {
      padding: "16px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      width: "250px",
    },
    title: {
      fontWeight: 600,
      marginBottom: "10px",
    },
    radioGroup: {
      display: "flex",
      gap: "10px",
    },
    radioOption: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      cursor: "pointer",
      color: "#333",
      fontSize: "14px",
    },
    radioInput: {
      width: "16px",
      height: "16px",
      accentColor: "#003B5C", // modern browsers support this
      cursor: "pointer",
      marginRight: "0px",
    },
  };
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (value === "Agent") {
      setShowRen(true);
    } else {
      setShowRen(false);
    }
  };

  const formatNum = (phone: string): string => {
    if (!phone) return "";

    const num = phone.replace(/\D/g, "");

    if (num.startsWith("60")) {
      return `+${num}`;
    }

    if (num.startsWith("6")) {
      return `+${num}`;
    }

    if (num.startsWith("0")) {
      return `+6${num}`;
    }

    return `+60${num}`;
  };

  const onSubmit = async (data: ISignUpFormData) => {
    const requestBody = {
      username: data.displayname,
      email: data.email,
      phone_number: formatNum(data.phone),
      renNumber: data.renNumber?.trim().toUpperCase(),
      password: data.password,
      confirmPassword: data.confirmPassword,
      remember: data.remember,
    };
    const headers = {
      "Content-Type": "application/json",
      "X-Request-Source": "react-client",
    };
    const API_BASE =
      process.env.NEXT_PUBLIC_API_BASE ?? "http://159.223.92.101:3008";
    const signupUrl = `${API_BASE}/api/auth/register`;
    try {
      const payload = {
        ...requestBody,
        userType: selectedValue,
      };

      const response = await axios.post(signupUrl, payload, { headers });
      // Persist the registered email so the verify page can read it via localStorage.getItem("registeredEmail")
      try {
        console.log("Registration response:", response);
        const registeredEmail = response?.data?.data?.email ?? data.email;
        if (registeredEmail) {
          localStorage.setItem("registeredEmail", registeredEmail);
          localStorage.setItem("user_id", response?.data?.data?.userId);
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
          <div
            className="tp-cart-coupon-input"
            style={{ marginBottom: "10px" }}
          >
            <label style={{ float: "left", marginRight: "20px" }}>
              Are you ?
            </label>

            <div style={styles.radioGroup}>
              <label style={styles.radioOption}>
                <input
                  type="radio"
                  name="userType"
                  value="Owner"
                  checked={selectedValue === "Owner"}
                  onChange={handleChange}
                  style={styles.radioInput}
                />
                <span>Owner</span>
              </label>
              <label style={styles.radioOption}>
                <input
                  type="radio"
                  name="userType"
                  value="Agent"
                  checked={selectedValue === "Agent"}
                  onChange={handleChange}
                  style={styles.radioInput}
                />
                <span>Agent</span>
              </label>
            </div>
          </div>
        </div>
        {}
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
                type="text"
                inputMode="numeric"
                maxLength={12}
                placeholder="Enter phone number"
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const target = e.currentTarget;
                  target.value = target.value.replace(/\D/g, "");
                }}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,12}$/,
                    message: "Phone number must be between 10 and 12 digits",
                  },
                })}
              />
              <i>
                <AuthPhoneSvg />
              </i>
            </div>
            <ErrorMessage message={errors?.phone?.message || ""} />
          </div>
        </div>
        {showRen === true ? (
          <div>
            <div className="col-12">
              <div className="tp-sign-in-input-box">
                <div className="tp-sign-in-input p-relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="Enter REN / PEA number"
                    onInput={(e: React.FormEvent<HTMLInputElement>) => {
                      const target = e.currentTarget;
                      target.value = target.value.toUpperCase().replace(/\s/g, "");
                    }}
                    {...register("renNumber")}
                  />
                  <i>
                    <AuthUserSvg />
                  </i>
                </div>
                <ErrorMessage message={errors?.renNumber?.message || ""} />
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
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
              <div className="col-6">
                <div className="tp-contact-input-remeber">
                  <input
                    id="remember"
                    type="checkbox"
                    {...register("remember")}
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
              </div>
              <div className="col-6 text-end">
                <div className="tp-sign-in-input-remeber text-end">
                  <Link href="/forget">Forgot Password?</Link>
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
              <Link className="textline" href="/sign-in">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
