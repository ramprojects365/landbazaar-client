"use client";

import neighbourhoodsData from "@/data/exploreAreaData";
import NavigateArrowSvg from "../SVG/NavigateArrowSvg";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import { getCoverImageUrl } from "@/utils/propertyImages";
import React, { useEffect, useMemo, useState } from "react";
import type { StaticImageData } from "next/image";

type ApiProperty = {
  id: string;
  cityName?: string;
  state?: string;
  streetName?: string;
  images?: unknown[];
  createdAt?: string;
  updatedAt?: string;
};

type CityItem = {
  id: string;
  name: string;
  count: number;
  image: string | StaticImageData;
  isDynamic: boolean;
};

const normaliseLocationName = (value?: string) =>
  value?.replace(/\s+/g, " ").trim();

function HomePropertiesByCity() {
  const { t } = useTranslation();
  const [cityItems, setCityItems] = useState<CityItem[]>([]);

  const fallbackItems: CityItem[] = useMemo(
    () =>
      neighbourhoodsData.slice(0, 6).map((item) => ({
        id: `fallback-${item.id}`,
        name: item.name,
        count: item.count,
        image: item.image,
        isDynamic: false,
      })),
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
        if (!Array.isArray(list) || list.length === 0) return;

        const grouped = new Map<string, CityItem>();
        list.forEach((property, index) => {
          const name =
            normaliseLocationName(property.cityName) ||
            normaliseLocationName(property.state);
          if (!name) return;

          const key = name.toLowerCase();
          const existing = grouped.get(key);
          if (existing) {
            existing.count += 1;
            if (typeof existing.image !== "string") {
              const cover = getCoverImageUrl(property.images);
              if (cover) existing.image = cover;
            }
            return;
          }

          grouped.set(key, {
            id: `city-${key}-${index}`,
            name,
            count: 1,
            image:
              getCoverImageUrl(property.images) ||
              neighbourhoodsData[index % neighbourhoodsData.length].image,
            isDynamic: true,
          });
        });

        const nextItems = [...grouped.values()]
          .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
          .slice(0, 6);

        if (nextItems.length > 0) setCityItems(nextItems);
      } catch {
        return;
      }
    };

    run();
  }, []);

  const items = cityItems.length > 0 ? cityItems : fallbackItems;

  return (
    <section
      className="tp-explore-area properties-by-city pb-100"
      style={{ paddingTop: "50px" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-explore-heading mb-55">
              <span className="tp-section-title-pre">
                {t("home.propertiesByCity")}
              </span>
              <h3 className="tp-section-title">
                {t("home.exploreNeighbourhoods")}
              </h3>
            </div>
          </div>
        </div>
        <div
          className="row wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay=".7s"
        >
          {items.map((property) => (
            <div key={property.id} className="col-lg-4 col-md-6 col-6">
              {(() => {
                const params = new URLSearchParams();
                params.set("q", property.name);
                const href = `/search?${params.toString()}`;

                return (
                  <div className="tp-explore-item text-center mb-30">
                    <div className="tp-explore-thumb p-relative">
                      <Link href={href}>
                        {typeof property.image === "string" ? (
                          <img
                            src={property.image}
                            alt={property.name}
                            loading="lazy"
                          />
                        ) : (
                          <Image
                            src={property.image}
                            alt={property.name}
                            loading="lazy"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                          />
                        )}
                      </Link>
                      <div className="tp-explore-content">
                        <h4 className="tp-explore-title">
                          <Link className="textline" href={href}>
                            {property.name}
                          </Link>
                        </h4>
                        <span>
                          {property.isDynamic
                            ? `${property.count} ${t("common.property")}`
                            : ""}
                        </span>
                      </div>
                      <div className="tp-explore-btn">
                        <Link href={href}>
                          <span>
                            <NavigateArrowSvg />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(HomePropertiesByCity);
