// Environment detection
const getEnvironment = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_ENV || "development";
  }
  return process.env.NODE_ENV || "development";
};

// API base URL configuration based on environment
export const API_BASE_URL = (() => {
  const env = getEnvironment();

  // Priority order: .env.local > .env.development > .env.production > fallback
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  switch (env) {
    case "production":
      return process.env.NEXT_PUBLIC_API_BASE
        ? `${process.env.NEXT_PUBLIC_API_BASE}/api`
        : "http://159.223.92.101:3008/api";
    case "development":
      return process.env.NEXT_PUBLIC_API_BASE
        ? `${process.env.NEXT_PUBLIC_API_BASE}/api`
        : "http://localhost:3008/api";
    case "local":
    default:
      return process.env.NEXT_PUBLIC_API_BASE
        ? `${process.env.NEXT_PUBLIC_API_BASE}/api`
        : "http://localhost:3008/api";
  }
})();

// Environment info
export const ENVIRONMENT = getEnvironment();
export const IS_DEVELOPMENT =
  ENVIRONMENT === "development" || ENVIRONMENT === "local";
export const IS_PRODUCTION = ENVIRONMENT === "production";

// Other constants
export const APP_NAME = "PropertyLa";
