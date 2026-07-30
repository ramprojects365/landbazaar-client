"use client";

import { AuthUserSvg } from "@/components/SVG";
import { forgotSchema } from "@/schemas/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../ErrorMassage";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import apiClient from "@/config/axios";

interface FormData {
  email: string;
}

export default function ForgotForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(forgotSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await apiClient.post("/auth/forgot-password", {
        email: data.email,
      });

      if (response.data?.data?.emailQueued === false) {
        toast.info("No local account found for this email.");
        return;
      }

      toast.success(
        response.data?.message ||
          "If that email is registered, a reset link has been sent.",
      );
      reset();
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string; errors?: { msg?: string }[] } };
        message?: string;
      };
      toast.error(
        error?.response?.data?.errors?.[0]?.msg ||
          error?.response?.data?.message ||
          error?.message ||
          "Failed to send reset email",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative">
              <input
                {...register("email")}
                type="text"
                placeholder="Enter your email"
              />
              <i><AuthUserSvg /></i>
            </div>
            <ErrorMessage message={errors?.email?.message || ""} />
          </div>
        </div>
        <div className="col-12">
          <div className="tp-sign-in-from-btn mb-30">
            <button
              type="submit"
              className="tp-btn w-100 text-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send reset link"}
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
