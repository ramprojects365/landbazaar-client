"use client";

import { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  Clock3,
  Mail,
  Sparkles,
  UserPlus,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PropertySingleCard from "@/components/Common/PropertySingleCard";
import { formatPrice } from "@/components/Utils/formatPrice";
import {
  getPropertyFitMatches,
  notifyPropertyFitView,
} from "@/services/propertyService";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import { getCoverImageUrl } from "@/utils/propertyImages";
import {
  ADVISOR_RESULTS_KEY,
  AdvisorAnswers,
  AdvisorContact,
  getMatchReason,
} from "./advisor-utils";
import "./property-fit-results.scss";

type StoredAdvisorResults = {
  answers: AdvisorAnswers;
  contact: AdvisorContact;
  autoRegisterReady?: boolean;
  defaultPassword?: string;
  createdAt?: string;
};

type PropertyFitMatchResponse = {
  data?: ApiProperty[];
  autoRegistered?: boolean;
  autoLoggedIn?: boolean;
  fallbackUsed?: boolean;
  agentNotificationCount?: number;
  existingEmailIgnored?: boolean;
  defaultPassword?: string;
  auth?: {
    token?: string;
    user?: {
      username?: string;
      email?: string;
      fullName?: string;
    };
  } | null;
};

type ApiProperty = {
  id: string;
  title: string;
  description?: string;
  listingType?: string;
  propertyType?: string;
  propertyName?: string;
  streetName?: string;
  cityName?: string;
  state?: string;
  price?: number | string;
  buildupArea?: number | string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  images?: unknown[];
  user?: {
    id?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    profileImage?: string;
    fullName?: string | null;
    bio?: string | null;
    companyName?: string | null;
    designation?: string | null;
    experienceYears?: number | null;
    emailVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
};

const mapApiProperty = (
  item: ApiProperty,
  index: number,
): IFeaturedPropertyDT => {
  const image =
    getCoverImageUrl(item.images) ||
    "/assets/img/rent/property/property-details-thumb-1.png";
  const area = parseFloat(String(item.buildupArea ?? 0));
  const address = [
    item.propertyName,
    item.streetName,
    item.cityName,
    item.state,
  ]
    .filter(Boolean)
    .join(", ");

  return {
    id: item.id,
    title: item.propertyName || item.title || "Property",
    address: address || "Address not available",
    linkUrl: "property-details",
    image,
    showTags: true,
    isForRent: item.listingType === "rent",
    isForSale: item.listingType === "sale",
    bedrooms: String(item.bedrooms ?? "0"),
    bathrooms: String(item.bathrooms ?? "0"),
    livingArea: area > 0 ? `${area.toLocaleString()} Sq Ft` : "N/A",
    price: parseFloat(String(item.price ?? 0)) || 0,
    description: item.description,
    quantity: 0,
    spacing: true,
    userImage: item.user?.profileImage || undefined,
    userName: item.user?.fullName || item.user?.username,
    userRole: item.user?.companyName || item.user?.designation || (item.user?.email ? "Assigned agent" : undefined),
    user: item.user,
  };
};

const formatBriefValue = (value?: string): string => {
  if (!value) return "Not set";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default function PropertyFitResults() {
  const [storedResults, setStoredResults] =
    useState<StoredAdvisorResults | null>(null);
  const [properties, setProperties] = useState<IFeaturedPropertyDT[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [apiUsed, setApiUsed] = useState(false);
  const [autoRegistered, setAutoRegistered] = useState(false);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [agentNotificationCount, setAgentNotificationCount] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem(ADVISOR_RESULTS_KEY);
    if (!saved) {
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as StoredAdvisorResults;
      setStoredResults(parsed);
    } catch {
      window.localStorage.removeItem(ADVISOR_RESULTS_KEY);
      setLoading(false);
    }
  }, []);

  const matchReason = storedResults
    ? getMatchReason(storedResults.answers)
    : "Recommended property fit";

  useEffect(() => {
    if (!storedResults) return;

    let active = true;

    const loadMatches = async () => {
      setLoading(true);
      setStatusMessage("");

      try {
        const response = (await getPropertyFitMatches(
          storedResults.answers,
          storedResults.contact,
        )) as PropertyFitMatchResponse;
        const data = Array.isArray(response?.data) ? response.data : [];
        const mapped = data.map(mapApiProperty);
        const notifiedAgents = response?.agentNotificationCount ?? 0;

        if (!active) return;

        setProperties(mapped);
        setApiUsed(true);
        setAutoRegistered(Boolean(response?.autoRegistered));
        setFallbackUsed(Boolean(response?.fallbackUsed));
        setAgentNotificationCount(notifiedAgents);
        if (response?.auth?.token && response?.auth?.user) {
          const user = response.auth.user;
          window.localStorage.setItem("authToken", response.auth.token);
          window.localStorage.setItem(
            "loginUser",
            user.username || user.email || "",
          );
          window.localStorage.setItem(
            "loginUserDisplayName",
            user.fullName || user.username || user.email || "",
          );
        }
        setStatusMessage(
          mapped.length
            ? response?.fallbackUsed
              ? "No exact match yet. Our agent will reach out with better options."
              : response?.autoLoggedIn
                ? `Your search is saved. We notified ${notifiedAgents} matching agent${notifiedAgents === 1 ? "" : "s"}.`
                : response?.existingEmailIgnored
                  ? `That email already exists, so we skipped account setup and notified ${notifiedAgents} matching agent${notifiedAgents === 1 ? "" : "s"}.`
                  : `We notified ${notifiedAgents} matching agent${notifiedAgents === 1 ? "" : "s"} for this brief.`
            : "No exact match yet. Our agent will reach out with better options.",
        );
      } catch (error) {
        console.error("Property fit match error:", error);
        if (!active) return;
        setProperties([]);
        setApiUsed(false);
        setFallbackUsed(false);
        setStatusMessage(
          "We could not reach the property database. Our agent will connect shortly.",
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    loadMatches();

    return () => {
      active = false;
    };
  }, [storedResults]);

  const handlePropertyView = async (
    property: IFeaturedPropertyDT,
    event?: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    if (event?.currentTarget.tagName === "BUTTON") {
      event.preventDefault();
    }

    if (!storedResults || !apiUsed) {
      setStatusMessage(
        "View captured locally. Agent notification will run once backend is connected.",
      );
      return;
    }

    try {
      await notifyPropertyFitView({
        propertyId: property.id,
        contact: storedResults.contact,
        propertyUrl: `${window.location.origin}/property-details/${property.id}`,
      });
      setStatusMessage(`Agent notification sent for ${property.title}.`);
    } catch (error) {
      console.error("Property view notification error:", error);
      setStatusMessage(
        "Could not notify the agent yet, but the property view was captured.",
      );
    }
  };

  const contactReady = Boolean(
    storedResults?.contact.phone || storedResults?.contact.email,
  );

  return (
    <main className="property-fit-page">
      <section className="property-fit-page__hero">
        <div className="container">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Property Fit" }]}
          />
          <div className="property-fit-page__hero-copy">
            <span>
              <Sparkles size={16} />
              Smart match
            </span>
            <h1>These homes match your search.</h1>
          </div>
        </div>
      </section>

      <section className="property-fit-page__content">
        <div className="container">
          {!storedResults && (
            <div className="property-fit-page__empty">
              <Clock3 size={32} />
              <h2>No advisor answers yet</h2>
              <p>
                Complete the property advisor first so we can match properties.
              </p>
              <Link href="/property-advisor">Open property advisor</Link>
            </div>
          )}

          {storedResults && (
            <>
              {/*
              <div className="property-fit-page__handoff">
                <div>
                  <UserPlus size={19} />
                  <span>
                    Auto register
                    <strong>
                      {contactReady
                        ? autoRegistered
                          ? "Search saved with a simple login"
                          : "Contact added"
                        : "Skipped"}
                    </strong>
                  </span>
                </div>
                <div>
                  <Mail size={19} />
                  <span>
                    Login password
                    <strong>
                      {storedResults.defaultPassword || "Only shown when a new login is created"}
                    </strong>
                  </span>
                </div>
                <div>
                  <Bell size={19} />
                  <span>
                    Agent notice
                    <strong>
                      {agentNotificationCount > 0
                        ? `Sent to ${agentNotificationCount} matching agent${agentNotificationCount === 1 ? "" : "s"}`
                        : "Ready when matches are found"}
                    </strong>
                  </span>
                </div>
              </div>
              */}

              {/*
              {statusMessage && (
                <div className="property-fit-page__notice">
                  <CheckCircle2 size={18} />
                  {statusMessage}
                </div>
              )}
              */}

              <div className="property-fit-page__heading">
                <span>
                  <Sparkles size={15} />
                  {properties.length === 0
                    ? "Search received"
                    : fallbackUsed
                      ? "Closest options"
                      : apiUsed
                        ? "Best fit"
                        : "Finding options"}
                </span>
                <h2>
                  {properties.length === 0
                    ? "We are checking for you"
                    : fallbackUsed
                      ? `${properties.length} options to explore`
                      : `${properties.length} good ${properties.length === 1 ? "option" : "options"}`}
                </h2>
                {/* <p>
                  {fallbackUsed
                    ? "Your selected criteria did not return an exact match, so we are showing our available projects while an agent prepares better options."
                    : matchReason}
                </p> */}
              </div>

              {loading && (
                <div className="property-fit-page__empty">
                  <Clock3 size={32} />
                  <h2>Finding properties</h2>
                  <p>Loading matching properties from the database.</p>
                </div>
              )}

              {!loading && properties.length === 0 && (
                <div className="property-fit-page__empty property-fit-page__empty--dark">
                  <Clock3 size={32} />
                  <h2>No exact match right now</h2>
                  <p>We will notify you when a suitable option is available.</p>
                </div>
              )}

              {!loading && properties.length > 0 && (
                <>
                  <div className="row list-img-sec property-fit-page__results-grid">
                    {properties.map((item) => (
                      <div
                        className="col-xl-6 col-lg-6 col-sm-12"
                        key={item.id}
                      >
                        <div className="property-fit-page__result-card">
                          <div className="property-fit-page__reason">
                            <Sparkles size={20} />
                            {fallbackUsed ? "Available project" : matchReason}
                          </div>
                          <button
                            type="button"
                            className="property-fit-page__view-signal"
                            onClick={(event) => handlePropertyView(item, event)}
                          >
                            Mark viewed and notify agent
                          </button>
                          <div onClick={() => handlePropertyView(item)}>
                            <PropertySingleCard item={item} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="property-fit-page__brief property-fit-page__brief--bottom">
                    <p>Search brief</p>
                    <span>
                      Goal{" "}
                      <strong>
                        {formatBriefValue(storedResults?.answers.intent)}
                      </strong>
                    </span>
                    <span>
                      Location{" "}
                      <strong>
                        {storedResults?.answers.location || "Not set"}
                      </strong>
                    </span>
                    <span>
                      Budget{" "}
                      <strong>
                        {storedResults?.answers.budgetAmount
                          ? formatPrice(
                              Number(storedResults.answers.budgetAmount),
                              false,
                            )
                          : storedResults?.answers.budgetRange || "Not set"}
                      </strong>
                    </span>
                    <span>
                      Rooms{" "}
                      <strong>
                        {storedResults?.answers.bedrooms || "Not set"}
                      </strong>
                    </span>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
