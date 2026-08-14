"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/config/constants";
import "../property.css";

export interface PropertyDocumentItem {
  url: string;
  fileName: string;
  mimeType?: string;
  size?: number;
}

const normalizeDocuments = (value: unknown): PropertyDocumentItem[] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((document) => {
      if (!document || typeof document !== "object") return null;
      const item = document as Record<string, unknown>;
      const url = item.url || item.documentUrl;
      if (typeof url !== "string" || !url.trim()) return null;

      return {
        url: url.trim(),
        fileName:
          typeof item.fileName === "string" && item.fileName.trim()
            ? item.fileName
            : "Document",
        mimeType: typeof item.mimeType === "string" ? item.mimeType : undefined,
        size: typeof item.size === "number" ? item.size : undefined,
      };
    })
    .filter((document): document is PropertyDocumentItem => document !== null);
};

const formatFileSize = (size?: number) => {
  if (!size || size < 1024) return size ? `${size} B` : "";
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

interface UploadDocumentsProps {
  initialDocuments?: unknown[];
}

export default function UploadDocuments({
  initialDocuments = [],
}: UploadDocumentsProps) {
  const [documents, setDocuments] = useState<PropertyDocumentItem[]>(() =>
    normalizeDocuments(initialDocuments),
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const next = normalizeDocuments(initialDocuments);
    if (next.length === 0) return;
    setDocuments(next);
  }, [initialDocuments]);

  useEffect(() => {
    const hiddenInput = document.getElementById(
      "uploaded-documents-input",
    ) as HTMLInputElement | null;
    if (hiddenInput) hiddenInput.value = JSON.stringify(documents);
  }, [documents]);

  const getToken = () => localStorage.getItem("authToken");

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("documents", file, file.name));

      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/documents/upload-multiple`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(body?.message || "Document upload failed");
      }

      const uploaded = normalizeDocuments(body?.data?.documents);
      setDocuments((current) => [...current, ...uploaded]);
      toast.success(
        `${uploaded.length} document${uploaded.length === 1 ? "" : "s"} uploaded.`,
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Document upload failed");
    } finally {
      setIsLoading(false);
      event.target.value = "";
    }
  };

  const removeDocument = (url: string) => {
    setDocuments((current) => current.filter((document) => document.url !== url));
  };

  return (
    <div className="tp-dashboard-new-property mb-15 property-upload-manager">
      <h5 className="tp-dashboard-new-title">Documents</h5>
      <div className="tp-dashboard-new-um">
        <div className="tp-dashboard-new-um-content property-upload-drop">
          <span className="upload-btn">
            <input
              id="tp-dashboard-document-input"
              type="file"
              multiple
              onChange={handleUpload}
              disabled={isLoading}
            />
            <label htmlFor="tp-dashboard-document-input">
              {isLoading ? "Uploading..." : "+ Upload Documents"}
            </label>
          </span>
          <p>
            Upload title deeds, approvals, plans, or other property documents.
            Existing documents stay unless you remove or replace them.
          </p>
        </div>
      </div>

      <input
        type="hidden"
        id="uploaded-documents-input"
        name="uploadedDocuments"
        value={JSON.stringify(documents)}
        readOnly
      />

      {documents.length === 0 ? (
        <div className="property-upload-empty">No documents uploaded yet.</div>
      ) : (
        <div className="property-document-list">
          {documents.map((document) => (
            <div className="property-document-item" key={document.url}>
              <a href={document.url} target="_blank" rel="noreferrer">
                {document.fileName}
              </a>
              <span>{formatFileSize(document.size)}</span>
              <button type="button" onClick={() => removeDocument(document.url)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
