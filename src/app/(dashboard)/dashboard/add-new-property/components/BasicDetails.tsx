"use client";

import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import ErrorMessage from "../../../../../components/Form/ErrorMassage";
import DescriptionEditor from "@/components/Form/DescriptionEditor";
import "../property.css";
import { useState, useEffect, useCallback } from "react";
import { AREA_UNITS, LAND_TYPES, LISTING_TYPES } from "@/config/landOptions";
import { formatTotalPriceDisplay } from "@/components/Utils/formatPrice";
import {
  DESCRIPTION_MAX_CHARS,
  stripDescriptionHtml,
} from "@/utils/descriptionHtml";

const digitsOnlyInput = (e: React.FormEvent<HTMLInputElement>) => {
  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
};

const getDefaultLandSizeForUnit = (unit: string): string => {
  switch (unit) {
    case "Square Yard":
      return "100";
    case "Acre":
    case "Gunta":
    case "Cent":
      return "1";
    default:
      return "";
  }
};

export default function BasicDetails() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<PropertyFormData>();

  const listingType = watch("listingType") || "";
  const isLeaseListing = listingType === "lease";
  const description = watch("description") || "";
  const landArea = watch("landSize") || "";
  const pricePerUnit = watch("pricePerUnit") || "";
  const totalPrice = watch("totalPrice") || "";
  const currentPrice = watch("price") || "";
  const [charCount, setCharCount] = useState(0);
  const { onChange: onAreaUnitChange, ...areaUnitRegister } =
    register("areaUnit");

  const handleAreaUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onAreaUnitChange(e);
    const defaultSize = getDefaultLandSizeForUnit(e.target.value);
    if (defaultSize) {
      setValue("landSize", defaultSize, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  useEffect(() => {
    setCharCount(stripDescriptionHtml(description).length);
  }, [description]);

  useEffect(() => {
    if (isLeaseListing) {
      if (totalPrice) {
        setValue("totalPrice", "", { shouldValidate: false });
      }
      if (currentPrice) {
        setValue("price", "", { shouldValidate: false });
      }
      return;
    }

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
  }, [
    isLeaseListing,
    landArea,
    pricePerUnit,
    totalPrice,
    currentPrice,
    setValue,
  ]);

  const handleDescriptionChange = useCallback(
    (html: string, plainTextLength: number) => {
      setValue("description", html, { shouldValidate: true, shouldDirty: true });
      setCharCount(plainTextLength);
    },
    [setValue],
  );

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
                placeholder="HMDA Approved 200 Square Yard Plot for Sale in Shadnagar"
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
                  {Math.max(DESCRIPTION_MAX_CHARS - charCount, 0)} remaining
                </div>
              </div>
              <DescriptionEditor
                value={description}
                onChange={handleDescriptionChange}
              />
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
                <select
                  {...areaUnitRegister}
                  className="listDropDown"
                  onChange={handleAreaUnitChange}
                >
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
                onInput={digitsOnlyInput}
              />
              {errors?.landSize && (
                <ErrorMessage message={errors?.landSize?.message || ""} />
              )}
            </div>
          </div>
          {!isLeaseListing && (
            <>
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Price Per Unit (INR)</label>
                  <input
                    className="textBox"
                    type="text"
                    inputMode="numeric"
                    placeholder="Example: 25000"
                    {...register("pricePerUnit")}
                    onInput={digitsOnlyInput}
                  />
                  {errors?.pricePerUnit && (
                    <ErrorMessage
                      message={errors?.pricePerUnit?.message || ""}
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Total Price</label>
                  <input type="hidden" {...register("totalPrice")} />
                  <input
                    className="textBox"
                    type="text"
                    readOnly
                    value={
                      totalPrice ? formatTotalPriceDisplay(totalPrice) : ""
                    }
                    placeholder="Auto calculated"
                    style={{ background: "#f6f6f6", cursor: "default" }}
                  />
                  {errors?.totalPrice && (
                    <ErrorMessage message={errors?.totalPrice?.message || ""} />
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {isLeaseListing && (
          <>
            <div className="row">
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Monthly Rent (INR)</label>
                  <input
                    className="textBox"
                    type="text"
                    inputMode="numeric"
                    placeholder="Example: 25000"
                    {...register("monthlyRent")}
                    onInput={digitsOnlyInput}
                  />
                  {errors?.monthlyRent && (
                    <ErrorMessage message={errors?.monthlyRent?.message || ""} />
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Lease Duration (Years)</label>
                  <input
                    className="textBox"
                    type="text"
                    inputMode="numeric"
                    placeholder="Example: 5"
                    {...register("leaseDurationYears")}
                    onInput={digitsOnlyInput}
                  />
                  {errors?.leaseDurationYears && (
                    <ErrorMessage
                      message={errors?.leaseDurationYears?.message || ""}
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Min Lease Period (Years)</label>
                  <input
                    className="textBox"
                    type="text"
                    inputMode="numeric"
                    placeholder="Example: 1"
                    {...register("minimumRentalPeriod")}
                    onInput={digitsOnlyInput}
                  />
                  {errors?.minimumRentalPeriod && (
                    <ErrorMessage
                      message={errors?.minimumRentalPeriod?.message || ""}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Security Deposit (INR)</label>
                  <input
                    className="textBox"
                    type="text"
                    inputMode="numeric"
                    placeholder="Example: 50000"
                    {...register("depositAmount")}
                    onInput={digitsOnlyInput}
                  />
                  {errors?.depositAmount && (
                    <ErrorMessage
                      message={errors?.depositAmount?.message || ""}
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Rent Escalation Every Year (%)</label>
                  <input
                    className="textBox"
                    type="text"
                    inputMode="numeric"
                    placeholder="Example: 5"
                    {...register("rentEscalationPercent")}
                    onInput={digitsOnlyInput}
                  />
                  {errors?.rentEscalationPercent && (
                    <ErrorMessage
                      message={errors?.rentEscalationPercent?.message || ""}
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Notice Period (Months)</label>
                  <input
                    className="textBox"
                    type="text"
                    inputMode="numeric"
                    placeholder="Example: 3"
                    {...register("noticePeriod")}
                    onInput={digitsOnlyInput}
                  />
                  {errors?.noticePeriod && (
                    <ErrorMessage
                      message={errors?.noticePeriod?.message || ""}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Renewal Option</label>
                  <div
                    style={{ display: "flex", gap: "16px", marginTop: "8px" }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <input
                        type="radio"
                        value="Yes"
                        {...register("renewalOption")}
                      />
                      <span>Yes</span>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <input
                        type="radio"
                        value="No"
                        {...register("renewalOption")}
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {errors?.renewalOption && (
                    <ErrorMessage
                      message={errors?.renewalOption?.message || ""}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}

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
