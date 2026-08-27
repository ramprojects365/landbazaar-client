"use client";

import React, { createContext, useContext } from "react";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyDQcayr9WhBIuzzIMaXURU7lG7GvExMQx4";
const GOOGLE_MAPS_SCRIPT_ID = "landway-google-maps";
const libraries: Libraries = ["places"];

type GoogleMapsContextValue = {
  isLoaded: boolean;
  loadError: Error | undefined;
};

const GoogleMapsContext = createContext<GoogleMapsContextValue>({
  isLoaded: false,
  loadError: undefined,
});

export function useGoogleMaps(): GoogleMapsContextValue {
  return useContext(GoogleMapsContext);
}

interface GoogleMapsProviderProps {
  children: React.ReactNode;
  /** Render page content immediately; map components should wait for `isLoaded`. */
  deferChildren?: boolean;
}

const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({
  children,
  deferChildren = false,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: GOOGLE_MAPS_SCRIPT_ID,
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const value = { isLoaded, loadError };

  if (deferChildren) {
    return (
      <GoogleMapsContext.Provider value={value}>
        {children}
      </GoogleMapsContext.Provider>
    );
  }

  if (loadError) {
    return (
      <GoogleMapsContext.Provider value={value}>
        <div role="alert" style={{ padding: "12px", color: "#b42318" }}>
          Unable to load Google Maps. Please refresh and try again.
        </div>
      </GoogleMapsContext.Provider>
    );
  }

  if (!isLoaded) {
    return (
      <GoogleMapsContext.Provider value={value}>
        <div className="text-center py-5" aria-busy="true">
          <div
            className="spinner-border"
            role="status"
            style={{ color: "#003B5C" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading map tools…</p>
        </div>
      </GoogleMapsContext.Provider>
    );
  }

  return (
    <GoogleMapsContext.Provider value={value}>{children}</GoogleMapsContext.Provider>
  );
};

export default GoogleMapsProvider;
