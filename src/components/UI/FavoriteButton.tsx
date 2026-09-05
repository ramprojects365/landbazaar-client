"use client";

import { useState, type SyntheticEvent } from "react";
import { Heart } from "lucide-react";
import "./favorite-button.css";

/** Brand orange from the Dekho Land logo pin. */
const FAVORITE_ORANGE = "#FF7A00";

type FavoriteButtonProps = {
  propertyId?: string | number;
};

function isolateEvent(event: SyntheticEvent) {
  event.stopPropagation();
}

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
      onPointerDown={isolateEvent}
      onMouseDown={isolateEvent}
      onTouchStart={isolateEvent}
    >
      <Heart
        size={20}
        strokeWidth={2}
        color={isFavorite ? FAVORITE_ORANGE : "#FFFFFF"}
        fill={isFavorite ? FAVORITE_ORANGE : "transparent"}
        aria-hidden="true"
      />
    </button>
  );
}
