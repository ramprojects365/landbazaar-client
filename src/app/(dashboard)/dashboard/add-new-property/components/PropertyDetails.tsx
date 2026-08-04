"use client";

import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import ErrorMessage from "../../../../../components/Form/ErrorMassage";
import {
  APPROVAL_TYPES,
  LAND_FACING_DIRECTIONS,
  ROAD_WIDTH_OPTIONS,
  SOIL_TYPES,
} from "@/config/landOptions";

export default function PropertyDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PropertyFormData>();

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Land Details</h5>
      <div className="tp-dashboard-new-property-box">
        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Facing</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("facingDirection")} className="listDropDown">
                  <option value="">Select</option>
                  {LAND_FACING_DIRECTIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Corner Plot</label>
              <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input type="radio" value="Yes" {...register("cornerPlot")} />
                  <span>Yes</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input type="radio" value="No" {...register("cornerPlot")} />
                  <span>No</span>
                </label>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Road Width</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("roadWidth")} className="listDropDown">
                  <option value="">Select</option>
                  {ROAD_WIDTH_OPTIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Survey Number</label>
              <input
                className="textBox"
                type="text"
                placeholder="Example: 124/A"
                {...register("surveyNumber")}
              />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Approval Type</label>
              <select
                {...register("approvalTypes")}
                multiple
                className="listDropDown"
                style={{ minHeight: "120px" }}
              >
                {APPROVAL_TYPES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Layout Name (Optional)</label>
              <input
                className="textBox"
                type="text"
                placeholder="Example: Green Valley Venture"
                {...register("propertyName")}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Soil Type</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("soilType")} className="listDropDown">
                  <option value="">Select</option>
                  {SOIL_TYPES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Clear Title</label>
              <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input type="radio" value="Yes" {...register("clearTitle")} />
                  <span>Yes</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input type="radio" value="No" {...register("clearTitle")} />
                  <span>No</span>
                </label>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Loan Facility</label>
              <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input type="radio" value="Available" {...register("loanFacility")} />
                  <span>Available</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input type="radio" value="Not Available" {...register("loanFacility")} />
                  <span>Not Available</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Registration Ready</label>
              <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input type="radio" value="Yes" {...register("registrationReady")} />
                  <span>Yes</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input type="radio" value="No" {...register("registrationReady")} />
                  <span>No</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5 className="tp-dashboard-new-title" style={{ marginTop: "20px" }}>
        Contact Details
      </h5>
      <div className="tp-dashboard-new-property-box">
        <div className="row">
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Contact Person Name</label>
              <input
                className="textBox"
                type="text"
                placeholder="Enter contact person name"
                {...register("contactPersonName")}
              />
              {errors?.contactPersonName && (
                <ErrorMessage message={errors?.contactPersonName?.message || ""} />
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
                  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "").slice(0, 10);
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
