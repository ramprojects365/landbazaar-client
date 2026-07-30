import { CheckSvg } from "@/components/SVG";

interface Props {
  amenities?: { lifestyle?: string[]; facilities?: string[]; security?: string[] };
}

const defaultAmenities = {
  lifestyle:  ["Air Conditioning", "WiFi", "Swimming Pool", "Gym"],
  facilities: ["Covered Parking", "24h Security", "CCTV", "Intercom"],
  security:   ["Gated Community", "Access Card"],
};

export default function AmenitiesCategories({ amenities }: Props) {
  const data = amenities ?? defaultAmenities;
  const all = [
    ...(data.lifestyle  || []),
    ...(data.facilities || []),
    ...(data.security   || []),
  ];

  if (all.length === 0) return <p className="text-muted">No amenities listed.</p>;

  const chunkSize = 4;
  const columns = Array.from({ length: Math.ceil(all.length / chunkSize) }, (_, i) =>
    all.slice(i * chunkSize, i * chunkSize + chunkSize)
  );

  return (
    <div className="tp-property-details-checking">
      <div className="row">
        {columns.map((col, ci) => (
          <div key={ci} className="col-12 col-md-6 col-lg-4">
            <ul>
              {col.map((item, i) => (
                <li key={i}>
                  <div className="tp-contact-input-remeber property tp-property-category">
                    <CheckSvg />
                    <span>{item}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
