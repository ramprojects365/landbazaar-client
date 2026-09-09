import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PropertyListing from "@/components/RealEstate/PropertyStyleOne/PropertyListing";
import {
  FOOTER_LOCATION_AREAS,
  getRelatedSeoLinks,
  getSeoListingFromSlug,
  getSeoListingPresets,
  getSeoListingSlugs,
  toAreaSlug,
} from "@/data/footerLinks";

interface SeoListingPageProps {
  params: Promise<{ seoListing: string }>;
}

export function generateStaticParams() {
  return getSeoListingSlugs().map((seoListing) => ({ seoListing }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: SeoListingPageProps): Promise<Metadata> {
  const { seoListing } = await params;
  const listing = getSeoListingFromSlug(seoListing);

  if (!listing) {
    return {};
  }

  const pageTitle = listing.metaTitle || listing.heading;
  const description =
    listing.description ||
    `Browse ${listing.heading.toLowerCase()} on Dekho Land. Find verified residential plots, farmlands, and land listings in ${listing.area}.`;

  return {
    title: pageTitle,
    description,
    keywords: [pageTitle, listing.area, "DekhoLand", "plots for sale"],
    alternates: {
      canonical: `/${listing.slug}`,
    },
    openGraph: {
      title: `${pageTitle} | Dekho Land`,
      description,
      url: `https://www.dekholand.com/${listing.slug}`,
      siteName: "Dekho Land",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${pageTitle} | Dekho Land`,
      description,
    },
  };
}

export default async function SeoListingPage({ params }: SeoListingPageProps) {
  const { seoListing } = await params;
  const listing = getSeoListingFromSlug(seoListing);

  if (!listing) {
    notFound();
  }

  const relatedLinks = getRelatedSeoLinks(listing);
  const presets = getSeoListingPresets(listing);

  return (
    <main className="property-location-page">
      <section className="pt-120 pb-80">
        <div className="container">
          <span className="tp-section-title-pre">Lands & Plots</span>
          <h1 className="tp-section-title mb-20">{listing.heading}</h1>
          <p style={{ color: "#5c6f7b", maxWidth: "720px", marginBottom: "24px" }}>
            Explore verified {listing.heading.toLowerCase()}. Use Dekho Land to
            compare listings, check location details, and connect with sellers in{" "}
            {listing.area}.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px 20px",
              marginBottom: "32px",
            }}
          >
            {relatedLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          {listing.extraContent === "best-places-hyderabad" && (
            <div style={{ marginBottom: "32px" }}>
              <h2 className="tp-section-title" style={{ fontSize: "22px" }}>
                Best places to buy land in Hyderabad
              </h2>
              <p style={{ color: "#5c6f7b", maxWidth: "720px", margin: "12px 0 16px" }}>
                Buyers looking for plots for sale near Hyderabad often start with
                west and south corridors — Shankarpally, Sangareddy, Shadnagar,
                Maheshwaram, and Vikarabad. These areas also include farm land
                for sale near Hyderabad and HMDA plots for sale.
              </p>
              <ul
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px 16px",
                  paddingLeft: 0,
                  listStyle: "none",
                  margin: 0,
                }}
              >
                {FOOTER_LOCATION_AREAS.map((area) => (
                  <li key={area}>
                    <Link href={`/plots-for-sale-in-${toAreaSlug(area)}`}>
                      Plots for sale in {area}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Suspense fallback={<p>Loading listings…</p>}>
            <PropertyListing
              presetCity={presets.presetCity}
              presetKeyword={presets.presetKeyword}
              presetPropertyType={presets.presetPropertyType}
            />
          </Suspense>
          <div style={{ marginTop: "40px" }}>
            <h2 className="tp-section-title" style={{ fontSize: "22px" }}>
              More locations
            </h2>
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px 16px",
                paddingLeft: 0,
                listStyle: "none",
                marginTop: "12px",
              }}
            >
              {FOOTER_LOCATION_AREAS.filter((area) => area !== listing.area).map(
                (area) => (
                  <li key={area}>
                    <Link href={`/plots-for-sale-in-${toAreaSlug(area)}`}>
                      Plots for sale in {area}
                    </Link>
                  </li>
                ),
              )}
              {listing.slug !== "plots-for-sale-in-hyderabad" && (
                <li>
                  <Link href="/plots-for-sale-in-hyderabad">
                    Plots for sale in Hyderabad
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
