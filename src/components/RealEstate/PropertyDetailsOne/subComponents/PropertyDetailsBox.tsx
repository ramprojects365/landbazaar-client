import { LandSizeSvg } from "@/components/SVG";
import { formatTotalPriceDisplay } from "@/components/Utils/formatPrice";
import {
  getListingTypeLabel,
  isLeaseListingType,
} from "@/utils/mapApiProperty";
import {
  CalendarClock,
  CalendarRange,
  ClipboardCheck,
  Coins,
  Compass,
  Hash,
  Landmark,
  Percent,
  RefreshCw,
  Route,
  Scale,
  ShieldCheck,
  Sprout,
  SquareStack,
  Tag,
  Trees,
  Wallet,
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
  monthlyRent?: number | string | null;
  leaseDurationYears?: number | string | null;
  depositAmount?: number | string | null;
  minimumRentalPeriod?: number | string | null;
  renewalOption?: string | boolean | null;
  rentEscalationPercent?: number | string | null;
  noticePeriod?: number | string | null;
}

function hasValue(value: unknown): boolean {
  return value !== null && value !== undefined && String(value).trim() !== "";
}

function formatMoneyValue(value: number | string | null | undefined): string {
  if (!hasValue(value)) return "—";
  return formatTotalPriceDisplay(value);
}

function formatYearsValue(value: number | string | null | undefined): string {
  if (!hasValue(value)) return "—";
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return String(value);
  return `${numeric} ${numeric === 1 ? "year" : "years"}`;
}

function formatMonthsValue(value: number | string | null | undefined): string {
  if (!hasValue(value)) return "—";
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return String(value);
  return `${numeric} ${numeric === 1 ? "month" : "months"}`;
}

function formatPercentValue(value: number | string | null | undefined): string {
  if (!hasValue(value)) return "—";
  return `${value}%`;
}

function formatRenewalOption(
  value: string | boolean | null | undefined,
): string {
  if (value === true || value === "Yes" || value === "yes") return "Yes";
  if (value === false || value === "No" || value === "no") return "No";
  if (!hasValue(value)) return "—";
  return String(value);
}

export default function PropertyDetailsBox({
  propertyType,
  landSize,
  listingType,
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
  monthlyRent,
  leaseDurationYears,
  depositAmount,
  minimumRentalPeriod,
  renewalOption,
  rentEscalationPercent,
  noticePeriod,
}: Props) {
  const isLease = isLeaseListingType(listingType);
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
      label: "Size",
      value: landSize || "—",
    },
  ];

  if (isLease) {
    details.push(
      {
        icon: <PropertyOverviewIcon icon={Wallet} />,
        label: "Monthly Rent",
        value: formatMoneyValue(monthlyRent),
      },
      {
        icon: <PropertyOverviewIcon icon={CalendarRange} />,
        label: "Lease Duration",
        value: formatYearsValue(leaseDurationYears),
      },
      {
        icon: <PropertyOverviewIcon icon={CalendarClock} />,
        label: "Min Lease Period",
        value: formatYearsValue(minimumRentalPeriod),
      },
      {
        icon: <PropertyOverviewIcon icon={Coins} />,
        label: "Security Deposit",
        value: formatMoneyValue(depositAmount),
      },
      {
        icon: <PropertyOverviewIcon icon={RefreshCw} />,
        label: "Renewal Option",
        value: formatRenewalOption(renewalOption),
      },
      {
        icon: <PropertyOverviewIcon icon={Percent} />,
        label: "Rent Escalation / Year",
        value: formatPercentValue(rentEscalationPercent),
      },
      {
        icon: <PropertyOverviewIcon icon={CalendarClock} />,
        label: "Notice Period",
        value: formatMonthsValue(noticePeriod),
      },
    );
  } else {
    details.push(
      {
        icon: <PropertyOverviewIcon icon={Coins} />,
        label: "Unit Price",
        value: pricePerUnit || "—",
      },
      {
        icon: <PropertyOverviewIcon icon={ShieldCheck} />,
        label: "Approvals",
        value: approvalLabel || "—",
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
    );
  }

  details.push(
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
      icon: <PropertyOverviewIcon icon={Sprout} />,
      label: "Soil Type",
      value: soilType || "—",
    },
    {
      icon: <PropertyOverviewIcon icon={Scale} />,
      label: "Clear Title",
      value: clearTitle || "—",
    },
  );

  return (
    <div className="tp-property-details-tags-content">
      <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-md-3 row-cols-2">
        {details.map((detail, index) => (
          <div className="col" key={`${detail.label}-${index}`}>
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
