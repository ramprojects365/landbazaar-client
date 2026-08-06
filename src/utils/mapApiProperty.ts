import { StaticImageData } from "next/image";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import { getCoverImageUrl } from "@/utils/propertyImages";

/**
 * Shape of a property item from GET /api/properties (and property-by-id).
 * Only fields that exist on the API are listed here.
 */
export type ApiPropertyFields = {
  id: string;
  title?: string;
  description?: string;
  listingType?: string;
  propertyType?: string;
  tenure?: string;
  propertyName?: string;
  streetName?: string;
  cityName?: string;
  state?: string;
  county?: string;
  pincode?: string;
  landmark?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  price?: number | string;
  buildupArea?: number | string | null;
  landSize?: number | string | null;
  areaUnit?: string;
  pricePerUnit?: number | string | null;
  totalPrice?: number | string | null;
  furnishing?: string;
  bedrooms?: number | string | null;
  bathrooms?: number | string | null;
  availability?: string;
  floorLevel?: string;
  yearOfBuild?: number | null;
  yearOfCompletion?: number | null;
  carParkAllocation?: string;
  facingDirection?: string;
  cornerPlot?: string;
  roadWidth?: string;
  surveyNumber?: string;
  approvalTypes?: string[];
  soilType?: string;
  clearTitle?: string;
  loanFacility?: string;
  registrationReady?: string;
  contactPersonName?: string;
  contactNumber?: string;
  renovationStatus?: string;
  depositAmount?: number | string | null;
  minimumRentalPeriod?: string;
  petPolicy?: string;
  preferredTenantType?: string;
  maintenanceFee?: number | string | null;
  sinkingFund?: number | string | null;
  bumiLotStatus?: string;
  negotiable?: boolean;
  amenities?: {
    security?: string[];
    lifestyle?: string[];
    facilities?: string[];
  };
  images?: unknown[];
  status?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: IFeaturedPropertyDT["user"];
};

/** Format land size with unit, e.g. "2 Acre" or "200 Square Yard". */
export function formatLandSize(
  landSize?: number | string | null,
  areaUnit?: string | null,
): string {
  const size = parseFloat(String(landSize ?? ""));
  if (!Number.isFinite(size) || size <= 0) return "—";
  const formatted = Number.isInteger(size)
    ? String(size)
    : size.toFixed(2).replace(/\.?0+$/, "");
  return areaUnit?.trim() ? `${formatted} ${areaUnit.trim()}` : formatted;
}

/** Street + city for card/list address line. */
export function formatStreetCity(
  streetName?: string | null,
  cityName?: string | null,
): string {
  return (
    [streetName, cityName]
      .map((v) => v?.trim())
      .filter(Boolean)
      .join(", ") || "Address not available"
  );
}

export function parseTotalPrice(
  totalPrice?: number | string | null,
  price?: number | string | null,
): number {
  const total = parseFloat(String(totalPrice ?? ""));
  if (Number.isFinite(total) && total > 0) return total;
  const fallback = parseFloat(String(price ?? ""));
  return Number.isFinite(fallback) && fallback > 0 ? fallback : 0;
}

function resolveImageSrc(
  coverUrl: string | null,
  fallbackImage: StaticImageData | string,
): string {
  if (coverUrl) return coverUrl;
  if (typeof fallbackImage === "string") return fallbackImage;
  return fallbackImage.src;
}

/**
 * Map /api/properties item → listing/home card model.
 * Uses only API fields:
 * - title ← propertyName (fallback title)
 * - address ← streetName, cityName
 * - bedrooms slot ← landSize + areaUnit
 * - bathrooms slot ← propertyType
 * - price ← totalPrice (fallback price)
 * - userName ← contactPersonName
 * - image ← images[] cover (isCover)
 * - isForSale ← listingType === "sale"
 */
export function mapApiPropertyToCard(
  item: ApiPropertyFields,
  fallbackImage: StaticImageData | string,
): IFeaturedPropertyDT {
  const coverImage = getCoverImageUrl(item.images);
  const landSizeLabel = formatLandSize(item.landSize, item.areaUnit);
  const total = parseTotalPrice(item.totalPrice, item.price);
  const contactName = item.contactPersonName?.trim() || "";

  return {
    id: item.id,
    title: item.propertyName?.trim() || item.title?.trim() || "Land listing",
    address: formatStreetCity(item.streetName, item.cityName),
    linkUrl: "property-details",
    image: resolveImageSrc(coverImage, fallbackImage),
    showTags: true,
    isForRent: item.listingType === "rent",
    isForSale: item.listingType === "sale",
    isFeatured: false,
    bedrooms: landSizeLabel,
    bathrooms: item.propertyType?.trim() || "—",
    livingArea: "",
    city: item.cityName,
    state: item.state,
    price: total,
    description: item.description,
    quantity: 0,
    userImage: item.user?.profileImage || undefined,
    userName: contactName || undefined,
    userRole: undefined,
    user: item.user,
  };
}
