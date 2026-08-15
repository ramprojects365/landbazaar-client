import PropertyDetailsOneArea from "@/components/RealEstate/PropertyDetailsOne/Details";
import Wrapper from "@/layouts/Wrapper";
import { PageParamsProps } from "@/types/custom-interface";
import { getCoverImageUrl } from "@/utils/propertyImages";
import { toDescriptionSnippet } from "@/utils/descriptionHtml";
import { getPropertyByIdCached } from "@/services/propertyServer";
import type { Metadata } from "next";

const FALLBACK_DESCRIPTION =
  "View detailed land and plot information in India. Find residential plots, agricultural land, farm land, and commercial land for sale or lease in Hyderabad, Telangana, Visakhapatnam and other growth corridors.";

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
    const item = await getPropertyByIdCached(id);
    if (!item) {
      return {
        metadataBase: new URL("https://www.dekholand.com"),
        title: `Property Details - ${id}`,
      };
    }

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
  const initialProperty = id ? await getPropertyByIdCached(id) : null;

  return (
    <Wrapper>
      <main>
        {/* property details area start */}
        <PropertyDetailsOneArea id={id} initialProperty={initialProperty} />
        {/* property details area end */}
      </main>
    </Wrapper>
  );
}
