import UserContactCard from "@/components/Layout/subComponents/UserContactCard";
import SidebarPropertyItem from "@/components/Layout/subComponents/SidebarPropertyItem";
import PropertyDescription from "@/components/Property/PropertyDescription";
import RecentlyViewedProperties from "./RecentlyViewedItem";
import AmenitiesCategories from "./AmenitiesCategories";
import PropertyDocuments from "./PropertyDocuments";
import PropertyDetailsBox from "./PropertyDetailsBox";
import PropertyLocationMap, {
  hasValidPropertyCoordinates,
} from "./PropertyLocationMap";
import {
  formatLandSize,
  formatPricePerUnit,
  type ApiPropertyFields,
} from "@/utils/mapApiProperty";

interface IProps {
  spacingClass?: string;
  property?: ApiPropertyFields;
}

export default function DetailsReusableArea({
  spacingClass,
  property,
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

              {address && (
                <div className="tp-property-details-box box-6 mb-30">
                  <h3 className="tp-property-details-box-title">
                    Contact & Address
                  </h3>
                  <div className="tp-property-details-box-desc">
                    <p>{property?.contactPersonName}</p>
                    <p>{property?.contactNumber}</p>
                    <p>{address}</p>
                    {property?.landmark && (
                      <p>
                        <strong>Landmark:</strong> {property.landmark}
                      </p>
                    )}
                    {property?.location && (
                      <p>
                        <strong>Location:</strong> {property.location}
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
                    latitude={property.latitude}
                    longitude={property.longitude}
                    location={property.location}
                    title={property.propertyName || property.title}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="tp-property-details-right">
              <UserContactCard user={property?.user} />
              <SidebarPropertyItem />
              <RecentlyViewedProperties />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
