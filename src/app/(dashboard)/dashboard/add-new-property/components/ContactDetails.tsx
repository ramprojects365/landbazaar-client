"use client";

import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import ErrorMessage from "../../../../../components/Form/ErrorMassage";

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
              <label>Contact Number (+91)</label>
              <input
                className="textBox"
                type="text"
                inputMode="numeric"
                placeholder="Enter 10 digit number"
                {...register("contactNumber")}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
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
