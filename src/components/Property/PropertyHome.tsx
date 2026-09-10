"use client";
import PropertySingleCardTwo from "../Common/PropertySingleCardTwo";
import React, { useEffect, useState } from "react";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import { useTranslation } from "@/contexts/LanguageContext";
import { mapApiPropertyToCard } from "@/utils/mapApiProperty";
import { fetchPropertiesList } from "@/services/propertiesList";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { shuffleArray } from "@/utils/shuffleArray";

export default function PropertyHome() {
  const [items, setItems] = useState<IFeaturedPropertyDT[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const run = async () => {
      try {
        const list = await fetchPropertiesList();
        if (list.length === 0) {
          setItems([]);
          return;
        }

        const randomized = shuffleArray(list);
        const top = randomized.slice(0, 8);
        setItems(top.map((property) => mapApiPropertyToCard(property)));
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <section className="tp-rent-area p-relative pt-80 pb-10">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-rent-heading text-center mb-50">
              <span className="tp-section-title-pre">
                {t("home.featuredListings")}
              </span>
              <h3 className="tp-section-title">
                {t("home.propertyForSellAndRent")}
              </h3>
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
                {loading ? (
                  <p className="text-center text-muted mb-0">Loading...</p>
                ) : items.length === 0 ? (
                  <p className="text-center text-muted mb-0">No data found</p>
                ) : (
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
                    {items.map((item) => (
                      <SwiperSlide key={String(item.id)}>
                        <PropertySingleCardTwo item={item} showFavorite />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
              {items.length > 0 ? (
                <div className="tp-rent-slider-dot"></div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
