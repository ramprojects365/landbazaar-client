"use client";

import React, { useRef, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";

export interface PlaceResult {
  address: string;
  lat: number | null;
  lng: number | null;
}

interface PlaceSearchProps {
  onSelect: (result: PlaceResult) => void;
  placeholder?: string;
  defaultValue?: string;
}

const PlaceSearch: React.FC<PlaceSearchProps> = ({
  onSelect,
  placeholder,
  defaultValue = "",
}) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.formatted_address) {
      const lat = place.geometry?.location?.lat() ?? null;
      const lng = place.geometry?.location?.lng() ?? null;
      onSelect({ address: place.formatted_address, lat, lng });
    } else {
      onSelect({ address: "", lat: null, lng: null });
    }
  };

  useEffect(() => {
    if (inputRef.current && defaultValue) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  return (
    <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder || "Search location"}
        style={{
          width: "100%",
          padding: "10px 12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #e8e8e8",
        }}
      />
    </Autocomplete>
  );
};

export default PlaceSearch;
