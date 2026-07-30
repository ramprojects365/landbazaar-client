import { blogData } from "@/data/blogData";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Blog | Property La Malaysia",
  description:
    "Read Property La articles about Malaysian property buying, stamp duty, Selangor locations, foreign investors, and common homebuyer mistakes.",
  metadataBase: new URL("https://propertyla.com.my"),
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Property Blog | Property La Malaysia",
    description: "Read Property La articles about Malaysian property buying, stamp duty, Selangor locations, foreign investors, and common homebuyer mistakes.",
    url: "https://propertyla.com.my/blog",
    siteName: "PropertyLa",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Property Blog | Property La Malaysia",
    description: "Read Property La articles about Malaysian property buying, stamp duty, Selangor locations, foreign investors, and common homebuyer mistakes.",
  },
};

export default function BlogPage() {
  return (
    <section className="blog-listing-page pt-120 pb-120">
      <div className="container">
        <div className="blog-listing-page__header">
          <span className="tp-section-title-pre">Property Guide</span>
          <h1 className="tp-section-title">Latest property insights</h1>
          <p>
            Helpful reads for Malaysian buyers, renters, owners, and investors.
          </p>
        </div>

        <div className="blog-listing-page__grid">
          {blogData.map((post) => (
            <article className="blog-listing-card" key={post.id}>
              <Link className="blog-listing-card__image" href={`/blog/${post.slug}`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={420}
                  height={260}
                  sizes="(max-width: 767px) 100vw, 33vw"
                />
              </Link>
              <div className="blog-listing-card__body">
                <div className="blog-listing-card__meta">
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h2>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <Link className="blog-listing-card__link" href={`/blog/${post.slug}`}>
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
