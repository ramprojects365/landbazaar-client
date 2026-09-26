"use client";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import {
  DEFAULT_PROPERTY_IMAGE,
  getPropertyImageItems,
  type PropertyImageDisplayItem,
} from "@/utils/propertyImages";
import PropertyVerifiedBadge from "@/components/UI/PropertyVerifiedBadge";

interface Props {
  images?: unknown[];
  verified?: boolean;
}

const fallbackItems: PropertyImageDisplayItem[] = [
  { url: DEFAULT_PROPERTY_IMAGE },
];

const getImageLabel = (image: PropertyImageDisplayItem) =>
  image.caption || image.displayPlace || "";

const getVisibleImageLabel = (image: PropertyImageDisplayItem) => {
  const label = getImageLabel(image).trim();
  if (!label || label.toLowerCase() === "other") return "";
  return label;
};

const isVideoUrl = (url?: string): boolean => {
  if (!url) return false;
  return /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(url);
};

export default function PropertyDetailsSlider({ images, verified }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [navState, setNavState] = useState({ isBeginning: true, isEnd: false });

  const imageItems = useMemo(() => {
    const list = getPropertyImageItems(images);
    return list.length > 0 ? list : fallbackItems;
  }, [images]);

  const galleryItems = imageItems;
  const extraCount = galleryItems.length > 5 ? galleryItems.length - 5 : 0;

  const modalItems = imageItems;

  const openAt = (index: number) => {
    setStartIndex(index);
    setIsOpen(true);
  };

  const sideTiles = galleryItems.slice(1, 5);

  return (
    <div className="tp-property-details-gallery">
      <div className="tp-pdg-five">
        <button
          type="button"
          className="tp-pdg-tile tp-pdg-main"
          onClick={() => openAt(0)}
          style={{ position: "relative" }}
        >
          <PropertyVerifiedBadge verified={verified} />
          {isVideoUrl(galleryItems[0].url) ? (
            <video
              className="tp-pdg-main-img"
              src={galleryItems[0].url}
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", background: "#000" }}
            />
          ) : (
            <img
              className="tp-pdg-main-img"
              src={galleryItems[0].url}
              alt={getVisibleImageLabel(galleryItems[0]) || "Land cover image"}
              fetchPriority="high"
              decoding="async"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {isVideoUrl(galleryItems[0].url) && (
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                borderRadius: "50%",
                width: 52,
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                pointerEvents: "none",
              }}
            >
              ▶
            </span>
          )}
          {getVisibleImageLabel(galleryItems[0]) ? (
            <span className="tp-pdg-label">
              {getVisibleImageLabel(galleryItems[0])}
            </span>
          ) : null}
        </button>
        <div className="tp-pdg-side">
          {sideTiles.map((item, idx) => {
              const absoluteIndex = idx + 1;
              const isLastVisible = idx === 3;
              const label = getVisibleImageLabel(item);
              const isVideo = isVideoUrl(item.url);
              return (
                <button
                  key={`${item.url}-${idx}`}
                  type="button"
                  className="tp-pdg-tile"
                  onClick={() => openAt(Math.min(absoluteIndex, galleryItems.length - 1))}
                  style={{ position: "relative" }}
                >
                  {isVideo ? (
                    <video
                      src={item.url}
                      muted
                      playsInline
                      style={{ width: "100%", height: "100%", objectFit: "cover", background: "#000" }}
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={label || `Land image ${absoluteIndex + 1}`}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  )}
                  {isVideo && (
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        borderRadius: "50%",
                        width: 38,
                        height: 38,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        pointerEvents: "none",
                      }}
                    >
                      ▶
                    </span>
                  )}
                  {label ? <span className="tp-pdg-label">{label}</span> : null}
                  {isLastVisible && extraCount > 0 && (
                    <span className="tp-pdg-more">{`+ ${extraCount} more`}</span>
                  )}
                </button>
              );
            })}
        </div>
      </div>

      {isOpen && (
        <div className="tp-pdg-modal" role="dialog" aria-modal="true">
          <button
            type="button"
            className="tp-pdg-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="tp-pdg-modal-inner">
            <Swiper
              key={startIndex}
              initialSlide={startIndex}
              slidesPerView={1}
              spaceBetween={0}
              loop={false}
              onSwiper={(instance) => {
                setSwiper(instance);
                setNavState({
                  isBeginning: instance.isBeginning,
                  isEnd: instance.isEnd,
                });
              }}
              onSlideChange={(instance) =>
                setNavState({
                  isBeginning: instance.isBeginning,
                  isEnd: instance.isEnd,
                })
              }
            >
              {modalItems.map((item, i) => {
                const label = getVisibleImageLabel(item);
                const isVideo = isVideoUrl(item.url);
                return (
                <SwiperSlide key={`${item.url}-${i}`}>
                  <div className="tp-pdg-modal-slide" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {isVideo ? (
                      <video
                        src={item.url}
                        controls
                        autoPlay
                        playsInline
                        style={{ maxWidth: "90vw", maxHeight: "80vh", borderRadius: 8, background: "#000" }}
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={label || `Land image ${i + 1}`}
                      />
                    )}
                    {label ? (
                      <div className="tp-pdg-modal-caption">
                        <span>{label}</span>
                      </div>
                    ) : null}
                  </div>
                </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <button
            type="button"
            className="tp-pdg-nav tp-pdg-prev"
            onClick={() => swiper?.slidePrev()}
            aria-label="Previous"
            disabled={modalItems.length <= 1 || navState.isBeginning}
          >
            ‹
          </button>
          <button
            type="button"
            className="tp-pdg-nav tp-pdg-next"
            onClick={() => swiper?.slideNext()}
            aria-label="Next"
            disabled={modalItems.length <= 1 || navState.isEnd}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
