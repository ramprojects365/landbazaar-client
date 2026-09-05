"use client";

import React, { useRef, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { MapPin } from "lucide-react";
import { useGoogleMaps } from "@/components/HeroBanner/subComponents/GoogleMapsProvider";

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
  const { isLoaded } = useGoogleMaps();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputStyle = {
    width: "100%",
    padding: "10px 12px 10px 40px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #e8e8e8",
  } as const;

  const inputWrapperStyle = {
    position: "relative",
    width: "100%",
  } as const;

  const iconStyle = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#6b7280",
    pointerEvents: "none",
    zIndex: 1,
  } as const;

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
      onSelect({
        address: inputRef.current?.value || "",
        lat: null,
        lng: null,
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelect({ address: event.currentTarget.value, lat: null, lng: null });
  };

  useEffect(() => {
    if (inputRef.current && defaultValue) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  if (!isLoaded) {
    return (
      <div style={inputWrapperStyle}>
        <MapPin size={18} style={iconStyle} aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder || "Search location"}
          defaultValue={defaultValue}
          disabled
          style={{ ...inputStyle, background: "#f9fafb", color: "#888" }}
        />
      </div>
    );
  }

  return (
    <div style={inputWrapperStyle}>
      <MapPin size={18} style={iconStyle} aria-hidden="true" />
      <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder || "Search location"}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </Autocomplete>
    </div>
  );
};

export default PlaceSearch;
