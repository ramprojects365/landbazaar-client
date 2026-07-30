import aboutIcon1 from "../../../public/assets/img/testimonial/star_icon.png";
import aboutIcon2 from "../../../public/assets/img/testimonial/star_icon.png";
import Image from "next/image";
import Link from "next/link";

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
                <span className="tp-section-title-pre">
                  Why Choose PropertyLa
                </span>
                <h3 className="tp-section-title">
                  Malaysia's Trusted Real Estate Platform
                </h3>
              </div>
              <div className="tp-about-5-item-box mb-55">
                {[
                  {
                    icon: aboutIcon1,
                    title: "Free Property Search",
                  },
                  {
                    icon: aboutIcon2,
                    title: "Verified REN Agents",
                  },
                ].map((item, index) => (
                  <div className="tp-about-5-item d-flex mb-30" key={index}>
                    <div className="tp-about-5-item-icon mr-30">
                      <Image src={item.icon} alt={item.title} loading="lazy" />
                    </div>
                    <div className="tp-about-5-item-content">
                      <h4 className="tp-about-5-title">{item.title}</h4>
                      <p>
                        {item.title === "Free Property Search"
                          ? "Search thousands of properties for free across Kuala Lumpur, Selangor, Penang, and Johor. No hidden fees for property seekers."
                          : "Connect with licensed real estate negotiators verified by LPPEH Malaysia. Trustworthy agents with valid REN numbers."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="tp-about-btn d-flex">
                {[
                  { href: "/about", text: "About More" },
                  {
                    href: "/contact",
                    text: "Trusted partners",
                    className: "btn-2",
                  },
                ].map((btn, index) => (
                  <Link
                    className={`tp-btn ${btn.className || ""}`}
                    href={btn.href}
                    key={index}
                  >
                    <span className="btn-wrap">
                      <b className="text-1">{btn.text}</b>
                      <b className="text-2">{btn.text}</b>
                    </span>
                  </Link>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
