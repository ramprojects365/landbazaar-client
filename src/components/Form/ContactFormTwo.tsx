"use client";

import { IContactFormTwoData } from "@/types/custom-interface";
import { contactSchema } from "@/schemas/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMassage";
import { toast } from "sonner";
import apiClient from "@/config/axios";

export default function ContactFormTwo() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<IContactFormTwoData>({
    resolver: yupResolver(contactSchema),
  });

  const handleNameInput = (event: React.FormEvent<HTMLInputElement>) => {
    event.currentTarget.value = event.currentTarget.value
      .replace(/[^A-Za-z\s.'-]/g, "")
      .slice(0, 60);
  };

  const handlePhoneInput = (event: React.FormEvent<HTMLInputElement>) => {
    event.currentTarget.value = event.currentTarget.value
      .replace(/\D/g, "")
      .slice(0, 12);
  };

  const onSubmit = async (values: IContactFormTwoData) => {
    try {
      await apiClient.post("/contact", {
        name: values.name,
        email: values.email,
        phone: values.number,
        subject: values.subject,
        message: values.message,
        source: "Contact page form",
      });
      toast.success(
        "Thank you for reaching out! We've received your message and will respond soon.",
      );
      reset();
    } catch {
      setError("message", {
        type: "server",
        message: "Message could not be sent. Please try again.",
      });
      toast.error("Message could not be sent. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
        <div className="tp-contact-inner-form">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="tp-sign-in-input-box">
                <div className="tp-contact-input p-relative">
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Full name"
                    maxLength={60}
                    onInput={handleNameInput}
                  />
                  <ErrorMessage message={errors?.name?.message || ""} />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="tp-sign-in-input-box">
                <div className="tp-contact-input p-relative">
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Email address"
                  />
                  <ErrorMessage message={errors?.email?.message || ""} />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="tp-sign-in-input-box">
                <div className="tp-contact-input p-relative">
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={12}
                    {...register("number")}
                    placeholder="Phone number"
                    onInput={handlePhoneInput}
                  />
                  <ErrorMessage message={errors?.number?.message || ""} />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="tp-sign-in-input-box">
                <div className="tp-contact-input p-relative">
                  <input
                    type="text"
                    {...register("subject")}
                    placeholder="Subject"
                    maxLength={120}
                  />
                  <ErrorMessage message={errors?.subject?.message || ""} />
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tp-sign-in-input-box">
                <div className="tp-contact-input p-relative">
                  <textarea
                    {...register("message")}
                    placeholder="Write your message"
                    maxLength={1000}
                  ></textarea>
                  <ErrorMessage message={errors?.message?.message || ""} />
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tp-contact-btn-box d-flex flex-wrap justify-content-between align-items-center">
                <label>
                  We are committed to protecting your privacy. We will never
                  collect information <br />
                  about you without your explicit consent.
                </label>
                <div className="tp-contact-btn">
                  <button type="submit" className="tp-btn">
                    Send message
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="ajax-response mt-1 mb-0"></p>
        </div>
      </form>
    </>
  );
}
