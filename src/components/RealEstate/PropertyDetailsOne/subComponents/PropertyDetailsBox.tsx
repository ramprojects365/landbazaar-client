import {
  HomeSvg,
  MessageSvgTwo,
  SquareFeetSvg,
  YearBuiltIconSvg,
} from "@/components/SVG";
import { getListingTypeLabel } from "@/utils/mapApiProperty";
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
  tenure?: string;
  pricePerUnit?: string;
  facingDirection?: string;
  cornerPlot?: string;
  roadWidth?: string;
  surveyNumber?: string;
  approvalTypes?: string[];
  soilType?: string;
  clearTitle?: string;
  loanFacility?: string;
  registrationReady?: string;
}

export default function PropertyDetailsBox({
  propertyType,
  landSize,
  listingType,
  tenure,
  pricePerUnit,
  facingDirection,
  cornerPlot,
  roadWidth,
  surveyNumber,
  approvalTypes,
  soilType,
  clearTitle,
  loanFacility,
  registrationReady,
}: Props) {
  const approvalLabel =
    approvalTypes && approvalTypes.length > 0
      ? approvalTypes.join(", ")
      : undefined;

  const details: PropertyDetail[] = [
    {
      icon: <HomeSvg />,
      label: "Listing",
      value: getListingTypeLabel(listingType),
    },
    { icon: <MessageSvgTwo />, label: "Land Type", value: propertyType || "—" },
    { icon: <SquareFeetSvg />, label: "Land Size", value: landSize || "—" },
    { icon: <SquareFeetSvg />, label: "Price / Unit", value: pricePerUnit || "—" },
    { icon: <HomeSvg />, label: "Tenure", value: tenure?.trim() || "—" },
    {
      icon: <YearBuiltIconSvg />,
      label: "Facing",
      value: facingDirection || "—",
    },
    { icon: <HomeSvg />, label: "Corner Plot", value: cornerPlot || "—" },
    { icon: <HomeSvg />, label: "Road Width", value: roadWidth || "—" },
    { icon: <HomeSvg />, label: "Survey No.", value: surveyNumber || "—" },
    { icon: <HomeSvg />, label: "Approvals", value: approvalLabel || "—" },
    { icon: <HomeSvg />, label: "Soil Type", value: soilType || "—" },
    { icon: <HomeSvg />, label: "Clear Title", value: clearTitle || "—" },
    { icon: <HomeSvg />, label: "Loan", value: loanFacility || "—" },
    {
      icon: <HomeSvg />,
      label: "Registration",
      value: registrationReady || "—",
    },
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
