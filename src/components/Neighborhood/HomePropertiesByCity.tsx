"use client";

import neighbourhoodsData from "@/data/exploreAreaData";
import NavigateArrowSvg from "../SVG/NavigateArrowSvg";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import { getCoverImageUrl } from "@/utils/propertyImages";
import React, { useEffect, useMemo, useState } from "react";
import type { StaticImageData } from "next/image";
import { fetchPropertiesList } from "@/services/propertiesList";

type ApiProperty = {
  id: string;
  title?: string;
  propertyName?: string;
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
  href?: string;
  isPropertyCard?: boolean;
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
        const list = await fetchPropertiesList();
        if (!Array.isArray(list) || list.length === 0) return;

        const grouped = new Map<string, CityItem>();
        const MAX_CITY_PROPERTIES = 6;
        const MAX_VISIBLE_CITY_CARDS = 6;

        list.forEach((property, index) => {
          const name =
            normaliseLocationName(property.cityName) ||
            normaliseLocationName(property.state);
          if (!name) return;

          const key = name.toLowerCase();
          const existing = grouped.get(key);

          if (existing) {
            if (existing.count < MAX_CITY_PROPERTIES) {
              existing.count += 1;
            }
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

        if (grouped.size === 1) {
          const onlyCity = grouped.values().next().value as CityItem | undefined;
          if (!onlyCity) return;

          const cityName = onlyCity.name;
          const singleCityProperties = list
            .filter((property) => {
              const cityValue =
                normaliseLocationName(property.cityName) ||
                normaliseLocationName(property.state);
              return cityValue && cityValue.toLowerCase() === cityName.toLowerCase();
            })
            .slice(0, MAX_CITY_PROPERTIES)
            .map((property, index) => ({
              id: `property-${String(property.id ?? index)}-${cityName}`,
              name:
                normaliseLocationName(property.propertyName) ||
                normaliseLocationName(property.title) ||
                cityName,
              count: 1,
              image:
                getCoverImageUrl(property.images) ||
                neighbourhoodsData[index % neighbourhoodsData.length].image,
              isDynamic: true,
              href: property.id ? `/property-details/${property.id}` : undefined,
              isPropertyCard: true,
            }));

          if (singleCityProperties.length > 0) {
            setCityItems(singleCityProperties);
            return;
          }
        }

        const nextItems = [...grouped.values()]
          .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
          .slice(0, MAX_VISIBLE_CITY_CARDS);

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
                const href = property.href || `/search?${params.toString()}`;

                return (
                  <div className="tp-explore-item text-center mb-30">
                    <Link href={href} className="tp-explore-thumb p-relative">
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
                      <div className="tp-explore-content">
                        <h4 className="tp-explore-title">
                          <span className="textline">{property.name}</span>
                        </h4>
                        <span>
                          {property.isPropertyCard
                            ? ""
                            : property.isDynamic
                              ? `${property.count} ${t("common.property")}`
                              : ""}
                        </span>
                      </div>
                      <div className="tp-explore-btn">
                        <span>
                          <NavigateArrowSvg />
                        </span>
                      </div>
                    </Link>
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
