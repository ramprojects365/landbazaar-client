"use client";

import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import {
  APPROVAL_TYPES,
  LAND_FACING_DIRECTIONS,
  ROAD_WIDTH_OPTIONS,
  SOIL_TYPES,
} from "@/config/landOptions";
import { UseFormRegister } from "react-hook-form";

const inlineRadioRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap" as const,
};

const inlineRadioOptionsStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const inlineRadioOptionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginBottom: 0,
};

function YesNoRadioRow({
  label,
  field,
  register,
}: {
  label: string;
  field: "cornerPlot" | "clearTitle" | "loanFacility" | "registrationReady";
  register: UseFormRegister<PropertyFormData>;
}) {
  return (
    <div className="tp-dashboard-new-input">
      <div style={inlineRadioRowStyle}>
        <label style={{ marginBottom: 0, whiteSpace: "nowrap" }}>{label}</label>
        <div style={inlineRadioOptionsStyle}>
          <label style={inlineRadioOptionStyle}>
            <input type="radio" value="Yes" {...register(field)} />
            <span>Yes</span>
          </label>
          <label style={inlineRadioOptionStyle}>
            <input type="radio" value="No" {...register(field)} />
            <span>No</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default function PropertyDetails() {
  const { register } = useFormContext<PropertyFormData>();

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Land Details</h5>
      <div className="tp-dashboard-new-property-box">
        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Layout Name (Optional)</label>
              <input
                className="textBox"
                type="text"
                placeholder="Ex: Green Valley Venture"
                {...register("propertyName")}
              />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Survey Number</label>
              <input
                className="textBox"
                type="text"
                placeholder="Ex: 124/A"
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

          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Facing</label>
              <div className="tp-property-tabs-select tp-select">
                <select
                  {...register("facingDirection")}
                  className="listDropDown"
                >
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
        </div>

        <div className="row">
          <div className="col-lg-4">
            <YesNoRadioRow
              label="Corner Plot"
              field="cornerPlot"
              register={register}
            />
          </div>

          <div className="col-lg-4">
            <YesNoRadioRow
              label="Clear Title"
              field="clearTitle"
              register={register}
            />
          </div>

          <div className="col-lg-4">
            <YesNoRadioRow
              label="Loan Facility"
              field="loanFacility"
              register={register}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <YesNoRadioRow
              label="Registration Ready"
              field="registrationReady"
              register={register}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
