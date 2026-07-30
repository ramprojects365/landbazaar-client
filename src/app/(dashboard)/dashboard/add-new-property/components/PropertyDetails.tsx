"use client";

import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import ErrorMessage from "../../../../../components/Form/ErrorMassage";
import "../property.css";

export default function BasicDetails() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<PropertyFormData>();

  const propertyType = watch("propertyType");
  const listingType = (watch("listingType") || "").trim().toLowerCase();

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Property Details</h5>
      <div className="tp-dashboard-new-property-box">
        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              {listingType === "rent" ? (
                <label>Monthly Rent</label>
              ) : listingType === "sale" ? (
                <label>Selling Price</label>
              ) : (
                <label>Price</label>
              )}
              <input
                className="textBox"
                type="text"
                inputMode="numeric"
                placeholder="Enter amount"
                {...register("price")}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    "",
                  );
                }}
              />
              {errors?.price && (
                <ErrorMessage message={errors?.price?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Built Up Area (sq.ft)</label>
              <input
                className="textBox"
                type="text"
                inputMode="numeric"
                placeholder="Enter build up area"
                {...register("builtUpArea")}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    "",
                  );
                }}
              />
              {errors?.builtUpArea && (
                <ErrorMessage message={errors?.builtUpArea?.message || ""} />
              )}
            </div>
          </div>
          {propertyType !== "Apartment" &&
            propertyType !== "Condominium" &&
            propertyType !== "Serviced Residence" &&
            propertyType !== "Shop Lot" && (
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Land Size (sq.ft)</label>
                  <input
                    className="textBox"
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter land size"
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
            )}
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Furnishing</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("furnishing")} className="listDropDown">
                  <option value="Fully">Fully Furnished</option>
                  <option value="Partially">Partially Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>
              <div>
                {errors?.furnishing && (
                  <ErrorMessage message={errors?.furnishing?.message || ""} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Bed Rooms</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("bedRooms")} className="listDropDown">
                  <option value="">Select bed rooms</option>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                  <option value="3.5">3.5</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="6">7</option>
                  <option value="6">8</option>
                </select>
              </div>
              <div>
                {errors?.bedRooms && (
                  <ErrorMessage message={errors?.bedRooms?.message || ""} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Bath Rooms</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("bathRooms")} className="listDropDown">
                  <option value="">Select bathrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="6">7</option>
                  <option value="6">8</option>
                </select>
              </div>
              <div>
                {errors?.bathRooms && (
                  <ErrorMessage message={errors?.bathRooms?.message || ""} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Availability</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("availability")} className="listDropDown">
                  <option value="Immediate">Immediate</option>
                  <option value="Next month">Next Month</option>
                  <option value="Under Construction">Under Construction</option>
                </select>
              </div>
              <div>
                {errors?.availability && (
                  <ErrorMessage message={errors?.availability?.message || ""} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Floor</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("floorLevel")} className="listDropDown">
                  <option value="">Select floor</option>
                  <option value="Ground">Ground</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                {errors?.floorLevel && (
                  <ErrorMessage message={errors?.floorLevel?.message || ""} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Property Age</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("propertyAge")} className="listDropDown">
                  <option value="">Select property age</option>
                  <option value="1">1 to 3 years</option>
                  <option value="2">3 to 5 years</option>
                  <option value="3">5 to 10 years</option>
                  <option value="4">More than 10 years</option>
                </select>
              </div>
              <div>
                {errors?.propertyAge && (
                  <ErrorMessage message={errors?.propertyAge?.message || ""} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {listingType === "sale" && (
            <div className="col-lg-4">
              <div className="tp-dashboard-new-input">
                <label>Year of Completion</label>
                <input
                  className="textBox"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter year (e.g., 2020)"
                  {...register("yearOfCompletion")}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /\D/g,
                      "",
                    );
                  }}
                />
                {errors?.yearOfCompletion && (
                  <ErrorMessage
                    message={errors?.yearOfCompletion?.message || ""}
                  />
                )}
              </div>
            </div>
          )}
          {listingType === "sale" && (
            <div className="col-lg-4">
              <div className="tp-dashboard-new-input">
                <label>Car Park Allocation</label>
                <div className="tp-property-tabs-select tp-select">
                  <select
                    {...register("carParkAllocation")}
                    className="listDropDown"
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <div>
                  {errors?.carParkAllocation && (
                    <ErrorMessage
                      message={errors?.carParkAllocation?.message || ""}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          {listingType === "sale" && (
            <div className="col-lg-4">
              <div className="tp-dashboard-new-input">
                <label>Facing Direction</label>
                <div className="tp-property-tabs-select tp-select">
                  <select
                    {...register("facingDirection")}
                    className="listDropDown"
                  >
                    <option value="">Select</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="North East">North East</option>
                    <option value="North West">North West</option>
                    <option value="South East">South East</option>
                    <option value="South West">South West</option>
                  </select>
                </div>
                <div>
                  {errors?.facingDirection && (
                    <ErrorMessage
                      message={errors?.facingDirection?.message || ""}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {listingType === "rent" && (
          <div className="row">
            <div className="col-lg-4">
              <div className="tp-dashboard-new-input">
                <label>Car Park Allocation</label>
                <div className="tp-property-tabs-select tp-select">
                  <select
                    {...register("carParkAllocation")}
                    className="listDropDown"
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <div>
                  {errors?.carParkAllocation && (
                    <ErrorMessage
                      message={errors?.carParkAllocation?.message || ""}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {listingType === "sale" && (
          <div className="row">
            <div className="col-lg-4">
              <div className="tp-dashboard-new-input">
                <label>Renovation Status</label>
                <div className="tp-property-tabs-select tp-select">
                  <select
                    {...register("renovationStatus")}
                    className="listDropDown"
                  >
                    <option value="">Select</option>
                    <option value="Fully Renovated">Fully Renovated</option>
                    <option value="Partially Renovated">
                      Partially Renovated
                    </option>
                    <option value="Original Condition">
                      Original Condition
                    </option>
                  </select>
                </div>
                <div>
                  {errors?.renovationStatus && (
                    <ErrorMessage
                      message={errors?.renovationStatus?.message || ""}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="tp-dashboard-new-input">
                <label>Negotiable</label>
                <div className="tp-property-tabs-select tp-select">
                  <select {...register("negotiable")} className="listDropDown">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  {errors?.negotiable && (
                    <ErrorMessage message={errors?.negotiable?.message || ""} />
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="tp-dashboard-new-input">
                <label>Bumi Lot Status</label>
                <div className="tp-property-tabs-select tp-select">
                  <select
                    {...register("bumiLotStatus")}
                    className="listDropDown"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  {errors?.bumiLotStatus && (
                    <ErrorMessage
                      message={errors?.bumiLotStatus?.message || ""}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {listingType === "rent" && (
          <>
            <div className="row">
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Deposit Amount (RM)</label>
                  <input
                    className="textBox"
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter deposit amount"
                    {...register("depositAmount")}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /\D/g,
                        "",
                      );
                    }}
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
                  <label>Minimum Rental Period</label>
                  <div className="tp-property-tabs-select tp-select">
                    <select
                      {...register("minimumRentalPeriod")}
                      className="listDropDown"
                    >
                      <option value="">Select</option>
                      <option value="6 months">6 months</option>
                      <option value="12 months">12 months</option>
                      <option value="24 months">24 months</option>
                      <option value="36 months">36 months</option>
                    </select>
                  </div>
                  <div>
                    {errors?.minimumRentalPeriod && (
                      <ErrorMessage
                        message={errors?.minimumRentalPeriod?.message || ""}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Pet Policy</label>
                  <div className="tp-property-tabs-select tp-select">
                    <select {...register("petPolicy")} className="listDropDown">
                      <option value="">Select</option>
                      <option value="Allowed">Allowed</option>
                      <option value="Not Allowed">Not Allowed</option>
                    </select>
                  </div>
                  <div>
                    {errors?.petPolicy && (
                      <ErrorMessage
                        message={errors?.petPolicy?.message || ""}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Preferred Tenant Type</label>
                  <div className="tp-property-tabs-select tp-select">
                    <select
                      {...register("preferredTenantType")}
                      className="listDropDown"
                    >
                      <option value="">Select</option>
                      <option value="Family">Family</option>
                      <option value="Single">Single</option>
                      <option value="Students">Students</option>
                      <option value="Company">Company</option>
                      <option value="Any">Any</option>
                    </select>
                  </div>
                  <div>
                    {errors?.preferredTenantType && (
                      <ErrorMessage
                        message={errors?.preferredTenantType?.message || ""}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {(propertyType === "Condominium" ||
          propertyType === "Apartment" ||
          propertyType === "Serviced Residence" ||
          propertyType === "Office" ||
          propertyType === "Shop Lot") &&
          listingType === "sale" && (
            <div className="row">
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Maintenance Fee (RM/month)</label>
                  <input
                    className="textBox"
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter maintenance fee"
                    {...register("maintenanceFee")}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /\D/g,
                        "",
                      );
                    }}
                  />
                  {errors?.maintenanceFee && (
                    <ErrorMessage
                      message={errors?.maintenanceFee?.message || ""}
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Sinking Fund (RM/month)</label>
                  <input
                    className="textBox"
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter sinking fund"
                    {...register("sinkingFund")}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /\D/g,
                        "",
                      );
                    }}
                  />
                  {errors?.sinkingFund && (
                    <ErrorMessage
                      message={errors?.sinkingFund?.message || ""}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
