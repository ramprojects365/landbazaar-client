import {
  BathroomSvg,
  BedRoomSvg,
  HomeSvg,
  MessageSvgTwo,
  SquareFeetSvg,
  YearBuiltIconSvg,
} from "@/components/SVG";
import { ReactNode } from "react";

interface PropertyDetail {
  icon: ReactNode;
  label: string;
  value: string;
}

interface Props {
  //id?: string;
  propertyType?: string;
  bedrooms?: string;
  bathrooms?: string;
  livingArea?: string;
  yearOfBuild?: number;
  furnishing?: string;
  listingType?: string;
  floorLevel?: string;
}

export default function PropertyDetailsBox({
  //id,
  propertyType,
  bedrooms,
  bathrooms,
  livingArea,
  yearOfBuild,
  furnishing,
  listingType,
  floorLevel,
}: Props) {
  const details: PropertyDetail[] = [
    {
      icon: <HomeSvg />,
      label: "Listing",
      value: listingType
        ? listingType.charAt(0).toUpperCase() + listingType.slice(1)
        : "—",
    },
    { icon: <MessageSvgTwo />, label: "Type", value: propertyType || "—" },
    { icon: <BedRoomSvg />, label: "Bedrooms", value: bedrooms || "—" },
    { icon: <BathroomSvg />, label: "Bathrooms", value: bathrooms || "—" },
    { icon: <SquareFeetSvg />, label: "Built-up", value: livingArea || "—" },
    {
      icon: <YearBuiltIconSvg />,
      label: "Year Built",
      value: yearOfBuild ? String(yearOfBuild) : "—",
    },
    {
      icon: <HomeSvg />,
      label: "Furnishing",
      value: furnishing
        ? furnishing === "Fully"
          ? "Fully Furnished"
          : furnishing === "Partially"
            ? "Partially Furnished"
            : furnishing
        : "—",
    },
    { icon: <HomeSvg />, label: "Floor", value: floorLevel || "—" },
  ];

  return (
    <div className="tp-property-details-tags-content">
      <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-2">
        {details.map((detail, index) => (
          <div className="col" key={index}>
            <div className="tp-property-details-tags-item align-items-center mb-30 d-flex">
              <div className="tp-property-details-tags-icon">
                <span>{detail.icon}</span>
              </div>
              <div className="tp-property-details-tags-content">
                <span>{detail.label}</span>
                <p>{detail.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
