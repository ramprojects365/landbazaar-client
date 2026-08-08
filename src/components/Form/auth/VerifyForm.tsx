"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifySchema } from "@/schemas/validationSchema";
import ErrorMessage from "../ErrorMassage";
import { useForm } from "react-hook-form";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import apiClient from "@/config/axios";

interface FormData {
  emailOtp: string;
}

export default function VerifyForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(verifySchema),
  });

  const onSubmit = async (data: FormData) => {
    const otp = data.emailOtp?.trim();
    if (!otp) return;

    const userId = localStorage.getItem("user_id") || localStorage.getItem("userId");
    const email = localStorage.getItem("registeredEmail") || localStorage.getItem("email") || undefined;

    if (!userId && !email) {
      toast.error("Session expired. Please sign up again.");
      router.push("/sign-up");
      return;
    }

    try {
      await apiClient.post("/auth/verify-otp", {
        user_id: userId,
        userId,
        email,
        otp,
      });

      toast.success("OTP verified successfully");
      router.push("/sign-in");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const responseData = err.response?.data as
          | { error?: string; message?: string }
          | undefined;
        const serverMessage =
          responseData?.error || responseData?.message || "";

        if (
          err.response?.status === 400 ||
          serverMessage.toLowerCase().includes("otp") ||
          serverMessage.toLowerCase().includes("invalid") ||
          serverMessage.toLowerCase().includes("expired")
        ) {
          toast.error("OTP does not match, please check the email.");
        } else {
          toast.error(serverMessage || "Verification failed");
        }
        return;
      }

      toast.error("OTP does not match, please check the email.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="tp-cart-coupon-input-box">
            <div className="tp-cart-coupon-input">
              <div className="row">
                <div>
                  <label>
                    {(() => {
                      const email =
                        typeof window !== "undefined"
                          ? localStorage.getItem("email")
                          : null;
                      return email;
                    })()}
                    We have sent OTP to your registered email id{" "}
                    {localStorage.getItem("registeredEmail")}
                  </label>
                </div>
              </div>
            </div>
            <div className="tp-cart-coupon-input" style={{ marginTop: "10px" }}>
              <div className="row">
                <div className="col-8">
                  <input
                    {...register("emailOtp")}
                    type="text"
                    placeholder="Enter email OTP"
                  />
                </div>
                <div className="col-4">
                  <button type="submit" style={{ float: "right" }}>
                    Submit
                  </button>
                </div>
              </div>

              <ErrorMessage message={errors?.emailOtp?.message || ""} />
            </div>
          </div>
        </div>
        {/* <div className="col-12" style={{ marginTop: "30px" }}>
          <div className="tp-sign-in-from-btn mb-30">
            <button type="button" className="tp-btn w-100 text-center">
              Proceed
            </button>
          </div>
        </div> */}
      </div>
    </form>
  );
}
