"use client";

import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import ErrorMessage from "../../../../../components/Form/ErrorMassage";
import PlaceSearch, {
  PlaceResult,
} from "../../../../../components/HeroBanner/subComponents/PlaceSearch";

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
              <label>Property Name</label>
              <input
                className="textBox"
                type="text"
                {...register("propertyName")}
                placeholder="The Horizon Residences"
              />
              {errors?.propertyName && (
                <ErrorMessage message={errors?.propertyName?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Property Location</label>
              <PlaceSearch
                onSelect={handleSelect}
                placeholder="Search property location"
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
              <label>Street Name</label>
              <input
                className="textBox"
                type="text"
                {...register("streetName")}
                placeholder="Enter street name"
              />
              {errors?.streetName && (
                <ErrorMessage message={errors?.streetName?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>City Name</label>
              <input
                className="textBox"
                type="text"
                {...register("cityName")}
                placeholder="Enter city name"
              />
              {errors?.cityName && (
                <ErrorMessage message={errors?.cityName?.message || ""} />
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
                  <option value="Johor">Johor</option>
                  <option value="Kedah">Kedah</option>
                  <option value="Kelantan">Kelantan</option>
                  <option value="Kuala Lumpur">Kuala Lumpur</option>
                  <option value="Melaka">Melaka</option>
                  <option value="Negeri Sembilan">Negeri Sembilan</option>
                  <option value="Pahang">Pahang</option>
                  <option value="Perak">Perak</option>
                  <option value="Perlis">Perlis</option>
                  <option value="Pulau Pinang">Pulau Pinang</option>
                  <option value="Sabah">Sabah</option>
                  <option value="Sarawak">Sarawak</option>
                  <option value="Selangor">Selangor</option>
                  <option value="Terengganu">Terengganu</option>
                </select>
              </div>
              {errors?.stateName && (
                <ErrorMessage message={errors?.stateName?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Country</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("countryName")} className="listDropDown">
                  <option value="Malaysia">Malaysia</option>
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
              <label>Pin Code</label>
              <input
                className="textBox"
                type="text"
                inputMode="numeric"
                placeholder="Enter Pin Code"
                {...register("pinCode")}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    "",
                  );
                  if (e.currentTarget.value.length > 5) {
                    e.currentTarget.value = e.currentTarget.value.slice(0, 5);
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
                placeholder="Near MRT"
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
