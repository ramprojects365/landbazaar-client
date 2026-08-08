import { StaticImageData } from "next/image";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import { formatPrice } from "@/components/Utils/formatPrice";
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
  landSize?: number | string | null;
  areaUnit?: string;
  pricePerUnit?: number | string | null;
  totalPrice?: number | string | null;
  furnishing?: string;
  availability?: string;
  floorLevel?: string;
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

function normalizeListingTypeValue(listingType?: string | null): string {
  return listingType?.trim().toLowerCase() || "";
}

/** Uppercase badge label for cards, e.g. "FOR SALE" | "FOR LEASE". */
export function getListingTypeFlag(
  listingType?: string | null,
): string | null {
  const type = normalizeListingTypeValue(listingType);
  if (type === "sale") return "FOR SALE";
  if (type === "lease") return "FOR LEASE";
  if (type === "rent") return "FOR RENT";
  return null;
}

/** Title-case label for detail pages, e.g. "For Sale" | "For Lease". */
export function getListingTypeLabel(listingType?: string | null): string {
  const type = normalizeListingTypeValue(listingType);
  if (type === "sale") return "For Sale";
  if (type === "lease") return "For Lease";
  if (type === "rent") return "For Rent";
  if (type) return type.charAt(0).toUpperCase() + type.slice(1);
  return "—";
}

export function getListingTypeBadgeStyle(listingType?: string | null): {
  background: string;
  color: string;
} {
  const type = normalizeListingTypeValue(listingType);
  if (type === "rent") {
    return { background: "#e8f4fd", color: "#1a73e8" };
  }
  if (type === "lease") {
    return { background: "#fff3e0", color: "#e65100" };
  }
  return { background: "#eefbee", color: "#2e7d32" };
}

/** Resolve badge from listingType or legacy isFor* flags on card models. */
export function resolveListingTypeFlag(item: {
  listingType?: string | null;
  isForSale?: boolean;
  isForRent?: boolean;
  isForLease?: boolean;
}): string | null {
  const fromType = getListingTypeFlag(item.listingType);
  if (fromType) return fromType;
  if (item.isForSale) return "FOR SALE";
  if (item.isForLease) return "FOR LEASE";
  if (item.isForRent) return "FOR RENT";
  return null;
}

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

/** Format price per unit with area unit, e.g. "₹10,000,000 / Acre". */
export function formatPricePerUnit(
  pricePerUnit?: number | string | null,
  areaUnit?: string | null,
): string {
  const value = parseFloat(String(pricePerUnit ?? ""));
  if (!Number.isFinite(value) || value <= 0) return "—";
  const unit = areaUnit?.trim();
  return unit
    ? `${formatPrice(value, false)} / ${unit}`
    : formatPrice(value, false);
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
 * - isForLease ← listingType === "lease"
 */
export function mapApiPropertyToCard(
  item: ApiPropertyFields,
  fallbackImage: StaticImageData | string,
): IFeaturedPropertyDT {
  const listingType = normalizeListingTypeValue(item.listingType);
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
    listingType: listingType || undefined,
    isForRent: listingType === "rent",
    isForSale: listingType === "sale",
    isForLease: listingType === "lease",
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
