"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import { API_BASE_URL } from "@/config/constants";

export default function FloorPlan() {
  const { register, setValue } = useFormContext<PropertyFormData>();
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Load existing floor plan from hidden input on mount (for edit mode)
  useEffect(() => {
    const loadFloorPlan = () => {
      const hiddenInput = document.getElementById(
        "uploaded-floorplan-input",
      ) as HTMLInputElement | null;
      if (hiddenInput?.value) {
        console.log(
          "📐 FloorPlan loaded existing floor plan:",
          hiddenInput.value,
        );
        setUploadedUrl(hiddenInput.value);
        setValue("floorPlan", hiddenInput.value);
      }
    };

    loadFloorPlan();
  }, [setValue]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const files = Array.from(input.files || []);
    if (!files.length) return;

    const file = files[0];
    setIsLoading(true);

    try {
      let token: string | null = localStorage.getItem("authToken");

      if (!token) {
        const cookieMatch = document.cookie
          .split(";")
          .map((c) => c.trim())
          .find((c) => c.startsWith("token="));

        token = cookieMatch ? cookieMatch.split("=")[1] : null;
      }

      const formData = new FormData();
      formData.append("images", file, file.name);

      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/images/upload-single`, {
        method: "POST",
        headers,
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        console.error("Floor plan upload failed:", errorText);
        setIsLoading(false);
        return;
      }

      const json = await res.json();

      const finalUrl =
        json?.data?.publicUrl ??
        json?.data?.public_url ??
        json?.data?.imageUrl ??
        json?.data?.image_url ??
        json?.data?.url ??
        json?.url ??
        null;

      if (finalUrl && typeof finalUrl === "string") {
        setUploadedUrl(finalUrl);
        setValue("floorPlan", finalUrl);
      }
    } catch (err) {
      console.error("Floor plan upload error:", err);
    }

    setIsLoading(false);
    e.target.value = "";
  };

  const removeFloorPlan = () => {
    setUploadedUrl("");
    setValue("floorPlan", "");
  };

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Floor Plan</h5>

      <div className="tp-dashboard-new-um">
        <div className="tp-dashboard-new-um-content">
          <span className="upload-btn">
            <input
              id="tp-dashboard-new-floorplan-input"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleUpload}
              disabled={isLoading}
              style={{ display: "none" }}
            />

            <label htmlFor="tp-dashboard-new-floorplan-input">
              {isLoading ? "Uploading..." : "Add Floor Plan"}
            </label>
          </span>

          <p>
            Upload floor plan to help buyers understand the layout.
            <br /> Accepted formats: PNG, JPEG, WebP
          </p>
        </div>

        <input
          type="hidden"
          id="uploaded-floorplan-input"
          value={uploadedUrl}
          readOnly
          {...register("floorPlan")}
        />

        {uploadedUrl && (
          <div className="tp-dashboard-new-um-img-box d-flex">
            <div className="tp-dashboard-new-um-img">
              {uploadedUrl.endsWith(".pdf") ? (
                <div className="floorplan-pdf-preview">
                  <span>📄 Floor Plan (PDF)</span>
                </div>
              ) : (
                <Image
                  src={uploadedUrl}
                  alt="floor plan"
                  unoptimized
                  width={800}
                  height={600}
                />
              )}
              <button type="button" onClick={removeFloorPlan}>
                <i className="fal fa-trash-alt"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
