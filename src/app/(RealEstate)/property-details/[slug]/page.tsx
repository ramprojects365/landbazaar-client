import PropertyDetailsOneArea from "@/components/RealEstate/PropertyDetailsOne/Details";
import { PageParamsProps } from "@/types/custom-interface";
import { getCoverImageUrl } from "@/utils/propertyImages";
import { toDescriptionSnippet } from "@/utils/descriptionHtml";
import { getPropertyHeadingTitle } from "@/utils/mapApiProperty";
import {
  getPropertySlug,
  isPropertyUuid,
} from "@/utils/propertySlug";
import {
  getFeaturedSidebarPropertyCached,
  getPropertyByParamCached,
  getRecentSidebarPropertiesCached,
} from "@/services/propertyServer";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

const FALLBACK_DESCRIPTION =
  "View land and plot details on Dekho Land. Find plots for sale in Hyderabad, Telangana, and Andhra Pradesh, including Visakhapatnam, Vizag, Vijayawada, and Amaravati.";

const FALLBACK_OG_IMAGE =
  "https://www.dekholand.com/assets/img/logo/logo-blue.png";

const toAbsoluteImageUrl = (url: string | null): string => {
  if (!url) return FALLBACK_OG_IMAGE;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const path = url.startsWith("/") ? url : `/${url}`;
  return `https://www.dekholand.com${path}`;
};

export async function generateMetadata(
  props: PageParamsProps,
): Promise<Metadata> {
  const resolvedParams = await props.params;
  const { slug } = resolvedParams;

  if (!slug) {
    return {
      title: "Property Details",
    };
  }

  try {
    const item = await getPropertyByParamCached(slug);
    if (!item) {
      return {
        metadataBase: new URL("https://www.dekholand.com"),
        title: "Property Details",
      };
    }

    const title = getPropertyHeadingTitle(item);
    const description =
      toDescriptionSnippet(item.description || "", 180) || FALLBACK_DESCRIPTION;
    const imageUrl = toAbsoluteImageUrl(getCoverImageUrl(item.images));
    const canonicalSlug = getPropertySlug(item);
    const canonicalUrl = `https://www.dekholand.com/property-details/${canonicalSlug}`;
    const city = item.cityName?.trim();
    const state = item.state?.trim();
    const keywords = [
      title,
      city ? `plots for sale in ${city}` : "",
      city ? `land for sale in ${city}` : "",
      state ? `plots for sale in ${state}` : "",
      state ? `land for sale in ${state}` : "",
    ].filter(Boolean);

    return {
      metadataBase: new URL("https://www.dekholand.com"),
      title,
      description,
      keywords,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "DekhoLand",
        type: "website",
        locale: "en_IN",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: city ? `${title} — land for sale in ${city}` : title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      metadataBase: new URL("https://www.dekholand.com"),
      title: "Property Details",
    };
  }
}

export default async function PropertyDetails(props: PageParamsProps) {
  const resolvedParams = await props.params;
  const { slug } = resolvedParams;

  if (!slug) {
    notFound();
  }

  const initialProperty = await getPropertyByParamCached(slug);

  if (!initialProperty?.id) {
    notFound();
  }

  const canonicalSlug = getPropertySlug(initialProperty);
  const decodedSlug = decodeURIComponent(slug);

  if (isPropertyUuid(decodedSlug) || decodedSlug !== canonicalSlug) {
    permanentRedirect(
      `/property-details/${canonicalSlug}`,
    );
  }

  const [featuredProperty, recentProperties] = await Promise.all([
    getFeaturedSidebarPropertyCached(),
    getRecentSidebarPropertiesCached(3),
  ]);

  return (
    <main>
      <PropertyDetailsOneArea
        propertyId={String(initialProperty.id)}
        initialProperty={initialProperty}
        featuredProperty={featuredProperty}
        recentProperties={recentProperties}
      />
    </main>
  );
}
