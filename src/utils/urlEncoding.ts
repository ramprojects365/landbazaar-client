/**
 * URL encoding utilities for creating clean, readable URLs
 */

/**
 * Encode only the values in a URL parameter, keeping URL structure clean
 * @param str - The string to encode
 * @returns Encoded string with spaces as + signs, but preserving URL structure
 */
export const encodeUrlValue = (str: string): string => {
  if (!str) return '';
  
  // Only encode characters that need encoding, but keep spaces as +
  return str
    .replace(/\s+/g, '+') // Replace spaces with +
    .replace(/%/g, '%25') // Encode % signs
    .replace(/\?/g, '%3F') // Encode ? signs
    .replace(/#/g, '%23') // Encode # signs
    .replace(/&/g, '%26') // Encode & signs
    .replace(/=/g, '%3D'); // Encode = signs
};

/**
 * Create a clean property details URL with proper encoding
 * @param baseUrl - The base URL (e.g., "/property-details")
 * @param propertyId - The property ID
 * @param fromUrl - Optional URL to redirect back to
 * @returns Clean, properly encoded URL
 */
export const createPropertyDetailsUrl = (
  baseUrl: string, 
  propertyId: string, 
  fromUrl?: string
): string => {
  let url = `${baseUrl}/${propertyId}`;
  
  if (fromUrl) {
    // Parse the from URL to extract and encode only the values
    const parsedUrl = new URL(fromUrl, 'http://localhost');
    const path = parsedUrl.pathname;
    const params = new URLSearchParams(parsedUrl.search);
    
    // Build clean URL with encoded values
    let cleanFromUrl = path;
    const paramPairs: string[] = [];
    
    // Encode each parameter value
    params.forEach((value, key) => {
      paramPairs.push(`${key}=${encodeUrlValue(value)}`);
    });
    
    if (paramPairs.length > 0) {
      cleanFromUrl += '?' + paramPairs.join('&');
    }
    
    url += `?from=${encodeURIComponent(cleanFromUrl)}`;
  }
  
  return url;
};

/**
 * Create a clean URL for the from parameter that preserves readability
 * @param fromUrl - The URL to encode for the from parameter
 * @returns Clean encoded URL
 */
export const createCleanFromUrl = (fromUrl: string): string => {
  try {
    const url = new URL(fromUrl, 'http://localhost');
    const path = url.pathname;
    const params = new URLSearchParams(url.search);
    
    // Build clean URL with encoded values
    let cleanFromUrl = path;
    const paramPairs: string[] = [];
    
    // Encode each parameter value
    params.forEach((value, key) => {
      paramPairs.push(`${key}=${encodeUrlValue(value)}`);
    });
    
    if (paramPairs.length > 0) {
      cleanFromUrl += '?' + paramPairs.join('&');
    }
    
    return cleanFromUrl;
  } catch {
    // Fallback for malformed URLs
    return fromUrl.replace(/\s+/g, '+');
  }
};
