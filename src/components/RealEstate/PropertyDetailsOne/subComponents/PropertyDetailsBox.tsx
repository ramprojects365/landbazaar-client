import {
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
  propertyType?: string;
  landSize?: string;
  listingType?: string;
  facingDirection?: string;
  cornerPlot?: string;
  roadWidth?: string;
  surveyNumber?: string;
  clearTitle?: string;
  loanFacility?: string;
}

export default function PropertyDetailsBox({
  propertyType,
  landSize,
  listingType,
  facingDirection,
  cornerPlot,
  roadWidth,
  surveyNumber,
  clearTitle,
  loanFacility,
}: Props) {
  const details: PropertyDetail[] = [
    {
      icon: <HomeSvg />,
      label: "Listing",
      value:
        listingType === "sale"
          ? "For Sale"
          : listingType === "rent"
            ? "For Rent"
            : listingType
              ? listingType.charAt(0).toUpperCase() + listingType.slice(1)
              : "—",
    },
    { icon: <MessageSvgTwo />, label: "Land Type", value: propertyType || "—" },
    { icon: <SquareFeetSvg />, label: "Land Size", value: landSize || "—" },
    {
      icon: <YearBuiltIconSvg />,
      label: "Facing",
      value: facingDirection || "—",
    },
    { icon: <HomeSvg />, label: "Corner Plot", value: cornerPlot || "—" },
    { icon: <HomeSvg />, label: "Road Width", value: roadWidth || "—" },
    { icon: <HomeSvg />, label: "Survey No.", value: surveyNumber || "—" },
    { icon: <HomeSvg />, label: "Clear Title", value: clearTitle || "—" },
    { icon: <HomeSvg />, label: "Loan", value: loanFacility || "—" },
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
