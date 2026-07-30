
import { AboutSvgFour, AboutSvgOne, AboutSvgThree, AboutSvgTwo } from "../SVG";
import { JSX } from "react";

interface AboutPoint {
    icon: JSX.Element;
    title: string;
}
const aboutPoints = [
    { icon: <AboutSvgOne />, title: "Verified Agents" },
    { icon: <AboutSvgTwo />, title: "Wide Coverage" },
    { icon: <AboutSvgThree />, title: "Free Listings" },
    { icon: <AboutSvgFour />, title: "Secure Platform" },
];

const AboutPointItem = ({ icon, title }:AboutPoint) => {
    const descriptions: Record<string, string> = {
        "Verified Agents": "Connect with licensed real estate negotiators verified by LPPEH Malaysia with valid REN numbers.",
        "Wide Coverage": "Search properties across Kuala Lumpur, Selangor, Penang, Johor, and nationwide.",
        "Free Listings": "Post property listings for free. No hidden fees for property owners and agents.",
        "Secure Platform": "Safe and trusted platform with verified listings and secure communication channels.",
    };

    return (
        <div className="tp-about-point-item d-flex">
            <div className="tp-about-point-item-icon">
                <span>{icon}</span>
            </div>
            <div className="tp-about-point-item-content">
                <h4 className="tp-about-point-item-title">{title}</h4>
                <p>{descriptions[title]}</p>
            </div>
        </div>
    );
};

export default function AboutPointArea() {
    return (
        <section className="tp-about-point-ptb pt-130 pb-110" style={{ backgroundColor: "#262B35" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-about-point-heading text-center mb-50">
                            <h3 className="tp-section-title">
                                How we make real estate <br /> simple for you
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
