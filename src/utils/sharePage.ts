export const SITE_URL = "https://www.dekholand.com";

export const toCanonicalPageUrl = (path: string): string => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
};

export const getFacebookShareUrl = (pageUrl: string): string => {
  const facebookUrl = new URL("https://www.facebook.com/sharer/sharer.php");
  facebookUrl.searchParams.set("u", pageUrl);
  return facebookUrl.toString();
};

export const getWhatsAppShareUrl = (pageUrl: string): string =>
  `https://wa.me/?text=${encodeURIComponent(pageUrl)}`;

export const getTwitterShareUrl = (pageUrl: string, title?: string): string => {
  const twitterUrl = new URL("https://twitter.com/intent/tweet");
  twitterUrl.searchParams.set("url", pageUrl);
  if (title) twitterUrl.searchParams.set("text", title);
  return twitterUrl.toString();
};

export const getLinkedInShareUrl = (pageUrl: string): string => {
  const linkedInUrl = new URL("https://www.linkedin.com/sharing/share-offsite/");
  linkedInUrl.searchParams.set("url", pageUrl);
  return linkedInUrl.toString();
};

export const getInstagramProfileUrl = (): string =>
  "https://www.instagram.com/dekho_land/";

export const toAbsoluteSiteUrl = (url: string): string => {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${SITE_URL}${path}`;
};
