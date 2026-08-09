import { AboutSvgFour, AboutSvgOne, AboutSvgThree, AboutSvgTwo } from "../SVG";
import { JSX } from "react";

interface AboutPoint {
  icon: JSX.Element;
  title: string;
  description: string;
}

const aboutPoints: AboutPoint[] = [
  {
    icon: <AboutSvgOne />,
    title: "Verified Lands",
    description:
      "We review and verify listings before they are added, so you can explore trusted plots and lands with greater confidence.",
  },
  {
    icon: <AboutSvgTwo />,
    title: "All Land Types",
    description:
      "Buy or sell residential plots, agricultural lands, commercial lands, farm lands, and gated community lands in one marketplace.",
  },
  {
    icon: <AboutSvgThree />,
    title: "Easy Buy & Sell",
    description:
      "Buyers can search verified options quickly, while sellers and owners can list lands and connect with genuine enquiries.",
  },
  {
    icon: <AboutSvgFour />,
    title: "Trusted Across India",
    description:
      "LandWay is built as India’s trusted land platform — helping people find clear, verified opportunities across key cities and regions.",
  },
];

const AboutPointItem = ({ icon, title, description }: AboutPoint) => {
  return (
    <div className="tp-about-point-item d-flex">
      <div className="tp-about-point-item-icon">
        <span>{icon}</span>
      </div>
      <div className="tp-about-point-item-content">
        <h4 className="tp-about-point-item-title">{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default function AboutPointArea() {
  return (
    <section
      className="tp-about-point-ptb pt-130 pb-110"
      style={{ backgroundColor: "#262B35" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-about-point-heading text-center mb-50">
              <h3 className="tp-section-title">
                How LandWay helps you buy <br /> and sell land with confidence
              </h3>
            </div>
          </div>
          <div className="col-lg-12 gx-0">
            <div className="tp-about-point-box d-flex flex-wrap">
              {aboutPoints.map((point, index) => (
                <AboutPointItem key={index} {...point} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
