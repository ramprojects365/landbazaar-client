"use client";

import { useEffect, useState, type SyntheticEvent } from "react";
import { Heart } from "lucide-react";
import {
  getSavedPropertyStatus,
  removeSavedProperty,
  saveProperty,
} from "@/services/propertyService";
import { toast } from "sonner";
import "./favorite-button.css";

const FAVORITE_COLOR = "#ef4444";

type FavoriteButtonProps = {
  propertyId?: string | number;
  initialFavorite?: boolean;
  tone?: "overlay" | "light";
  onFavoriteChange?: (isFavorite: boolean) => void;
};

function isolateEvent(event: SyntheticEvent) {
  event.stopPropagation();
}

export default function FavoriteButton({
  propertyId,
  initialFavorite = false,
  tone = "overlay",
  onFavoriteChange,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);
  const inactiveColor = tone === "light" ? FAVORITE_COLOR : "#FFFFFF";

  useEffect(() => {
    if (propertyId == null || !localStorage.getItem("authToken")) return;
    if (initialFavorite) return;

    getSavedPropertyStatus(propertyId)
      .then((response) => setIsFavorite(Boolean(response?.data?.saved)))
      .catch(() => setIsFavorite(false));
  }, [propertyId, initialFavorite]);

  const handleToggle = async () => {
    if (propertyId == null || loading) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = `/sign-in?redirect=${encodeURIComponent(
        window.location.pathname + window.location.search,
      )}`;
      return;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        await removeSavedProperty(propertyId);
        setIsFavorite(false);
        toast.success("Removed from favourite properties");
        onFavoriteChange?.(false);
      } else {
        await saveProperty(propertyId, window.location.href);
        setIsFavorite(true);
        toast.success("Added to favourite properties");
        onFavoriteChange?.(true);
      }
    } catch (error: unknown) {
      const message =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      toast.error(message || "Could not update favourite. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`property-favorite-btn${
        tone === "light" ? " property-favorite-btn--light" : ""
      }`}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
      title={isFavorite ? "Remove from favourite properties" : "Add to favourite properties"}
      disabled={loading}
      data-property-id={propertyId != null ? String(propertyId) : undefined}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void handleToggle();
      }}
      onPointerDown={isolateEvent}
      onMouseDown={isolateEvent}
      onTouchStart={isolateEvent}
    >
      <Heart
        size={20}
        strokeWidth={2}
        color={isFavorite ? FAVORITE_COLOR : inactiveColor}
        fill={isFavorite ? FAVORITE_COLOR : "transparent"}
        aria-hidden="true"
      />
    </button>
  );
}
