import UserContactCard from "@/components/Layout/subComponents/UserContactCard";
import SidebarPropertyItem from "@/components/Layout/subComponents/SidebarPropertyItem";
import DiscountOfferCard from "@/components/Layout/subComponents/DiscountOfferCard";
import RecentlyViewedProperties from "./RecentlyViewedItem";
import AmenitiesCategories from "./AmenitiesCategories";
import PropertyDetailsBox from "./PropertyDetailsBox";

interface ApiProperty {
  id?: string;
  description?: string;
  listingType?: string;
  propertyType?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  buildupArea?: number | string;
  yearOfBuild?: number;
  furnishing?: string;
  propertyName?: string;
  floorLevel?: string;
  streetName?: string;
  cityName?: string;
  state?: string;
  pincode?: string;
  landmark?: string;
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
  const beds = parseInt(String(property?.bedrooms ?? 0), 10);
  const baths = parseInt(String(property?.bathrooms ?? 0), 10);
  const area = parseFloat(String(property?.buildupArea ?? 0));
  const livingArea =
    area > 0
      ? Number.isInteger(area)
        ? `${area} Sq Ft`
        : `${area.toFixed(1)} Sq Ft`
      : undefined;

  const address = [
    property?.propertyName,
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
          {/* ── Left column ──────────────────────────────────── */}
          <div className="col-lg-8">
            <div className="tp-property-details-left">
              {/* Description */}
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

              {/* Overview */}
              <div className="tp-property-details-box box-2 mb-30">
                <h3 className="tp-property-details-box-title">Overview</h3>
                <PropertyDetailsBox
                  //id={property?.id}
                  propertyType={property?.propertyType}
                  bedrooms={beds > 0 ? String(beds) : undefined}
                  bathrooms={baths > 0 ? String(baths) : undefined}
                  livingArea={livingArea}
                  yearOfBuild={property?.yearOfBuild}
                  furnishing={property?.furnishing}
                  listingType={property?.listingType}
                  floorLevel={property?.floorLevel}
                />
              </div>

              {/* Amenities */}
              <div className="tp-property-details-box box-4 mb-30">
                <h3 className="tp-property-details-box-title">Amenities</h3>
                <AmenitiesCategories amenities={property?.amenities} />
              </div>

              {/* Address */}
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

          {/* ── Right sidebar ─────────────────────────────────── */}
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
