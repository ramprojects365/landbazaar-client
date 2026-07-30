"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/config/constants";
import "../property.css";

type PropertyImageCategory =
  | "other"
  | "living_room"
  | "bedroom"
  | "bathroom"
  | "kitchen"
  | "dining_area"
  | "balcony"
  | "exterior"
  | "facilities"
  | "floor_plan";

interface PropertyImageItem {
  id: string;
  url: string;
  fileName: string;
  order: number;
  category: PropertyImageCategory;
  customPlaceName: string;
  displayPlace: string;
  caption: string;
  isCover: boolean;
}

const categories: Array<{ value: PropertyImageCategory; label: string }> = [
  { value: "other", label: "Other" },
  { value: "living_room", label: "Living Room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "bathroom", label: "Bathroom" },
  { value: "kitchen", label: "Kitchen" },
  { value: "dining_area", label: "Dining Area" },
  { value: "balcony", label: "Balcony" },
  { value: "exterior", label: "Exterior" },
  { value: "facilities", label: "Facilities" },
  { value: "floor_plan", label: "Floor Plan" },
];

const quickCategories = categories.filter((category) =>
  ["other", "living_room", "bedroom", "bathroom", "kitchen", "balcony", "exterior"].includes(
    category.value,
  ),
);

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ACCEPTED_IMAGE_INPUT = ACCEPTED_IMAGE_TYPES.join(",");
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_IMAGES = 15;

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const getCategoryLabel = (value: string) =>
  categories.find((category) => category.value === value)?.label || "Other";

const getDisplayPlace = (image: Pick<PropertyImageItem, "category" | "customPlaceName">) => {
  if (image.category === "other" && image.customPlaceName.trim()) {
    return image.customPlaceName.trim();
  }

  return getCategoryLabel(image.category);
};

const normalizeOrder = (items: PropertyImageItem[]) => {
  const ordered = items.map((image, index) => ({ ...image, order: index + 1 }));

  if (ordered.length > 0 && !ordered.some((image) => image.isCover)) {
    ordered[0] = { ...ordered[0], isCover: true };
  }

  return ordered;
};

const normalizeLoadedImages = (images: unknown[]): PropertyImageItem[] => {
  return normalizeOrder(
    images
      .map((image, index): PropertyImageItem | null => {
        if (typeof image === "string" && image.trim()) {
          return {
            id: createId(),
            url: image,
            fileName: `Image ${index + 1}`,
            order: index + 1,
            category: "other",
            customPlaceName: "",
            displayPlace: "Other",
            caption: "Other",
            isCover: index === 0,
          };
        }

        if (!image || typeof image !== "object" || Array.isArray(image)) return null;

        const item = image as Record<string, unknown>;
        const url = item.url || item.imageUrl || item.src;
        if (typeof url !== "string" || !url.trim()) return null;

        const category =
          typeof item.category === "string" &&
          categories.some((option) => option.value === item.category)
            ? (item.category as PropertyImageCategory)
            : "other";
        const customPlaceName =
          typeof item.customPlaceName === "string" ? item.customPlaceName : "";
        const displayPlace =
          typeof item.displayPlace === "string" && item.displayPlace.trim()
            ? item.displayPlace
            : getDisplayPlace({ category, customPlaceName });

        return {
          id: typeof item.id === "string" ? item.id : createId(),
          url,
          fileName: typeof item.fileName === "string" ? item.fileName : `Image ${index + 1}`,
          order: typeof item.order === "number" ? item.order : index + 1,
          category,
          customPlaceName,
          displayPlace,
          caption: typeof item.caption === "string" ? item.caption : displayPlace,
          isCover: Boolean(item.isCover || index === 0),
        };
      })
      .filter((image): image is PropertyImageItem => image !== null)
      .sort((a, b) => a.order - b.order),
  );
};

const formatBytes = (bytes: number) => `${Math.round(bytes / (1024 * 1024))}MB`;

export default function UploadMedia() {
  const [images, setImages] = useState<PropertyImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const blobUrlsRef = useRef<Set<string>>(new Set());
  const isLocalHost =
    typeof window !== "undefined" &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const isLocalUploadMode =
    process.env.NODE_ENV !== "production" &&
    isLocalHost &&
    process.env.NEXT_PUBLIC_LOCAL_IMAGE_UPLOAD !== "false";

  const payloadImages = useMemo(
    () =>
      images.map((image, index) => {
        const displayPlace = getDisplayPlace(image);

        return {
          url: image.url,
          fileName: image.fileName,
          order: index + 1,
          category: image.category,
          customPlaceName: image.category === "other" ? image.customPlaceName.trim() : "",
          displayPlace,
          caption: image.caption.trim() || displayPlace,
          isCover: image.isCover,
        };
      }),
    [images],
  );

  useEffect(() => {
    const loadImages = () => {
      const hiddenInput = document.getElementById("uploaded-images-input") as HTMLInputElement | null;
      if (!hiddenInput?.value) return;

      try {
        const parsed = JSON.parse(hiddenInput.value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setImages(normalizeLoadedImages(parsed));
        }
      } catch (error) {
        console.error("Failed to parse existing images:", error);
      }
    };

    const handleImagesLoaded = (event: CustomEvent) => {
      const loadedImages = event.detail?.images;
      if (Array.isArray(loadedImages)) {
        setImages(normalizeLoadedImages(loadedImages));
      }
    };

    loadImages();
    window.addEventListener("property-images-loaded", handleImagesLoaded as EventListener);

    return () => {
      window.removeEventListener("property-images-loaded", handleImagesLoaded as EventListener);
    };
  }, []);

  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      blobUrlsRef.current.clear();
    };
  }, []);

  const getToken = () => {
    let token: string | null = localStorage.getItem("authToken");

    if (!token) {
      const cookieMatch = document.cookie
        .split(";")
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith("token="));

      token = cookieMatch ? cookieMatch.split("=")[1] : null;
    }

    return token;
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("images", file, file.name);

    const headers: Record<string, string> = {};
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/images/upload-single`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(error?.message || "Image upload failed");
    }

    const json = await res.json();

    const finalUrl =
      json?.data?.publicUrl ??
      json?.data?.public_url ??
      json?.data?.imageUrl ??
      json?.data?.image_url ??
      json?.data?.url ??
      json?.url;

    if (typeof finalUrl !== "string" || !finalUrl.trim()) {
      throw new Error("Upload completed but no image URL was returned");
    }

    return finalUrl;
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    if (images.length + files.length > MAX_IMAGES) {
      toast.error(`You can upload up to ${MAX_IMAGES} property images.`);
      event.target.value = "";
      return;
    }

    const invalidType = files.find((file) => !ACCEPTED_IMAGE_TYPES.includes(file.type));
    if (invalidType) {
      toast.error(`${invalidType.name} is not supported. Use JPG, PNG, WebP, or GIF.`);
      event.target.value = "";
      return;
    }

    const overweight = files.find((file) => file.size > MAX_IMAGE_BYTES);
    if (overweight) {
      toast.error(`${overweight.name} is too large. Max size is ${formatBytes(MAX_IMAGE_BYTES)}.`);
      event.target.value = "";
      return;
    }

    setIsLoading(true);

    try {
      const uploaded = await Promise.all(
        files.map(async (file, index) => {
          const url = isLocalUploadMode ? URL.createObjectURL(file) : await uploadFile(file);
          if (url.startsWith("blob:")) {
            blobUrlsRef.current.add(url);
          }

          return {
            id: createId(),
            url,
            fileName: file.name,
            order: images.length + index + 1,
            category: "other" as PropertyImageCategory,
            customPlaceName: "",
            displayPlace: "Other",
            caption: "",
            isCover: false,
          };
        }),
      );

      setImages((current) => normalizeOrder([...current, ...uploaded]));
      toast.success(
        `${uploaded.length} image${uploaded.length === 1 ? "" : "s"} ${
          isLocalUploadMode ? "added locally" : "uploaded"
        }.`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to upload images.";
      toast.error(message);
    } finally {
      setIsLoading(false);
      event.target.value = "";
    }
  };

  const updateCategory = (id: string, category: PropertyImageCategory) => {
    setImages((current) =>
      current.map((image) => {
        if (image.id !== id) return image;

        const next = {
          ...image,
          category,
          customPlaceName: category === "other" ? image.customPlaceName : "",
        };

        return {
          ...next,
          displayPlace: getDisplayPlace(next),
          caption: image.caption || getCategoryLabel(category),
        };
      }),
    );
  };

  const updateImage = (id: string, updates: Partial<PropertyImageItem>) => {
    setImages((current) =>
      current.map((image) => (image.id === id ? { ...image, ...updates } : image)),
    );
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= images.length) return;

    const updated = [...images];
    [updated[index], updated[nextIndex]] = [updated[nextIndex], updated[index]];
    setImages(normalizeOrder(updated));
  };

  const setCover = (id: string) => {
    setImages((current) => {
      const cover = current.find((image) => image.id === id);
      if (!cover) return current;

      return normalizeOrder([
        { ...cover, isCover: true },
        ...current
          .filter((image) => image.id !== id)
          .map((image) => ({ ...image, isCover: false })),
      ]);
    });
  };

  const removeImage = (id: string) => {
    setImages((current) => {
      const removed = current.find((image) => image.id === id);
      if (removed?.url.startsWith("blob:")) {
        URL.revokeObjectURL(removed.url);
        blobUrlsRef.current.delete(removed.url);
      }

      return normalizeOrder(current.filter((image) => image.id !== id));
    });
  };

  const clearAll = () => {
    images.forEach((image) => {
      if (image.url.startsWith("blob:")) {
        URL.revokeObjectURL(image.url);
        blobUrlsRef.current.delete(image.url);
      }
    });
    setImages([]);
  };

  const coverImage = images.find((image) => image.isCover) || images[0];
  const labeledCount = images.filter(
    (image) => image.category !== "other" || image.customPlaceName.trim(),
  ).length;

  return (
    <div className="tp-dashboard-new-property mb-15 property-upload-manager">
      <h5 className="tp-dashboard-new-title">Upload Media</h5>

      <div className="tp-dashboard-new-um">
        <div className="tp-dashboard-new-um-content property-upload-drop">
          <span className="upload-btn">
            <input
              id="tp-dashboard-new-um-file-input"
              type="file"
              accept={ACCEPTED_IMAGE_INPUT}
              multiple
              onChange={handleUpload}
              disabled={isLoading}
            />

            <label htmlFor="tp-dashboard-new-um-file-input">
              {isLoading ? "Uploading..." : "+ Upload Images"}
            </label>
          </span>

          <p>
            Upload property photos, set the cover image, and label every room.
            <br /> Other images can use custom names like Store Room or Backyard.
          </p>
          {isLocalUploadMode ? (
            <p className="property-upload-local-note">
              Local preview mode: images stay in this browser and are not uploaded.
            </p>
          ) : null}
        </div>

        <p className="property-upload-hint">
          Examples: Store Room, Maid Room, Prayer Room, Backyard, Laundry Area, Study Room,
          Walk-in Wardrobe.
        </p>

        <input
          type="hidden"
          id="uploaded-images-input"
          name="uploadedImages"
          value={JSON.stringify(payloadImages)}
          readOnly
        />

        {images.length === 0 ? (
          <div className="property-upload-empty">No images uploaded yet.</div>
        ) : (
          <div className="property-media-workspace">
            <div className="property-media-editor">
              <div className="property-media-toolbar">
                <div>
                  <span className="property-media-eyebrow">Photo order and labels</span>
                  <h6>{images.length} image{images.length === 1 ? "" : "s"} ready</h6>
                </div>
                <div className="property-media-stats">
                  <span>{labeledCount}/{images.length} labeled</span>
                  <span>{coverImage ? getDisplayPlace(coverImage) : "No cover"}</span>
                </div>
              </div>

              <div className="property-photo-list">
                {images.map((image, index) => (
                  <article className="property-photo-card" key={image.id}>
                    <div className="property-photo-top">
                      <span className="property-photo-number">{index + 1}</span>
                      <span className="property-photo-name">{image.fileName}</span>
                      {image.category === "other" && image.customPlaceName.trim() ? (
                        <span className="property-photo-badge custom">Custom</span>
                      ) : null}
                      {image.isCover ? <span className="property-photo-badge cover">Cover</span> : null}
                    </div>

                    <img
                      className="property-photo-img"
                      src={image.url}
                      alt={image.caption || image.fileName}
                    />

                    <div className="property-upload-field">
                      <label>Place / Room Type</label>
                      <select
                        value={image.category}
                        onChange={(event) =>
                          updateCategory(image.id, event.target.value as PropertyImageCategory)
                        }
                      >
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>

                      <div className="property-upload-chips">
                        {quickCategories.map((category) => (
                          <button
                            key={category.value}
                            type="button"
                            className={`property-upload-chip ${
                              image.category === category.value ? "active" : ""
                            }`}
                            onClick={() => updateCategory(image.id, category.value)}
                          >
                            {category.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {image.category === "other" ? (
                      <div className="property-upload-field">
                        <label>Custom Place Name</label>
                        <input
                          type="text"
                          value={image.customPlaceName}
                          placeholder="Example: Store Room, Backyard"
                          onChange={(event) =>
                            updateImage(image.id, {
                              customPlaceName: event.target.value,
                              displayPlace: event.target.value.trim() || "Other",
                            })
                          }
                        />
                      </div>
                    ) : null}

                    <div className="property-upload-field">
                      <label>Caption</label>
                      <input
                        type="text"
                        value={image.caption}
                        placeholder={`Example: ${getDisplayPlace(image)}`}
                        onChange={(event) => updateImage(image.id, { caption: event.target.value })}
                      />
                    </div>

                    <div className="property-photo-actions">
                      <button type="button" onClick={() => moveImage(index, -1)} disabled={index === 0}>
                        Move Up
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(index, 1)}
                        disabled={index === images.length - 1}
                      >
                        Move Down
                      </button>
                    </div>

                    <button type="button" className="property-cover-btn" onClick={() => setCover(image.id)}>
                      Set as Cover
                    </button>
                    <button type="button" className="property-danger-btn" onClick={() => removeImage(image.id)}>
                      Remove Image
                    </button>
                  </article>
                ))}
              </div>
            </div>

            <aside className="property-gallery-preview">
              <div className="property-preview-head">
                <div>
                  <span className="property-media-eyebrow">Customer view</span>
                  <h6>Gallery Preview</h6>
                </div>
                <button type="button" onClick={clearAll}>Clear all</button>
              </div>

              {coverImage ? (
                <div className="property-cover-preview">
                  <img src={coverImage.url} alt={coverImage.caption || coverImage.fileName} />
                  <span>Cover · {getDisplayPlace(coverImage)}</span>
                </div>
              ) : null}

              <div className="property-preview-grid">
                {images.map((image, index) => (
                  <div className="property-preview-item" key={image.id}>
                    <img src={image.url} alt={image.caption || image.fileName} />
                    <span>
                      {index + 1}. {getDisplayPlace(image)}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
