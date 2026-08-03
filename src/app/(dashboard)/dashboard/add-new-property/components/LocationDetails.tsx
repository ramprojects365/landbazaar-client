"use client";

import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import ErrorMessage from "../../../../../components/Form/ErrorMassage";
import PlaceSearch, {
  PlaceResult,
} from "../../../../../components/HeroBanner/subComponents/PlaceSearch";
import {
  LAND_CITIES,
  LAND_DISTRICTS,
  LAND_STATES,
} from "@/config/landOptions";

export default function LocationDetails() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<PropertyFormData>();

  const locationValue = watch("location");

  const handleSelect = (result: PlaceResult) => {
    setValue("location", result.address, { shouldValidate: true });
    setValue("latitude", result.lat ?? undefined, { shouldValidate: true });
    setValue("longitude", result.lng ?? undefined, { shouldValidate: true });
  };

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Location Details</h5>
      <div className="tp-dashboard-new-property-box">
        <div className="row">
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Village / Area</label>
              <input
                className="textBox"
                type="text"
                {...register("streetName")}
                placeholder="Example: Kukutpally"
              />
              {errors?.streetName && (
                <ErrorMessage message={errors?.streetName?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Google Map Location</label>
              <PlaceSearch
                onSelect={handleSelect}
                placeholder="Search and pick exact location"
                defaultValue={locationValue ?? ""}
              />
              {/* Hidden inputs so react-hook-form tracks lat/lng */}
              <input type="hidden" {...register("location")} />
              <input type="hidden" {...register("latitude")} />
              <input type="hidden" {...register("longitude")} />
              {errors?.location && (
                <ErrorMessage message={errors?.location?.message || ""} />
              )}
              {/* {!errors?.location && locationValue && (
                <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                  {locationValue}
                </p>
              )} */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>City / Town</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("cityName")} className="listDropDown">
                  <option value="">Select</option>
                  {LAND_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              {errors?.cityName && (
                <ErrorMessage message={errors?.cityName?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>District</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("countryName")} className="listDropDown">
                  <option value="">Select</option>
                  {LAND_DISTRICTS.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              {errors?.countryName && (
                <ErrorMessage message={errors?.countryName?.message || ""} />
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>State</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("stateName")} className="listDropDown">
                  <option value="">Select</option>
                  {LAND_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              {errors?.stateName && (
                <ErrorMessage message={errors?.stateName?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Pin Code</label>
              <input
                className="textBox"
                type="text"
                inputMode="numeric"
                placeholder="6 digit pin code"
                {...register("pinCode")}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    "",
                  );
                  if (e.currentTarget.value.length > 6) {
                    e.currentTarget.value = e.currentTarget.value.slice(0, 6);
                  }
                }}
              />
              {errors?.pinCode && (
                <ErrorMessage message={errors?.pinCode?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Landmark</label>
              <input
                className="textBox"
                type="text"
                {...register("landmark")}
                placeholder="Near ORR Exit 12"
              />
              {errors?.landmark && (
                <ErrorMessage message={errors?.landmark?.message || ""} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
