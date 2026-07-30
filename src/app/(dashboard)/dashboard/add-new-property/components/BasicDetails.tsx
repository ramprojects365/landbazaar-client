"use client";

import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import ErrorMessage from "../../../../../components/Form/ErrorMassage";
import "../property.css";
import { useState, useEffect } from "react";

export default function BasicDetails() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<PropertyFormData>();

  const listingType = watch("listingType");
  const listingTypeRegister = register("listingType");
  const description = watch("description") || "";
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(description.length);
  }, [description]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setValue("description", value);
      setCharCount(value.length);
    }
  };

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Basic Details</h5>
      <div className="tp-dashboard-new-property-box">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-dashboard-new-input">
              <label>Listing Title</label>
              <input
                className="textBox"
                type="text"
                {...register("title")}
                placeholder="Spacious 3-Bedroom Condo in Mont Kiara"
              />
              {errors?.title && (
                <ErrorMessage message={errors?.title?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="tp-dashboard-new-input">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <label style={{ marginBottom: "0" }}>Description</label>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    backgroundColor: "#f5f5f5",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {1000 - charCount} remaining
                </div>
              </div>
              <textarea
                placeholder="Write a few lines about your property something which is special and makes your property stand out. Please do not mention your contact details in any format."
                value={description}
                onChange={handleDescriptionChange}
                maxLength={1000}
                style={{ borderRadius: "8px" }}
              ></textarea>
              {errors?.description && (
                <ErrorMessage message={errors?.description?.message || ""} />
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label> Listing Type </label>
              <div className="tp-property-tabs-select tp-select">
                <select
                  {...listingTypeRegister}
                  className="listDropDown"
                  onChange={(e) => {
                    const value = e.target.value;
                    listingTypeRegister.onChange(e);
                    setValue("listingType", value, { shouldValidate: true });
                    sessionStorage.setItem("listingType", value);
                    window.dispatchEvent(new Event("listingTypeChanged"));

                    if (value !== "sale") {
                      setValue("tenure", "", { shouldValidate: false });
                      setValue("yearOfCompletion", null, { shouldValidate: false });
                      setValue("facingDirection", "", { shouldValidate: false });
                      setValue("renovationStatus", "", { shouldValidate: false });
                      setValue("maintenanceFee", "", { shouldValidate: false });
                      setValue("sinkingFund", "", { shouldValidate: false });
                      setValue("bumiLotStatus", "", { shouldValidate: false });
                      setValue("floorPlan", "", { shouldValidate: false });
                    }
                  }}
                >
                  <option value="">Select</option>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </select>
              </div>
              <div>
                {errors?.listingType && (
                  <ErrorMessage message={errors?.listingType?.message || ""} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Property Type </label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("propertyType")} className="listDropDown">
                  <option value="">Select</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Landed House">Bungalow</option>
                  <option value="Condominium">Condominium</option>
                  <option value="Landed House">Land</option>
                  <option value="Factory">Factory</option>
                  <option value="Landed House">Landed House</option>
                  <option value="Landed House">Office</option>
                  <option value="Landed House">Serviced Residence</option>
                  <option value="Landed House">Shop Lot</option>
                  <option value="Warehouse">Warehouse</option>
                </select>
              </div>
              <div>
                {errors?.propertyType && (
                  <ErrorMessage message={errors?.propertyType?.message || ""} />
                )}
              </div>
            </div>
          </div>
          {listingType === "sale" && (
            <div className="col-lg-4">
              <div className="tp-dashboard-new-input">
                <label>Tenure</label>
                <div className="tp-property-tabs-select tp-select">
                  <select {...register("tenure")} className="listDropDown">
                    <option value="">Select</option>
                    <option value="freehold">Freehold</option>
                    <option value="leasehold">Leasehold</option>
                  </select>
                </div>
                <div>
                  {errors?.tenure && (
                    <ErrorMessage message={errors?.tenure?.message || ""} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
