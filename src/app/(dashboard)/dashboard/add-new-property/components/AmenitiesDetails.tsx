"use client";
import { useFormContext } from "react-hook-form";
import { OTHER_FACILITIES } from "@/config/landOptions";

interface FormValues {
  amenities?: string[];
}

function AmenitiesChecklist() {
  const { register } = useFormContext<FormValues>();

  return (
    <div className="col-12">
      <div className="row">
        {OTHER_FACILITIES.map((amenity, index) => (
          <div key={index} className="col-12 col-lg-4">
            <div className="tp-contact-input-remeber property">
              <input
                id={`amenity-facility-${index}`}
                type="checkbox"
                value={amenity}
                {...register("amenities")}
              />
              <label htmlFor={`amenity-facility-${index}`}>{amenity}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AmenitiesArea() {
  useFormContext<FormValues>();

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Other Facilities</h5>
      <div className="tp-property-details-checking tp-dashboard-new-cheking">
        <div className="row">
          <AmenitiesChecklist />
        </div>
      </div>
    </div>
  );
}
