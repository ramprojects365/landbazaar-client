import type { Libraries } from "@react-google-maps/api";

export const GOOGLE_MAPS_API_KEY = "AIzaSyDQcayr9WhBIuzzIMaXURU7lG7GvExMQx4";
export const GOOGLE_MAPS_SCRIPT_ID = "landway-google-maps";

/** Must be identical everywhere `useJsApiLoader` is called with this script id. */
export const GOOGLE_MAPS_LIBRARIES: Libraries = ["places"];

export const googleMapsLoaderOptions = {
  id: GOOGLE_MAPS_SCRIPT_ID,
  googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  libraries: GOOGLE_MAPS_LIBRARIES,
} as const;
