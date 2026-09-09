"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const bannerImages = [
  {
    src: "/assets/img/banner/bg-1.png",
    alt: "Plots for sale in Hyderabad and Telangana",
  },
  {
    src: "/assets/img/banner/bg-2.png",
    alt: "Land for sale in Andhra Pradesh, Visakhapatnam, and Vijayawada",
  },
  {
    src: "/assets/img/banner/bg-3.png",
    alt: "HMDA plots and farm land for sale near Hyderabad",
  },
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
          key={image.src}
          className={`banner-slide ${index === currentIndex ? "active" : ""}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            priority={index === 0}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
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
      `}</style>
    </div>
  );
}
