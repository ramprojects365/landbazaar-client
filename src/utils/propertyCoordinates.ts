export function parseCoordinate(
  value: number | string | null | undefined,
): number | null {
  if (value == null || value === "") return null;
  const parsed =
    typeof value === "number" ? value : parseFloat(String(value).trim());
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

function isValidCoordinatePair(lat: number, lng: number): boolean {
  return (
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180 &&
    !(lat === 0 && lng === 0)
  );
}

export function hasValidPropertyCoordinates(
  latitude?: number | string | null,
  longitude?: number | string | null,
): boolean {
  const lat = parseCoordinate(latitude);
  const lng = parseCoordinate(longitude);
  if (lat == null || lng == null) return false;
  return isValidCoordinatePair(lat, lng);
}
