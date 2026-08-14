"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/config/constants";
import {
  MAX_IMAGE_WIDTH,
  MAX_IMAGE_HEIGHT,
  PROPERTY_IMAGE_GUIDE_TEXT,
  TARGET_IMAGE_SIZES,
  preparePropertyImage,
} from "@/utils/propertyImageUpload";
import "../property.css";

interface PropertyImageItem {
  id: string;
  url: string;
  fileName: string;
  order: number;
  /** Kept for API backward compatibility; not shown in UI */
  category: string;
  /** Kept for API backward compatibility; not shown in UI */
  customPlaceName: string;
  caption: string;
  isCover: boolean;
}

const DEFAULT_IMAGE_CATEGORY = "other";

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

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
            category: DEFAULT_IMAGE_CATEGORY,
            customPlaceName: "",
            caption: "",
            isCover: index === 0,
          };
        }

        if (!image || typeof image !== "object" || Array.isArray(image)) return null;

        const item = image as Record<string, unknown>;
        const url = item.url || item.imageUrl || item.src;
        if (typeof url !== "string" || !url.trim()) return null;

        const category =
          typeof item.category === "string" && item.category.trim()
            ? item.category
            : DEFAULT_IMAGE_CATEGORY;
        const customPlaceName =
          typeof item.customPlaceName === "string" ? item.customPlaceName : "";
        const caption = typeof item.caption === "string" ? item.caption : "";

        return {
          id: typeof item.id === "string" ? item.id : createId(),
          url,
          fileName:
            typeof item.fileName === "string" ? item.fileName : `Image ${index + 1}`,
          order: typeof item.order === "number" ? item.order : index + 1,
          category,
          customPlaceName,
          caption,
          isCover: Boolean(item.isCover || index === 0),
        };
      })
      .filter((image): image is PropertyImageItem => image !== null)
      .sort((a, b) => a.order - b.order),
  );
};

