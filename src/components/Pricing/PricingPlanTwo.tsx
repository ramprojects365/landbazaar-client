import PricingCard from "./subComponents/PricingCard";
import { Bot, CheckCircle2, Coins, MessageCircle, RefreshCw, Sparkles } from "lucide-react";

const pricingPlans = [
    { name: "Basic Plan", price: "Free", delay: ".3s" },
    { name: "Standard Plan", price: "RM 49", delay: ".5s", active: true },
    { name: "Premium Plan", price: "RM 99", delay: ".7s" }
];


export default function PricingPlanTwo() {
    return (
        <section className="tp-pricing-ptb pricing-page-section pt-130 pb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-pricing-heading pricing-page-section__heading mb-50">
                            <span className="tp-section-title-pre">Pricing</span>
                            <h4 className="tp-section-title">Simple plans for every property journey.</h4>
                            <p>
                                Start free, upgrade when you need more visibility, and use AI
                                credits only when they help your team move faster.
                            </p>
                            <div className="pricing-page-section__badges">
                                <span>
                                    <CheckCircle2 size={15} />
                                    Free listing option
                                </span>
                                <span>
                                    <CheckCircle2 size={15} />
                                    Monthly credits included
                                </span>
                                <span>
                                    <CheckCircle2 size={15} />
                                    Cancel anytime
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={index} {...plan} />
                    ))}
                </div>

                {/* <div className="pricing-credits">
                    <div className="pricing-credits__intro">
                        <span>
                            <Coins size={16} />
                            Credits included
                        </span>
                        <h3>Only pay when you need more.</h3>
                        <p>
                            Your monthly subscription gives you access to Property La platform
                            features and includes starter credits. AI usage is pay-as-you-go
                            beyond that, so light users stay lean and active teams can scale.
                        </p>
                    </div>

                    <div className="pricing-credits__grid">
                        <div className="pricing-credits__flow">
                            <div className="pricing-credits__ai">
                                <Bot size={24} />
                                <strong>AI</strong>
                            </div>
                            <ul>
                                <li>
                                    <Sparkles size={15} />
                                    Process lead context
                                </li>
                                <li>
                                    <RefreshCw size={15} />
                                    Remember past chats
                                </li>
                                <li>
                                    <MessageCircle size={15} />
                                    Reply to enquiries
                                </li>
                                <li>
                                    <Bot size={15} />
                                    Suggest next action
                                </li>
                            </ul>
                            <div className="pricing-credits__coin">
                                <Coins size={30} />
                                <span>Credits</span>
                            </div>
                        </div>

                        <div className="pricing-credits__details">
                            <h4>About credits</h4>
                            <p>
                                When leads message you and the AI helps process or reply, the
                                conversation is measured in tokens. Credits are deducted only
                                when tokens are used.
                            </p>

                            <div className="pricing-credits__rates">
                                <div>
                                    <span>Input token</span>
                                    <strong>RM12.50 / 1 million tokens</strong>
                                </div>
                                <div>
                                    <span>Cache token</span>
                                    <strong>RM6.25 / 1 million tokens</strong>
                                </div>
                                <div>
                                    <span>Output token</span>
                                    <strong>RM50.00 / 1 million tokens</strong>
                                </div>
                            </div>

                            <p className="pricing-credits__note">
                                Average lead conversations usually use a few hundred to a few
                                thousand tokens.
                            </p>

                            <div className="pricing-credits__included">
                                <span>
                                    <Coins size={16} />
                                    Basic: FREE RM10 credit
                                </span>
                                <span>
                                    <Coins size={16} />
                                    Standard: FREE RM50 credit monthly
                                </span>
                                <span>
                                    <Coins size={16} />
                                    Premium: FREE RM100 credit monthly
                                </span>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    );
}
