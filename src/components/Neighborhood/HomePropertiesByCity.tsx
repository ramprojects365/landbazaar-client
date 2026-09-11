"use client";

import NavigateArrowSvg from "../SVG/NavigateArrowSvg";
import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import {
  DEFAULT_PROPERTY_IMAGE,
  getCoverImageUrl,
} from "@/utils/propertyImages";
import { resolveCityCardImage } from "@/utils/cityImages";
import React, { useEffect, useState } from "react";
import { fetchPropertiesList } from "@/services/propertiesList";
import { getPropertyDetailsPath } from "@/utils/propertySlug";
import { buildSearchHref } from "@/utils/searchUrl";

type CityItem = {
  id: string;
  name: string;
  count: number;
  image: string;
  listingImage: string;
  isDynamic: boolean;
  href?: string;
  isPropertyCard?: boolean;
};

const normaliseLocationName = (value?: string) =>
  value?.replace(/\s+/g, " ").trim();

function HomePropertiesByCity() {
  const { t } = useTranslation();
  const [cityItems, setCityItems] = useState<CityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const list = await fetchPropertiesList();
        if (!Array.isArray(list) || list.length === 0) {
          setCityItems([]);
          return;
        }

        const grouped = new Map<string, CityItem>();
        const MAX_CITY_PROPERTIES = 6;
        const MAX_VISIBLE_CITY_CARDS = 6;

        list.forEach((property, index) => {
          const name =
            normaliseLocationName(property.cityName) ||
            normaliseLocationName(property.state);
          if (!name) return;

          const key = name.toLowerCase();
          const listingImage =
            getCoverImageUrl(property.images) || DEFAULT_PROPERTY_IMAGE;
          const existing = grouped.get(key);

          if (existing) {
            if (existing.count < MAX_CITY_PROPERTIES) {
              existing.count += 1;
            }
            if (
              existing.listingImage === DEFAULT_PROPERTY_IMAGE &&
              listingImage !== DEFAULT_PROPERTY_IMAGE
            ) {
              existing.listingImage = listingImage;
              existing.image = listingImage;
            }
            return;
          }

          grouped.set(key, {
            id: `city-${key}-${index}`,
            name,
            count: 1,
            image: listingImage,
            listingImage,
            isDynamic: true,
          });
        });

        const cities = [...grouped.values()];
        await Promise.all(
          cities.map(async (item) => {
            item.image = await resolveCityCardImage(
              item.name,
              item.listingImage,
            );
          }),
        );

        if (grouped.size === 1) {
          const onlyCity = grouped.values().next().value as CityItem | undefined;
          if (!onlyCity) return;

          const hasFolderImage = onlyCity.image !== onlyCity.listingImage;

          if (!hasFolderImage) {
            const cityName = onlyCity.name;
            const singleCityProperties = list
              .filter((property) => {
                const cityValue =
                  normaliseLocationName(property.cityName) ||
                  normaliseLocationName(property.state);
                return (
                  cityValue &&
                  cityValue.toLowerCase() === cityName.toLowerCase()
                );
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
                  getCoverImageUrl(property.images) || DEFAULT_PROPERTY_IMAGE,
                listingImage:
                  getCoverImageUrl(property.images) || DEFAULT_PROPERTY_IMAGE,
                isDynamic: true,
                href: property.id
                  ? getPropertyDetailsPath(property)
                  : undefined,
                isPropertyCard: true,
              }));

            if (singleCityProperties.length > 0) {
              setCityItems(singleCityProperties);
              return;
            }
          }
        }

        const nextItems = [...grouped.values()]
          .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
          .slice(0, MAX_VISIBLE_CITY_CARDS);

        setCityItems(nextItems);
      } catch {
        setCityItems([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

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
          {loading ? (
            <div className="col-12">
              <p className="text-center text-muted mb-0">Loading...</p>
            </div>
          ) : cityItems.length === 0 ? (
            <div className="col-12">
              <p className="text-center text-muted mb-0">No data found</p>
            </div>
          ) : (
            cityItems.map((property) => (
              <div key={property.id} className="col-lg-4 col-md-6 col-6">
                {(() => {
                  const href =
                    property.href || buildSearchHref({ q: property.name });

                  return (
                    <div className="tp-explore-item text-center mb-30">
                      <Link href={href} className="tp-explore-thumb p-relative">
                        <img
                          src={property.image}
                          alt={
                            property.isPropertyCard
                              ? property.name
                              : `Plots for sale in ${property.name}`
                          }
                          loading="lazy"
                          onError={(event) => {
                            const img = event.currentTarget;
                            if (img.dataset.usedListing === "true") return;
                            img.dataset.usedListing = "true";
                            img.src =
                              property.listingImage || DEFAULT_PROPERTY_IMAGE;
                          }}
                        />
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
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default React.memo(HomePropertiesByCity);
