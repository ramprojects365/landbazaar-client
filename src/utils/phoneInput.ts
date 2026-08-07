export const PHONE_NUMBER_LABEL = "Phone Number (+91)";
export const CONTACT_NUMBER_LABEL = "Contact Number (+91)";
export const PHONE_NUMBER_PLACEHOLDER = "Enter 10 digit number";

export function sanitizePhoneDigits(value: string, maxLength = 10): string {
  return value.replace(/\D/g, "").slice(0, maxLength);
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
