"use client";
import Link from "next/link";
import { testimonial_three_data } from "@/data/testimonialData";
import AboutTestimonialItem from "./subComponents/AboutTestimonialItem";

import { Swiper, SwiperSlide } from "swiper/react";

export default function AboutTestimonial() {
  return (
    <section
      className="tp-testimonial-5-ptb pt-130 pb-140"
      style={{ backgroundColor: "#F0F4FD" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-testimonial-about-heading text-center mb-50">
              <h3 className="tp-section-title">
                Trusted by land buyers and sellers
              </h3>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="tp-testimonial-3-slide-warpper mb-60">
              <div className="tp-testimonial-3-active swiper">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={30}
                  loop={true}
                  breakpoints={{
                    "1400": { slidesPerView: 2 },
                    "1200": { slidesPerView: 2 },
                    "992": { slidesPerView: 2 },
                    "768": { slidesPerView: 1 },
                    "0": { slidesPerView: 1 },
                  }}
                >
                  {testimonial_three_data.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                      <AboutTestimonialItem {...testimonial} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="tp-testimonial-about-btn text-center">
              <span>
                Ready to buy or sell land with confidence?{" "}
                <Link href="/search">Browse verified land listings</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
