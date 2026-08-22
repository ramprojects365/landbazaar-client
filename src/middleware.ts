import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LEGACY_BLOG_PATH =
  "/blog/10-essential-legal-documents-to-check-before-buying-a-plot-in-Hyderabad";
const CANONICAL_BLOG_PATH =
  "/blog/10-essential-legal-documents-to-check-before-buying-a-plot-in-hyderabad";

export function middleware(request: NextRequest) {
  // Compare the raw request path so this does not loop on macOS,
  // where the filesystem treats Hyderabad and hyderabad as the same folder.
  if (request.nextUrl.pathname === LEGACY_BLOG_PATH) {
    const url = request.nextUrl.clone();
    url.pathname = CANONICAL_BLOG_PATH;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/blog/10-essential-legal-documents-to-check-before-buying-a-plot-in-Hyderabad",
  ],
};
