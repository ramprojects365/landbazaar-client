"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin } from "lucide-react";
import { developersData } from "@/data/developersData";
import { useTranslation } from "@/contexts/LanguageContext";

type TrustedDevelopersProps = {
  showViewAllLink?: boolean;
};

export default function TrustedDevelopers({
  showViewAllLink = true,
}: TrustedDevelopersProps) {
  const { t } = useTranslation();

  return (
    <section className="trusted-partners">
      <div className="container">
        <div className="trusted-partners__heading">
          <span>
            <BadgeCheck size={16} />
            Verified network
          </span>
          <h2>{t("home.trustedDevelopers")}</h2>
          <p>{t("home.meetTrustedDevelopers")}</p>
        </div>

        <div className="trusted-partners__scroll trusted-agents-scroll">
          {developersData.map((developer) => (
            <Link
              key={developer.id}
              href={`/developer/${developer.slug}`}
              className="trusted-partners__card"
            >
              <div className="trusted-partners__image trusted-partners__image--logo">
                <Image
                  src={developer.logo}
                  alt={`${developer.name} logo`}
                  width={104}
                  height={104}
                  unoptimized
                />
                {developer.verified ? (
                  <span>
                    <BadgeCheck size={15} />
                  </span>
                ) : null}
              </div>

              <div className="trusted-partners__content">
                <h3>{developer.name}</h3>
                <p>{developer.tagline}</p>
              </div>

              <div className="trusted-partners__meta">
                <span>
                  <MapPin size={14} />
                  {developer.location.split(",")[0]}
                </span>
                <span>{developer.projectsCount} projects</span>
              </div>

              <div className="trusted-partners__action">
                View profile
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        {showViewAllLink ? (
          <div className="trusted-partners__footer-link">
            <Link href="/developers">View all developers</Link>
          </div>
        ) : null}

        <style jsx>{`
          .trusted-agents-scroll::-webkit-scrollbar {
            height: 8px;
          }
          .trusted-agents-scroll::-webkit-scrollbar-track {
            background: #eef2f4;
            border-radius: 4px;
          }
          .trusted-agents-scroll::-webkit-scrollbar-thumb {
            background: #003b5c;
            border-radius: 4px;
          }
        `}</style>
      </div>
    </section>
  );
}
