export const MIN_IMAGE_WIDTH = 800;
export const MAX_IMAGE_WIDTH = 1600;
export const MAX_IMAGE_HEIGHT = 1200;
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/** Wider than this is treated as extreme panorama (normal 16:9 ≈ 1.78 is allowed) */
const EXTREME_PANORAMA_RATIO = 2.2;

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

export function formatImageBytes(bytes: number): string {
  return `${Math.round(bytes / (1024 * 1024))}MB`;
}

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

export function getImageWarnings(width: number, height: number): string[] {
  const warnings: string[] = [];
  if (width <= 0 || height <= 0) return warnings;

  const ratio = width / height;

  if (height > width) {
    warnings.push("portrait orientation may look cropped on listings");
  } else if (ratio > EXTREME_PANORAMA_RATIO) {
    warnings.push("very wide panoramic ratio may look cropped on listings");
  }

  return warnings;
}

/**
 * Downscale only when larger than 1600×1200. Never upscale.
 * Keeps original aspect ratio. Skips animated GIF resizing.
 */
export async function downscaleImageIfNeeded(file: File): Promise<{
  file: File;
  width: number;
  height: number;
  wasResized: boolean;
}> {
  const image = await loadImageElement(file);
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;

  if (width <= MAX_IMAGE_WIDTH && height <= MAX_IMAGE_HEIGHT) {
    return { file, width, height, wasResized: false };
  }

  // Avoid flattening animated GIFs
  if (file.type === "image/gif") {
    return { file, width, height, wasResized: false };
  }

  const scale = Math.min(MAX_IMAGE_WIDTH / width, MAX_IMAGE_HEIGHT / height, 1);
  const nextWidth = Math.max(1, Math.round(width * scale));
  const nextHeight = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = nextWidth;
  canvas.height = nextHeight;

  const context = canvas.getContext("2d");
  if (!context) {
    return { file, width, height, wasResized: false };
  }

  context.drawImage(image, 0, 0, nextWidth, nextHeight);

  const outputType =
    file.type === "image/png" || file.type === "image/webp"
      ? file.type
      : "image/jpeg";
  const quality = outputType === "image/png" ? undefined : 0.85;

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, outputType, quality);
  });

  if (!blob) {
    return { file, width, height, wasResized: false };
  }

  const extension =
    outputType === "image/png" ? "png" : outputType === "image/webp" ? "webp" : "jpg";
  const baseName = file.name.replace(/\.[^.]+$/, "") || "property-image";
  const nextFile = new File([blob], `${baseName}.${extension}`, {
    type: outputType,
    lastModified: Date.now(),
  });

  return {
    file: nextFile,
    width: nextWidth,
    height: nextHeight,
    wasResized: true,
  };
}

/**
 * Validate + optionally resize one image for property upload.
 * Throws when the image must be blocked.
 */
export async function preparePropertyImage(file: File): Promise<PreparedPropertyImage> {
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(
      `${file.name} is too large. Max size is ${formatImageBytes(MAX_IMAGE_BYTES)}.`,
    );
  }

  const { width, height } = await getImageDimensions(file);

  if (width < MIN_IMAGE_WIDTH) {
    throw new Error(
      `${file.name} is too small (${width}px wide). Minimum width is ${MIN_IMAGE_WIDTH}px.`,
    );
  }

  const warnings = getImageWarnings(width, height);
  const resized = await downscaleImageIfNeeded(file);

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
