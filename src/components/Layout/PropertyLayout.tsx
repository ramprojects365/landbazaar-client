"use client";
import { ReactNode, Suspense } from "react";
import PropertyFilterWidget from "./subComponents/PropertyFilterWidget";
import SidebarPropertyItem from "./subComponents/SidebarPropertyItem";
import SearchRefineBar from "@/components/RealEstate/PropertyStyleOne/SearchRefineBar";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

function SearchLayoutFallback() {
  return (
    <section className="tp-property-ptb pt-20 pb-20">
      <div className="container">
        <div className="placeholder-glow py-3">
          <span className="placeholder col-4 d-block mb-2" />
          <span className="placeholder col-6 d-block" />
        </div>
      </div>
    </section>
  );
}

function DekhoLayoutInner({ children }: { children: ReactNode }) {
  const params = useSearchParams();

  const q = params.get("q") || "";
  const type = params.get("type") || "";
  const city = params.get("city") || "";
  const address = params.get("address") || "";
  const propertyName = params.get("propertyName") || "";

  const breadcrumbLabel = propertyName || q || address || "Search";

  const subtitleParts: string[] = [];
  if (type) subtitleParts.push(type);
  if (city) subtitleParts.push(city);
  if (q) subtitleParts.push(`"${q}"`);
  const subtitle = subtitleParts.length
    ? subtitleParts.join(" · ")
    : "all locations";

  return (
    <>
      <section className="tp-property-ptb pt-20 pb-20">
        <div className="container">
          <div className="row gsrch align-items-center">
            <div className="col-12 tp-property-search-header">
              <div className="ml-list">
                <Breadcrumb
                  items={[
                    { label: "Home", href: "/" },
                    { label: breadcrumbLabel },
                  ]}
                />
              </div>
              <div className="tp-property-heading mb-10 mlb hide-mobile">
                <div className="tp-property-list">
                  <span style={{ color: "#000" }}>
                    Property search{" "}
                    {subtitle !== "all locations" && (
                      <>
                        for <span style={{ color: "#003B5C" }}>{subtitle}</span>
                      </>
                    )}
                    {subtitle === "all locations" && (
                      <span style={{ color: "#003B5C" }}>all locations</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="search-refine-shell hide-mobile">
                <SearchRefineBar />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="tp-property-list-section"
        style={{ marginTop: "-120px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3 filt hide-mobile">
              <PropertyFilterWidget />
              <SidebarPropertyItem />
            </div>
            <div className="col-lg-9 col-12 prop-det-dev">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function DekhoLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<SearchLayoutFallback />}>
      <DekhoLayoutInner>{children}</DekhoLayoutInner>
    </Suspense>
  );
}
