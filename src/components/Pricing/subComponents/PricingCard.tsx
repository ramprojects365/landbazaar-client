
import { CheckThreeSvg } from "@/components/SVG";
import { IPricingProps } from "@/types/custom-interface";
import Link from "next/link";

const planFeatures: Record<string, string[]> = {
    "Basic Plan": [
        "Publish a property listing",
        "Add essential property details",
        "Buyer enquiry support",
        "Standard listing visibility",
        "Agent profile link"
    ],
    "Standard Plan": [
        "Everything in Basic",
        "Better listing placement",
        "More photo visibility",
        "Lead follow-up support",
        "Monthly performance check"
    ],
    "Premium Plan": [
        "Everything in Standard",
        "Featured listing placement",
        "Priority enquiry routing",
        "Property advisor support",
        "Campaign-ready exposure"
    ],
};

export default function PricingCard({ name, price, delay, active = false }:IPricingProps) {
    const features = planFeatures[name] || planFeatures["Basic Plan"];

    return (
        <div className="col-lg-4 col-md-6">
            <div
                className={`tp-pricing-item p-relative mb-30 wow fadeInUp ${active ? "active" : ""}`}
                data-wow-duration="1s"
                data-wow-delay={delay}
            >
                <div className="tp-pricing-item-heading">
                    <span>{name}</span>
                    <h4 className="tp-pricing-item-title">{price} {price !== "Free" && <span>/month</span>}</h4>
                </div>
                <div className="tp-pricing-item-btn">
                    <Link className="tp-btn" href="/contact">
                        <span className="btn-wrap">
                            <b className="text-1">Get Started</b>
                            <b className="text-2">Get Started</b>
                        </span>
                    </Link>
                    <p>{active ? "Most popular for active agents" : "Simple and flexible"}</p>
                </div>
                <div className="tp-pricing-item-list">
                    <ul>
                        {features.map((feature, index) => (
                            <li key={index}>
                                <span><CheckThreeSvg /></span> {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
