"use client";

import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import ErrorMessage from "../../../../../components/Form/ErrorMassage";
import "../property.css";
import { useState, useEffect } from "react";
import { AREA_UNITS, LAND_TYPES, LISTING_TYPES } from "@/config/landOptions";

export default function BasicDetails() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<PropertyFormData>();

  const listingType = watch("listingType");
  const description = watch("description") || "";
  const landArea = watch("landSize") || "";
  const pricePerUnit = watch("pricePerUnit") || "";
  const totalPrice = watch("totalPrice") || "";
  const currentPrice = watch("price") || "";
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(description.length);
  }, [description]);

  useEffect(() => {
    const area = Number(landArea);
    const unitPrice = Number(pricePerUnit);
    if (
      Number.isFinite(area) &&
      Number.isFinite(unitPrice) &&
      area > 0 &&
      unitPrice > 0
    ) {
      const computed = String(Math.round(area * unitPrice));
      if (totalPrice !== computed) {
        setValue("totalPrice", computed, { shouldValidate: true });
      }
      if (currentPrice !== computed) {
        setValue("price", computed, { shouldValidate: true });
      }
      return;
    }

    if (totalPrice) {
      setValue("totalPrice", "", { shouldValidate: true });
    }
    if (currentPrice) {
      setValue("price", "", { shouldValidate: true });
    }
  }, [landArea, pricePerUnit, totalPrice, currentPrice, setValue]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    if (value.length <= 5000) {
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
              <label>Property Title</label>
              <input
                className="textBox"
                type="text"
                {...register("title")}
                placeholder="HMDA Approved 200 Sq. Yard Plot for Sale in Shadnagar"
              />
              {errors?.title && (
                <ErrorMessage message={errors?.title?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="tp-dashboard-new-input">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
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
                placeholder="Write land highlights, approvals, road access, and nearby landmarks."
                value={description}
                onChange={handleDescriptionChange}
                maxLength={5000}
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
              <label>Land Type</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("propertyType")} className="listDropDown">
                  <option value="">Select</option>
                  {LAND_TYPES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                {errors?.propertyType && (
                  <ErrorMessage message={errors?.propertyType?.message || ""} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Listing Type</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("listingType")} className="listDropDown">
                  <option value="">Select</option>
                  {LISTING_TYPES.map((item) => (
                    <option key={item} value={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </option>
                  ))}
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
              <label>Area Unit</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("areaUnit")} className="listDropDown">
                  <option value="">Select</option>
                  {AREA_UNITS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              {errors?.areaUnit && (
                <ErrorMessage message={errors?.areaUnit?.message || ""} />
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Land Area</label>
              <input
                className="textBox"
                type="text"
                inputMode="numeric"
                placeholder="Example: 200"
                {...register("landSize")}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    "",
                  );
                }}
              />
              {errors?.landSize && (
                <ErrorMessage message={errors?.landSize?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Price Per Unit (₹)</label>
              <input
                className="textBox"
                type="text"
                inputMode="numeric"
                placeholder="Example: 25000"
                {...register("pricePerUnit")}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    "",
                  );
                }}
              />
              {errors?.pricePerUnit && (
                <ErrorMessage message={errors?.pricePerUnit?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Total Price (₹)</label>
              <input
                className="textBox"
                type="text"
                inputMode="numeric"
                placeholder="Auto calculated"
                {...register("totalPrice")}
                readOnly
              />
              {errors?.totalPrice && (
                <ErrorMessage message={errors?.totalPrice?.message || ""} />
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Price Negotiable</label>
              <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <input type="radio" value="Yes" {...register("negotiable")} />
                  <span>Yes</span>
                </label>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <input type="radio" value="No" {...register("negotiable")} />
                  <span>No</span>
                </label>
              </div>
              {errors?.negotiable && (
                <ErrorMessage message={errors?.negotiable?.message || ""} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
