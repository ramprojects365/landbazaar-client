"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { IContactFormValues } from "@/types/blog-d-t";
import { contactTwoSchema } from "@/schemas/validationSchema";
import apiClient from "@/config/axios";
import ErrorMessage from "./ErrorMassage";

interface ContactFormProps {
  btnClass?: string;
}

export default function ContactForm({
  btnClass = "tp-contact-btn",
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<IContactFormValues>({
    resolver: yupResolver(contactTwoSchema),
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

  const onSubmit = async (values: IContactFormValues) => {
    try {
      await apiClient.post("/contact", {
        name: `${values.firstName} ${values.lastName}`.trim(),
        email: values.email,
        phone: values.phone,
        message: values.caseDetails,
        source: "About contact form",
      });
      toast.success("Your message has been sent successfully!");
      reset();
    } catch {
      setError("caseDetails", {
        type: "server",
        message: "Message could not be sent. Please try again.",
      });
      toast.error("Message could not be sent. Please try again.");
    }
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="row tp-gx-20">
        <div className="col-lg-6">
          <div className="tp-contact-input">
            <input
              type="text"
              {...register("firstName")}
              placeholder="First name"
              maxLength={60}
              onInput={handleNameInput}
            />
            {errors?.firstName && (
              <ErrorMessage message={errors?.firstName.message} />
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="tp-contact-input">
            <input
              type="text"
              {...register("lastName")}
              placeholder="Last name"
              maxLength={60}
              onInput={handleNameInput}
            />
            {errors?.lastName && (
              <ErrorMessage message={errors?.lastName.message} />
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="tp-contact-input">
            <input
              type="email"
              {...register("email")}
              placeholder="Email address"
            />
            {errors?.email && <ErrorMessage message={errors?.email.message} />}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="tp-contact-input">
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={12}
              {...register("phone")}
              placeholder="Phone number"
              onInput={handlePhoneInput}
            />
            {errors?.phone && <ErrorMessage message={errors?.phone.message} />}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="tp-contact-input">
            <textarea
              placeholder="Your message"
              maxLength={1000}
              {...register("caseDetails")}
            ></textarea>
            {errors?.caseDetails && (
              <ErrorMessage message={errors?.caseDetails.message} />
            )}
          </div>
        </div>
      </div>

      <div className={btnClass}>
        <button type="submit" className="tp-btn">
          Send Message
        </button>
      </div>
    </form>
  );
}