export default function UploadMedia() {
  const [images, setImages] = useState<PropertyImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const blobUrlsRef = useRef<Set<string>>(new Set());
  const isLocalHost =
    typeof window !== "undefined" &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname);
  // Opt-in only. Default is real server upload so property images get permanent URLs.
  // Set NEXT_PUBLIC_LOCAL_IMAGE_UPLOAD=true only for offline UI testing.
  const isLocalUploadMode =
    process.env.NODE_ENV !== "production" &&
    isLocalHost &&
    process.env.NEXT_PUBLIC_LOCAL_IMAGE_UPLOAD === "true";

  const payloadImages = useMemo(
    () =>
      images.map((image, index) => {
        const caption = image.caption.trim();

        return {
          url: image.url,
          fileName: image.fileName,
          order: index + 1,
          // Defaults kept so existing API contracts remain valid
          category: image.category || DEFAULT_IMAGE_CATEGORY,
          customPlaceName: image.customPlaceName?.trim() || "",
          displayPlace: caption,
          caption,
          isCover: image.isCover,
        };
      }),
    [images],
  );

  useEffect(() => {
    const loadImages = () => {
      const hiddenInput = document.getElementById(
        "uploaded-images-input",
      ) as HTMLInputElement | null;
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
    window.addEventListener(
      "property-images-loaded",
      handleImagesLoaded as EventListener,
    );

    return () => {
      window.removeEventListener(
        "property-images-loaded",
        handleImagesLoaded as EventListener,
      );
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

    setIsLoading(true);

    try {
      const preparedFiles: File[] = [];
      let resizedCount = 0;
      const warningMessages: string[] = [];

      for (const file of files) {
        try {
          const prepared = await preparePropertyImage(file);
          preparedFiles.push(prepared.file);
          if (prepared.wasResized) resizedCount += 1;
          prepared.warnings.forEach((warning) => {
            warningMessages.push(`${file.name}: ${warning}`);
          });
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : `${file.name} could not be uploaded.`;
          toast.error(message);
        }
      }

      if (!preparedFiles.length) {
        return;
      }

      warningMessages.slice(0, 3).forEach((message) => {
        toast.warning(message, { duration: 5000 });
      });
      if (warningMessages.length > 3) {
        toast.warning(
          `${warningMessages.length - 3} more image(s) may look cropped on listings.`,
          { duration: 5000 },
        );
      }

      const uploaded = await Promise.all(
        preparedFiles.map(async (file, index) => {
          const url = isLocalUploadMode
            ? URL.createObjectURL(file)
            : await uploadFile(file);
          if (url.startsWith("blob:")) {
            blobUrlsRef.current.add(url);
          }

          return {
            id: createId(),
            url,
            fileName: file.name,
            order: images.length + index + 1,
            category: DEFAULT_IMAGE_CATEGORY,
            customPlaceName: "",
            caption: "",
            isCover: false,
          };
        }),
      );

      setImages((current) => normalizeOrder([...current, ...uploaded]));

      const successParts = [
        `${uploaded.length} image${uploaded.length === 1 ? "" : "s"} ${
          isLocalUploadMode ? "added locally" : "uploaded"
        }`,
      ];
      if (resizedCount > 0) {
        const sizeGuide = TARGET_IMAGE_SIZES.map(
          (size) => `${size.width}×${size.height}`,
        ).join(", ");
        successParts.push(
          `${resizedCount} resized toward ${sizeGuide} (max ${MAX_IMAGE_WIDTH}×${MAX_IMAGE_HEIGHT})`,
        );
      }
      toast.success(`${successParts.join(". ")}.`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to upload images.";
      toast.error(message);
    } finally {
      setIsLoading(false);
      event.target.value = "";
    }
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
    const [item] = updated.splice(index, 1);
    updated.splice(nextIndex, 0, item);
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
  const captionedCount = images.filter((image) => image.caption.trim()).length;

  return (
    <div className="tp-dashboard-new-property mb-15 property-upload-manager">
      <h5 className="tp-dashboard-new-title">Upload Media</h5>

      <div className="tp-dashboard-new-um">
        <div className="tp-dashboard-new-um-content property-upload-drop">
          <span className="upload-btn">
            <input
              id="tp-dashboard-new-um-file-input"
              type="file"
              multiple
              onChange={handleUpload}
              disabled={isLoading}
            />

            <label htmlFor="tp-dashboard-new-um-file-input">
              {isLoading ? "Uploading..." : "+ Upload Images"}
            </label>
          </span>

          <p>
            Upload land photos, set the cover image, and optionally add a caption
            for each photo.
          </p>
          <p className="property-upload-size-guide">
            {PROPERTY_IMAGE_GUIDE_TEXT}
          </p>
          {isLocalUploadMode ? (
            <p className="property-upload-local-note">
              Local preview mode: images stay in this browser and are not uploaded.
            </p>
          ) : null}
        </div>

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
                  <span className="property-media-eyebrow">Photo order</span>
                  <h6>
                    {images.length} image{images.length === 1 ? "" : "s"} ready
                  </h6>
                </div>
                <div className="property-media-stats">
                  <span>
                    {captionedCount}/{images.length} with caption
                  </span>
                  <span>{coverImage ? "Cover set" : "No cover"}</span>
                </div>
              </div>

              <div className="property-photo-list">
                {images.map((image, index) => (
                  <article className="property-photo-card" key={image.id}>
                    <div className="property-photo-top">
                      <span className="property-photo-number">{index + 1}</span>
                      <span className="property-photo-name">{image.fileName}</span>
                      {image.isCover ? (
                        <span className="property-photo-badge cover">Cover</span>
                      ) : null}
                    </div>

                    <img
                      className="property-photo-img"
                      src={image.url}
                      alt={image.caption || image.fileName}
                    />

                    <div className="property-upload-field">
                      <label>Caption (optional)</label>
                      <input
                        type="text"
                        value={image.caption}
                        placeholder="Example: Front view from main road"
                        onChange={(event) =>
                          updateImage(image.id, { caption: event.target.value })
                        }
                      />
                    </div>

                    <div className="property-photo-actions">
                      <button
                        type="button"
                        onClick={() => moveImage(index, -1)}
                        disabled={index === 0}
                      >
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

                    <button
                      type="button"
                      className="property-cover-btn"
                      onClick={() => setCover(image.id)}
                    >
                      Set as Cover
                    </button>
                    <button
                      type="button"
                      className="property-danger-btn"
                      onClick={() => removeImage(image.id)}
                    >
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
                <button type="button" onClick={clearAll}>
                  Clear all
                </button>
              </div>

              {coverImage ? (
                <div className="property-cover-preview">
                  <img
                    src={coverImage.url}
                    alt={coverImage.caption || coverImage.fileName}
                  />
                  <span>
                    Cover
                    {coverImage.caption.trim()
                      ? ` · ${coverImage.caption.trim()}`
                      : ""}
                  </span>
                </div>
              ) : null}

              <div className="property-preview-grid">
                {images.map((image, index) => (
                  <div className="property-preview-item" key={image.id}>
                    <img
                      src={image.url}
                      alt={image.caption || image.fileName}
                    />
                    <span>
                      {index + 1}.
                      {image.caption.trim()
                        ? ` ${image.caption.trim()}`
                        : " Photo"}
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
