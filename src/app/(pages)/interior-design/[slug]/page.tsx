import InteriorDesignerDetailClient from "@/components/InteriorDesign/InteriorDesignerDetailClient";
import {
  getInteriorDesignerBySlug,
  interiorDesigners,
} from "@/data/interiorDesigners";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return interiorDesigners.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const d = getInteriorDesignerBySlug(slug);
  if (!d) {
    return { title: "Interior designer | PropertyLa" };
  }
  return {
    title: `${d.name} — ${d.companyName} | PropertyLa Interior`,
    description: d.tagline,
  };
}

export default async function InteriorDesignerPage(props: Props) {
  const { slug } = await props.params;
  const designer = getInteriorDesignerBySlug(slug);
  if (!designer) notFound();

  return (
    <>
      <section className="position-relative text-white overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <Image
            src={designer.profileImage}
            alt=""
            fill
            priority
            className="object-fit-cover"
            sizes="100vw"
            unoptimized
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,59,92,0.25) 0%, rgba(0,59,92,0.82) 55%, rgba(0,20,32,0.92) 100%)",
            }}
            aria-hidden
          />
        </div>
        <div
          className="container position-relative py-5"
          style={{
            zIndex: 1,
            paddingTop: "clamp(5rem, 14vw, 8rem)",
            paddingBottom: "clamp(3rem, 8vw, 4.5rem)",
          }}
        >
          <nav className="small mb-4" style={{ opacity: 0.9 }}>
            <Link href="/" className="text-white text-decoration-none">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/interior-design"
              className="text-white text-decoration-none"
            >
              Interior design
            </Link>
            <span className="mx-2">/</span>
            <span>{designer.name}</span>
          </nav>
          <div className="row align-items-end g-4">
            <div className="col-lg-8">
              <p
                className="small text-uppercase mb-2"
                style={{ letterSpacing: "0.1em", opacity: 0.9 }}
              >
                {designer.companyName}
              </p>
              <h1
                className="text-white mb-2"
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                }}
              >
                {designer.name}
              </h1>
              <p
                className="text-white mb-0"
                style={{ opacity: 0.95, maxWidth: "560px", lineHeight: 1.65 }}
              >
                {designer.tagline}
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link
                href="/interior-design"
                className="btn btn-light btn-sm px-4"
              >
                ← All partners
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InteriorDesignerDetailClient designer={designer} />
    </>
  );
}
