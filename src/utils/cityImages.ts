const CITY_IMAGE_ALIASES: Record<string, string> = {
  vizag: "visakhapatnam",
  vishakhapatnam: "visakhapatnam",
  visakapatnam: "visakhapatnam",
};

const CITY_IMAGE_EXTENSIONS = [".jpeg", ".jpg", ".png", ".webp"] as const;

function cityImageSlug(cityName: string): string {
  const key = cityName.trim().toLowerCase().replace(/\s+/g, "");
  return CITY_IMAGE_ALIASES[key] || key;
}

export function getCityDefaultImageCandidates(
  cityName?: string | null,
): string[] {
  if (!cityName) return [];
  const slug = cityImageSlug(cityName);
  if (!slug) return [];
  return CITY_IMAGE_EXTENSIONS.map(
    (extension) => `/assets/img/city/${slug}${extension}`,
  );
}

function imageExists(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/** Folder photo when present; otherwise the listing image from that city. */
export async function resolveCityCardImage(
  cityName: string,
  listingImage: string,
): Promise<string> {
  for (const src of getCityDefaultImageCandidates(cityName)) {
    if (await imageExists(src)) return src;
  }
  return listingImage;
}
