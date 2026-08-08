"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { propertySchema, PropertyFormData } from "@/schemas/validationSchema";
import BasicDetails from "./BasicDetails";
import LocationDetails from "./LocationDetails";
import PropertyDetails from "./PropertyDetails";
import ContactDetails from "./ContactDetails";
import AmenitiesDetails from "./AmenitiesDetails";
import UploadMedia from "./UploadMedia";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getPropertyById } from "@/services/propertyService";
import { useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/config/constants";
import { stripCountryCodeForDisplay } from "@/utils/phoneInput";

// Amenity groupings — mirror the FE display groups for categorising on submit
const AMENITY_GROUPS = {
  lifestyle: [] as string[],
  facilities: [] as string[],
  security: [] as string[],
};
const normalizeListingType = (value: any): string => {
  const v = String(value || "")
    .trim()
    .toLowerCase();

  if (v.includes("rent")) return "rent";
  if (v.includes("lease")) return "lease";
  if (v.includes("sale") || v.includes("sell")) return "sale";

  return "";
};

const normalizeFurnishing = (value: any): string => {
  const v = String(value || "")
    .trim()
    .toLowerCase();

  if (v.includes("full")) return "Fully";
  if (v.includes("partial")) return "Partially";
  if (v.includes("unfurnished") || v.includes("un furnished"))
    return "Unfurnished";

  return "Unfurnished";
};

const normalizeAvailability = (value: any): string => {
  const v = String(value || "")
    .trim()
    .toLowerCase();

  if (v.includes("immediate")) return "Immediate";
  if (v.includes("next")) return "Next month";
  if (v.includes("construction")) return "Under Construction";

  return "Immediate";
};

const normalizeFloorLevel = (value: any): string => {
  if (value === undefined || value === null || value === "") return "";

  const raw = String(value).trim();

  if (["1-5", "6-10", "11-15", "16-20", "21-25", "Above25"].includes(raw)) {
    return raw;
  }

  const floor = parseInt(raw, 10);

  if (!Number.isFinite(floor)) return "";
  if (floor <= 5) return "1-5";
  if (floor <= 10) return "6-10";
  if (floor <= 15) return "11-15";
  if (floor <= 20) return "16-20";
  if (floor <= 25) return "21-25";

  return "Above25";
};

const normalizeBedrooms = (value: any): string => {
  const n = parseInt(String(value || ""), 10);
  if (!Number.isFinite(n)) return "";
  if (n >= 6) return "6";
  return String(n);
};

const normalizeBathrooms = (value: any): string => {
  const n = parseInt(String(value || ""), 10);
  if (!Number.isFinite(n)) return "";
  if (n >= 6) return "6";
  return String(n);
};
/** Map a flat amenities array to the grouped structure the BE expects */
function groupAmenities(flat: string[] = []) {
  const result: {
    lifestyle: string[];
    facilities: string[];
    security: string[];
  } = {
    lifestyle: [],
    facilities: [],
    security: [],
  };
  for (const amenity of flat) {
    if (AMENITY_GROUPS.lifestyle.includes(amenity)) {
      result.lifestyle.push(amenity);
      continue;
    }

    if (AMENITY_GROUPS.security.includes(amenity)) {
      result.security.push(amenity);
      continue;
    }

    result.facilities.push(amenity);
  }
  return result;
}
const getValue = (...values: any[]) => {
  return values.find(
    (value) => value !== undefined && value !== null && value !== "",
  );
};

const normalizeImages = (propertyData: any): any[] => {
  const rawImages = getValue(
    propertyData.images,
    propertyData.imageUrls,
    propertyData.imageUrl,
    propertyData.image,
    [],
  );

  const arr = Array.isArray(rawImages) ? rawImages : [rawImages];

  return arr.filter((img) => {
    if (typeof img === "string") return img.trim();
    return Boolean(img?.url || img?.imageUrl || img?.src);
  });
};
/** Convert yearOfBuild to property age range for the form */
const getAgeRangeFromYear = (yearOfBuild?: number): number => {
  if (!yearOfBuild) return 1;
  const currentYear = new Date().getFullYear();
  const age = currentYear - yearOfBuild;

  if (age <= 3) return 1; // 1 to 3 years
  if (age <= 5) return 2; // 3 to 5 years
  if (age <= 10) return 3; // 5 to 10 years
  return 4; // More than 10 years
};

/** Flatten grouped amenities from API to a flat array for the form */
const flattenAmenities = (amenities?: {
  lifestyle?: string[];
  facilities?: string[];
  security?: string[];
}): string[] => {
  if (!amenities) return [];
  return [
    ...(amenities.lifestyle || []),
    ...(amenities.facilities || []),
    ...(amenities.security || []),
  ];
};

export default function AddPropertyPage() {
  const methods = useForm<PropertyFormData>({
    resolver: yupResolver(propertySchema),
    defaultValues: {
      listingType: "",
      propertyType: "",
      propertyName: "",
      tenure: "",
      areaUnit: "",
      pricePerUnit: "",
      totalPrice: "",
      title: "",
      description: "",
      location: "",
      latitude: undefined,
      longitude: undefined,
      streetName: "",
      cityName: "",
      stateName: "",
      pinCode: "",
      landmark: "",
      price: "",
      builtUpArea: "",
      landSize: "",
      furnishing: "",
      bedRooms: "",
      bathRooms: "",
      availability: "",
      negotiable: "Yes",
      floorLevel: "",
      cornerPlot: "Yes",
      roadWidth: "",
      surveyNumber: "",
      approvalTypes: [],
      soilType: "",
      clearTitle: "Yes",
      loanFacility: "Yes",
      registrationReady: "Yes",
      contactPersonName: "",
      contactNumber: "",
      propertyAge: undefined,
      yearOfCompletion: undefined,
      carParkAllocation: "",
      facingDirection: "",
      renovationStatus: "",
      depositAmount: "",
      minimumRentalPeriod: "",
      petPolicy: "",
      preferredTenantType: "",
      maintenanceFee: "",
      sinkingFund: "",
      bumiLotStatus: "",
      amenities: [],
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
  const searchParams = useSearchParams();
  const editPropertyId = searchParams.get("edit");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const buildLocationFallback = (propertyData: any): string => {
    return [
      propertyData.streetName,
      propertyData.cityName || propertyData.city,
      propertyData.state || propertyData.stateName,
      propertyData.pincode || propertyData.pinCode,
    ]
      .filter((part) => typeof part === "string" && part.trim().length > 0)
      .join(", ");
  };
  const formatWholeNumberInput = (value: unknown): string => {
    if (value === undefined || value === null || value === "") return "";

    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return "";

    return String(Math.trunc(numericValue));
  };

  // Fetch and populate property data when in edit mode
  useEffect(() => {
    if (editPropertyId) {
      setIsEditMode(true);
      setIsLoading(true);

      const fetchProperty = async () => {
        try {
          const response = await getPropertyById(editPropertyId);
          console.log("📦 Raw API Response:", response);

          // API returns { success: true, data: { ...property fields... } }
          const propertyData = response.data || response;
          console.log("📦 Extracted property data:", propertyData);

          // Map API data to form structure
          const formData: Partial<PropertyFormData> = {
            listingType: normalizeListingType(propertyData.listingType),
            propertyType: propertyData.propertyType || "",
            propertyName: propertyData.propertyName || propertyData.title || "",
            tenure: propertyData.tenure || "",
            areaUnit: propertyData.areaUnit || "",
            pricePerUnit: formatWholeNumberInput(propertyData.pricePerUnit),
            totalPrice: formatWholeNumberInput(
              propertyData.totalPrice ||
                propertyData.price ||
                propertyData.monthlyRent,
            ),
            title: propertyData.title || propertyData.propertyName || "",
            description: propertyData.description || "",

            location:
              propertyData.location || buildLocationFallback(propertyData),
            latitude: propertyData.latitude ?? null,
            longitude: propertyData.longitude ?? null,
            streetName: propertyData.streetName || "",
            cityName: propertyData.cityName || propertyData.city || "",
            stateName: propertyData.state || propertyData.stateName || "",
            pinCode: propertyData.pincode || propertyData.pinCode || "",
            landmark: propertyData.landmark || "",

            price: formatWholeNumberInput(
              propertyData.totalPrice ||
                propertyData.price ||
                propertyData.monthlyRent,
            ),
            builtUpArea: formatWholeNumberInput(
              propertyData.buildupArea ||
                propertyData.builtUpArea ||
                propertyData.livingArea,
            ),

            furnishing: normalizeFurnishing(propertyData.furnishing),
            bedRooms: normalizeBedrooms(
              propertyData.bedrooms || propertyData.bedRooms,
            ),
            bathRooms: normalizeBathrooms(
              propertyData.bathrooms || propertyData.bathRooms,
            ),
            availability: normalizeAvailability(propertyData.availability),
            negotiable: propertyData.negotiable ? "Yes" : "No",
            floorLevel: normalizeFloorLevel(propertyData.floorLevel),
            cornerPlot: propertyData.cornerPlot || "Yes",
            roadWidth: propertyData.roadWidth || "",
            surveyNumber: propertyData.surveyNumber || "",
            approvalTypes: Array.isArray(propertyData.approvalTypes)
              ? propertyData.approvalTypes
              : [],
            soilType: propertyData.soilType || "",
            clearTitle: propertyData.clearTitle || "Yes",
            loanFacility: propertyData.loanFacility || "Yes",
            registrationReady: propertyData.registrationReady || "Yes",
            contactPersonName: propertyData.contactPersonName || "",
            contactNumber: stripCountryCodeForDisplay(
              propertyData.contactNumber,
            ),
            propertyAge: getAgeRangeFromYear(propertyData.yearOfBuild),
            yearOfCompletion: propertyData.yearOfCompletion,
            carParkAllocation: propertyData.carParkAllocation || "",
            facingDirection: propertyData.facingDirection || "",
            renovationStatus: propertyData.renovationStatus || "",

            // RENT-specific fields
            depositAmount: propertyData.depositAmount
              ? String(propertyData.depositAmount)
              : "",
            minimumRentalPeriod: propertyData.minimumRentalPeriod || "",
            petPolicy: propertyData.petPolicy || "",
            preferredTenantType: propertyData.preferredTenantType || "",

            // Strata property fields
            maintenanceFee: propertyData.maintenanceFee
              ? String(propertyData.maintenanceFee)
              : "",
            sinkingFund: propertyData.sinkingFund
              ? String(propertyData.sinkingFund)
              : "",

            // Malaysian market fields
            bumiLotStatus: propertyData.bumiLotStatus || "",

            amenities: Array.isArray(propertyData.amenities)
              ? propertyData.amenities
              : flattenAmenities(propertyData.amenities),
          };
          console.log("📝 Form data being set:", formData);

          // Use setValue for each field to ensure proper population
          // This is more reliable than reset() for complex forms
          Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              setValue(key as keyof PropertyFormData, value, {
                shouldValidate: false,
                shouldDirty: false,
                shouldTouch: false,
              });
            }
          });

          console.log("✅ Form values set via setValue");

          // Set images in the hidden input for UploadMedia component
          const normalizedImages = normalizeImages(propertyData);

          if (normalizedImages.length > 0) {
            console.log("🖼️ Setting images:", normalizedImages);

            const hiddenInput = document.getElementById(
              "uploaded-images-input",
            ) as HTMLInputElement | null;

            if (hiddenInput) {
              hiddenInput.value = JSON.stringify(normalizedImages);
            }

            window.dispatchEvent(
              new CustomEvent("property-images-loaded", {
                detail: { images: normalizedImages },
              }),
            );
          }

          toast.success("Property data loaded for editing");
        } catch (error) {
          console.error("Error fetching property:", error);
          toast.error("Failed to load property data");
        } finally {
          setIsLoading(false);
        }
      };

      fetchProperty();
    }
  }, [editPropertyId, setValue]);

  const onSubmit: SubmitHandler<PropertyFormData> = (data) => {
    console.log("🚀 Submit called with data:", data);
    console.log("🚀 Form errors:", errors);
    (async () => {
      try {
        // Prevent submission while loading
        if (isLoading) {
          console.log("⏳ Submission blocked - isLoading is true");
          toast.error("Please wait while property data is loading...");
          return;
        }
        console.log("✅ isLoading check passed");

        // Check if form has any validation errors
        if (Object.keys(errors).length > 0) {
          console.log("❌ Form has validation errors:", errors);
          return;
        }
        console.log("✅ Form validation passed");
        // UploadMedia already uploaded the files and stored their public URLs
        // in the hidden DOM input "#uploaded-images-input" — just read from it.
        let propertyImages: any[] = [];
        if (typeof document !== "undefined") {
          const hiddenEl = document.getElementById(
            "uploaded-images-input",
          ) as HTMLInputElement | null;
          console.log("🔍 Hidden input element:", hiddenEl);
          console.log("🔍 Hidden input value:", hiddenEl?.value);

          if (hiddenEl?.value) {
            try {
              const parsed = JSON.parse(hiddenEl.value);
              console.log("🔍 Parsed hidden input value:", parsed);
              if (Array.isArray(parsed))
                propertyImages = parsed
                  .map((img) => {
                    if (typeof img === "string") return img;
                    const url = img?.url || img?.imageUrl || img?.src;
                    if (!url) return null;

                    return {
                      url,
                      fileName: img.fileName || "",
                      order: img.order,
                      category: img.category || "other",
                      customPlaceName: img.customPlaceName || "",
                      displayPlace:
                        img.displayPlace ||
                        img.customPlaceName ||
                        img.category ||
                        "Other",
                      caption:
                        img.caption ||
                        img.displayPlace ||
                        img.customPlaceName ||
                        "",
                      isCover: Boolean(img.isCover),
                    };
                  })
                  .filter(Boolean);
            } catch {}
          }
        }

        const hasLocalPreviewImages = propertyImages.some(
          (image) =>
            typeof image === "object" &&
            typeof image?.url === "string" &&
            image.url.startsWith("blob:"),
        );

        if (hasLocalPreviewImages) {
          toast.warning("Local preview images are not saved to the backend.", {
            duration: 5000,
          });
        }

        if (propertyImages.length < 5) {
          toast.warning("Add at least 5 images for better results.", {
            duration: 4000,
          });
        }

        console.log("✅ Image count check passed");
        console.log("📋 Form data:", data);
        console.log("📋 isEditMode:", isEditMode);
        console.log("📋 editPropertyId:", editPropertyId);

        // ---------------------------------------------------------------
        // Remap FE field names → BE field names before sending to the API
        // ---------------------------------------------------------------
        const flatAmenities = (data.amenities ?? []).filter(
          (a): a is string => typeof a === "string",
        );
        const isSaleListing = data.listingType === "sale";
        const isLeaseListing = data.listingType === "lease";

        // Convert property age range to actual year of build
        const getYearFromAgeRange = (
          ageRange: string | number | undefined,
        ): number | undefined => {
          if (!ageRange) return undefined;
          const currentYear = new Date().getFullYear();
          const age = parseInt(String(ageRange), 10);

          switch (age) {
            case 1: // 1 to 3 years
              return currentYear - 2;
            case 2: // 3 to 5 years
              return currentYear - 4;
            case 3: // 5 to 10 years
              return currentYear - 7;
            case 4: // More than 10 years
              return currentYear - 15;
            default:
              return undefined;
          }
        };

        const payload = {
          // Pass-through fields that match between FE and BE
          listingType: data.listingType,
          propertyType: data.propertyType,
          propertyName: data.propertyName,
          tenure: data.tenure || "",
          areaUnit: data.areaUnit || "",
          pricePerUnit: data.pricePerUnit
            ? parseFloat(data.pricePerUnit)
            : null,
          totalPrice: data.totalPrice ? parseFloat(data.totalPrice) : null,
          title: data.title,
          description: data.description,
          location: data.location,
          latitude:
            data.latitude === undefined ||
            data.latitude === null ||
            Number.isNaN(data.latitude)
              ? null
              : data.latitude,

          longitude:
            data.longitude === undefined ||
            data.longitude === null ||
            Number.isNaN(data.longitude)
              ? null
              : data.longitude,
          streetName: data.streetName,
          cityName: data.cityName,
          landmark: data.landmark,
          furnishing: data.furnishing,
          availability: data.availability,
          floorLevel: data.floorLevel?.toString(),
          cornerPlot: data.cornerPlot || "",
          roadWidth: data.roadWidth || "",
          surveyNumber: data.surveyNumber || "",
          approvalTypes: data.approvalTypes || [],
          soilType: data.soilType || "",
          clearTitle: data.clearTitle || "",
          loanFacility: data.loanFacility || "",
          registrationReady: data.registrationReady || "",
          contactPersonName: data.contactPersonName || "",
          contactNumber: data.contactNumber ? `+91${data.contactNumber}` : "",
          status: "active",

          // Remapped numeric fields (FE stores as string from input/select)
          price: parseFloat(data.totalPrice || data.price),
          buildupArea: data.builtUpArea ? parseFloat(data.builtUpArea) : null,
          landSize: data.landSize ? parseFloat(data.landSize) : null,
          bedrooms: data.bedRooms ? parseInt(data.bedRooms, 10) : null,
          bathrooms: data.bathRooms ? parseInt(data.bathRooms, 10) : null,
          yearOfBuild: getYearFromAgeRange(data.propertyAge) || null,
          yearOfCompletion:
            isSaleListing && data.yearOfCompletion
              ? parseInt(String(data.yearOfCompletion), 10)
              : null,

          // Remapped name fields
          state: data.stateName,
          pincode: data.pinCode,

          // Convert "Yes"/"No" negotiable to boolean
          negotiable: data.negotiable === "Yes",

          // General fields
          carParkAllocation: data.carParkAllocation || "",
          facingDirection: isSaleListing ? data.facingDirection || "" : "",
          renovationStatus: isSaleListing ? data.renovationStatus || "" : "",

          // LEASE-specific fields
          depositAmount:
            isLeaseListing && data.depositAmount
              ? parseFloat(data.depositAmount)
              : null,
          minimumRentalPeriod: isLeaseListing
            ? data.minimumRentalPeriod || ""
            : "",
          petPolicy: isLeaseListing ? data.petPolicy || "" : "",
          preferredTenantType: isLeaseListing
            ? data.preferredTenantType || ""
            : "",

          // Strata property fields
          maintenanceFee:
            isSaleListing && data.maintenanceFee
              ? parseFloat(data.maintenanceFee)
              : null,
          sinkingFund:
            isSaleListing && data.sinkingFund
              ? parseFloat(data.sinkingFund)
              : null,

          // Malaysian market fields
          bumiLotStatus: isSaleListing ? data.bumiLotStatus || "" : "",

          // Group flat amenities array into {lifestyle, facilities, security}
          amenities: groupAmenities(flatAmenities),

          // Images from upload
          images: propertyImages,
        };

        const rawToken =
          typeof window !== "undefined"
            ? localStorage.getItem("authToken")
            : null;

        console.log(localStorage.getItem("authToken"));
        const authHeader = `Bearer ${rawToken ?? ""}`;
        const propertyUrl =
          isEditMode && editPropertyId
            ? `${API_BASE_URL}/properties/${editPropertyId}`
            : `${API_BASE_URL}/properties`;
        const res = await fetch(propertyUrl, {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          body: JSON.stringify(payload),
        });

        console.log("📡 Response status:", res.status);
        console.log("📡 Response ok:", res.ok);

        if (!res.ok) {
          const err = await res
            .json()
            .catch(() => ({ message: res.statusText }));
          console.error("API error:", err);
          const action = isEditMode ? "update" : "add";
          toast.error(
            `Failed to ${action} property: ` + (err.message || res.statusText),
            { duration: 5000 },
          );
          return;
        }

        const result = await res.json();
        console.log(
          isEditMode ? "Property updated:" : "Property created:",
          result,
        );
        methods.reset();
        const successMessage = isEditMode
          ? "Property updated successfully."
          : "Property added successfully.";
        toast.success(successMessage, { duration: 5000 });
        if (typeof window !== "undefined") {
          // Redirect to dashboard property list
          window.location.replace("/dashboard/property");
        }
      } catch (error) {
        console.error("Network error:", error);
        toast.error("Network error while submitting the form.", {
          duration: 5000,
        });
      }
    })();
  };

  return (
    <FormProvider {...methods}>
      {isLoading && (
        <div className="text-center py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading property data...</p>
        </div>
      )}
      <form
        className="tp-dashboard-add-property-form"
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log("❌ FORM VALIDATION ERRORS:", errors);
          toast.error("Please fix required fields before updating.");
        })}
      >
        {errors.root && (
          <div
            className="alert alert-danger mb-3"
            style={{
              color: "#dc3545",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#f8d7da",
              border: "1px solid #f5c6cb",
            }}
          >
            {errors.root.message}
          </div>
        )}
        <BasicDetails />
        <LocationDetails />
        <PropertyDetails />
        <ContactDetails />
        <AmenitiesDetails />
        <UploadMedia />
        <div className="tp-dashboard-new-btn">
          <button type="submit" className="add" disabled={isLoading}>
            {isEditMode ? "Update Property" : "Add Property"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
