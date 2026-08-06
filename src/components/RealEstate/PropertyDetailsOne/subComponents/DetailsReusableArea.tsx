import UserContactCard from "@/components/Layout/subComponents/UserContactCard";
import SidebarPropertyItem from "@/components/Layout/subComponents/SidebarPropertyItem";
import DiscountOfferCard from "@/components/Layout/subComponents/DiscountOfferCard";
import RecentlyViewedProperties from "./RecentlyViewedItem";
import AmenitiesCategories from "./AmenitiesCategories";
import PropertyDetailsBox from "./PropertyDetailsBox";
import { formatLandSize } from "@/utils/mapApiProperty";

interface ApiProperty {
  id?: string;
  description?: string;
  listingType?: string;
  propertyType?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  buildupArea?: number | string;
  landSize?: number | string;
  areaUnit?: string;
  yearOfBuild?: number;
  furnishing?: string;
  propertyName?: string;
  floorLevel?: string;
  streetName?: string;
  cityName?: string;
  state?: string;
  pincode?: string;
  landmark?: string;
  facingDirection?: string;
  cornerPlot?: string;
  roadWidth?: string;
  surveyNumber?: string;
  clearTitle?: string;
  loanFacility?: string;
  amenities?: {
    lifestyle?: string[];
    facilities?: string[];
    security?: string[];
  };
  user?: {
    username?: string;
    email?: string;
    phoneNumber?: string;
    userType?: string | null;
    profileImage?: string;
    fullName?: string | null;
    bio?: string | null;
    companyName?: string | null;
    designation?: string | null;
    experienceYears?: number | null;
    renNumber?: string | null;
    renStatus?: string | null;
    renVerified?: boolean;
    renStatusLabel?: string;
  };
}

interface IProps {
  spacingClass?: string;
  property?: ApiProperty;
}

export default function DetailsReusableArea({
  spacingClass,
  property,
}: IProps) {
  const landSize = formatLandSize(property?.landSize, property?.areaUnit);

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
                  <p className="tp-property-details-description">
                    {property?.description?.trim()
                      ? property.description
                      : "No description available."}
                  </p>
                </div>
              </div>

              <div className="tp-property-details-box box-2 mb-30">
                <h3 className="tp-property-details-box-title">Overview</h3>
                <PropertyDetailsBox
                  propertyType={property?.propertyType}
                  landSize={landSize !== "—" ? landSize : undefined}
                  listingType={property?.listingType}
                  facingDirection={property?.facingDirection}
                  cornerPlot={property?.cornerPlot}
                  roadWidth={property?.roadWidth}
                  surveyNumber={property?.surveyNumber}
                  clearTitle={property?.clearTitle}
                  loanFacility={property?.loanFacility}
                />
              </div>

              <div className="tp-property-details-box box-4 mb-30">
                <h3 className="tp-property-details-box-title">Amenities</h3>
                <AmenitiesCategories amenities={property?.amenities} />
              </div>

              {address && (
                <div className="tp-property-details-box box-6 mb-30">
                  <h3 className="tp-property-details-box-title">Address</h3>
                  <div className="tp-property-details-box-desc">
                    <p>{address}</p>
                    {property?.landmark && (
                      <p>
                        <strong>Landmark:</strong> {property.landmark}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="tp-property-details-right">
              <UserContactCard user={property?.user} />
              <SidebarPropertyItem />
              <RecentlyViewedProperties />
              <DiscountOfferCard wrapperCls="tp-property-filter-wrap" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
