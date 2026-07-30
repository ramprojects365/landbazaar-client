"use client";

import type { InteriorDesigner } from "@/data/interiorDesigners";
import Image from "next/image";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type Props = { designer: InteriorDesigner };

export default function InteriorDesignerDetailClient({ designer }: Props) {
  const [modal, setModal] = useState<{
    src: string;
    title: string;
    description: string;
  } | null>(null);

  const openExternal = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const shareFacebook = useCallback(() => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    openExternal(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    );
  }, [openExternal]);

  const shareWhatsApp = useCallback(() => {
    const url =
      typeof window !== "undefined" ? window.location.href : "";
    const text = [
      `${designer.name} — ${designer.companyName}`,
      designer.tagline,
      url,
    ].join("\n\n");
    openExternal(`https://wa.me/?text=${encodeURIComponent(text)}`);
  }, [designer, openExternal]);

  const copyLink = useCallback(async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied.");
    } catch {
      toast.error("Could not copy link.");
    }
  }, []);

  return (
    <>
      <section className="pt-100 pb-60">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-8">
              <p className="text-muted small text-uppercase mb-2">{designer.city}</p>
              <h1 className="tp-section-title mb-2" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)" }}>
                {designer.name}
              </h1>
              <p className="text-muted mb-3">{designer.role} · {designer.companyName}</p>
              <p style={{ lineHeight: 1.8, color: "#444" }}>{designer.bio}</p>
              <div className="d-flex flex-wrap gap-2 mt-3">
                {designer.specialties.map((s) => (
                  <span
                    key={s}
                    className="badge rounded-pill"
                    style={{
                      background: "#f0f4fd",
                      color: "#003b5c",
                      fontWeight: 500,
                      padding: "0.45em 0.9em",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="p-4 rounded-3"
                style={{
                  border: "1px solid #dbe1ef",
                  background: "#fff",
                  boxShadow: "0 8px 32px rgba(45,46,69,0.06)",
                }}
              >
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="rounded-3 overflow-hidden flex-shrink-0 bg-light d-flex align-items-center justify-content-center"
                    style={{ width: 72, height: 72 }}
                  >
                    <Image
                      src={designer.companyLogo}
                      alt={designer.companyName}
                      width={56}
                      height={56}
                      unoptimized
                    />
                  </div>
                  <div>
                    <div className="fw-semibold" style={{ color: "#003b5c" }}>
                      {designer.companyName}
                    </div>
                    <div className="small text-muted">Interior partner</div>
                  </div>
                </div>
                <a className="d-block mb-2 fw-medium" href={`tel:${designer.phone.replace(/\s/g, "")}`} style={{ color: "#003b5c" }}>
                  {designer.phone}
                </a>
                <a className="d-block small text-muted" href={`mailto:${designer.email}`}>
                  {designer.email}
                </a>
                <hr className="my-4" />
                <p className="small text-muted mb-2 fw-semibold">Share this profile</p>
                <div className="d-flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={shareFacebook}
                  >
                    Facebook
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={shareWhatsApp}
                  >
                    WhatsApp
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-secondary" onClick={copyLink}>
                    Copy link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-100">
        <div className="container">
          <div className="text-center mb-50">
            <span className="tp-section-title-pre">Portfolio</span>
            <h3 className="tp-section-title">Selected work</h3>
            <p className="text-muted mx-auto" style={{ maxWidth: "560px" }}>
              Tap an image to open a larger preview with project notes.
            </p>
          </div>
          <div className="row g-3 g-md-4">
            {designer.gallery.map((item) => (
              <div key={item.src + item.title} className="col-6 col-md-4 col-lg-3">
                <button
                  type="button"
                  className="border-0 p-0 w-100 text-start bg-transparent"
                  onClick={() =>
                    setModal({
                      src: item.src,
                      title: item.title,
                      description: item.description,
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="rounded-3 overflow-hidden position-relative w-100"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-fit-cover"
                      unoptimized
                    />
                  </div>
                  <p className="small fw-semibold mt-2 mb-0" style={{ color: "#003b5c" }}>
                    {item.title}
                  </p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-120">
        <div className="container">
          <div className="text-center mb-50">
            <span className="tp-section-title-pre">Services</span>
            <h3 className="tp-section-title">How we work with you</h3>
          </div>
          <div className="row g-4">
            {designer.highlights.map((h) => (
              <div key={h.title} className="col-md-6">
                <button
                  type="button"
                  className="border-0 p-0 w-100 text-start bg-transparent h-100"
                  onClick={() =>
                    setModal({
                      src: h.image,
                      title: h.title,
                      description: h.body,
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <article
                    className="h-100 rounded-3 overflow-hidden"
                    style={{
                      border: "1px solid #dbe1ef",
                      boxShadow: "0 6px 24px rgba(45,46,69,0.06)",
                    }}
                  >
                    <div className="position-relative w-100" style={{ height: "200px" }}>
                      <Image
                        src={h.image}
                        alt={h.title}
                        fill
                        className="object-fit-cover"
                        unoptimized
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="h6 mb-2" style={{ color: "#003b5c" }}>
                        {h.title}
                      </h4>
                      <p className="text-muted small mb-0" style={{ lineHeight: 1.65 }}>
                        {h.body}
                      </p>
                      <span className="small text-decoration-underline mt-2 d-inline-block" style={{ color: "#003b5c" }}>
                        Open details
                      </span>
                    </div>
                  </article>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modal && (
        <div
          className="position-fixed top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center p-3"
          style={{
            zIndex: 1080,
            background: "rgba(0,0,0,0.65)",
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="interior-modal-title"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-3 overflow-hidden shadow-lg w-100"
            style={{ maxWidth: "720px", maxHeight: "90vh", overflow: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="position-relative w-100" style={{ minHeight: "240px", maxHeight: "50vh" }}>
              <Image
                src={modal.src}
                alt={modal.title}
                width={900}
                height={600}
                className="w-100 h-auto d-block"
                style={{ objectFit: "cover", maxHeight: "50vh" }}
                unoptimized
              />
            </div>
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                <h2 id="interior-modal-title" className="h5 mb-0" style={{ color: "#003b5c" }}>
                  {modal.title}
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setModal(null)}
                />
              </div>
              <p className="text-muted mb-4" style={{ lineHeight: 1.7 }}>
                {modal.description}
              </p>
              <div className="d-flex flex-wrap gap-2">
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={shareFacebook}>
                  Share on Facebook
                </button>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={shareWhatsApp}>
                  Share on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
