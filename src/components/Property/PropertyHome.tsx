"use client";
import PropertySingleCardTwo from "../Common/PropertySingleCardTwo";
import { propertyData } from "@/data/propertyData";
import React, { useEffect, useMemo, useState } from "react";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import { StaticImageData } from "next/image";
import { useTranslation } from "@/contexts/LanguageContext";
import { mapApiPropertyToCard } from "@/utils/mapApiProperty";

// Import Swiper components and Pagination module
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

type ApiProperty = {
  id: string;
  title?: string;
  propertyName?: string;
  listingType?: string;
  propertyType?: string;
  streetName?: string;
  cityName?: string;
  state?: string;
  price?: number | string;
  totalPrice?: number | string;
  landSize?: number | string;
  areaUnit?: string;
  buildupArea?: number | string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  images?: unknown[];
  createdAt?: string;
  updatedAt?: string;
  contactPersonName?: string;
  user?: {
    id?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    profileImage?: string;
    fullName?: string | null;
    bio?: string | null;
    companyName?: string | null;
    designation?: string | null;
    experienceYears?: number | null;
    emailVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
};

export default function PropertyHome() {
  const [items, setItems] = useState<IFeaturedPropertyDT[]>([]);
  const { t } = useTranslation();

  const localImagePool: StaticImageData[] = useMemo(
    () =>
      propertyData
        .filter((p) => p.image)
        .map((p) => p.image as StaticImageData)
        .slice(0, 20),
    [],
  );

  useEffect(() => {
    const run = async () => {
      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_BASE ?? "http://159.223.92.101:3008";
        const res = await fetch(`${API_BASE}/api/properties`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return;
        const json = await res.json();
        const list: ApiProperty[] = json?.data ?? json ?? [];

        const sorted = [...list].sort((a, b) => {
          const aTime = new Date(a.createdAt || a.updatedAt || 0).getTime();
          const bTime = new Date(b.createdAt || b.updatedAt || 0).getTime();
          if (
            !Number.isNaN(aTime) &&
            !Number.isNaN(bTime) &&
            (aTime || bTime)
          ) {
            return bTime - aTime;
          }
          return 0;
        });

        const top = sorted.slice(0, 8);
        const mapped: IFeaturedPropertyDT[] = top.map((p, idx) =>
          mapApiPropertyToCard(p, localImagePool[idx % localImagePool.length]),
        );

        setItems(mapped);
      } catch {
        setItems([]);
      }
    };
    run();
  }, [localImagePool]);

  return (
    <section className="tp-rent-area p-relative pt-80 pb-10">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-rent-heading text-center mb-50">
              <span className="tp-section-title-pre">{t("home.featuredListings")}</span>
              <h3 className="tp-section-title">{t("home.propertyForSellAndRent")}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="container container-1600">
        <div className="row">
          <div className="tp-rent-slider">
            <div className="tp-rent-slider-active pb-rent-slider swiper">
              <div
                className="pb-60 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".7s"
              >
                <Swiper
                  modules={[Pagination]}
                  slidesPerView={2}
                  spaceBetween={30}
                  loop={items.length > 4}
                  freeMode={true}
                  breakpoints={{
                    1400: { slidesPerView: 4 },
                    1200: { slidesPerView: 3 },
                    768: { slidesPerView: 2 },
                    576: { slidesPerView: 1 },
                    0: { slidesPerView: 1 },
                  }}
                  pagination={{
                    el: ".tp-rent-slider-dot",
                    clickable: true,
                  }}
                >
                  {(items.length > 0 ? items : propertyData.slice(0, 5)).map(
                    (item) => (
                      <SwiperSlide key={String(item.id)}>
                        <PropertySingleCardTwo item={item} />
                      </SwiperSlide>
                    ),
                  )}
                </Swiper>
              </div>
              <div className="tp-rent-slider-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
