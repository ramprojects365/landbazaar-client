import { CheckSvg } from "@/components/SVG";

export type PropertyAmenities = {
  lifestyle?: string[];
  facilities?: string[];
  security?: string[];
};

interface Props {
  amenities?: PropertyAmenities;
}

export function getListedAmenities(amenities?: PropertyAmenities | null): string[] {
  if (!amenities) return [];
  return [
    ...(amenities.lifestyle || []),
    ...(amenities.facilities || []),
    ...(amenities.security || []),
  ]
    .filter((item): item is string => typeof item === "string" && Boolean(item.trim()))
    .map((item) => item.trim());
}

export default function AmenitiesCategories({ amenities }: Props) {
  const all = getListedAmenities(amenities);

  if (all.length === 0) return null;

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
