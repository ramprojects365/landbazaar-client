"use client";

import React, { createContext, useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyDQcayr9WhBIuzzIMaXURU7lG7GvExMQx4";
const GOOGLE_MAPS_SCRIPT_ID = "landway-google-maps";

type PropertyGoogleMapsContextValue = {
  isLoaded: boolean;
  loadError: Error | undefined;
};

const PropertyGoogleMapsContext = createContext<PropertyGoogleMapsContextValue>({
  isLoaded: false,
  loadError: undefined,
});

export function usePropertyGoogleMaps(): PropertyGoogleMapsContextValue {
  return useContext(PropertyGoogleMapsContext);
}

/** Loads core Maps API only (no Places) when the property map is rendered. */
export default function PropertyGoogleMapsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: GOOGLE_MAPS_SCRIPT_ID,
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: [],
  });

  return (
    <PropertyGoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </PropertyGoogleMapsContext.Provider>
  );
}
