import { blogData } from "@/data/blogData";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Land & Plot Blog | LandWay India",
  description:
    "Read LandWay India articles about buying plots in Hyderabad, Telangana land records (Dharani), Visakhapatnam corridors, plot loans, RERA/HMDA, farmland, and agricultural land guidance.",
  metadataBase: new URL("https://landway.com"),
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Land & Plot Blog | LandWay India",
    description: "Read LandWay India articles about buying plots in Hyderabad, Telangana land records (Dharani), Visakhapatnam corridors, plot loans, RERA/HMDA, farmland, and agricultural land guidance.",
    url: "https://landway.com/blog",
    siteName: "LandWay",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Land & Plot Blog | LandWay India",
    description: "Read LandWay India articles about buying plots in Hyderabad, Telangana land records (Dharani), Visakhapatnam corridors, plot loans, RERA/HMDA, farmland, and agricultural land guidance.",
  },
};

export default function BlogPage() {
  return (
    <section className="blog-listing-page pt-120 pb-120">
      <div className="container">
        <div className="blog-listing-page__header">
          <span className="tp-section-title-pre">Land Guide</span>
          <h1 className="tp-section-title">Latest land & plot insights</h1>
          <p>
            Helpful reads for Indian buyers, sellers, owners, and land investors.
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
