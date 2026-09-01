"use client";

import { useMemo, useState } from "react";
import {
  Circle,
  GoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import GoogleMapsProvider, {
  useGoogleMaps,
} from "@/components/HeroBanner/subComponents/GoogleMapsProvider";
import { parseCoordinate } from "@/utils/propertyCoordinates";

type PropertyLocationMapProps = {
  latitude?: number | string | null;
  longitude?: number | string | null;
  location?: string;
  title?: string;
};

function isValidCoordinatePair(lat: number, lng: number): boolean {
  return (
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180 &&
    !(lat === 0 && lng === 0)
  );
}

function MapStatusMessage({
  tone,
  children,
}: {
  tone: "loading" | "error";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`tp-property-details-map-status tp-property-details-map-status--${tone}`}
      role={tone === "error" ? "alert" : "status"}
      aria-live="polite"
    >
      {children}
    </div>
  );
}

function PropertyLocationMapInner({
  latitude,
  longitude,
  location,
  title,
}: Required<Pick<PropertyLocationMapProps, "latitude" | "longitude">> &
  Pick<PropertyLocationMapProps, "location" | "title">) {
  const { isLoaded, loadError } = useGoogleMaps();
  const [infoOpen, setInfoOpen] = useState(true);

  const center = useMemo(
    () => ({ lat: latitude, lng: longitude }),
    [latitude, longitude],
  );

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  const mapFooter = (
    <div className="tp-property-details-map-footer">
      {location && (
        <p className="tp-property-details-map-address">{location}</p>
      )}
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="tp-property-details-map-link"
      >
        Open in Google Maps
      </a>
    </div>
  );

  if (loadError) {
    return (
      <>
        <MapStatusMessage tone="error">
          Map could not be loaded. You can still open the location in Google Maps
          using the link below.
        </MapStatusMessage>
        {mapFooter}
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <MapStatusMessage tone="loading">Loading map…</MapStatusMessage>
        {mapFooter}
      </>
    );
  }

  return (
    <>
      <div className="tp-property-details-map-wrap">
        <GoogleMap
          mapContainerClassName="tp-property-details-map-container"
          center={center}
          zoom={17}
          options={{
            mapTypeControl: false,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
          }}
        >
          <Circle
            center={center}
            radius={90}
            options={{
              fillColor: "#003B5C",
              fillOpacity: 0.18,
              strokeColor: "#003B5C",
              strokeOpacity: 0.75,
              strokeWeight: 2,
            }}
          />
          <Marker
            position={center}
            title={title || "Property location"}
            animation={google.maps.Animation.DROP}
            onClick={() => setInfoOpen(true)}
          />
          {infoOpen && (
            <InfoWindow
              position={center}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div className="tp-property-details-map-info">
                <strong>{title || "Property location"}</strong>
                {location && <p>{location}</p>}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      {mapFooter}
    </>
  );
}

export default function PropertyLocationMap({
  latitude,
  longitude,
  location,
  title,
}: PropertyLocationMapProps) {
  const lat = parseCoordinate(latitude);
  const lng = parseCoordinate(longitude);

  if (lat == null || lng == null || !isValidCoordinatePair(lat, lng)) {
    return null;
  }

  return (
    <GoogleMapsProvider deferChildren>
      <div className="tp-property-details-map">
        <PropertyLocationMapInner
          latitude={lat}
          longitude={lng}
          location={location}
          title={title}
        />
      </div>
    </GoogleMapsProvider>
  );
}
