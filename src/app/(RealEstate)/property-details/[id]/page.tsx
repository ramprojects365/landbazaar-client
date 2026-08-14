import PropertyDetailsOneArea from "@/components/RealEstate/PropertyDetailsOne/Details";
import Wrapper from "@/layouts/Wrapper";
import { PageParamsProps } from "@/types/custom-interface";
import { getCoverImageUrl } from "@/utils/propertyImages";
import { toDescriptionSnippet } from "@/utils/descriptionHtml";
import { API_BASE_URL } from "@/config/constants";
import type { Metadata } from "next";

const FALLBACK_DESCRIPTION =
  "View detailed land and plot information in India. Find residential plots, agricultural land, farm land, and commercial land for sale or lease in Hyderabad, Telangana, Visakhapatnam and other growth corridors.";

type ApiPropertyMeta = {
  title?: string;
  propertyName?: string;
  description?: string;
  images?: unknown[];
};

export async function generateMetadata(
  props: PageParamsProps,
): Promise<Metadata> {
  const resolvedParams = await props.params;
  const { id } = resolvedParams;

  if (!id) {
    return {
      title: "Property Details",
    };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/properties/${id}`);
    const json = await res.json();
    const item: ApiPropertyMeta = json?.data ?? json;

    const title = item.propertyName || item.title || `Property Details - ${id}`;
    const description =
      toDescriptionSnippet(item.description || "", 180) || FALLBACK_DESCRIPTION;
    const imageUrl = getCoverImageUrl(item.images);
    const canonicalUrl = `https://www.dekholand.com/property-details/${id}`;

    return {
      metadataBase: new URL("https://www.dekholand.com"),
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "Dekho Land",
        type: "website",
        images: imageUrl
          ? [
              {
                url: imageUrl,
                alt: title,
              },
            ]
          : undefined,
      },
      twitter: {
        card: imageUrl ? "summary_large_image" : "summary",
        title,
        description,
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  } catch {
    return {
      metadataBase: new URL("https://www.dekholand.com"),
      title: `Property Details - ${id}`,
    };
  }
}

export default async function PropertyDetails(props: PageParamsProps) {
  const resolvedParams = await props.params;
  const { id } = resolvedParams;

  return (
    <Wrapper>
      <main>
        {/* property details area start */}
        <PropertyDetailsOneArea id={id} />
        {/* property details area end */}
      </main>
    </Wrapper>
  );
}
