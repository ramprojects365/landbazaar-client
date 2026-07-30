"use client";

import { interiorDesigners } from "@/data/interiorDesigners";
import Image from "next/image";
import Link from "next/link";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function InteriorPartnersSlider() {
  return (
    <div className="interior-partners-swiper-wrap pb-2">
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        spaceBetween={20}
        freeMode={{ enabled: true, momentum: true }}
        className="interior-partners-swiper"
        breakpoints={{
          0: { spaceBetween: 16 },
          768: { spaceBetween: 24 },
        }}
      >
        {interiorDesigners.map((d) => (
          <SwiperSlide key={d.slug} style={{ width: "auto", maxWidth: "100%" }}>
            <Link
              href={`/interior-design/${d.slug}`}
              className="text-decoration-none d-block h-100"
            >
              <article
                className="interior-partner-card h-100 d-flex flex-column"
                style={{
                  width: "min(300px, 85vw)",
                  border: "1px solid #dbe1ef",
                  borderRadius: "14px",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 6px 28px rgba(45, 46, 69, 0.07)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div className="position-relative" style={{ height: "160px" }}>
                  <Image
                    src={d.profileImage}
                    alt={d.name}
                    fill
                    sizes="300px"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-2 d-flex align-items-center gap-2"
                    style={{
                      background:
                        "linear-gradient(transparent, rgba(0,59,92,0.88))",
                    }}
                  >
                    <div
                      className="rounded-2 overflow-hidden bg-white flex-shrink-0 d-flex align-items-center justify-content-center"
                      style={{ width: 44, height: 44 }}
                    >
                      <Image
                        src={d.companyLogo}
                        alt={d.companyName}
                        width={36}
                        height={36}
                        className="object-fit-contain"
                        unoptimized
                      />
                    </div>
                    <div className="text-white min-w-0">
                      <div
                        className="fw-semibold text-truncate"
                        style={{ fontSize: "14px" }}
                      >
                        {d.companyName}
                      </div>
                      <div
                        className="small text-truncate"
                        style={{ color: "rgba(255,255,255,0.78)" }}
                      >
                        {d.name}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 flex-grow-1 d-flex flex-column">
                  <p className="small text-muted mb-2 flex-grow-1" style={{ lineHeight: 1.45 }}>
                    {d.tagline}
                  </p>
                  <div className="small" style={{ color: "#003b5c" }}>
                    <div className="text-truncate">{d.phone}</div>
                    <div className="text-truncate text-muted">{d.email}</div>
                  </div>
                  <span
                    className="tp-btn w-100 text-center mt-3 py-2"
                    style={{ fontSize: "13px" }}
                  >
                    View profile
                  </span>
                </div>
              </article>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
