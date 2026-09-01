"use client";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import {
  getPropertyImageItems,
  type PropertyImageDisplayItem,
} from "@/utils/propertyImages";

const fallbackImages = [
  "/assets/img/property/property-details/property-thumb-1.jpg",
  "/assets/img/property/property-details/property-thumb-2.jpg",
  "/assets/img/property/property-details/property-thumb-3.jpg",
];

interface Props {
  images?: unknown[];
}

const fallbackItems: PropertyImageDisplayItem[] = fallbackImages.map((url) => ({
  url,
}));

const getImageLabel = (image: PropertyImageDisplayItem) =>
  image.caption || image.displayPlace || "";

export default function PropertyDetailsSlider({ images }: Props) {
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

  const modalItems = useMemo(() => {
    const apiItems = getPropertyImageItems(images);
    if (apiItems.length > 0) return apiItems;
    return [...fallbackItems, ...fallbackItems].slice(0, 5);
  }, [images]);

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
        >
          <img
            className="tp-pdg-main-img"
            src={galleryItems[0].url}
            alt={getImageLabel(galleryItems[0]) || "Land cover image"}
            fetchPriority="high"
            decoding="async"
            style={{ width: "100%", height: "100%" }}
          />
          {getImageLabel(galleryItems[0]) ? (
            <span className="tp-pdg-label">{getImageLabel(galleryItems[0])}</span>
          ) : (
            <span className="tp-pdg-label">Cover</span>
          )}
        </button>
        <div className="tp-pdg-side">
          {(sideTiles.length > 0 ? sideTiles : fallbackItems.slice(0, 4)).map(
            (item, idx) => {
              const absoluteIndex = idx + 1;
              const isLastVisible = idx === 3;
              const label = getImageLabel(item);
              return (
                <button
                  key={`${item.url}-${idx}`}
                  type="button"
                  className="tp-pdg-tile"
                  onClick={() => openAt(Math.min(absoluteIndex, galleryItems.length - 1))}
                >
                  <img
                    src={item.url}
                    alt={label || `Land image ${absoluteIndex + 1}`}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {label ? <span className="tp-pdg-label">{label}</span> : null}
                  {isLastVisible && extraCount > 0 && (
                    <span className="tp-pdg-more">{`+ ${extraCount} more`}</span>
                  )}
                </button>
              );
            },
          )}
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
              {modalItems.map((item, i) => (
                <SwiperSlide key={`${item.url}-${i}`}>
                  <div className="tp-pdg-modal-slide">
                    <img
                      src={item.url}
                      alt={getImageLabel(item) || `Land image ${i + 1}`}
                    />
                    {getImageLabel(item) ? (
                      <div className="tp-pdg-modal-caption">
                        <span>{getImageLabel(item)}</span>
                      </div>
                    ) : null}
                  </div>
                </SwiperSlide>
              ))}
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
