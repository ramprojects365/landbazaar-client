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

const FONT_SHORTHAND_SIZE = /(\d+(?:\.\d+)?)(px|pt|em|rem)/i;

/**
 * Drop copied font families so description text uses the site font
 * (Plus Jakarta Sans). Font size from a `font` shorthand is kept.
 */
export function stripCopiedFontFamilies(html: string): string {
  if (!html) return html;

  return html
    .replace(/<\/?font\b[^>]*>/gi, "")
    .replace(
      /(\sstyle\s*=\s*)(["'])([\s\S]*?)\2/gi,
      (_full, prefix: string, quote: string, styles: string) => {
        const cleaned = styles
          .split(";")
          .map((part) => part.trim())
          .filter(Boolean)
          .flatMap((decl) => {
            const colon = decl.indexOf(":");
            if (colon < 0) return [];
            const prop = decl.slice(0, colon).trim().toLowerCase();
            const value = decl.slice(colon + 1).trim();

            if (prop === "font-family") return [];
            if (prop === "font") {
              const sizeMatch = value.match(FONT_SHORTHAND_SIZE);
              return sizeMatch
                ? [`font-size: ${sizeMatch[1]}${sizeMatch[2]}`]
                : [];
            }
            return [decl];
          })
          .join("; ");

        return cleaned ? `${prefix}${quote}${cleaned}${quote}` : "";
      },
    );
}

function purifyDescriptionHtml(value: string): string {
  const stripped = stripCopiedFontFamilies(value);
  if (typeof window === "undefined") return stripped;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const DOMPurify = require("dompurify") as typeof import("dompurify").default;
  return stripCopiedFontFamilies(
    DOMPurify.sanitize(stripped, DESCRIPTION_SANITIZE_OPTIONS),
  );
}

export async function sanitizeDescriptionHtml(value: string): Promise<string> {
  if (typeof window === "undefined") return stripCopiedFontFamilies(value);
  const DOMPurify = (await import("dompurify")).default;
  return stripCopiedFontFamilies(
    DOMPurify.sanitize(stripCopiedFontFamilies(value), DESCRIPTION_SANITIZE_OPTIONS),
  );
}

export function sanitizeDescriptionHtmlSync(value: string): string {
  return purifyDescriptionHtml(value);
}
