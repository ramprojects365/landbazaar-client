import { Metadata } from "next";
import Link from "next/link";
import "./dekholand-score.scss";

const pageTitle = "DekhoLand Score";
const pageDescription =
  "DekhoLand Score is a 100-point comparison system that helps buyers compare lands and plots by documents, location, growth, price value, and infrastructure.";

export const metadata: Metadata = {
  title: {
    absolute: `${pageTitle} | DekhoLand`,
  },
  description: pageDescription,
  keywords:
    "DekhoLand Score, compare plots, land score, documents and verification, location and connectivity, growth potential, price value, road and infrastructure",
  metadataBase: new URL("https://www.dekholand.com"),
  alternates: {
    canonical: "/dekholand-score",
  },
  openGraph: {
    title: `${pageTitle} | DekhoLand`,
    description: pageDescription,
    url: "https://www.dekholand.com/dekholand-score",
    siteName: "DekhoLand",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | DekhoLand`,
    description: pageDescription,
  },
};

const factors = [
  {
    title: "Documents & Verification",
    points: 30,
    intro:
      "This is the highest-weighted factor in the DekhoLand Score. It considers the availability and clarity of important property-related information and documents.",
    items: [
      "Ownership / title information",
      "Link documents",
      "Encumbrance-related information",
      "Survey details",
      "Layout information",
      "Applicable approvals such as HMDA, DTCP, APCRDA, VMRDA, RERA, and others",
      "Availability of supporting property documents",
      "Verification status available on DekhoLand",
    ],
    why: "Land transactions can involve several legal and ownership documents. Clearer and more complete documentation helps buyers carry out due diligence.",
  },
  {
    title: "Location & Connectivity",
    points: 20,
    intro:
      "A useful property is not only the land itself. Its location and how easily people can reach it also matter.",
    items: [
      "Distance from major roads or highways",
      "Connectivity to nearby cities",
      "Distance from schools, hospitals, and commercial areas",
      "Access to public transportation",
      "Proximity to employment hubs",
      "Nearby residential development",
      "Access to airports, railway stations, or major transport corridors",
    ],
    why: "Better connectivity can make a property more convenient to use and more attractive to future buyers.",
  },
  {
    title: "Growth Potential",
    points: 20,
    intro: "This factor looks at the development potential of the surrounding area.",
    items: [
      "Upcoming infrastructure projects",
      "New highways or ring roads",
      "Proposed government development",
      "Nearby residential projects",
      "Commercial or industrial development",
      "Growth corridors",
      "Future connectivity improvements",
      "Development activity around the location",
    ],
    why: "Areas with improving infrastructure and active development may offer stronger long-term potential than places where development is limited.",
  },
  {
    title: "Price Value",
    points: 15,
    intro:
      "Price alone does not show whether a property offers good value. This component compares the asking price with the property's context.",
    items: [
      "Nearby property prices",
      "Similar plots in the same locality",
      "Plot size",
      "Location",
      "Approvals",
      "Connectivity",
      "Available infrastructure",
    ],
    why: "This helps buyers see whether a property looks reasonably placed next to similar options in the market.",
  },
  {
    title: "Road & Infrastructure",
    points: 15,
    intro: "This category looks at the infrastructure available around the property.",
    items: [
      "Approach road",
      "Road width",
      "Internal roads",
      "Electricity availability",
      "Water availability",
      "Drainage",
      "Street lighting",
      "Nearby development",
      "Basic amenities",
      "Layout infrastructure",
    ],
    why: "Good road access and basic infrastructure can change how usable and accessible a land or plot is.",
  },
];

const weights = [
  ["Documents & Verification", "30 points"],
  ["Location & Connectivity", "20 points"],
  ["Growth Potential", "20 points"],
  ["Price Value", "15 points"],
  ["Road & Infrastructure", "15 points"],
  ["Total", "100 points"],
];

const exampleRows = [
  ["Documents & Verification", "27", "30"],
  ["Location & Connectivity", "17", "20"],
  ["Growth Potential", "18", "20"],
  ["Price Value", "12", "15"],
  ["Road & Infrastructure", "13", "15"],
  ["DekhoLand Score", "87", "100"],
];

const exampleBars = [
  { label: "Documents", score: "27/30", width: "90%" },
  { label: "Connectivity", score: "17/20", width: "85%" },
  { label: "Growth", score: "18/20", width: "90%" },
  { label: "Price Value", score: "12/15", width: "80%" },
  { label: "Infrastructure", score: "13/15", width: "87%" },
];

const buyerHelps = [
  "Compare multiple properties faster",
  "Understand the strengths of each property",
  "Identify areas that may need a closer look",
  "Compare documentation and approvals",
  "Compare location and connectivity",
  "Understand relative price value",
  "Evaluate infrastructure",
  "Create a shortlist before visiting properties",
];

const notMeanings = [
  "A legal certificate",
  "A guarantee of clear title",
  "A guarantee of government approval",
  "A guarantee of loan eligibility",
  "A guarantee of future price appreciation",
  "Investment advice",
  "A replacement for independent legal verification",
];

export default function DekhoLandScorePage() {
  return (
    <main className="score-page">
      <section className="score-page__hero">
        <div className="container">
          <p className="score-page__eyebrow">DekhoLand Score</p>
          <h1>Compare Lands & Plots with More Confidence</h1>
          <p className="score-page__lead">
            Buying land is not only about price or location. Documents, connectivity,
            future growth, road access, and infrastructure can all affect the quality
            of a property.
          </p>
          <p className="score-page__lead">
            DekhoLand Score is a simple 100-point comparison system that helps buyers
            understand and compare lands and plots across several important factors.
          </p>
          <p className="score-page__tagline">
            One simple score to help you compare properties more easily.
          </p>
        </div>
      </section>

      <section className="score-page__section">
        <div className="container">
          <h2>What is DekhoLand Score?</h2>
          <p>
            DekhoLand Score is a score out of 100 given to a property based on factors
            that matter when you look at land or plots. Instead of judging a property
            only by price, you can compare it on:
          </p>
          <ul className="score-page__chips">
            <li>Documents & Verification</li>
            <li>Location & Connectivity</li>
            <li>Growth Potential</li>
            <li>Price Value</li>
            <li>Road & Infrastructure</li>
          </ul>
          <p>
            A higher score means the property performed better across the factors
            included in DekhoLand Score.
          </p>
        </div>
      </section>

      <section className="score-page__section">
        <div className="container">
          <h2>How is DekhoLand Score calculated?</h2>
          <p>
            The total score is 100 points. Each property is reviewed in these
            categories, and the individual scores are added together.
          </p>
          <div className="score-table" role="table" aria-label="DekhoLand Score weights">
            <div className="score-table__row score-table__head" role="row">
              <span role="columnheader">Factor</span>
              <span role="columnheader">Maximum score</span>
            </div>
            {weights.map(([factor, points]) => (
              <div
                className={`score-table__row${factor === "Total" ? " score-table__total" : ""}`}
                role="row"
                key={factor}
              >
                <span role="cell">{factor}</span>
                <span role="cell">{points}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="score-page__section">
        <div className="container score-page__factors">
          {factors.map((factor, index) => (
            <article className="score-page__card" key={factor.title}>
              <div className="score-page__card-top">
                <h3>
                  {index + 1}. {factor.title}
                </h3>
                <span className="score-page__points">{factor.points} points</span>
              </div>
              <p>{factor.intro}</p>
              <ul>
                {factor.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="score-page__why">
                <strong>Why it matters. </strong>
                {factor.why}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="score-page__section">
        <div className="container">
          <h2>Example DekhoLand Score</h2>
          <p>Imagine a property receives these scores:</p>
          <div className="score-table" role="table" aria-label="Example DekhoLand Score">
            <div className="score-table__row score-table__head" role="row">
              <span role="columnheader">Factor</span>
              <span role="columnheader">Score</span>
            </div>
            {exampleRows.map(([factor, score, max]) => (
              <div
                className={`score-table__row${factor === "DekhoLand Score" ? " score-table__total" : ""}`}
                role="row"
                key={factor}
              >
                <span role="cell">{factor}</span>
                <span role="cell">
                  {score} / {max}
                </span>
              </div>
            ))}
          </div>
          <p>
            The calculation is 27 + 17 + 18 + 12 + 13 = 87. The property receives a
            DekhoLand Score of 87/100.
          </p>
          <div className="score-example">
            <div>
              <div className="score-example__total">
                <strong>87</strong>
                <span>/ 100</span>
              </div>
              <p className="score-example__label">DekhoLand Score</p>
            </div>
            <ul className="score-bars">
              {exampleBars.map((bar) => (
                <li key={bar.label}>
                  <div className="score-bars__meta">
                    <span>{bar.label}</span>
                    <span>{bar.score}</span>
                  </div>
                  <div className="score-bars__track" aria-hidden="true">
                    <span style={{ width: bar.width }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p>
            The breakdown matters because buyers should see why a property received
            its score, not only the final number.
          </p>
        </div>
      </section>

      <section className="score-page__section">
        <div className="container">
          <h2>Why should buyers check the DekhoLand Score?</h2>
          <p>
            Comparing properties usually means checking many details. DekhoLand Score
            brings the main comparison factors into one place. It can help buyers:
          </p>
          <ul className="score-page__checks">
            {buyerHelps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="score-page__compare" aria-label="Example property scores">
            <span>Property A — 87/100</span>
            <span>Property B — 76/100</span>
            <span>Property C — 82/100</span>
          </div>
          <p>
            Instead of comparing only the asking price, a buyer can open the score
            and see where each property is stronger or weaker.
          </p>
        </div>
      </section>

      <section className="score-page__section">
        <div className="container">
          <div className="score-page__note">
            <h2>What DekhoLand Score does not mean</h2>
            <p>
              DekhoLand Score is a comparison and decision-support tool. It should
              not be treated as:
            </p>
            <ul>
              {notMeanings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Buyers should still independently verify ownership, title documents,
              encumbrance certificate, survey records, approvals, boundaries, and
              other property information before making a purchase.
            </p>
          </div>
        </div>
      </section>

      <section className="score-page__section">
        <div className="container">
          <div className="score-page__close">
            <h2>Compare before you decide</h2>
            <p>Don&apos;t compare land only by price. Compare the complete picture.</p>
            <p>Documents. Location. Growth. Price. Infrastructure.</p>
            <p>Check the DekhoLand Score before you shortlist your next property.</p>
            <p>Search. Compare. Decide better.</p>
            <p className="score-page__telugu">Land కొనేముందు… DekhoLand!</p>
            <div className="score-page__actions">
              <Link href="/search">Search properties</Link>
              <Link href="/faq">Read FAQs</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
