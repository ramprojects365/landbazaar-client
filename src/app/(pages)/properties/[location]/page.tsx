import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const locationPages = {
  "kuala-lumpur": "Kuala Lumpur",
  selangor: "Selangor",
  penang: "Penang",
  johor: "Johor",
  perak: "Perak",
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

  return {
    title: `${title} Properties | PropertyLa`,
    description: `Browse properties for sale and rent in ${title} on PropertyLa.`,
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
                <span className="tp-section-title-pre">Properties</span>
                <h1 className="tp-section-title mb-20">{title} Properties</h1>
                <p>
                  We are preparing a dedicated location page for {title}. For
                  now, you can browse the latest matching listings from search.
                </p>
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
