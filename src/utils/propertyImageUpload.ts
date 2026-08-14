export const TARGET_IMAGE_SIZES = [
  { width: 800, height: 600 },
  { width: 1200, height: 900 },
  { width: 1600, height: 1200 },
] as const;

export const MIN_IMAGE_WIDTH = TARGET_IMAGE_SIZES[0].width;
export const MAX_IMAGE_WIDTH = TARGET_IMAGE_SIZES[2].width;
export const MAX_IMAGE_HEIGHT = TARGET_IMAGE_SIZES[2].height;
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function formatImageBytes(bytes: number): string {
  return `${Math.round(bytes / (1024 * 1024))}MB`;
}

/** Smallest source we will upscale toward 800×600 (2×). Smaller photos look too soft. */
const MIN_SOURCE_WIDTH = 400;
const MIN_SOURCE_HEIGHT = 300;

/** 4:3 = 1.333. A small tolerance still counts as 4:3. */
const TARGET_ASPECT_RATIO = 4 / 3;
const MIN_ASPECT_RATIO = TARGET_ASPECT_RATIO * 0.97;

/** Wider than this is allowed, but may look cropped on listings. */
const WIDE_PANORAMA_RATIO = 2.2;

const TARGET_SIZE_LABEL = TARGET_IMAGE_SIZES.map(
  (size) => `${size.width}×${size.height}`,
).join(", ");

export const PROPERTY_IMAGE_GUIDE_TEXT = `Landscape only (width greater than height). Recommended 4:3: ${TARGET_SIZE_LABEL}. Wider photos are allowed. Portrait photos are not accepted. Max ${formatImageBytes(MAX_IMAGE_BYTES)}. Images are resized to the nearest recommended size.`;

export type ImageDimensions = {
  width: number;
  height: number;
};

export type PreparedPropertyImage = {
  file: File;
  width: number;
  height: number;
  wasResized: boolean;
  warnings: string[];
};

function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not read image dimensions for ${file.name}`));
    };

    image.src = url;
  });
}

export async function getImageDimensions(file: File): Promise<ImageDimensions> {
  const image = await loadImageElement(file);
  return { width: image.naturalWidth || image.width, height: image.naturalHeight || image.height };
}

export function getImageRatioError(width: number, height: number): string | null {
  if (width <= 0 || height <= 0) {
    return "Could not read image dimensions.";
  }

  if (width <= height) {
    return "Width must be greater than height. Please upload a landscape photo (4:3 or wider).";
  }

  const ratio = width / height;
  if (ratio < MIN_ASPECT_RATIO) {
    return `Image is too tall for listings. Please use a 4:3 landscape photo (${TARGET_SIZE_LABEL}) or a wider landscape photo.`;
  }

  return null;
}

export function getNearestTargetSize(width: number, height: number): ImageDimensions {
  let nearest: ImageDimensions = TARGET_IMAGE_SIZES[0];
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const target of TARGET_IMAGE_SIZES) {
    const distance = Math.hypot(width - target.width, height - target.height);
    // Prefer the larger size on a tie so we enlarge toward the next 4:3 size.
    if (distance <= nearestDistance) {
      nearest = target;
      nearestDistance = distance;
    }
  }

  return nearest;
}

export function getScaledSizeForTarget(
  width: number,
  height: number,
  target: ImageDimensions,
): ImageDimensions {
  const scale = Math.min(target.width / width, target.height / height);
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

export function getImageWarnings(
  width: number,
  height: number,
  options?: { wasUpscaled?: boolean },
): string[] {
  const warnings: string[] = [];
  if (width <= 0 || height <= 0) return warnings;

  const ratio = width / height;
  if (ratio > WIDE_PANORAMA_RATIO) {
    warnings.push("very wide panoramic ratio may look cropped on listings");
  }

  if (options?.wasUpscaled) {
    warnings.push("image was enlarged to a recommended size and may look slightly soft");
  }

  return warnings;
}

async function resizeImageToSize(
  image: HTMLImageElement,
  file: File,
  nextWidth: number,
  nextHeight: number,
): Promise<File | null> {
  const canvas = document.createElement("canvas");
  canvas.width = nextWidth;
  canvas.height = nextHeight;

  const context = canvas.getContext("2d");
  if (!context) return null;

  context.drawImage(image, 0, 0, nextWidth, nextHeight);

  const outputType =
    file.type === "image/png" || file.type === "image/webp" ? file.type : "image/jpeg";
  const quality = outputType === "image/png" ? undefined : 0.85;

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, outputType, quality);
  });

  if (!blob) return null;

  const extension =
    outputType === "image/png" ? "png" : outputType === "image/webp" ? "webp" : "jpg";
  const baseName = file.name.replace(/\.[^.]+$/, "") || "property-image";

  return new File([blob], `${baseName}.${extension}`, {
    type: outputType,
    lastModified: Date.now(),
  });
}

/**
 * Scale to the nearest 4:3 size (800×600, 1200×900, or 1600×1200).
 * Keeps original aspect ratio (contain). Upscales smaller photos and
 * downscales anything larger than 1600×1200. Skips animated GIF resizing.
 */
export async function scaleImageToNearestTarget(file: File): Promise<{
  file: File;
  width: number;
  height: number;
  wasResized: boolean;
  wasUpscaled: boolean;
}> {
  const image = await loadImageElement(file);
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  const target = getNearestTargetSize(width, height);
  const nextSize = getScaledSizeForTarget(width, height, target);
  const alreadyAtTarget = nextSize.width === width && nextSize.height === height;

  if (alreadyAtTarget) {
    return { file, width, height, wasResized: false, wasUpscaled: false };
  }

  if (file.type === "image/gif") {
    return { file, width, height, wasResized: false, wasUpscaled: false };
  }

  const nextFile = await resizeImageToSize(image, file, nextSize.width, nextSize.height);
  if (!nextFile) {
    return { file, width, height, wasResized: false, wasUpscaled: false };
  }

  return {
    file: nextFile,
    width: nextSize.width,
    height: nextSize.height,
    wasResized: true,
    wasUpscaled: nextSize.width > width || nextSize.height > height,
  };
}

/**
 * Validate + resize one image for property upload.
 * Throws when the image must be blocked.
 */
export async function preparePropertyImage(file: File): Promise<PreparedPropertyImage> {
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(
      `${file.name} is too large. Max size is ${formatImageBytes(MAX_IMAGE_BYTES)}.`,
    );
  }

  const { width, height } = await getImageDimensions(file);
  const ratioError = getImageRatioError(width, height);
  if (ratioError) {
    throw new Error(`${file.name}: ${ratioError}`);
  }

  if (width < MIN_SOURCE_WIDTH || height < MIN_SOURCE_HEIGHT) {
    throw new Error(
      `${file.name} is too small (${width}×${height}). Please use a photo close to ${TARGET_SIZE_LABEL} or larger.`,
    );
  }

  const resized = await scaleImageToNearestTarget(file);
  const warnings = getImageWarnings(width, height, { wasUpscaled: resized.wasUpscaled });

  if (file.type === "image/gif" && !resized.wasResized) {
    warnings.push("GIF kept at original size to preserve animation");
  }

  if (resized.file.size > MAX_IMAGE_BYTES) {
    throw new Error(
      `${file.name} is still too large after resizing. Please use a smaller file (max ${formatImageBytes(MAX_IMAGE_BYTES)}).`,
    );
  }

  return {
    file: resized.file,
    width: resized.width,
    height: resized.height,
    wasResized: resized.wasResized,
    warnings,
  };
}
