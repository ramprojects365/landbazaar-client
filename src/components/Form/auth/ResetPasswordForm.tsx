"use client";

import { ClosedEyeSvg, OpenEyeSvg } from "@/components/SVG";
import apiClient from "@/config/axios";
import { resetPasswordSchema } from "@/schemas/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ErrorMessage from "../ErrorMassage";

interface FormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordForm() {
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(resetPasswordSchema),
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token") || "");
  }, []);

  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast.error("Reset link is missing or invalid.");
      return;
    }

    try {
      await apiClient.post("/auth/reset-password", {
        token,
        newPassword: data.password,
      });

      toast.success("Password reset successfully. You can sign in now.");
      reset();
      setIsComplete(true);
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string; errors?: { msg?: string }[] } };
        message?: string;
      };
      toast.error(
        error?.response?.data?.errors?.[0]?.msg ||
          error?.response?.data?.message ||
          error?.message ||
          "Failed to reset password",
      );
    }
  };

  if (isComplete) {
    return (
      <div className="tp-sign-in-from-register">
        <p>
          Password updated. <Link href="/sign-in">Login now</Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative password-input">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="New password"
              />
              <span
                className="tp-sign-in-input-eye password-show-toggle"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <OpenEyeSvg /> : <ClosedEyeSvg />}
              </span>
            </div>
            <ErrorMessage message={errors?.password?.message || ""} />
          </div>
        </div>
        <div className="col-12">
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative password-input">
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
              />
              <span
                className="tp-sign-in-input-eye password-show-toggle"
                onClick={() => setShowConfirmPassword((value) => !value)}
              >
                {showConfirmPassword ? <OpenEyeSvg /> : <ClosedEyeSvg />}
              </span>
            </div>
            <ErrorMessage message={errors?.confirmPassword?.message || ""} />
          </div>
        </div>
        <div className="col-12">
          <div className="tp-sign-in-from-btn mb-30">
            <button
              type="submit"
              className="tp-btn w-100 text-center"
              disabled={isSubmitting || !token}
            >
              {isSubmitting ? "Updating..." : "Reset password"}
            </button>
          </div>
          <div className="tp-sign-in-from-register">
            <p>
              Remember password? <Link href="/sign-in">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
