import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PRIORITY_SEO_LISTINGS,
  type SeoRelatedGroup,
} from "@/data/footerLinks";
import { buildSearchHref } from "@/utils/searchUrl";

const locationPages = {
  hyderabad: "Hyderabad",
  telangana: "Telangana",
  visakhapatnam: "Visakhapatnam",
  "andhra-pradesh": "Andhra Pradesh",
  india: "India",
} as const;

type LocationSlug = keyof typeof locationPages;

const locationSeo: Record<
  LocationSlug,
  {
    description: string;
    keywords: string;
    groups: SeoRelatedGroup[];
  }
> = {
  hyderabad: {
    description:
      "Browse plots for sale in Hyderabad, land for sale in Hyderabad, open plots for sale in Hyderabad, residential plots for sale in Hyderabad, and farm land for sale near Hyderabad on Dekho Land.",
    keywords:
      "plots for sale in Hyderabad, land for sale in Hyderabad, open plots for sale in Hyderabad, residential plots for sale in Hyderabad, plots for sale near Hyderabad, farm land for sale near Hyderabad, HMDA plots for sale, best places to buy land in Hyderabad",
    groups: ["hyderabad", "approval"],
  },
  telangana: {
    description:
      "Find plots for sale in Telangana, land for sale in Telangana, agricultural land for sale in Telangana, and plots for sale in Hyderabad and Warangal on Dekho Land.",
    keywords:
      "plots for sale in Telangana, land for sale in Telangana, agricultural land for sale in Telangana, plots for sale in Hyderabad, plots for sale in Warangal, HMDA plots for sale",
    groups: ["telangana", "hyderabad"],
  },
  visakhapatnam: {
    description:
      "Browse plots for sale in Visakhapatnam, plots for sale in Vizag, land for sale in Visakhapatnam, and VMRDA plots for sale on Dekho Land.",
    keywords:
      "plots for sale in Visakhapatnam, plots for sale in Vizag, land for sale in Visakhapatnam, VMRDA plots for sale",
    groups: ["visakhapatnam", "andhra"],
  },
  "andhra-pradesh": {
    description:
      "Explore plots for sale in Andhra Pradesh and land for sale in Andhra Pradesh, including Visakhapatnam, Vizag, Vijayawada, Amaravati, Guntur, Kakinada, and Tirupati.",
    keywords:
      "plots for sale in Andhra Pradesh, land for sale in Andhra Pradesh, plots for sale in Visakhapatnam, plots for sale in Vijayawada, plots for sale in Amaravati, agricultural land for sale in Andhra Pradesh, APCRDA plots for sale, VMRDA plots for sale",
    groups: ["andhra", "visakhapatnam"],
  },
  india: {
    description:
      "Search plots for sale in Andhra Pradesh and Telangana, including Hyderabad, Visakhapatnam, Vijayawada, and Amaravati. Find HMDA, DTCP, and RERA approved plots on Dekho Land.",
    keywords:
      "plots for sale in Andhra Pradesh, plots for sale in Telangana, land for sale in Hyderabad, gated community plots for sale, RERA approved plots for sale",
    groups: ["hyderabad", "telangana", "andhra", "approval"],
  },
};

interface LocationPageProps {
  params: Promise<{ location: string }>;
}

export function generateStaticParams() {
  return Object.keys(locationPages).map((location) => ({ location }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { location } = await params;
  const title = locationPages[location as LocationSlug];
  const seo = locationSeo[location as LocationSlug];

  if (!title || !seo) {
    return {};
  }

  return {
    title: `${title} Lands & Plots | Dekho Land`,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/properties/${location}`,
    },
  };
}

export default async function LocationPropertiesPage({
  params,
}: LocationPageProps) {
  const { location } = await params;
  const title = locationPages[location as LocationSlug];
  const seo = locationSeo[location as LocationSlug];

  if (!title || !seo) {
    notFound();
  }

  const relatedListings = PRIORITY_SEO_LISTINGS.filter(
    (item) => item.relatedGroup && seo.groups.includes(item.relatedGroup),
  );

  return (
    <main className="property-location-page">
      <section className="tp-faq-inner-ptb pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="property-location-page__content">
                <span className="tp-section-title-pre">Lands & Plots</span>
                <h1 className="tp-section-title mb-20">{title} Lands & Plots</h1>
                <p>
                  We are preparing a dedicated location page for {title}. For
                  now, you can browse the latest matching land and plot listings
                  from search.
                </p>
                <ul
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px 16px",
                    paddingLeft: 0,
                    listStyle: "none",
                    margin: "0 0 24px",
                  }}
                >
                  {relatedListings.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/${item.slug}`}>{item.heading}</Link>
                    </li>
                  ))}
                </ul>
                <Link
                  className="tp-btn"
                  href={buildSearchHref({ keyword: title })}
                >
                  Browse {title}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
