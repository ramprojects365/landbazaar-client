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

export const getPropertyImageItem = (image: unknown): PropertyImageDisplayItem | null => {
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
    order: item.order,
  };
};

export const getPropertyImageItems = (images: unknown): PropertyImageDisplayItem[] => {
  if (!Array.isArray(images)) return [];

  return images
    .map(getPropertyImageItem)
    .filter((image): image is PropertyImageDisplayItem => Boolean(image));
};

export const getPropertyImageUrls = (images: unknown): string[] => {
  return getPropertyImageItems(images).map((image) => image.url);
};

export const getCoverImageUrl = (images: unknown): string | null => {
  if (!Array.isArray(images) || images.length === 0) return null;

  const cover = images.find(
    (image) => image && typeof image === "object" && !Array.isArray(image) && Boolean((image as PropertyImageLike).isCover),
  );

  return getPropertyImageUrl(cover) || getPropertyImageUrl(images[0]);
};
