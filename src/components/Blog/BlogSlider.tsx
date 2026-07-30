"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

interface BlogSliderProps {
  children: React.ReactNode[];
  itemsPerSlide?: number;
  gap?: number;
  className?: string;
}

export default function BlogSlider({
  children,
  itemsPerSlide = 3,
  gap = 30,
  className = "",
}: BlogSliderProps) {
  const slides = React.Children.toArray(children);

  return (
    <div className={`tp-blog-slider ${className}`}>
      <div className="tp-blog-slider-active swiper">
        <div
          className="pb-60 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay=".7s"
        >
          <Swiper
            modules={[Navigation]}
            slidesPerView={itemsPerSlide}
            spaceBetween={gap}
            loop={slides.length > itemsPerSlide + 1}
            freeMode={true}
            breakpoints={{
              1400: { slidesPerView: itemsPerSlide },
              1200: { slidesPerView: itemsPerSlide },
              768: { slidesPerView: 2 },
              576: { slidesPerView: 1 },
              0: { slidesPerView: 1 },
            }}
            navigation={{
              nextEl: ".tp-blog-slider-button-next",
              prevEl: ".tp-blog-slider-button-prev",
            }}
          >
            {slides.map((child, index) => (
              <SwiperSlide key={index}>{child}</SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="tp-blog-slider-navigation">
          <div className="tp-blog-slider-button-prev">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="tp-blog-slider-button-next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
