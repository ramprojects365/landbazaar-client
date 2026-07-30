import InteriorPartnersSlider from "@/components/InteriorDesign/InteriorPartnersSlider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interior Design Partners Malaysia | PropertyLa",
  description:
    "Meet trusted interior designers and studios in Malaysia. Browse partner profiles, portfolios, and contact teams for residential and commercial fit-outs.",
};

export default function InteriorDesignPage() {
  return (
    <>
      <section className="pt-80 pb-120">
        <div className="container">
          <div className="text-center mb-50">
            <span className="tp-section-title-pre">Partners</span>
            <h2 className="tp-section-title">Our trusted interior partners</h2>
            <p
              className="text-muted mx-auto mb-0"
              style={{ maxWidth: "620px" }}
            >
              Scroll sideways to explore designers. Each card opens a dedicated
              profile with portfolio imagery, service highlights, and quick
              share options.
            </p>
          </div>
          <InteriorPartnersSlider />
        </div>
      </section>
    </>
  );
}
