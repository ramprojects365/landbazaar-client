import UserContactCard from "@/components/Layout/subComponents/UserContactCard";
import SidebarPropertyItem from "@/components/Layout/subComponents/SidebarPropertyItem";
import PropertyDescription from "@/components/Property/PropertyDescription";
import RecentlyViewedProperties from "./RecentlyViewedItem";
import AmenitiesCategories from "./AmenitiesCategories";
import PropertyDocuments from "./PropertyDocuments";
import PropertyDetailsBox from "./PropertyDetailsBox";
import {
  formatLandSize,
  formatPricePerUnit,
  getPropertyHeadingTitle,
  type ApiPropertyFields,
} from "@/utils/mapApiProperty";
import { hasValidPropertyCoordinates } from "@/utils/propertyCoordinates";
import { getTelHref } from "@/utils/phoneInput";
import type { FeaturedSidebarProperty } from "@/types/propertySidebar";
import type { IRecentlyViewedItem } from "@/types/custom-interface";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PropertyLocationMap = dynamic(
  () => import("./PropertyLocationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="tp-property-details-map-status tp-property-details-map-status--loading">
        Loading map…
      </div>
    ),
  },
);

interface IProps {
  spacingClass?: string;
  property?: ApiPropertyFields;
  featuredProperty?: FeaturedSidebarProperty | null;
  recentProperties?: IRecentlyViewedItem[];
}

function getSafeExternalHref(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (
    /^(maps\.app\.goo\.gl|goo\.gl\/|maps\.google\.|www\.google\.[^/\s]+\/maps)/i.test(
      trimmed,
    )
  ) {
    return `https://${trimmed}`;
  }
  return undefined;
}

export default function DetailsReusableArea({
  spacingClass,
  property,
  featuredProperty = null,
  recentProperties = [],
}: IProps) {
  const landSize = formatLandSize(property?.landSize, property?.areaUnit);
  const pricePerUnit = formatPricePerUnit(
    property?.pricePerUnit,
    property?.areaUnit,
  );

  const address = [
    property?.streetName,
    property?.cityName,
    property?.state,
    property?.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  const googleLocationPath = property?.googleLocationPath?.trim() || "";
  const googleLocationHref = googleLocationPath
    ? getSafeExternalHref(googleLocationPath)
    : undefined;
  const contactTelHref = getTelHref(property?.contactNumber);

  const hasContactAddress =
    Boolean(address) ||
    Boolean(property?.contactPersonName) ||
    Boolean(property?.contactNumber) ||
    Boolean(property?.landmark) ||
    Boolean(property?.location) ||
    Boolean(googleLocationPath);

  return (
    <section className={`tp-property-details-ptb pb-120 ${spacingClass ?? ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="tp-property-details-left">
              <div className="tp-property-details-box box-1 mb-30">
                <h3 className="tp-property-details-box-title">Description</h3>
                <div className="tp-property-details-box-desc">
                  <PropertyDescription description={property?.description} />
                </div>
              </div>

              <div className="tp-property-details-box box-2 mb-30">
                <h3 className="tp-property-details-box-title">Overview</h3>
                <PropertyDetailsBox
                  propertyType={property?.propertyType}
                  landSize={landSize !== "—" ? landSize : undefined}
                  listingType={property?.listingType}
                  pricePerUnit={pricePerUnit !== "—" ? pricePerUnit : undefined}
                  facingDirection={property?.facingDirection}
                  cornerPlot={property?.cornerPlot}
                  roadWidth={property?.roadWidth}
                  surveyNumber={property?.surveyNumber}
                  approvalTypes={property?.approvalTypes}
                  soilType={property?.soilType}
                  clearTitle={property?.clearTitle}
                  loanFacility={property?.loanFacility}
                  registrationReady={property?.registrationReady}
                  renovationStatus={property?.renovationStatus}
                  monthlyRent={property?.monthlyRent}
                  leaseDurationYears={property?.leaseDurationYears}
                  depositAmount={property?.depositAmount}
                  minimumRentalPeriod={property?.minimumRentalPeriod}
                  renewalOption={property?.renewalOption}
                  rentEscalationPercent={property?.rentEscalationPercent}
                  noticePeriod={property?.noticePeriod}
                />
              </div>

              <div className="tp-property-details-box box-4 mb-30">
                <h3 className="tp-property-details-box-title">Amenities</h3>
                <AmenitiesCategories amenities={property?.amenities} />
              </div>

              <PropertyDocuments documents={property?.documents} />

              {hasContactAddress && (
                <div className="tp-property-details-box box-6 mb-30">
                  <h3 className="tp-property-details-box-title">
                    Contact & Address
                  </h3>
                  <div className="tp-property-details-box-desc">
                    {property?.contactPersonName && (
                      <p>{property.contactPersonName}</p>
                    )}
                    {property?.contactNumber && (
                      <p>
                        {contactTelHref ? (
                          <a
                            href={contactTelHref}
                            className="tp-property-details-contact-phone"
                          >
                            {property.contactNumber}
                          </a>
                        ) : (
                          property.contactNumber
                        )}
                      </p>
                    )}
                    {property?.landmark && (
                      <p>
                        <strong>Landmark:</strong> {property.landmark}
                      </p>
                    )}
                    {property?.location && (
                      <p>
                        <strong>Address:</strong> {property.location}
                      </p>
                    )}
                    {googleLocationPath && (
                      <p className="tp-property-details-google-path">
                        <strong>Google Location Path:</strong>{" "}
                        {googleLocationHref ? (
                          <a
                            href={googleLocationHref}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {googleLocationPath}
                          </a>
                        ) : (
                          googleLocationPath
                        )}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {hasValidPropertyCoordinates(
                property?.latitude,
                property?.longitude,
              ) && (
                <div className="tp-property-details-box box-7 mb-30">
                  <h3 className="tp-property-details-box-title">
                    Property Location
                  </h3>
                  <PropertyLocationMap
                    latitude={property?.latitude}
                    longitude={property?.longitude}
                    location={property?.location}
                    title={getPropertyHeadingTitle(property)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="tp-property-details-right">
              <UserContactCard user={property?.user} />
              <Suspense fallback={null}>
                <SidebarPropertyItem featuredProperty={featuredProperty} />
              </Suspense>
              <Suspense fallback={null}>
                <RecentlyViewedProperties initialProperties={recentProperties} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
