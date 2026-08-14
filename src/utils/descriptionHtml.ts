export const DESCRIPTION_MAX_CHARS = 5000;
export const DESCRIPTION_MIN_CHARS = 50;

/** Strip HTML tags for length checks and plain-text fallbacks. */
export function stripDescriptionHtml(value: string): string {
  if (!value) return "";
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\u00a0/g, " ")
    .trim();
}

/** Single-line plain text, with HTML tags removed. */
export function toPlainDescription(value: string): string {
  return stripDescriptionHtml(value).replace(/\s+/g, " ").trim();
}

/** Short plain-text snippet for share previews and Open Graph. */
export function toDescriptionSnippet(value: string, maxLength = 180): string {
  const plain = toPlainDescription(value);
  if (!plain) return "";
  if (plain.length <= maxLength) return plain;

  const truncated = plain.slice(0, maxLength).replace(/\s+\S*$/, "").trim();
  return `${truncated || plain.slice(0, maxLength).trim()}…`;
}

export function looksLikeHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

const DESCRIPTION_SANITIZE_OPTIONS = {
  USE_PROFILES: { html: true },
  ALLOWED_TAGS: [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "ul",
    "ol",
    "li",
    "h2",
    "h3",
    "h4",
    "span",
  ],
  ALLOWED_ATTR: ["style"],
} as const;

export async function sanitizeDescriptionHtml(value: string): Promise<string> {
  if (typeof window === "undefined") return value;
  const DOMPurify = (await import("dompurify")).default;
  return DOMPurify.sanitize(value, DESCRIPTION_SANITIZE_OPTIONS);
}

export function sanitizeDescriptionHtmlSync(value: string): string {
  if (typeof window === "undefined") return value;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const DOMPurify = require("dompurify") as typeof import("dompurify").default;
  return DOMPurify.sanitize(value, DESCRIPTION_SANITIZE_OPTIONS);
}
