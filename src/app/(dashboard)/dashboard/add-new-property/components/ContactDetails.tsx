"use client";

import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import ErrorMessage from "../../../../../components/Form/ErrorMassage";
import {
  PHONE_NUMBER_PLACEHOLDER,
  sanitizePhoneDigits,
} from "@/utils/phoneInput";

export default function ContactDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PropertyFormData>();

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Contact Details</h5>
      <div className="tp-dashboard-new-property-box">
        <div className="row">
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Contact Person</label>
              <input
                className="textBox"
                type="text"
                placeholder="Mr. Ram"
                {...register("contactPersonName")}
              />
              {errors?.contactPersonName && (
                <ErrorMessage
                  message={errors?.contactPersonName?.message || ""}
                />
              )}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Contact Number</label>
              <input
                className="textBox"
                type="text"
                inputMode="numeric"
                placeholder={PHONE_NUMBER_PLACEHOLDER}
                {...register("contactNumber")}
                onInput={(e) => {
                  e.currentTarget.value = sanitizePhoneDigits(
                    e.currentTarget.value,
                  );
                }}
              />
              {errors?.contactNumber && (
                <ErrorMessage message={errors?.contactNumber?.message || ""} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
