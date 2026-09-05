"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import {
  getSavedPropertyStatus,
  removeSavedProperty,
  saveProperty,
} from "@/services/propertyService";
import "./favorite-button.css";

/** Brand orange from the Dekho Land logo pin. */
const FAVORITE_ORANGE = "#FF7A00";

type FavoriteButtonProps = {
  propertyId?: string | number;
};

export default function FavoriteButton({ propertyId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (propertyId == null || !localStorage.getItem("authToken")) return;

    getSavedPropertyStatus(propertyId)
      .then((response) => setIsFavorite(Boolean(response?.data?.saved)))
      .catch(() => setIsFavorite(false));
  }, [propertyId]);

  const handleToggle = async () => {
    if (propertyId == null || loading) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = `/sign-in?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        await removeSavedProperty(propertyId);
        setIsFavorite(false);
      } else {
        await saveProperty(propertyId, window.location.href);
        setIsFavorite(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className="property-favorite-btn"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
      title={isFavorite ? "Remove from saved properties" : "Save property"}
      disabled={loading}
      data-property-id={propertyId != null ? String(propertyId) : undefined}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void handleToggle();
      }}
    >
      <Heart
        size={20}
        strokeWidth={2}
        color={isFavorite ? FAVORITE_ORANGE : "#FFFFFF"}
        fill={isFavorite ? FAVORITE_ORANGE : "transparent"}
      />
    </button>
  );
}
