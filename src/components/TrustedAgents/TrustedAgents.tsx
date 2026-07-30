"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Star } from "lucide-react";
import { API_BASE_URL } from "@/config/constants";
import { useTranslation } from "@/contexts/LanguageContext";

interface Agent {
  id: string;
  name: string;
  agentId: string;
  email: string;
  image: string;
  rating: number;
  properties: number;
}

interface User {
  id?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  userType?: string | null;
  profileImage?: string;
  fullName?: string;
  bio?: string;
  companyName?: string;
  designation?: string;
  experienceYears?: number;
  renNumber?: string | null;
  renStatus?: string | null;
  renVerified?: boolean;
  renStatusLabel?: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const trustedAgents: Agent[] = [
  {
    id: "1",
    name: "Fara",
    agentId: "PEA 3329",
    email: "faizzatulfarhana2020@gmail.com",
    image: "/assets/img/team/team-details/fara.jpg",
    rating: 4.9,
    properties: 120,
  },
  {
    id: "2",
    name: "MR.PUI",
    agentId: "PEA 2457",
    email: "puits888@gmail.com",
    image: "/assets/img/team/team-details/pui.jpg",
    rating: 4.7,
    properties: 95,
  },
  {
    id: "3",
    name: "Eddie",
    agentId: "REN 4234",
    email: "",
    image: "/assets/img/team/team-details/eddie.jpg",
    rating: 3.1,
    properties: 34,
  },
];

export default function TrustedAgents() {
  const [userMap, setUserMap] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUsersFromProperties = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/properties`);
        if (!res.ok) throw new Error("Failed to fetch properties");

        const data = await res.json();
        const properties = Array.isArray(data) ? data : data?.data || [];
        const usersMap: Record<string, User> = {};

        properties.forEach((property: any) => {
          if (property.user?.email) {
            usersMap[property.user.email] = property.user;
          }
        });

        setUserMap(usersMap);
      } catch (error) {
        console.error("Error fetching users from properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersFromProperties();
  }, []);

  const getAgentProfileUrl = (agent: Agent): string => {
    const userData = userMap[agent.email];

    if (!userData) {
      return `/property-agent/${agent.id}`;
    }

    const slug = userData.username || agent.name;
    const cleanSlug = slug
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const renVerified =
      userData.renVerified === true || userData.renStatus === "verified";
    const renStatusLabel =
      userData.renStatusLabel || (renVerified ? "Verified" : "Not verified");

    const userDataForUrl = {
      id: userData.id || cleanSlug,
      username: userData.username || agent.name,
      email: userData.email || agent.email,
      phoneNumber: userData.phoneNumber || "",
      userType: userData.userType || "",
      profileImage: userData.profileImage || agent.image,
      fullName: userData.fullName || userData.username || agent.name,
      designation: userData.designation || "Real Estate Agent",
      experienceYears: userData.experienceYears || 5,
      bio:
        userData.bio ||
        "Professional real estate agent specializing in Malaysian properties.",
      companyName: userData.companyName || "",
      renNumber: userData.renNumber || agent.agentId,
      renStatus: userData.renStatus || "not_verified",
      renVerified,
      renStatusLabel,
      emailVerified: userData.emailVerified ?? true,
      createdAt: userData.createdAt || new Date().toISOString(),
      updatedAt: userData.updatedAt || new Date().toISOString(),
    };

    const encodedData = btoa(encodeURIComponent(JSON.stringify(userDataForUrl)));
    return `/property-agent/${cleanSlug}?data=${encodedData}`;
  };

  if (loading) {
    return (
      <section className="trusted-partners">
        <div className="container">
          <div className="trusted-partners__loading">
            <p>Loading trusted partners...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="trusted-partners">
      <div className="container">
        <div className="trusted-partners__heading">
          <span>
            <BadgeCheck size={16} />
            Verified network
          </span>
          <h2>{t("home.trustedPartners")}</h2>
          <p>{t("home.meetPropertyConsultants")}</p>
        </div>

        <div className="trusted-partners__scroll trusted-agents-scroll">
          {trustedAgents.map((agent) => (
            <Link
              key={agent.id}
              href={getAgentProfileUrl(agent)}
              className="trusted-partners__card"
            >
              <div className="trusted-partners__image">
                <Image src={agent.image} alt={agent.name} width={104} height={104} />
                <span>
                  <BadgeCheck size={15} />
                </span>
              </div>

              <div className="trusted-partners__content">
                <h3>{agent.name}</h3>
                <p>{agent.agentId}</p>
              </div>

              <div className="trusted-partners__meta">
                <span>
                  <Star size={14} fill="currentColor" />
                  {agent.rating}
                </span>
                <span>{agent.properties} properties</span>
              </div>

              <div className="trusted-partners__action">
                View profile
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

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
