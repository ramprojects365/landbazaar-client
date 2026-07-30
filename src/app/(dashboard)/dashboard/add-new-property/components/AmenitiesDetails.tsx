"use client";
import { useFormContext } from "react-hook-form";

interface AmenityGroup {
  title: string;
  amenities: string[];
}

interface FormValues {
  amenities?: string[];
}

const amenityGroups: AmenityGroup[] = [
  {
    title: "Lifestyle",
    amenities: [
      "Swimming Pool",
      "Gymnasium",
      "Playground",
      "BBQ Area",
      "Function Room",
      "Games Room",
      "Sky Garden",
      "Reading Room",
      "Lounge",
    ],
  },
  {
    title: "Facilities",
    amenities: [
      "Covered Parking",
      "Visitor Parking",
      "Service Lift",
      "Surau / Prayer Room",
      "Parcel Locker",
      "Laundry Room",
      "Cafeteria",
    ],
  },
  {
    title: "Security & Safety",
    amenities: [
      "24-hour Security",
      "CCTV Surveillance",
      "Access Card System",
      "Fire Alarm System",
      "Emergency Exit",
    ],
  },
];

export function AmenityGroup({ title, amenities }: AmenityGroup) {
  const { register } = useFormContext<FormValues>();
  //const selected = watch("amenities", []);

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <p>{title}:</p>
      <ul>
        {amenities.map((amenity, index) => (
          <li key={index}>
            <div className="tp-contact-input-remeber property">
              <input
                id={`amenity-${title}-${index}`}
                type="checkbox"
                value={amenity}
                {...register("amenities")}
              />
              <label htmlFor={`amenity-${title}-${index}`}>{amenity}</label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AmenitiesArea() {
  const {
    formState: {},
  } = useFormContext<FormValues>();

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Amenities</h5>
      <div className="tp-property-details-checking tp-dashboard-new-cheking">
        <div className="row">
          {amenityGroups.map((group, index) => (
            <AmenityGroup key={index} {...group} />
          ))}
        </div>
      </div>

      {/* Display validation error if no amenities selected */}
      {/* {errors?.amenities && (
        <ErrorMessage message={errors?.amenities?.message || ""} />
      )} */}
    </div>
  );
}
