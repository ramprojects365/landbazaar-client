"use client";

import { useEffect, useState } from "react";
import {
  looksLikeHtml,
  sanitizeDescriptionHtml,
} from "@/utils/descriptionHtml";

type PropertyDescriptionProps = {
  description?: string | null;
  className?: string;
};

export default function PropertyDescription({
  description,
  className = "tp-property-details-description",
}: PropertyDescriptionProps) {
  const trimmed = description?.trim() ?? "";
  const [safeHtml, setSafeHtml] = useState("");

  useEffect(() => {
    let cancelled = false;
    if (!trimmed || !looksLikeHtml(trimmed)) {
      setSafeHtml("");
      return;
    }
    sanitizeDescriptionHtml(trimmed).then((html) => {
      if (!cancelled) setSafeHtml(html);
    });
    return () => {
      cancelled = true;
    };
  }, [trimmed]);

  if (!trimmed) {
    return <p className={className}>No description available.</p>;
  }

  if (looksLikeHtml(trimmed)) {
    if (!safeHtml) {
      return <p className={className}>Loading description…</p>;
    }
    return (
      <div
        className={`${className} property-description-html`}
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    );
  }

  return (
    <p className={className} style={{ whiteSpace: "pre-line" }}>
      {trimmed}
    </p>
  );
}
