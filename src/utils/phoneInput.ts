export const PHONE_NUMBER_PLACEHOLDER = "Enter phone number";

/** 10-digit Indian mobile: first digit 1–9, remaining nine digits 0–9. */
export const PHONE_DIGITS_PATTERN = /^[1-9][0-9]{9}$/;

export const PHONE_VALIDATION_MESSAGE =
  "Phone number must be 10 digits and cannot start with 0";

export function sanitizePhoneDigits(value: string, maxLength = 10): string {
  return value.replace(/\D/g, "").slice(0, maxLength);
}

export function isValidPhoneDigits(phone?: string | null): boolean {
  const digits = sanitizePhoneDigits(phone ?? "");
  return PHONE_DIGITS_PATTERN.test(digits);
}

/** Returns a validation message when phone is non-empty but invalid. */
export function getPhoneValidationError(phone?: string | null): string | null {
  const digits = sanitizePhoneDigits(phone ?? "");
  if (!digits) return null;
  if (!PHONE_DIGITS_PATTERN.test(digits)) return PHONE_VALIDATION_MESSAGE;
  return null;
}

/** Strip +91 / 91 prefix for display in 10-digit inputs. */
export function stripCountryCodeForDisplay(phone?: string | null): string {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length > 10) {
    return digits.slice(-10);
  }
  if (digits.length > 10) {
    return digits.slice(-10);
  }
  return digits.slice(0, 10);
}

export function formatPhoneWithCountryCode(phone?: string | null): string {
  const digits = sanitizePhoneDigits(phone ?? "");
  if (!digits) return "";
  return `+91${digits}`;
}
