export interface PropertyImageLike {
  url?: string;
  imageUrl?: string;
  src?: string;
  caption?: string;
  displayPlace?: string;
  customPlaceName?: string;
  category?: string;
  fileName?: string;
  isCover?: boolean;
  order?: number;
}

export interface PropertyImageDisplayItem {
  url: string;
  caption?: string;
  displayPlace?: string;
  isCover?: boolean;
  order?: number;
}

export const getPropertyImageUrl = (image: unknown): string | null => {
  if (typeof image === "string" && image.trim()) return image;

  if (!image || typeof image !== "object" || Array.isArray(image)) return null;

  const item = image as PropertyImageLike;
  const url = item.url || item.imageUrl || item.src;

  return typeof url === "string" && url.trim() ? url : null;
};

export const getPropertyImageItem = (
  image: unknown,
): PropertyImageDisplayItem | null => {
  const url = getPropertyImageUrl(image);
  if (!url) return null;

  if (!image || typeof image !== "object" || Array.isArray(image)) {
    return { url };
  }

  const item = image as PropertyImageLike;
  const displayPlace =
    item.displayPlace || item.customPlaceName || item.category || undefined;
  const caption = item.caption || displayPlace || item.fileName || undefined;

  return {
    url,
    caption,
    displayPlace,
    isCover: Boolean(item.isCover),
    order: typeof item.order === "number" ? item.order : undefined,
  };
};

/** Cover first, then by order ascending. */
export const sortPropertyImages = (
  images: PropertyImageDisplayItem[],
): PropertyImageDisplayItem[] => {
  return [...images].sort((a, b) => {
    if (a.isCover && !b.isCover) return -1;
    if (!a.isCover && b.isCover) return 1;
    return (a.order ?? 9999) - (b.order ?? 9999);
  });
};

export const getPropertyImageItems = (
  images: unknown,
): PropertyImageDisplayItem[] => {
  if (!Array.isArray(images)) return [];

  const items = images
    .map(getPropertyImageItem)
    .filter((image): image is PropertyImageDisplayItem => Boolean(image));

  return sortPropertyImages(items);
};

export const getPropertyImageUrls = (images: unknown): string[] => {
  return getPropertyImageItems(images).map((image) => image.url);
};

/** Prefer isCover image; otherwise first by order. */
export const getCoverImageUrl = (images: unknown): string | null => {
  const items = getPropertyImageItems(images);
  if (items.length === 0) return null;
  const cover = items.find((image) => image.isCover);
  return cover?.url || items[0].url;
};
