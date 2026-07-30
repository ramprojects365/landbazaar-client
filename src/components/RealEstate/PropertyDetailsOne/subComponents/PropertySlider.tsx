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

const fallbackItems: PropertyImageDisplayItem[] = fallbackImages.map((url) => ({ url }));

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

  const extraCount = imageItems.length > 5 ? imageItems.length - 5 : 0;
  const modalItems = useMemo(() => {
    if (imageItems.length >= 5) return imageItems;
    return [...imageItems, ...fallbackItems, ...fallbackItems].slice(0, 5);
  }, [imageItems]);

  const openAt = (index: number) => {
    setStartIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="tp-property-details-gallery">
      <div className="tp-pdg-five">
        <button
          type="button"
          className="tp-pdg-tile tp-pdg-main"
          onClick={() => openAt(0)}
        >
          <img src={modalItems[0].url} alt={getImageLabel(modalItems[0]) || "property-image-1"} />
          {getImageLabel(modalItems[0]) ? (
            <span className="tp-pdg-label">{getImageLabel(modalItems[0])}</span>
          ) : null}
        </button>
        <div className="tp-pdg-side">
          {modalItems.slice(1, 5).map((item, idx) => {
            const absoluteIndex = idx + 1;
            const isLastVisible = idx === 3;
            const label = getImageLabel(item);
            return (
              <button
                key={`${item.url}-${idx}`}
                type="button"
                className="tp-pdg-tile"
                onClick={() => openAt(absoluteIndex)}
              >
                <img src={item.url} alt={label || `property-image-${absoluteIndex + 1}`} />
                {label ? <span className="tp-pdg-label">{label}</span> : null}
                {isLastVisible && extraCount > 0 && (
                  <span className="tp-pdg-more">{`+ ${extraCount} more images`}</span>
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
              {modalItems.map((item, i) => (
                <SwiperSlide key={`${item.url}-${i}`}>
                  <div className="tp-pdg-modal-slide">
                    <img src={item.url} alt={getImageLabel(item) || `property-image-${i + 1}`} />
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
