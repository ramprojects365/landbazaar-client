import { LandSizeSvg } from "@/components/SVG";
import { getListingTypeLabel } from "@/utils/mapApiProperty";
import {
  ClipboardCheck,
  Coins,
  Compass,
  Hash,
  Landmark,
  Route,
  Scale,
  ScrollText,
  ShieldCheck,
  Sprout,
  SquareStack,
  Tag,
  Trees,
} from "lucide-react";
import { ReactNode } from "react";
import PropertyOverviewIcon from "./PropertyOverviewIcon";

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
      icon: <PropertyOverviewIcon icon={Tag} />,
      label: "Listing",
      value: getListingTypeLabel(listingType),
    },
    {
      icon: <PropertyOverviewIcon icon={Trees} />,
      label: "Land Type",
      value: propertyType || "—",
    },
    {
      icon: <LandSizeSvg />,
      label: "Land Size",
      value: landSize || "—",
    },
    {
      icon: <PropertyOverviewIcon icon={Coins} />,
      label: "Price / Unit",
      value: pricePerUnit || "—",
    },
    {
      icon: <PropertyOverviewIcon icon={ScrollText} />,
      label: "Tenure",
      value: tenure?.trim() || "—",
    },
    {
      icon: <PropertyOverviewIcon icon={Compass} />,
      label: "Facing",
      value: facingDirection || "—",
    },
    {
      icon: <PropertyOverviewIcon icon={SquareStack} />,
      label: "Corner Plot",
      value: cornerPlot || "—",
    },
    {
      icon: <PropertyOverviewIcon icon={Route} />,
      label: "Road Width",
      value: roadWidth || "—",
    },
    {
      icon: <PropertyOverviewIcon icon={Hash} />,
      label: "Survey No.",
      value: surveyNumber || "—",
    },
    {
      icon: <PropertyOverviewIcon icon={ShieldCheck} />,
      label: "Approvals",
      value: approvalLabel || "—",
    },
    {
      icon: <PropertyOverviewIcon icon={Sprout} />,
      label: "Soil Type",
      value: soilType || "—",
    },
    {
      icon: <PropertyOverviewIcon icon={Scale} />,
      label: "Clear Title",
      value: clearTitle || "—",
    },
    {
      icon: <PropertyOverviewIcon icon={Landmark} />,
      label: "Loan",
      value: loanFacility || "—",
    },
    {
      icon: <PropertyOverviewIcon icon={ClipboardCheck} />,
      label: "Registration",
      value: registrationReady || "—",
    },
  ];

  return (
    <div className="tp-property-details-tags-content">
      <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-md-3 row-cols-2">
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
