import aboutIcon1 from "../../../public/assets/img/testimonial/star_icon.png";
import aboutIcon2 from "../../../public/assets/img/testimonial/star_icon.png";
import Image from "next/image";

export default function ReusableAboutArea() {
  return (
    <section className="tp-about-5-ptb fix pt-130 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="tp-about-5-wrapper wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <div className="tp-about-5-heading mb-50">
                <span className="tp-section-title-pre">About LandWay</span>
                <h3 className="tp-section-title">
                  India&apos;s Trusted Platform to Buy &amp; Sell Lands and Plots
                </h3>
                <p className="mt-20" style={{ color: "#5c6f7b", fontSize: "16px", lineHeight: 1.7 }}>
                  LandWay is built for people who want a clear, reliable way to
                  buy and sell land across India. Whether you are looking for a
                  residential plot, agricultural land, commercial land, farm
                  land, or a gated community plot, you can discover verified
                  opportunities in one place — and sellers can reach serious
                  buyers faster.
                </p>
                <p className="mt-15" style={{ color: "#5c6f7b", fontSize: "16px", lineHeight: 1.7 }}>
                  We carefully verify listings before they go live, so buyers can
                  explore with more confidence and sellers can showcase land with
                  greater trust. From open plots near growing city corridors to
                  farmland and commercial parcels, LandWay helps you take the
                  next step in your land journey.
                </p>
              </div>
              <div className="tp-about-5-item-box mb-55">
                {[
                  {
                    icon: aboutIcon1,
                    title: "Buy & Sell All Types of Land",
                    description:
                      "Find and list open plots, agricultural lands, commercial lands, farm lands, gated community lands, and more across major Indian cities and growth corridors.",
                  },
                  {
                    icon: aboutIcon2,
                    title: "Verified Listings Only",
                    description:
                      "Every listing goes through verification before it is published. Browse lands that have been reviewed for clearer details, stronger trust, and safer decision-making.",
                  },
                ].map((item, index) => (
                  <div className="tp-about-5-item d-flex mb-30" key={index}>
                    <div className="tp-about-5-item-icon mr-30">
                      <Image src={item.icon} alt={item.title} loading="lazy" />
                    </div>
                    <div className="tp-about-5-item-content">
                      <h4 className="tp-about-5-title">{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
