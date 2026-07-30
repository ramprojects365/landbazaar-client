import PropertyDetailsOneArea from "@/components/RealEstate/PropertyDetailsOne/Details";
import Wrapper from "@/layouts/Wrapper";
import { PageParamsProps } from "@/types/custom-interface";
import { getCoverImageUrl } from "@/utils/propertyImages";
import type { Metadata } from "next";

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
    const base =
      process.env.NEXT_PUBLIC_API_BASE ?? "http://159.223.92.101:3008";
    const res = await fetch(`${base}/api/properties/${id}`);
    const json = await res.json();
    const item: ApiPropertyMeta = json?.data ?? json;

    const title = item.propertyName || item.title || `Property Details - ${id}`;
    const description =
      item.description?.trim() ||
        "View detailed property information in Malaysia. Find apartments for rent, houses for sale, condos, landed properties, and bungalows in Kuala Lumpur, Selangor, Penang, Johor and other major areas.";
    const imageUrl = getCoverImageUrl(item.images);
    const canonicalUrl = `https://propertyla.com.my/property-details/${id}`;

    return {
      metadataBase: new URL("https://propertyla.com.my"),
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "PropertyLa",
        type: "website",
        images: imageUrl
          ? [
              {
                url: imageUrl,
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
      metadataBase: new URL("https://propertyla.com.my"),
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
