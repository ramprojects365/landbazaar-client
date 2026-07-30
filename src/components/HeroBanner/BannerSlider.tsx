"use client";
import React, { useState, useEffect } from "react";

const bannerImages = [
  "/assets/img/banner/bg-1.png",
  "/assets/img/banner/bg-2.jpg",
  "/assets/img/banner/bg-4.jpg",
  "/assets/img/banner/bg-4.jpg",
];

export default function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-slider">
      {bannerImages.map((image, index) => (
        <div
          key={index}
          className={`banner-slide ${index === currentIndex ? "active" : ""}`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      ))}
      <style jsx>{`
        .banner-slider {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        /* Darken photos more so white hero text stays readable */
        .banner-slider::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.65) 0%,
            rgba(0, 0, 0, 0.55) 45%,
            rgba(0, 0, 0, 0.65) 100%
          );
        }

        .banner-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }

        .banner-slide.active {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .banner-slide {
            background-position: center center !important;
          }
        }

        @media (max-width: 480px) {
          .banner-slide {
            background-position: center center !important;
            background-size: cover !important;
          }
        }
      `}</style>
    </div>
  );
}
