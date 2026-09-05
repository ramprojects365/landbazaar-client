"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import "./favorite-button.css";

/** Brand orange from the Dekho Land logo pin. */
const FAVORITE_ORANGE = "#FF7A00";

type FavoriteButtonProps = {
  propertyId?: string | number;
};

export default function FavoriteButton({ propertyId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button
      type="button"
      className="property-favorite-btn"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
      data-property-id={propertyId != null ? String(propertyId) : undefined}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsFavorite((current) => !current);
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
