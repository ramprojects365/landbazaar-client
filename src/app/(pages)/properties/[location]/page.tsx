import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { HYDERABAD_SEO_LISTINGS } from "@/data/footerLinks";

const locationPages = {
  hyderabad: "Hyderabad",
  telangana: "Telangana",
  visakhapatnam: "Visakhapatnam",
  "andhra-pradesh": "Andhra Pradesh",
  india: "India",
} as const;

type LocationSlug = keyof typeof locationPages;

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

  if (!title) {
    return {};
  }

  if (location === "hyderabad") {
    return {
      title: "Hyderabad Lands & Plots | Dekho Land",
      description:
        "Browse plots for sale in Hyderabad, open plots in Hyderabad, farm land near Hyderabad, agricultural land near Hyderabad, and residential plots Hyderabad on Dekho Land.",
      keywords:
        "plots for sale in Hyderabad, open plots in Hyderabad, farm land near Hyderabad, agricultural land near Hyderabad, residential plots Hyderabad",
      alternates: {
        canonical: "/properties/hyderabad",
      },
    };
  }

  return {
    title: `${title} Lands & Plots | Dekho Land`,
    description: `Browse lands and plots for sale and lease in ${title} on Dekho Land.`,
  };
}

export default async function LocationPropertiesPage({
  params,
}: LocationPageProps) {
  const { location } = await params;
  const title = locationPages[location as LocationSlug];

  if (!title) {
    notFound();
  }

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
                {location === "hyderabad" && (
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
                    {HYDERABAD_SEO_LISTINGS.map((item) => (
                      <li key={item.slug}>
                        <Link href={`/${item.slug}`}>{item.heading}</Link>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  className="tp-btn"
                  href={`/search?keyword=${encodeURIComponent(title)}`}
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
